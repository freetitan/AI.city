@echo off
chcp 65001 >nul
title 智慧城市 — 智能管理与政策仿真系统
echo 正在启动智慧城市...
echo.

:: 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到Node.js，请先安装Node.js 18+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

:: 启动HTTP服务器并打开浏览器
echo 正在启动本地服务器...
start /b node node_modules/.bin/http-server ./ -c-1 -a localhost -p 8686 -s

:: 等待服务器启动
timeout /t 2 /nobreak >nul

:: 打开浏览器
echo 正在打开应用...
start http://localhost:8686/index.html

echo.
echo 智慧城市已启动！
echo 浏览器将自动打开游戏页面
echo.
echo 按任意键关闭服务器并退出...
pause >nul

:: 关闭HTTP服务器
taskkill /f /im node.exe >nul 2>&1
