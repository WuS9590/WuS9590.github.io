// globals.js

// 图谱核心数据
let svg; // SVG容器
let simulation; // 力导向模拟对象
let link; // 连线元素集合
let node; // 节点元素集合
let graphData = null; // 图谱数据（节点+连线）
let zoom; // 缩放控制器
let g; // 图形内容容器（用于缩放）
let currentLayerNodes = new Set(); // 当前显示的节点集合
let originalGraphData = null; // 上传的原始数据缓存（用于更新图谱）

// 新增：节点类型-颜色映射表（全局复用）
const nodeColors = {
  'Gene': '#FFD700', 
  'Protein': '#87CEFA', 
  'Metabolite': '#98FB98',
  'Other': '#FFB6C1', 
  'Type1': '#ADD8E6', 
  'Type2': '#FFA07A',
  'Type3': '#90EE90', 
  'Type4': '#FF69B4', 
  'Type5': '#FFDAB9', 
  'Type6': '#E6E6FA'
};