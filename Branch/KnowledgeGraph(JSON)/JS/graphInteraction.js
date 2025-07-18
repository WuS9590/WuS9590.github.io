// graphInteraction.js
// 依赖：globals.js、graphCore.js

// 1. 查询节点并高亮/隔离
function queryNode(query, isolate) {
  // 清除现有高亮
  node.selectAll("circle").style("stroke", null).style("stroke-width", null);
  link.style("stroke", "#999").style("stroke-opacity", 0.6);

  // 将查询字符串按中英文逗号、分号分割成多个节点名称
  const queryNodes = query.split(/[,;，]/).map(name => name.trim().toLowerCase());

  // 查找目标节点
  const targetNodes = graphData.nodes.filter(n => queryNodes.includes(n.name.toLowerCase()));
  if (targetNodes.length === 0) { 
    alert("未找到任何匹配的节点"); 
    return; 
  }

  // 获取相关节点和边
  const neighbors = new Set();
  targetNodes.forEach(targetNode => {
    graphData.links.forEach(l => {
      if (l.source.id === targetNode.id || l.target.id === targetNode.id) {
        neighbors.add(l.source.id);
        neighbors.add(l.target.id);
      }
    });
  });

  if (isolate) {
    // 隔离显示：只保留相关节点和边
    const filteredNodes = graphData.nodes.filter(n => neighbors.has(n.id));
    const filteredLinks = graphData.links.filter(l => neighbors.has(l.source.id) && neighbors.has(l.target.id));
    // 重新绘制
    d3.select("#graph-container").selectAll("*").remove();
    graphCore.init();
    graphCore.draw({ nodes: filteredNodes, links: filteredLinks });
  } else {
    // 高亮显示：不改变图谱结构
    targetNodes.forEach(targetNode => {
      node.filter(n => n.id === targetNode.id).selectAll("circle")
        .style("stroke", "red").style("stroke-width", 3);
    });
    node.filter(n => neighbors.has(n.id) &&!targetNodes.some(t => t.id === n.id)).selectAll("circle")
      .style("stroke", "black").style("stroke-width", 2);
    link.filter(l => neighbors.has(l.source.id) && neighbors.has(l.target.id))
      .style("stroke", "black").style("stroke-opacity", 1);
    // 更新当前显示节点
    currentLayerNodes.clear();
    neighbors.forEach(id => currentLayerNodes.add(id));
  }
}

// 2. 增加层级（显示当前节点的关联节点）
function addLayer() {
  const currentNodes = Array.from(currentLayerNodes);
  if (currentNodes.length === 0) return; // 无当前节点时不执行

  const nextLayerNodes = new Set();
  const nextLayerLinks = [];
  currentNodes.forEach(nodeId => {
    graphData.links.forEach(link => {
      if (link.source.id === nodeId && !currentLayerNodes.has(link.target.id)) {
        nextLayerNodes.add(link.target.id);
        nextLayerLinks.push(link);
      } else if (link.target.id === nodeId && !currentLayerNodes.has(link.source.id)) {
        nextLayerNodes.add(link.source.id);
        nextLayerLinks.push(link);
      }
    });
  });

  // 更新当前节点并高亮新增节点
  nextLayerNodes.forEach(id => currentLayerNodes.add(id));
  node.filter(n => nextLayerNodes.has(n.id)).selectAll("circle")
    .style("stroke", "blue").style("stroke-width", 2);
  link.filter(l => nextLayerLinks.some(nextLink => 
    (nextLink.source.id === l.source.id && nextLink.target.id === l.target.id) ||
    (nextLink.source.id === l.target.id && nextLink.target.id === l.source.id)
  )).style("stroke", "blue").style("stroke-opacity", 1);
}

// 3. 层显（只显示当前层级的节点和边）
function showLayer() {
  const filteredNodes = graphData.nodes.filter(node => currentLayerNodes.has(node.id));
  const filteredLinks = graphData.links.filter(link => 
    currentLayerNodes.has(link.source.id) && currentLayerNodes.has(link.target.id)
  );
  // 重新绘制
  d3.select("#graph-container").selectAll("*").remove();
  graphCore.init();
  graphCore.draw({ nodes: filteredNodes, links: filteredLinks });
}

// 4. 筛选前N个重要节点（按度数）
function filterTopNodes() {
  const topNodeCount = parseInt(d3.select("#top-node-count").property("value"), 10);
  if (isNaN(topNodeCount)) return;

  // 计算度数并排序
  const degreeMap = new Map();
  graphData.links.forEach(link => {
    degreeMap.set(link.source.id, (degreeMap.get(link.source.id) || 0) + 1);
    degreeMap.set(link.target.id, (degreeMap.get(link.target.id) || 0) + 1);
  });
  graphData.nodes.forEach(node => { node.degree = degreeMap.get(node.id) || 0; });
  graphData.nodes.sort((a, b) => b.degree - a.degree);

  // 筛选相关节点和边
  const topNodeIds = new Set(graphData.nodes.slice(0, topNodeCount).map(node => node.id));
  const relatedNodes = new Set();
  graphData.links.forEach(link => {
    if (topNodeIds.has(link.source.id) || topNodeIds.has(link.target.id)) {
      relatedNodes.add(link.source.id);
      relatedNodes.add(link.target.id);
    }
  });
  const filteredNodes = graphData.nodes.filter(node => relatedNodes.has(node.id));
  const filteredLinks = graphData.links.filter(link => 
    relatedNodes.has(link.source.id) && relatedNodes.has(link.target.id)
  );
  filteredNodes.forEach(node => { node.isTopNode = topNodeIds.has(node.id); });

  // 重新绘制
  d3.select("#graph-container").selectAll("*").remove();
  graphCore.init();
  graphCore.draw({ nodes: filteredNodes, links: filteredLinks });
}

// 5. 节点点击高亮
function nodeClicked(event, d) {
  // 清除现有高亮
  node.selectAll("circle").style("stroke", null).style("stroke-width", null);
  link.style("stroke", "#999").style("stroke-opacity", 0.6);

  // 获取相关节点
  const neighbors = new Set();
  graphData.links.forEach(l => {
    if (l.source.id === d.id || l.target.id === d.id) {
      neighbors.add(l.source.id);
      neighbors.add(l.target.id);
    }
  });

  // 高亮点击节点和相关节点
  node.filter(n => n.id === d.id).selectAll("circle")
    .style("stroke", "red").style("stroke-width", 2);
  node.filter(n => neighbors.has(n.id) && n.id !== d.id).selectAll("circle")
    .style("stroke", "black").style("stroke-width", 1);
  link.filter(l => neighbors.has(l.source.id) && neighbors.has(l.target.id))
    .style("stroke", "black").style("stroke-opacity", 1);
}

// 导出交互函数
window.graphInteraction = {
  queryNode,
  addLayer,
  showLayer,
  filterTopNodes,
  nodeClicked
};