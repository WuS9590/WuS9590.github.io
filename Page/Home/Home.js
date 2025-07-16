// Home.js
document.addEventListener("DOMContentLoaded", function() {
    // 定义图片路径（实际使用时替换为你的图片地址，建议放在./images目录下）
    const images = {
        intro: "./Images/1.png",       // 2型糖尿病示意图
        cause: "./Images/2.jpg",       // 发病原因相关图（如饮食、运动）
        symptoms: "./Images/3.jpg", // 症状相关图（如多饮多尿示意图）
        diagnosis: "./Images/4.jpg" // 诊断相关图（如血糖检测）
    };

    const homeContent = `
        <div class="home-container">
            <!-- 标题区域 -->
            <div class="title-section">
                <h1>Type 2 Diabetes Mellitus</h1>
                <div class="title-divider"></div>
            </div>

            <!-- 1. 什么是2型糖尿病 -->
            <section class="content-section">
                <div class="section-header">
                    <h2>一、什么是2型糖尿病？</h2>
                </div>
                <div class="content-wrapper">
                    <div class="text-content">
                        <p>2 型糖尿病是一种慢性代谢性疾病，主要特征是身体对胰岛素的作用产生抵抗，同时胰岛 β 细胞功能逐渐衰退，导致胰岛素分泌相对不足。
                            胰岛素就像是一把 “钥匙”，能够帮助细胞打开大门，让血液中的葡萄糖进入细胞，为细胞提供能量。在 2 型糖尿病患者中，这把 “钥匙”
                            的作用被削弱，或者细胞这扇 “门” 变得不那么灵敏，使得葡萄糖不能有效地被细胞利用，从而在血液中积聚，引发高血糖。</p>
                    </div>
                    <div class="image-content">
                        <img src="${images.intro}" alt="2型糖尿病示意图" class="section-image">
                    </div>
                </div>
            </section>

            <!-- 2. 发病原因 -->
            <section class="content-section">
                <div class="section-header">
                    <h2>二、发病原因</h2>
                </div>
                <div class="content-wrapper reverse">
                    <div class="image-content">
                        <img src="${images.cause}" alt="2型糖尿病发病原因" class="section-image">
                    </div>
                    <div class="text-content">
                        <h3>(一) 遗传因素</h3>
                        <p>遗传在 2 型糖尿病的发病中起着重要作用。如果家族中有 2 型糖尿病患者，个体发病风险会显著增加。研究表明，大约 70% - 80% 的患者有糖尿病家族史。</p>
                        
                        <h3>(二) 生活方式因素</h3>
                        <p>饮食：长期高糖、高脂肪、高能量的饮食是重要危险因素，过度摄入会导致体重增加，尤其是腹部脂肪堆积。</p>
                        <p>运动：缺乏运动导致肌肉对葡萄糖的摄取和利用能力降低，久坐人群患病风险更高。</p>
                        <p>肥胖：中心性肥胖（腹部肥胖）会释放炎症因子，干扰胰岛素功能，超过 80% 的患者发病时伴有超重或肥胖。</p>
                    </div>
                </div>
            </section>

            <!-- 3. 症状 -->
            <section class="content-section">
                <div class="section-header">
                    <h2>三、症状</h2>
                </div>
                <div class="content-wrapper">
                    <div class="text-content">
                        <p><strong>“三多一少”</strong>：多饮、多食、多尿和体重减轻。血糖升高导致身体通过尿液排糖，引发口渴多饮；细胞无法利用葡萄糖，身体发出饥饿信号，同时分解脂肪和蛋白质导致体重下降。</p>
                        <p><strong>疲劳和乏力</strong>：持续高血糖使细胞能量不足，活动后疲劳感更明显，休息后难以缓解。</p>
                        <p><strong>视力模糊</strong>：高血糖影响眼睛晶状体渗透压，导致视力模糊，长期可能引发视网膜病变。</p>
                    </div>
                    <div class="image-content">
                        <img src="${images.symptoms}" alt="2型糖尿病症状" class="section-image">
                    </div>
                </div>
            </section>

            <!-- 4. 诊断与并发症 -->
            <section class="content-section">
                <div class="section-header">
                    <h2>四、诊断与并发症</h2>
                </div>
                <div class="content-wrapper reverse">
                    <div class="image-content">
                        <img src="${images.diagnosis}" alt="2型糖尿病诊断" class="section-image">
                    </div>
                    <div class="text-content">
                        <h3>(一) 常见并发症</h3>
                        <p>糖尿病肾病：损伤肾脏微血管，可能导致肾衰竭。</p>
                        <p>糖尿病视网膜病变：视网膜血管病变，是成年人失明的主要原因之一。</p>
                        <p>心血管疾病：患病风险是常人的 2-4 倍，易引发冠心病、脑卒中等。</p>
                        <p>周围血管病变：下肢缺血，严重时可能导致截肢。</p>

                        <h3>(二) 诊断方式</h3>
                        <p>血糖检测是主要依据，包括空腹血糖、餐后 2 小时血糖和糖化血红蛋白检测。</p>
                    </div>
                </div>
            </section>
        </div>
    `;

    // 渲染内容到页面
    document.getElementById('home').innerHTML = homeContent;
});