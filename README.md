# AI.city v2.0.0

> **智慧城市 — 智能管理与政策仿真系统**
> 
> 一款基于浏览器的3D城市建造与政策仿真实验平台，无需下载安装，打开网页即可体验城市管理的复杂性与挑战。

[![在线体验](https://img.shields.io/badge/🚀%20在线体验-WebGL2-4a9edd?style=for-the-badge)](https://freetitan.github.io/AI.city/index.html)
[![GitHub](https://img.shields.io/badge/📦%20源代码-GitHub-333?style=for-the-badge)](https://github.com/freetitan/AI.city)

---

## 🏙️ 项目简介

AI.city 是一个开源的、完全基于 Web 技术的 3D 城市建造与政策仿真系统。它不仅是一款城市建造游戏，更是一个探索城市治理、政策制定与复杂系统管理的实验平台。

### 核心技术栈

- **[Three.js](https://github.com/mrdoob/three.js)** — 高性能实时3D渲染引擎，支持自定义着色器、纹理和3D模型
- **[MicropolisJS](https://github.com/graememcc/micropolisJS)** — 源自经典 SimCity 的开源城市仿真引擎，在独立 Web Worker 中运行，确保3D渲染流畅

---

## ✨ 核心功能

### 🏗️ 城市建设工具

| 类别 | 工具 | 说明 |
|------|------|------|
| **区域规划** | 住宅区(R) / 商业区(C) / 工业区(I) | 城市发展的三大支柱 |
| **交通网络** | 道路 / 铁路 / 电线 | 连接城市的命脉 |
| **基础设施** | 公园 / 港口 / 机场 / 体育场 | 提升城市品质与吸引力 |
| **公共服务** | 警察局 / 消防局 / 医院 / 学校 | 保障市民安全与健康 |
| **能源设施** | 燃煤电厂 / 核电站 / 风力发电机 | 为城市提供动力 |
| **工具** | 推土机 / 查询工具 / 视图控制 | 辅助建造与信息查看 |

### 📊 智能管理系统

- **💰 财政预算** — 实时查看收入支出，调整税率与预算分配
- **📈 城市评估** — 居民满意度调查，识别城市问题
- **📜 政策制定** — 实施各类城市政策，影响发展方向
- **📉 历史数据** — 追踪人口、财政、环境等指标变化趋势
- **🎯 成就系统** — 完成城市发展里程碑

### 🎮 交互控制

#### 键盘快捷键

| 按键 | 功能 |
|------|------|
| `B` | 财政预算 |
| `E` | 城市评估 |
| `D` | 灾害管理 |
| `S` | 存档/读档 |
| `A` | 成就系统 |
| `H` | 历史数据 |
| `O` | 图层切换 |
| `N` | 政策制定 |
| `I` | 发展模式 |
| `?` | 关于信息 |
| `Esc` | 关闭窗口 |

#### 视图控制

- **WASD / 方向键** — 移动视角
- **鼠标拖拽** — 旋转/平移视图
- **滚轮** — 缩放

---

## 🚀 快速开始

### 在线体验

直接访问：[https://freetitan.github.io/AI.city](https://freetitan.github.io/AI.city)

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/freetitan/AI.city.git
cd AI.city

# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

---

## 📸 界面预览

![城市建造界面](https://freetitan.github.io/AI.city/assets/img/preview01.jpg)
*3D城市建造视图*

![管理系统](https://freetitan.github.io/AI.city/assets/img/preview02.jpg)
*财政与政策管理面板*

![数据可视化](https://freetitan.github.io/AI.city/assets/img/preview03.jpg)
*历史数据与评估报告*

---

## 🗺️ 开发路线图

- [ ] 完善存档/读档功能
- [ ] 新增环境主题（雪景、夜景等）
- [ ] 扩展音效系统
- [ ] 优化灾害效果与破坏动画
- [ ] 增加更多建筑类型与政策选项
- [ ] 多语言支持
- [ ] 移动端适配优化

---

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

MIT License — 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- 原作者 [lo-th](https://github.com/lo-th) 创建了 3d.city 项目
- [Graeme McCutcheon](https://github.com/graememcc) 开发了 micropolisJS 仿真引擎
- [Three.js](https://threejs.org) 团队提供的出色3D渲染库

---

> **智慧城市，由你建造。** 🌆
