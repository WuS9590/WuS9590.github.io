// ToolBox.js
function populateBoxPage() {
    const boxLinks = [
        { name: "Analogouscolors", url: "https://www.analogouscolors.com/" },
        { name: "Runoob", url: "https://www.runoob.com/" },
    ];

    // 按名称排序
    boxLinks.sort((a, b) => a.name.localeCompare(b.name));

    // 创建十列
    const numColumns = 10;
    const columns = Array.from({ length: numColumns }, () => []);

    // 将链接均匀分配到十列中
    boxLinks.forEach((link, index) => {
        columns[index % numColumns].push(link);
    });

    // 生成 HTML 结构
    const boxContainer = document.getElementById('toolbox');
    boxContainer.innerHTML = '<h1>Small Tools</h1>';

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

    boxContainer.appendChild(columnsContainer);
}

document.addEventListener('DOMContentLoaded', populateBoxPage);