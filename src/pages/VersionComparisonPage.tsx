import React, { useMemo, useState } from "react"
import NavBar from "../components/NavBar"

type MetricKey = "gwp" | "fdp" | "wdp" | "ap" | "ep" | "adp"

type HistoricalVersion = {
  id: string
  project: string
  version: string
  boundary: string
  createdAt: string
  metrics: Record<MetricKey, number>
}

const HISTORICAL_VERSIONS: HistoricalVersion[] = [
  {
    id: "elegant-v1",
    project: "Elegant Chair",
    version: "V1 · 材料与制造",
    boundary: "材料 + 制造",
    createdAt: "2024-12-15",
    metrics: { gwp: 23.59058, fdp: 323.6, wdp: 0.1846, ap: 0.0719, ep: 0.0482, adp: 0.0012 },
  },
  {
    id: "elegant-v2",
    project: "Elegant Chair",
    version: "V2 · 增加运输",
    boundary: "材料 + 制造 + 运输",
    createdAt: "2024-12-28",
    metrics: { gwp: 24.58496, fdp: 336.7, wdp: 0.1856, ap: 0.0748, ep: 0.0501, adp: 0.00125 },
  },
  {
    id: "elegant-v3",
    project: "Elegant Chair",
    version: "V3 Partial · 部分废弃",
    boundary: "材料 + 制造 + 运输 + 使用 + 废弃（部分）",
    createdAt: "2025-01-20",
    metrics: { gwp: 25.10342, fdp: 342.2, wdp: 0.1912, ap: 0.0762, ep: 0.0514, adp: 0.00129 },
  },
  {
    id: "rattan-v1",
    project: "Rattan Stool",
    version: "V1 · 基准情景",
    boundary: "材料 + 制造 + 使用",
    createdAt: "2024-11-30",
    metrics: { gwp: 18.46, fdp: 280.4, wdp: 0.142, ap: 0.058, ep: 0.039, adp: 0.00098 },
  },
]

const METRICS: Array<{ key: MetricKey; name: string; short: string; tone: string; icon: "leaf" | "energy" | "water" | "flask" | "resource" }> = [
  { key: "gwp", name: "气候变化", short: "GWP", tone: "green", icon: "leaf" },
  { key: "fdp", name: "化石资源消耗", short: "FDP", tone: "orange", icon: "energy" },
  { key: "wdp", name: "水资源消耗", short: "WDP", tone: "blue", icon: "water" },
  { key: "ap", name: "酸化潜势", short: "AP", tone: "coral", icon: "flask" },
  { key: "ep", name: "富营养化潜势", short: "EP", tone: "green", icon: "leaf" },
  { key: "adp", name: "资源消耗（矿产）", short: "ADP", tone: "brown", icon: "resource" },
]

function MetricIcon({ name }: { name: "leaf" | "energy" | "water" | "flask" | "resource" }) {
  if (name === "energy") return <svg viewBox="0 0 20 20"><path d="m11.2 1.8-6 9h4l-.5 7.4 6.1-9.5h-4.1l.5-6.9Z" fill="currentColor" /></svg>
  if (name === "water") return <svg viewBox="0 0 20 20"><path d="M10 2.2S5.2 8 5.2 11.7a4.8 4.8 0 0 0 9.6 0C14.8 8 10 2.2 10 2.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  if (name === "flask") return <svg viewBox="0 0 20 20"><path d="M7 2.5h6M8.2 2.5v5l-4.3 7.4c-.6 1 .2 2.2 1.3 2.2h9.6c1.1 0 1.9-1.2 1.3-2.2l-4.3-7.4v-5M6.2 13h7.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (name === "resource") return <svg viewBox="0 0 20 20"><path d="m10 2.7 6 3.5v7L10 16.7l-6-3.5v-7l6-3.5Zm0 7 6-3.5M10 9.7 4 6.2m6 3.5v7" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /></svg>
  return <svg viewBox="0 0 20 20"><path d="M16.7 3.2C10 3.3 4.8 5.6 4.7 10.5c-.1 2.5 1.8 4.1 4.2 4 4.6-.2 7-5 7.8-11.3Z" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" /><path d="M3.2 17c2.2-4.5 5.4-6.9 9.9-8.7" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>
}

function InfoCircleIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2" /><path d="M7.5 6.5v4M7.5 4.2h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
}

function ComparisonChartIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2.5 15.5V10h3v5.5m1.7 0V5.5h3v10m1.7 0V2.5h3v13M1.5 15.5h15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function TargetIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="9" cy="9" r="1" fill="currentColor" /></svg>
}

function ChevronDownIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function formatValue(key: MetricKey, value: number) {
  if (key === "adp") return value.toExponential(2).replace("e", "E")
  if (key === "fdp") return value.toFixed(1)
  if (key === "gwp") return value.toFixed(5)
  return value.toFixed(4)
}

function formatChange(key: MetricKey, value: number) {
  const sign = value >= 0 ? "+" : "−"
  const absolute = Math.abs(value)
  if (key === "adp") return `${sign}${absolute.toExponential(1).replace("e", "E")}`
  if (key === "fdp") return `${sign}${absolute.toFixed(1)}`
  if (key === "gwp") return `${sign}${absolute.toFixed(5)}`
  return `${sign}${absolute.toFixed(4)}`
}

export default function VersionComparisonPage() {
  const [baseId, setBaseId] = useState("elegant-v1")
  const [targetId, setTargetId] = useState("elegant-v2")
  const base = HISTORICAL_VERSIONS.find((version) => version.id === baseId) ?? HISTORICAL_VERSIONS[0]
  const target = HISTORICAL_VERSIONS.find((version) => version.id === targetId) ?? HISTORICAL_VERSIONS[1]

  const comparison = useMemo(() => METRICS.map((metric) => {
    const baseValue = base.metrics[metric.key]
    const targetValue = target.metrics[metric.key]
    const change = targetValue - baseValue
    const rate = baseValue === 0 ? 0 : change / baseValue * 100
    return { ...metric, baseValue, targetValue, change, rate }
  }), [base, target])

  const climate = comparison[0]
  const increasedCount = comparison.filter((metric) => metric.change > 0).length
  const trend = climate.change >= 0 ? "增加" : "降低"

  return (
    <div className="comparison-page">
      <NavBar />
      <main className="comparison-shell">
        <section className="report-version-section">
          <article className="report-version-summary">
            <div className="comparison-summary-top">
              <div className="report-version-summary-heading">版本对比（气候变化） <InfoCircleIcon /></div>
              <div className="comparison-selectors">
                <label aria-label="基准版本"><span className="comparison-select-wrap"><select value={baseId} onChange={(event) => setBaseId(event.target.value)}>{HISTORICAL_VERSIONS.map((version) => <option key={version.id} value={version.id}>{version.project} · {version.version}</option>)}</select><ChevronDownIcon /></span></label>
                <span>对比</span>
                <label aria-label="对比版本"><span className="comparison-select-wrap"><select value={targetId} onChange={(event) => setTargetId(event.target.value)}>{HISTORICAL_VERSIONS.map((version) => <option key={version.id} value={version.id}>{version.project} · {version.version}</option>)}</select><ChevronDownIcon /></span></label>
              </div>
            </div>
            <div className="report-version-summary-body">
              <div><span>{base.version.split(" · ")[0]}</span><strong>{formatValue("gwp", climate.baseValue)}</strong><small>kg CO₂-eq</small></div>
              <span className="report-version-arrow">→</span>
              <div><span>{target.version.split(" · ")[0]}</span><strong>{formatValue("gwp", climate.targetValue)}</strong><small>kg CO₂-eq</small></div>
              <div className={climate.rate >= 0 ? "report-version-change" : "report-version-change comparison-change--decrease"}><strong>{climate.rate >= 0 ? "+" : "−"}{Math.abs(climate.rate).toFixed(2)}%</strong><span>({formatChange("gwp", climate.change)} kg CO₂-eq)</span></div>
            </div>
          </article>

          <div className="report-version-grid">
            <article className="report-version-table-card">
              <header className="report-version-heading">
                <div><ComparisonChartIcon /><h2>版本对比分析</h2></div>
                <p>比较历史报告的系统边界与环境影响结果（{base.version}；{target.version}）</p>
              </header>
              <div className="report-version-table">
                <div className="report-version-row report-version-row--header">
                  <span>环境影响指标（ReCiPe 2016 H）</span><span>{base.version.split(" · ")[0]} 结果</span><span>{target.version.split(" · ")[0]} 结果</span><span>变化量</span><span>变化率</span>
                </div>
                {comparison.map((item) => (
                  <div className="report-version-row" key={item.short}>
                    <span className="report-version-indicator"><i className={`report-tone--${item.tone}`}><MetricIcon name={item.icon} /></i>{item.name}（{item.short}）</span>
                    <span>{formatValue(item.key, item.baseValue)}</span><span>{formatValue(item.key, item.targetValue)}</span><strong className={item.change < 0 ? "comparison-negative" : ""}>{formatChange(item.key, item.change)}</strong><strong className={item.rate < 0 ? "comparison-negative" : ""}>{item.rate >= 0 ? "+" : "−"}{Math.abs(item.rate).toFixed(2)}%</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="report-version-conclusion">
              <div className="report-version-conclusion-title"><span><TargetIcon /></span><h2>版本对比结论</h2></div>
              <ul>
                <li>相比 {base.version.split(" · ")[0]}，{target.version.split(" · ")[0]} 在 {increasedCount} 个环境影响指标上有所增加，其中气候变化{trend} {Math.abs(climate.change).toFixed(5)} kg CO₂-eq（{climate.rate >= 0 ? "+" : "−"}{Math.abs(climate.rate).toFixed(2)}%）。</li>
                <li>基准边界：{base.boundary}；对比边界：{target.boundary}。</li>
                <li>本次对比基于历史报告中的 DEMO DATA，结果用于观察系统边界变化，<mark>并非设计优化效果。</mark></li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}
