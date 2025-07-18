// graphExport.js
// 依赖：globals.js

// 保存图谱为图片（PNG/JPG）
function saveGraph() {
  // 延迟1秒确保图谱渲染完成
  setTimeout(() => {
    document.querySelector("#graph-container").scrollTo(0, 0);
    html2canvas(document.querySelector("#graph-container"), { scale: 2 }).then(canvas => {
      const format = d3.select("#save-format").property("value");
      if (format === "png") {
        canvas.toBlob(blob => handleSave(blob, "image/png", "graph.png"));
      } else if (format === "jpg") {
        canvas.toBlob(blob => handleSave(blob, "image/jpeg", "graph.jpg"));
      }
    });
  }, 1000);
}

// 处理保存逻辑（兼容不同浏览器）
function handleSave(blob, type, filename) {
  if (window.showSaveFilePicker) {
    // 现代浏览器：让用户选择保存位置
    window.showSaveFilePicker({
      types: [{
        description: `${type === 'image/png' ? 'PNG图片' : 'JPG图片'}`,
        accept: { [type]: [`.${type.split('/')[1]}`] }
      }]
    }).then(fileHandle => {
      fileHandle.createWritable().then(writable => {
        writable.write(blob);
        writable.close();
      });
    });
  } else {
    // 旧浏览器：使用FileSaver自动保存
    saveAs(blob, filename);
  }
}

// 导出保存函数
window.graphExport = {
  saveGraph
};