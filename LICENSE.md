# AI.city 许可证说明

**智慧城市 — 智能管理与政策仿真系统**

本项目采用双重许可证结构，请仔细阅读以下内容：

---

## 1. micropolisJS 仿真引擎

城市仿真核心逻辑基于 **micropolisJS**，采用 **GNU General Public License v3 (GPL v3)**。

- **版权所有**: Graeme McCutcheon, 2013
- **许可证文件**: [LICENSE](LICENSE) 和 [COPYING](COPYING)
- **源代码**: [https://github.com/graememcc/micropolisJS](https://github.com/graememcc/micropolisJS)

### GPL v3 附加条款（第7条）

根据 micropolisJS 的许可证要求：

- 不授予任何商标或宣传权利
- 不得使用 "SimCity" 或任何其他 Electronic Arts 商标分发本程序的修改版本
- 不得声称与 Electronic Arts Inc. 或其员工有任何关联
- 传播本程序时必须包含版权声明和这些条款

---

## 2. AI.city 新增代码

AI.city 项目的以下新增内容采用 **MIT License**：

- 3D 渲染系统（基于 Three.js）
- 用户界面和交互系统
- 政策仿真模块
- 成就系统
- 历史数据可视化
- 图层管理系统
- 其他原创功能和改进

- **版权所有**: freetitan, 2024-2025
- **许可证**: MIT License（见下文）

### MIT License

```
MIT License

Copyright (c) 2024-2025 freetitan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 3. 第三方依赖

本项目使用以下开源库：

| 库 | 许可证 | 链接 |
|---|---|---|
| Three.js | MIT | https://github.com/mrdoob/three.js |
| micropolisJS | GPL v3 | https://github.com/graememcc/micropolisJS |

---

## 4. 使用须知

1. **如果您使用本项目的代码**：
   - 必须同时遵守 GPL v3 和 MIT License 的要求
   - 修改 micropolisJS 部分的代码必须开源并采用 GPL v3
   - 修改 AI.city 新增部分的代码需保留 MIT License 声明

2. **如果您分发本项目的二进制版本**：
   - 必须提供完整的源代码（GPL v3 要求）
   - 必须包含本许可证说明文件

3. **商标声明**：
   - "AI.city" 和 "智慧城市" 是本项目的标识
   - 未经许可不得将本项目与 Electronic Arts 或 SimCity 关联

---

## 5. 致谢

- 感谢 [lo-th](https://github.com/lo-th) 创建原始 3d.city 项目
- 感谢 [Graeme McCutcheon](https://github.com/graememcc) 开发 micropolisJS 仿真引擎
- 感谢 [Three.js](https://threejs.org) 团队提供优秀的 3D 渲染库

---

如有许可证相关问题，请通过 GitHub Issues 联系我们。
