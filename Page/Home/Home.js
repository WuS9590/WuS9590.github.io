// home.js - 物联生境（WUS）首页（精简版）
document.addEventListener("DOMContentLoaded", function() {
    // 定义图片路径（实际图片替换路径即可）
    const images = {
        knowledgeMap_1: "./Images/1.png", // 知识图谱板块图片
        knowledgeMap_2: "./Images/2.png", // 多基因遗传风险评分板块图片
        placeholder: "./Images/3.png" // 占位板块默认图片
    };

    // 生成首页HTML结构
    function generateHomeContent() {
        return `
            <!-- 导航栏（保留完整导航，方便后续跳转） -->
            <nav class="wus-nav">
                <div class="logo-container">
                    <div class="centered-text-container">
                        <span class="logo-sub">生命知识·网络互联·系统整合</span>
                    </div>
                </div>
            </nav>

            <!-- 核心板块区 -->
            <section class="core-modules">
                <div class="modules-grid"> <!-- 网格布局 -->
                    <!-- 第一行 -->
                    <!-- 1. 知识图谱（实际板块） -->
                    <div class="module-card" id="knowledge-map">
                        <h3><a href="./Branch/KnowledgeGraph(JSON)/KnowledgeGraph.html">Knowledge Graph(JSON)</a></h3>
                        <div class="module-image">
                            <img src="${images.knowledgeMap_1}" alt="生物知识图谱" class="module-img">
                        </div>
                    </div>

                    <!-- 2. 知识图谱 -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3><a href="./Branch/KnowledgeGraph(CSV)/KnowledgeGraph.html">Knowledge Graph(CSV)</a></h3>
                            <img src="${images.knowledgeMap_2}" alt="生物知识图谱" class="module-img">
                        </div>
                    </div>

                    <!-- 3. 多基因遗传风险评分（实际板块） -->
                    <div class="module-card" id="polygenic-score">
                        <div class="module-image">
                            <h3>多基因遗传风险评分</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 4. 占位板块（后续添加：如“基因数据库”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>基因数据库</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 第二行 -->
                    <!-- 5. 占位板块（后续添加：如“实验指南”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>生物实验指南</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 6. 占位板块（后续添加：如“物种图鉴”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>物种图鉴</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 7. 占位板块（后续添加：如“文献解读”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>前沿文献解读</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 8. 占位板块（后续添加：如“科普问答”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>生物科普问答</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 第三行 -->
                    <!-- 9. 占位板块（后续添加：如“数据分析工具”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>数据分析工具</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 10. 占位板块（后续添加：如“生物信息学资源”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>生物信息学资源</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 11. 占位板块（后续添加：如“生物模型库”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>生物模型库</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>

                    <!-- 12. 占位板块（后续添加：如“生物竞赛资讯”） -->
                    <div class="module-card placeholder-module">
                        <div class="module-image">
                            <h3>生物竞赛资讯</h3>
                            <img src="${images.placeholder}" alt="板块占位" class="module-img">
                        </div>
                    </div>
                </div>
            </section>

            <!-- 其他页面内容 -->
            <footer class="page-footer">
                <div class="footer-content">
                    <p class="copyright">Copyright &copy; 2025 物联生境（WUS）</p>
                </div>
            </footer>
        `;
    }

    // 渲染到页面（需HTML预留id为“home”的容器）
    function renderHomeContent() {
        const homeContainer = document.getElementById('home');
        if (homeContainer) {
            homeContainer.innerHTML = generateHomeContent();
        } else {
            console.error('请在HTML中添加容器：<div id="home"></div>');
        }
    }

    renderHomeContent();
});
