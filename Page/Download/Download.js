// Download.js
function populateDownloadPage() {
    const downloadLinks = [
        { name: "中国2型糖尿病运动治疗指南2024版", url: "https://www.chinagp.net/fileup/1007-9572/PDF/2024A0019.pdf", download: "中国2型糖尿病运动治疗指南(20242024版).pdf" },
        { name: "中国老年糖尿病诊疗指南2024版", url: "https://xhyxzz.pumch.cn/cn/article/pdf/preview/10.12290/xhyxzz.2024-0347.pdf", download: "中国老年糖尿病诊疗指南2024版.pdf" },
        { name: "成人糖尿病食养指南(2023年版)", url: "http://www.nhc.gov.cn/sps/s7887k/202301/0e55a01df50c47d9a4a43db026e3afc3/files/4fcbecd2c18e46baaf291bf46c2b79cd.pdf", download: "成人糖尿病食养指南(2023年版).pdf" },
        { name: "中国成人糖尿病前期干预的专家共识(2023版)", url: "http://www.ddzxhospital.com/library/up_f/file/20230828/202308281340193571.pdf", download: "中国成人糖尿病前期干预的专家共识(2023版).pdf" },
        { name: "国家基层糖尿病肾脏病防治技术指南(2023版)", url: "http://www.ddzxhospital.com/library/up_f/file/20240125/202401250959161267.pdf", download: "国家基层糖尿病肾脏病防治技术指南(2023版).pdf" },
        { name: "中国2型糖尿病膳食指南及解读", url: "https://img.dyhome.com/uploads/assets/20220614/cebbe719-5f28-98e0-07a9-62a74d18e8c5.pdf", download: "中国2型糖尿病膳食指南及解读.pdf" },
    ];

    // 按照汉字首字母排序
    downloadLinks.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

    // 创建五列
    const numColumns = 5;
    const columns = Array.from({ length: numColumns }, () => []);

    // 将链接均匀分配到五列中
    downloadLinks.forEach((link, index) => {
        columns[index % numColumns].push(link);
    });

    // 生成 HTML 结构
    const downloadContainer = document.getElementById('download');
    downloadContainer.innerHTML = '<h1>Documents</h1>';

    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'columns-container';

    columns.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column';

        column.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.download = link.download;
            linkElement.textContent = link.name;
            columnDiv.appendChild(linkElement);
        });

        columnsContainer.appendChild(columnDiv);
    });

    downloadContainer.appendChild(columnsContainer);
}

document.addEventListener('DOMContentLoaded', populateDownloadPage);