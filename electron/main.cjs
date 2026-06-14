const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// 禁用安全警告（因为我们加载本地文件）
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow;

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        title: '智慧城市 — 智能管理与政策仿真系统',
        icon: path.join(__dirname, '../favicon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false, // 允许加载本地资源
            allowRunningInsecureContent: true
        },
        show: false, // 先不显示，等加载完成再显示
        backgroundColor: '#1a1a2e'
    });

    // 移除默认菜单栏
    Menu.setApplicationMenu(null);

    // 加载应用
    const indexPath = path.join(__dirname, '../index.html');
    mainWindow.loadFile(indexPath);

    // 开发工具（可选）
    // mainWindow.webContents.openDevTools();

    // 窗口加载完成后显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // 窗口关闭事件
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // 处理新窗口请求（在现有窗口中打开）
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        mainWindow.loadURL(url);
        return { action: 'deny' };
    });
}

// 应用准备就绪
app.whenReady().then(createWindow);

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 应用激活时（macOS）
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 处理证书错误（自签名证书等）
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
});
