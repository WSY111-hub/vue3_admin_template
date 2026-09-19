# 硅谷甄选后台管理系统（前端）

## 📚 项目简介
基于 Vue3 + TypeScript + Element‑Plus 开发的B端电商运营后台，实现登录鉴权、商品品牌管理、角色权限分配，完整实现RBAC权限模型，支持动态路由。

> 本项目为尚硅谷B站教学实战项目，后端采用开源SpringBoot服务，使用WSL2 + Docker Compose一键启动后端与MySQL数据库。
> 与原版视频区别：按钮权限指令功能已实现，页面未全部铺满指令。

## ✨ 项目特性
🚀 **前沿技术栈**：Vue3 + TypeScript + Vite + Pinia
🎨 **UI组件库**：Element‑Plus，后台通用布局
🔐 **RBAC权限控制**：菜单动态路由 + 按钮级自定义指令权限
🏗️ **模块化架构**：api、组件、路由、状态管理分层清晰
🔧 **工程化规范**：ESLint + Prettier，请求统一封装拦截

## 📦 主要依赖
- Vue3：渐进式前端框架
- TypeScript：提供静态类型约束
- Vite：快速构建工具
- Vue‑Router4：路由管理、全局路由守卫、动态路由
- Pinia：全局状态管理
- Axios：请求封装，统一处理Token、错误拦截
- Element‑Plus：UI组件库

## 🚀 快速开始
### 环境要求
- Node.js >=16.0.0
- pnpm >=8.0.0
```bash
# 全局安装pnpm
npm i -g pnpm
