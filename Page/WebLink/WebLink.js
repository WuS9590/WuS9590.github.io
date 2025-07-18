// WebLink.js
function populateWeblinkPage() {
    const weblinkLinks = [
        { name: "T2DKP", url: "https://t2d.hugeamp.org/" },
    ];

    // 按名称排序
    weblinkLinks.sort((a, b) => a.name.localeCompare(b.name));

    // 创建十列
    const numColumns = 10;
    const columns = Array.from({ length: numColumns }, () => []);

    // 将链接均匀分配到十列中
    weblinkLinks.forEach((link, index) => {
        columns[index % numColumns].push(link);
    });

    // 生成 HTML 结构
    const weblinkContainer = document.getElementById('weblink');
    weblinkContainer.innerHTML = '<h1>Academic Resources</h1>';

    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'columns-container';

    columns.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column';

        column.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.name;
            linkElement.target = '_blank';
            columnDiv.appendChild(linkElement);
        });

        columnsContainer.appendChild(columnDiv);
    });

    weblinkContainer.appendChild(columnsContainer);
}

document.addEventListener('DOMContentLoaded', populateWeblinkPage);