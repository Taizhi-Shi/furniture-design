<div align="center">

# EcoDesign · AI-driven Furniture Design Platform

家具可持续设计与生命周期评估演示平台

<img src="src/imports/lca-report-armchair.png" alt="EcoDesign 家具设计展示图，点击打开在线网站" width="800" />
</a>

在线地址：https://taizhi-shi.github.io/furniture-design/

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
