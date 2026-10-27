# AI-driven Furniture Design Platform

React + Vite 家具可持续设计演示网站。AI 识别及 LCA 结果为演示数据。

## GitHub Pages 部署

1. 将本目录全部内容（包括隐藏的 `.github` 和 `.figma` 文件夹）推送到 GitHub 仓库的 `main` 分支。
2. 打开仓库 Settings → Pages → Source，选择 GitHub Actions。
3. 在 Actions 页面运行 Deploy to GitHub Pages（或再次推送 main）。
4. 部署完成后，地址显示在 Actions 的 github-pages 环境中。

普通仓库地址为 `https://用户名.github.io/仓库名/`。使用 `用户名.github.io` 作为仓库名时为根域名。配置会自动适配路径。

## 本地运行

Node.js 24，pnpm 11.25.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm build
```
