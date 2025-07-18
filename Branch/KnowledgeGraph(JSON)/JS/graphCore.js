// graphCore.js
// 依赖：globals.js

// 1. 获取视口尺寸
function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight * 0.9
  };
}

// 2. 初始化图谱容器和力导向模拟
function initGraph() {
  const { width, height } = getViewportSize();
  // 创建SVG容器
  svg = d3.select("#graph-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  // 初始化缩放
  zoom = d3.zoom()
    .scaleExtent([0.5, 3])
    .on("zoom", zoomed);
  // 创建图形容器（用于缩放变换）
  g = svg.append("g");
  svg.call(zoom);
  // 初始化力导向模拟
  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .alphaTarget(0.00001);
}

// graphCore.js
// 计算节点的介度
function calculateBetweennessCentrality(graphData) {
    const nodes = graphData.nodes;
    const links = graphData.links;
    const numNodes = nodes.length;
    const betweenness = new Map(nodes.map(node => [node.id, 0]));

    for (let s = 0; s < numNodes; s++) {
        const source = nodes[s];
        const S = [];
        const P = new Map(nodes.map(node => [node.id, []]));
        const sigma = new Map(nodes.map(node => [node.id, 0]));
        sigma.set(source.id, 1);
        const d = new Map(nodes.map(node => [node.id, -1]));
        d.set(source.id, 0);
        const Q = [source];

        while (Q.length > 0) {
            const v = Q.shift();
            S.push(v);
            const neighbors = links.filter(link => link.source.id === v.id || link.target.id === v.id)
                                   .map(link => link.source.id === v.id ? link.target : link.source);
            for (let i = 0; i < neighbors.length; i++) {
                const w = neighbors[i];
                if (d.get(w.id) < 0) {
                    Q.push(w);
                    d.set(w.id, d.get(v.id) + 1);
                }
                if (d.get(w.id) === d.get(v.id) + 1) {
                    sigma.set(w.id, sigma.get(w.id) + sigma.get(v.id));
                    P.get(w.id).push(v);
                }
            }
        }

        const delta = new Map(nodes.map(node => [node.id, 0]));
        while (S.length > 0) {
            const w = S.pop();
            for (let i = 0; i < P.get(w.id).length; i++) {
                const v = P.get(w.id)[i];
                delta.set(v.id, delta.get(v.id) + (sigma.get(v.id) / sigma.get(w.id)) * (1 + delta.get(w.id)));
            }
            if (w.id !== source.id) {
                betweenness.set(w.id, betweenness.get(w.id) + delta.get(w.id));
            }
        }
    }

    return betweenness;
}

// 3. 绘制图谱（核心逻辑）
function drawGraph(data) {
    graphData = data;
    const { width, height } = getViewportSize();
    const centerX = width / 2;
    const centerY = height / 2;

    // 计算节点度数（连接的边数）
    const degreeMap = new Map();
    graphData.links.forEach(link => {
        degreeMap.set(link.source.id, (degreeMap.get(link.source.id) || 0) + 1);
        degreeMap.set(link.target.id, (degreeMap.get(link.target.id) || 0) + 1);
    });
    graphData.nodes.forEach(node => {
        node.degree = degreeMap.get(node.id) || 0;
    });

    // 绘制连线
    link = g.selectAll(".link")
      .data(graphData.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", 1)
      .style("stroke", "#ccc");

    // 绘制节点（包含圆圈和文本）
    node = g.selectAll(".node")
      .data(graphData.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", nodeClicked);

    // 根据节点度数设置节点圆圈大小，根据节点类型设置颜色
    node.append("circle")
      // 1. 修复度数为0时的计算错误（新增判断）
      .attr("r", d => {
        const minRadius = 5;
        const maxRadius = 20;
        const maxDegree = Math.max(...graphData.nodes.map(node => node.degree));
        // 新增：如果所有节点度数为0，直接返回最小半径（避免除以0）
        if (maxDegree === 0) {
          return minRadius;
        }
        return minRadius + (d.degree / maxDegree) * (maxRadius - minRadius);
      })
      // 2. 复用全局nodeColors（删除局部定义后，直接使用全局变量）
      .style("fill", d => nodeColors[d.label] || nodeColors['Other'])
      // 保留原有高亮逻辑（top节点的边框）
      .style("stroke", d => d.isTopNode ? "#FF4500" : null)
      .style("stroke-width", d => d.isTopNode ? 4 : null);

    // 节点文本（只显示节点名称）
    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .style("font-size", d => d.isTopNode ? "16px" : "14px")
      .style("fill", "black")
      .text(d => d.name);

    // 力导向模拟更新
    function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    }
    simulation.nodes(graphData.nodes).on("tick", ticked);
    simulation.force("link").links(graphData.links);
    simulation.force("center", d3.forceCenter(width / 2, height / 2));
}

// 4. 缩放事件处理
function zoomed(event) {
  g.attr("transform", event.transform);
}

// 5. 节点拖动相关函数
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// 导出核心函数（供其他模块调用）
window.graphCore = {
  init: initGraph,
  draw: drawGraph,
  getViewportSize
};