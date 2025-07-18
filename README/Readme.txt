一、本地启动网页加载文件的方法
1 使用 Python 启动简单服务器： 
1.1在命令行中进入包含 HTML 文件和数据文件的目录；
1.2运行 python -m http.server 命令，启动一个简单的本地服务器，默认监听在 http://localhost:8000/；
1.3浏览器中通过 http://localhost:8000/index.html 访问网页，正常加载数据。

2.使用其他服务器软件
2.1下载 Node.js 安装包。访问 Node.js（https://nodejs.org/）。长期支持版，适合你系统（64 位） LTS 版本。
2.2安装包（.msi 格式），双击运行。可以安装到 “D:\Program Files\nodejs”。点击 Next，自动安装 Node.js 和 npm（Node.js 包管理器）。
2.3验证安装成功。打开命令提示符cmd，输入 “node -v”。

二、部署到服务器
1 Linux
1.1 安装apache2：sudo apt-get install apache2
1.2 启动apache2：sudo systemctl start apache2
1.3 检查apache2：sudo systemctl status apache2
1.4 放置文件：cd /var/www/html
cp -r index.html /var/www/html
1.5 查询网址：ifconfig
1.6 访问网址：http://192.168.1.100 #example

三、部署到github
1.创建github仓库
2.上传文件到github仓库
3.点击setting  查看生成的网址