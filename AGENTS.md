# 卡皮巴拉卡通计时器 - 项目说明

## 项目概述
基于 Web 技术（HTML/CSS/JavaScript）的卡皮巴拉（Capybara）卡通风格计时器。

## 技术栈
- 纯前端：HTML + CSS + JavaScript
- 不使用框架，单文件或少量文件即可运行
- 动画优先使用 CSS animation / transition，复杂动画使用 Canvas 或 requestAnimationFrame
- 计时精度：秒级

## 设计原则
- **可爱优先**：卡皮巴拉造型圆润、呆萌
- **卡通风格**：柔和配色、圆角、Q版比例
- **交互直觉**：大按钮、清晰反馈、适配触屏
- **音效可选**：轻量提示音（可开关）

## 文件结构
- `index.html` — 主入口
- 图片资源从 `assets/` 加载
- 概念图存放在 `concept-images/`
- 日志文件：`日志.md`

## 编码规范
- 使用语义化 HTML5 标签
- CSS 使用自定义属性（CSS Variables）管理配色
- JS 使用 ES6+ 语法
- 注释用中文
- 命名使用 kebab-case（文件）和 camelCase（JS 变量）

## 当前状态
- [x] 项目初始化
- [ ] 方案选定
- [ ] 主界面开发
- [ ] 计时逻辑
- [ ] 动画效果
- [ ] 音效集成
- [ ] 测试完善
