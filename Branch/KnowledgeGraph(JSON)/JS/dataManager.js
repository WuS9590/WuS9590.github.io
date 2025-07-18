// dataManager.js
// 依赖：globals.js、graphCore.js

// 1. 从本地JSON加载图谱数据
function loadLocalData() {
  d3.json("./data/biomedical_knowledge_graph.json").then(data => {
    graphData = data;
    originalGraphData = data; // 缓存原始数据
    graphCore.draw(data);
  }).catch(error => {
    console.error("加载本地数据失败:", error);
  });
}

// 2. 刷新图谱（重新加载本地数据）
function refreshGraph() {
  d3.select("#graph-container").selectAll("*").remove();
  graphCore.init();
  loadLocalData();
  resetUI(); // 重置UI状态
}

// 3. 处理文件上传
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    document.getElementById('file-name-display').textContent = 'No file';
    return;
  }

  document.getElementById('file-name-display').textContent = file.name;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      graphData = data;
      originalGraphData = data; // 缓存上传数据
      updateGraph(); // 立即更新图谱
    } catch (error) {
      console.error("文件解析失败:", error);
      alert("文件格式错误，请检查JSON格式");
    }
  };
  reader.readAsText(file);
}

// 4. 根据上传的原始数据更新图谱
function updateGraph() {
  if (!originalGraphData) {
    alert("请先上传数据文件");
    return;
  }
  d3.select("#graph-container").selectAll("*").remove();
  graphCore.init();
  graphCore.draw(originalGraphData);
  resetUI(); // 重置UI状态
}

// 5. 重置UI状态（复选框、输入框等）
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