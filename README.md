<div align="left">

# EcoDesign · AI-driven Furniture Design Platform

家具可持续设计与生命周期评估演示平台

<a href="https://taizhi-shi.github.io/furniture-design/">
<img width="1049" height="579" alt="截屏2026-10-27 21 37 01" src="https://github.com/user-attachments/assets/fa9985df-8c1c-4ce5-a550-0a9c089817a0" />

</a>

在线地址：https://taizhi-shi.github.io/furniture-design/

</div>

## 功能流程

上传家具图片或模型 → 材料识别 → 制造工艺识别 → 生命周期参数 → LCA 报告。


## 本地运行

使用 Node.js 24 与 pnpm 11.25.0：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 自动部署

推送到 `main` 后，GitHub Actions 自动构建并发布到 GitHub Pages。
