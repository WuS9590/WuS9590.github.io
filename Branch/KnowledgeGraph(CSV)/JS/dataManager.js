// dataManager.js
// 依赖：globals.js、graphCore.js
// 新增：CSV解析工具函数
// dataManager.js

// 新增：CSV解析工具函数
function parseCSVToGraph(csvData) {
    const nodes = new Map();
    const links = [];

    csvData.forEach(row => {
        // 提取节点
        const nodeAId = row['nodes_a'] || `node_${Date.now()}_${Math.random()}`;
        if (!nodes.has(nodeAId)) {
            nodes.set(nodeAId, { id: nodeAId, name: row['nodes_a'] });
        }

        const nodeBId = row['nodes_b'] || `node_${Date.now()}_${Math.random() + 1}`;
        if (!nodes.has(nodeBId)) {
            nodes.set(nodeBId, { id: nodeBId, name: row['nodes_b'] });
        }

        // 创建关系（直接使用CSV中的颜色列）
        links.push({
            source: nodeAId,
            target: nodeBId,
            relation: row['relation'],
            color: row['color'] || '#999999'  // 默认灰色
        });
    });

    return { nodes: Array.from(nodes.values()), links };
}

// 1. 从本地CSV加载图谱数据
function loadLocalData() {
    d3.csv("./data/graph_data.csv").then(data => {
        const graphData = parseCSVToGraph(data);
        originalGraphData = graphData;
        graphCore.draw(graphData);
    }).catch(error => {
        console.error("加载本地数据失败:", error);
    });
}

// 2. 刷新图谱（保留原有功能）
function refreshGraph() {
    d3.select("#graph-container").selectAll("*").remove();
    graphCore.init();
    loadLocalData();
    resetUI();
}

// 3. 处理文件上传（仅支持CSV）
function handleFileUpload(event) {
    const file = event.target.files[0];
    // ...原有代码...
    
    reader.onload = function(e) {
        try {
            const csvData = d3.csvParse(e.target.result);
            const graphData = parseCSVToGraph(csvData);  // 调用修改后的函数
            originalGraphData = graphData;
            updateGraph();
        } catch (error) {
            console.error("CSV解析失败:", error);
            alert("CSV格式错误，请检查表格结构");
        }
    };

    reader.readAsText(file);
}

// 4. 更新图谱（保留原有功能）
function updateGraph() {
    if (!originalGraphData) {
        alert("请先上传数据文件");
        return;
    }
    d3.select("#graph-container").selectAll("*").remove();
    graphCore.init();
    graphCore.draw(originalGraphData);
    resetUI();
}

// 5. 重置UI状态（保留原有功能）
function resetUI() {
    d3.select("#isolate-checkbox-dx").property("checked", false);
    d3.select("#isolate-checkbox-cx").property("checked", false);
    d3.select("#top-node-count").property("value", 1);
    currentLayerNodes.clear();
}

// 导出数据管理函数
window.dataManager = {
    loadLocalData,
    refreshGraph,
    handleFileUpload,
    updateGraph,
    resetUI
};