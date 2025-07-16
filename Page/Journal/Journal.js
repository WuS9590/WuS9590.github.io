// Journal.js
function populateJournalPage() {
    const journalLinks = [
        { name: "Nature", url: "https://www.nature.com/" },
        { name: "Cell", url: "https://www.cell.com/" },
        { name: "Science", url: "https://www.science.org/" },
    ];

    // 按名称排序
    journalLinks.sort((a, b) => a.name.localeCompare(b.name));

    // 创建十列
    const numColumns = 10;
    const columns = Array.from({ length: numColumns }, () => []);

    // 将链接均匀分配到十列中
    journalLinks.forEach((link, index) => {
        columns[index % numColumns].push(link);
    });

    // 生成 HTML 结构
    const journalContainer = document.getElementById('journal');
    journalContainer.innerHTML = '<h1>Academic Journal</h1>';

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

    journalContainer.appendChild(columnsContainer);
}

document.addEventListener('DOMContentLoaded', populateJournalPage);