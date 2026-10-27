import React, { useState } from "react"
import NavBar from "../components/NavBar"
import heroImage from "../imports/lca-report-armchair.png"

type LcaReportPageProps = {
  onBack: () => void
}

type IconName = "leaf" | "energy" | "water" | "flask" | "resource" | "factory" | "truck" | "home" | "recycle"

const metrics = [
  { name: "全球变暖潜势", short: "GWP", value: "48.7", unit: "kg CO₂-eq", tone: "green", width: "88%", icon: "leaf" as IconName, tip: "衡量温室气体在 100 年时间尺度内造成的气候变化影响，以二氧化碳当量表示。" },
  { name: "能源消耗", short: "CED", value: "326.4", unit: "MJ", tone: "orange", width: "76%", icon: "energy" as IconName, tip: "产品全生命周期内消耗的一次能源总量，包括可再生与不可再生能源。" },
  { name: "水资源消耗", short: "Water", value: "2.15", unit: "m³", tone: "blue", width: "81%", icon: "water" as IconName, tip: "产品全生命周期直接与间接消耗的淡水资源总量。" },
  { name: "酸化潜势", short: "AP", value: "0.27", unit: "kg SO₂-eq", tone: "coral", width: "63%", icon: "flask" as IconName, tip: "衡量排放物造成土壤与水体酸化的潜在影响，以二氧化硫当量表示。" },
  { name: "富营养化潜势", short: "EP", value: "0.18", unit: "kg PO₄³⁻-eq", tone: "yellow", width: "55%", icon: "leaf" as IconName, tip: "衡量营养物质排放导致水体富营养化的潜在影响。" },
  { name: "资源消耗（矿产）", short: "ADP minerals", value: "1.25E-03", unit: "kg Sb-eq", tone: "brown", width: "46%", icon: "resource" as IconName, tip: "衡量矿产与金属资源稀缺性消耗，以锑当量表示。" },
]

const lifecycleItems = [
  { name: "材料获取", value: 45, tone: "green", icon: "leaf" as IconName, detail: "橡木与 PU 泡沫贡献了该阶段 82.7% 的排放。" },
  { name: "生产加工", value: 23, tone: "dark-green", icon: "factory" as IconName, detail: "木材干燥、泡沫成型与表面涂装是主要影响过程。" },
  { name: "运输", value: 13, tone: "blue", icon: "truck" as IconName, detail: "按 500 km 柴油卡车运输与 75% 载重利用率计算。" },
  { name: "使用阶段", value: 12, tone: "yellow", icon: "home" as IconName, detail: "包含 10 年使用期内的清洁剂与维护部件消耗。" },
  { name: "废弃处理", value: 7, tone: "orange", icon: "recycle" as IconName, detail: "按 65% 回收、10% 填埋与 25% 焚烧情景计算。" },
]

const materials = [
  { name: "橡木 (Oak)", value: 52.1, color: "#31b878", detail: "25.37 kg CO₂-eq · 主要来自原木获取、干燥与板材加工" },
  { name: "PU 泡沫", value: 30.6, color: "#3295df", detail: "14.90 kg CO₂-eq · 石化原料与发泡工艺是主要来源" },
  { name: "钢 (Steel)", value: 11.8, color: "#f2b842", detail: "5.75 kg CO₂-eq · 包含框架连接件与紧固件" },
  { name: "涂硅纤物", value: 4.2, color: "#70c99d", detail: "2.05 kg CO₂-eq · 包含织物生产与表面处理" },
  { name: "其他", value: 1.3, color: "#aeb5bd", detail: "0.63 kg CO₂-eq · 胶黏剂、包装与辅助材料" },
]

const recommendations = [
  { title: "替换 PU 泡沫为再生泡沫", reduction: "预计减少 8.6 kg CO₂-eq", type: "材料替换", description: "使用含 70% 消费后回收成分的泡沫，保持当前密度和舒适度等级。" },
  { title: "缩短运输距离 500km → 200km", reduction: "预计减少 3.2 kg CO₂-eq", type: "供应链优化", description: "优先匹配 200 km 范围内的木材与泡沫供应商，降低公路运输里程。" },
  { title: "提高木材回收利用率（65% → 85%）", reduction: "预计减少 2.1 kg CO₂-eq", type: "循环设计", description: "采用可逆连接和材料标识，提升寿命结束阶段的木材分离与回收效率。" },
]

function ArrowLeftIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function DownloadIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1.7v7m0 0L4.5 6.2M7 8.7l2.5-2.5M2 9.5v2.3h10V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function DownTrendIcon() {
  return <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true"><path d="M13.8 3.5v9.7m0 0-3-3m3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function MetricIcon({ name }: { name: IconName }) {
  if (name === "energy") return <svg viewBox="0 0 20 20"><path d="m11.2 1.8-6 9h4l-.5 7.4 6.1-9.5h-4.1l.5-6.9Z" fill="currentColor" /></svg>
  if (name === "water") return <svg viewBox="0 0 20 20"><path d="M10 2.2S5.2 8 5.2 11.7a4.8 4.8 0 0 0 9.6 0C14.8 8 10 2.2 10 2.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  if (name === "flask") return <svg viewBox="0 0 20 20"><path d="M7 2.5h6M8.2 2.5v5l-4.3 7.4c-.6 1 .2 2.2 1.3 2.2h9.6c1.1 0 1.9-1.2 1.3-2.2l-4.3-7.4v-5M6.2 13h7.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (name === "resource") return <svg viewBox="0 0 20 20"><path d="m10 2.7 6 3.5v7L10 16.7l-6-3.5v-7l6-3.5Zm0 7 6-3.5M10 9.7 4 6.2m6 3.5v7" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /></svg>
  if (name === "factory") return <svg viewBox="0 0 20 20"><path d="M3 17V8l5 2.5V8l5 2.5V4h3v13H3Zm3-3h2m2 0h2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  if (name === "truck") return <svg viewBox="0 0 20 20"><path d="M2.5 5h10v9h-10V5Zm10 3h2.7l2.3 2.6V14h-5V8ZM5 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  if (name === "home") return <svg viewBox="0 0 20 20"><path d="m2.5 9 7.5-6 7.5 6M5 7.5V17h10V7.5M8 17v-5h4v5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  if (name === "recycle") return <svg viewBox="0 0 20 20"><path d="m8 3 2-1.2L12 5.5 7.5 6 8 3Zm2-1h2.2c.8 0 1.5.4 1.9 1.1l1.3 2.2m.4 1.3 1.8.8-2 4.1-2.5-3.7 2.7-1.2Zm.5 4-1.1 2c-.4.7-1.1 1.1-1.9 1.1H10m-1.5.5-.2 2-4.4-.5 2.2-3.8 2.4 2.3Zm-3.2.1-1.2-2.2a2 2 0 0 1 0-2l1.2-2.1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
  return <svg viewBox="0 0 20 20"><path d="M16.7 3.2C10 3.3 4.8 5.6 4.7 10.5c-.1 2.5 1.8 4.1 4.2 4 4.6-.2 7-5 7.8-11.3Z" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /><path d="M3.2 17c2.2-4.5 5.4-6.9 9.9-8.7" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>
}

function downloadDemo(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function LcaReportPage({ onBack }: LcaReportPageProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0])
  const [activeRecommendation, setActiveRecommendation] = useState<(typeof recommendations)[number] | null>(null)

  const exportLci = () => downloadDemo("EcoDesign-LCI-demo.csv", "阶段,碳排放 kg CO2-eq\n材料获取,21.92\n生产加工,11.20\n运输,6.33\n使用阶段,5.84\n废弃处理,3.41", "text/csv")
  const exportOpenLca = () => downloadDemo("EcoDesign-openLCA-demo.json", JSON.stringify({ product: "Armchair", gwp: 48.7, unit: "kg CO2-eq", demoData: true }, null, 2), "application/json")
  const downloadReport = () => downloadDemo("EcoDesign-LCA-Report-demo.pdf", "EcoDesign LCA Analysis Report\nDEMO DATA\nProduct: Armchair\nEnvironmental score: 68/100\nGWP: 48.7 kg CO2-eq", "application/pdf")

  return (
    <div className="report-page">
      <NavBar />
      <main className="report-shell">
        <header className="report-header">
          <div className="report-title-group">
            <button className="report-back-button" onClick={onBack} aria-label="返回生命周期参数"><ArrowLeftIcon /></button>
            <span className="report-title">分析结果报告</span>
          </div>
          <div className="report-export-actions">
            <button onClick={downloadReport}><DownloadIcon />下载报告 (PDF)</button>
            <button onClick={exportOpenLca}><DownloadIcon />导出 openLCA 文件</button>
            <button onClick={exportLci}><DownloadIcon />导出 LCI 数据</button>
          </div>
        </header>

        <div className="report-content">
          <section className="report-overview">
            <article className="report-hero-card">
              <img src={heroImage} alt="湖泊与山林环境中的现代单人椅" />
              <div className="report-score-card">
                <span>环境评分</span>
                <div><strong>68</strong><small>/100</small></div>
                <b>中等偏低</b>
              </div>
            </article>

            <article className="report-metrics-card">
              <h2>openLCA 计算结果（LCA 指标）</h2>
              <div className="report-metrics-grid">
                {metrics.map((metric) => (
                  <div className="report-metric" key={metric.short} tabIndex={0} data-tooltip={metric.tip}>
                    <div className="report-metric-heading">
                      <div><strong>{metric.name}</strong><span>({metric.short})</span></div>
                      <span className={`report-metric-icon report-tone--${metric.tone}`}><MetricIcon name={metric.icon} /></span>
                    </div>
                    <div className="report-metric-value">{metric.value}</div>
                    <div className="report-metric-unit">{metric.unit}</div>
                    <div className={`report-metric-bar report-tone-bg--${metric.tone}`}><span style={{ width: metric.width }} /></div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="report-analysis-grid">
            <article className="report-analysis-card">
              <div className="report-card-heading"><h2>生命周期贡献分析</h2><span>单位：kg CO₂-eq</span></div>
              <div className="report-lifecycle-chart">
                {lifecycleItems.map((item) => (
                  <div key={item.name}>
                    <button className={expandedStage === item.name ? "report-stage-row report-stage-row--active" : "report-stage-row"} onClick={() => setExpandedStage(expandedStage === item.name ? null : item.name)}>
                      <span className={`report-stage-icon report-tone--${item.tone}`}><MetricIcon name={item.icon} /></span>
                      <span className="report-stage-name">{item.name}</span>
                      <span className="report-stage-track"><span className={`report-tone-solid--${item.tone}`} style={{ width: `${item.value * 1.65}%` }} /></span>
                      <strong>{item.value}%</strong>
                    </button>
                    {expandedStage === item.name && <div className="report-stage-detail">{item.detail}</div>}
                  </div>
                ))}
                <div className="report-axis"><span>0%</span><span>20%</span><span>40%</span><span>60%</span><span>80%</span><span>100%</span></div>
              </div>
            </article>

            <article className="report-analysis-card">
              <div className="report-card-heading"><h2>材料贡献分析</h2><span>单位：kg CO₂-eq</span></div>
              <div className="report-material-body">
                <div className="report-donut" aria-label="材料贡献环形图"><div><strong>{selectedMaterial.value}%</strong><span>{selectedMaterial.name}</span></div></div>
                <div className="report-material-legend">
                  {materials.map((material) => (
                    <button key={material.name} className={selectedMaterial.name === material.name ? "report-material-row report-material-row--active" : "report-material-row"} onClick={() => setSelectedMaterial(material)}>
                      <span style={{ backgroundColor: material.color }} /><span>{material.name}</span><strong>{material.value}%</strong>
                    </button>
                  ))}
                </div>
              </div>
              <div className="report-material-detail">{selectedMaterial.detail}</div>
            </article>

            <article className="report-analysis-card report-recommendations">
              <div className="report-card-heading"><h2>设计优化建议</h2><span>AI · 基于本次 LCA</span></div>
              <div className="report-recommendation-list">
                {recommendations.map((recommendation, index) => (
                  <button key={recommendation.title} onClick={() => setActiveRecommendation(recommendation)}>
                    <span className="report-recommendation-number">{index + 1}</span>
                    <span className="report-recommendation-copy"><strong>{recommendation.title}</strong><small>{recommendation.reduction}</small></span>
                    <span className="report-down-icon"><DownTrendIcon /></span>
                  </button>
                ))}
              </div>
              <div className="report-total-saving"><span>全部应用预计可降低</span><strong>13.9 kg CO₂-eq</strong><b>−28.5%</b></div>
            </article>
          </section>
        </div>
      </main>

      {activeRecommendation && (
        <div className="report-drawer-backdrop" onClick={() => setActiveRecommendation(null)}>
          <aside className="report-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="report-drawer-close" onClick={() => setActiveRecommendation(null)} aria-label="关闭">×</button>
            <span className="report-drawer-eyebrow">{activeRecommendation.type}</span>
            <h2>{activeRecommendation.title}</h2>
            <p>{activeRecommendation.description}</p>
            <div><span>预计环境收益</span><strong>{activeRecommendation.reduction.replace("预计减少 ", "−")}</strong></div>
            <button className="report-drawer-action" onClick={() => setActiveRecommendation(null)}>进入设计优化</button>
          </aside>
        </div>
      )}
    </div>
  )
}
