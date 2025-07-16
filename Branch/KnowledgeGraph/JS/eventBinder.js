// eventBinder.js
// 依赖：graphInteraction.js、dataManager.js、graphExport.js

// 绑定所有事件（DOM加载完成后执行）
function bindAllEvents() {
  // 1. 查询相关
  d3.select("#query-button").on("click", () => {
    const query = d3.select("#query-input").property("value");
    const isolate = d3.select("#isolate-checkbox-dx").property("checked");
    graphInteraction.queryNode(query, isolate);
  });
  // 回车键查询
  d3.select("#query-input").on("keypress", (event) => {
    if (event.key === "Enter") {
      const query = d3.select("#query-input").property("value");
      const isolate = d3.select("#isolate-checkbox-dx").property("checked");
      graphInteraction.queryNode(query, isolate);
    }
  });
  // 单显复选框变化
  d3.select("#isolate-checkbox-dx").on("change", () => {
    const query = d3.select("#query-input").property("value");
    const isolate = d3.select("#isolate-checkbox-dx").property("checked");
    if (query) graphInteraction.queryNode(query, isolate);
  });

  // 2. 层级相关
  document.getElementById('add-layer-button').addEventListener('click', graphInteraction.addLayer);
  document.getElementById('show-layer-button').addEventListener('click', graphInteraction.showLayer);

  // 3. 筛选相关
  d3.select("#filter-button").on("click", graphInteraction.filterTopNodes);
  d3.select("#top-node-count").on("change", graphInteraction.filterTopNodes);

  // 4. 数据相关
  document.getElementById('refresh-button').addEventListener('click', dataManager.refreshGraph);
  document.getElementById('file-upload').addEventListener('change', dataManager.handleFileUpload);
  document.getElementById('custom-file-upload').addEventListener('click', () => {
    document.getElementById('file-upload').click();
  });
  d3.select("#update-button").on("click", dataManager.updateGraph);

  // 5. 导出相关
  document.getElementById('save-button').addEventListener('click', graphExport.saveGraph);

  // 6. 窗口大小变化时重绘
  window.addEventListener('resize', () => {
    if (!graphData) return;
    d3.select("#graph-container").selectAll("*").remove();
    graphCore.init();
    graphCore.draw(graphData);
  });

  // 7. 鼠标滚轮缩放
  document.addEventListener('wheel', (event) => {
    if (event.target.closest('#graph-container')) {
      event.preventDefault();
      svg.call(zoom.scaleBy, event.deltaY < 0 ? 1.1 : 0.9);
    }
  });

  // 8. 鼠标进入/离开图谱容器时控制页面滚动
  document.addEventListener('mouseenter', (event) => {
    if (event.target.closest('#graph-container')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
  document.addEventListener('mouseleave', (event) => {
    if (!event.target.closest('#graph-container')) {
      document.body.style.overflow = 'auto';
    }
  });
}

// 导出事件绑定函数
window.eventBinder = {
  bindAllEvents
};