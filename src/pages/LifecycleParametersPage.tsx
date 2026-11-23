import React, { useState } from "react"
import NavBar from "../components/NavBar"
import StepProgressBar from "../components/StepProgressBar"

type LifecycleParametersPageProps = {
  onBack: () => void
  onNext?: () => void
}

type WasteItem = {
  id: number
  material: string
  massKg: string
  treatment: string
  mapped: boolean
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7.5 6.6v4M7.5 4.25v.1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ open = false }: { open?: boolean }) {
  return (
    <svg className={open ? "lifecycle-chevron lifecycle-chevron--open" : "lifecycle-chevron"} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="m3 5 3.5 3.5L10 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path d="M2.3 4h9.2v9H2.3V4Zm9.2 3h2.7l2.4 2.7V13h-5.1V7Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
      <circle cx="5.1" cy="13.6" r="1.35" fill="white" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="14.2" cy="13.6" r="1.35" fill="white" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path d="M15.8 3.2C9.4 3.3 4.5 5.5 4.4 10.1c-.1 2.4 1.7 4 4 3.9 4.4-.2 6.6-4.7 7.4-10.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M3.1 15.8c2.1-4.2 5.1-6.5 9.4-8.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function RecycleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path d="m8 3 1.6-1.2L12 5.6 7.4 6l.6-3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9.7 3.7h2.2c.7 0 1.3.4 1.7 1l1.2 2.1M15.3 8l1.8.9-2.2 4.1-2.3-3.9 2.7-1.1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m15.3 11.8-1 1.8c-.4.7-1.1 1.1-1.9 1.1H10M8.6 15.2 8.4 17l-4.6-.5 2.4-3.8 2.4 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.2 15.2 4 13.3a2 2 0 0 1 0-2.1l1.1-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function SelectField({
  label,
  value,
  options,
  required,
  onChange,
  className = "",
}: {
  label: string
  value: string
  options: string[]
  required?: boolean
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <label className={`lifecycle-field ${className}`}>
      <span className="lifecycle-label">
        {label} {required && <b>*</b>}
      </span>
      <span className="lifecycle-select-wrap">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <ChevronIcon />
      </span>
    </label>
  )
}

function NumberField({
  label,
  value,
  unit,
  required,
  step,
  onChange,
}: {
  label: string
  value: string
  unit: string
  required?: boolean
  step?: string
  onChange: (value: string) => void
}) {
  return (
    <label className="lifecycle-field">
      <span className="lifecycle-label">
        {label} {required && <b>*</b>}
      </span>
      <span className="lifecycle-number-wrap">
        <input type="number" min="0" step={step} value={value} onChange={(event) => onChange(event.target.value)} />
        <span>{unit}</span>
      </span>
    </label>
  )
}

function CardHeader({
  type,
  title,
  children,
}: {
  type: "transport" | "use" | "waste"
  title: string
  children?: React.ReactNode
}) {
  const icons = { transport: <TruckIcon />, use: <LeafIcon />, waste: <RecycleIcon /> }
  return (
    <div className="lifecycle-card-header">
      <div className={`lifecycle-card-icon lifecycle-card-icon--${type}`}>{icons[type]}</div>
      <span className="lifecycle-card-title">{title}</span>
      {children}
    </div>
  )
}

export default function LifecycleParametersPage({ onBack, onNext }: LifecycleParametersPageProps) {
  const [transportMode, setTransportMode] = useState("公路货运（卡车）")
  const [distance, setDistance] = useState("500")
  const [transportMass, setTransportMass] = useState("11.02")
  const [life, setLife] = useState("10")
  const [scene, setScene] = useState("室内（家庭）")
  const [cleaning, setCleaning] = useState("湿布擦拭")
  const [cleaningWater, setCleaningWater] = useState("0.25")
  const [cleaningFrequency, setCleaningFrequency] = useState("12")
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([
    { id: 1, material: "涂饰橡木", massKg: "6.65", treatment: "待匹配", mapped: false },
    { id: 2, material: "胶合板组件", massKg: "1.72", treatment: "待匹配", mapped: false },
    { id: 3, material: "PU 泡沫", massKg: "1.50", treatment: "废物处理（100%）", mapped: true },
    { id: 4, material: "聚酯织物", massKg: "0.90", treatment: "焚烧处理（100%）", mapped: true },
    { id: 5, material: "钢连接件", massKg: "0.25", treatment: "填埋处理（100%）", mapped: true },
  ])
  const transportDemand = ((Number(transportMass) || 0) * (Number(distance) || 0) / 1000).toFixed(2)

  return (
    <div className="lifecycle-page">
      <NavBar />
      <main className="lifecycle-shell">
        <div className="lifecycle-page-header">
          <div className="lifecycle-title-group">
            <button className="lifecycle-icon-button" onClick={onBack} aria-label="返回工艺识别">
              <ArrowLeftIcon />
            </button>
            <span className="lifecycle-page-title">生命周期参数输入</span>
          </div>
        </div>

        <section className="lifecycle-cards" aria-label="生命周期参数">
          <article className="lifecycle-card">
            <CardHeader type="transport" title="运输过程参数">
              <span className="lifecycle-stage-status lifecycle-stage-status--mapped">✓ 已映射</span>
            </CardHeader>
            <div className="lifecycle-grid lifecycle-grid--two-equal">
              <SelectField label="运输方式" required value={transportMode} onChange={setTransportMode} options={["公路货运（卡车）", "铁路货运", "海运", "空运"]} />
              <NumberField label="运输距离" required value={distance} onChange={setDistance} unit="km" />
            </div>
            <div className="lifecycle-grid lifecycle-grid--two-equal lifecycle-row-gap">
              <NumberField label="运输质量" required value={transportMass} onChange={setTransportMass} unit="kg" step="0.01" />
              <div className="lifecycle-field">
                <span className="lifecycle-label">运输需求（自动计算）</span>
                <div className="lifecycle-calculated-field">
                  <strong>{transportDemand} t·km</strong>
                  <span title="运输需求 = 运输质量 × 运输距离"><InfoIcon /></span>
                </div>
              </div>
            </div>
          </article>

          <article className="lifecycle-card">
            <CardHeader type="use" title="使用阶段参数">
              <span className="lifecycle-stage-status lifecycle-stage-status--baseline">U0 基准情景</span>
            </CardHeader>
            <div className="lifecycle-grid lifecycle-grid--two-equal">
              <NumberField label="产品使用寿命" required value={life} onChange={setLife} unit="年" />
              <SelectField label="使用场景" required value={scene} onChange={setScene} options={["室内（家庭）", "室内（办公）", "室内（商业）", "半户外", "户外"]} />
            </div>
            <div className="lifecycle-row-gap">
              <div className="lifecycle-grid lifecycle-grid--three">
                <NumberField label="清洁频率" required value={cleaningFrequency} onChange={setCleaningFrequency} unit="次/年" />
                <NumberField label="单次用水量" required value={cleaningWater} onChange={setCleaningWater} unit="L/次" step="0.01" />
                <SelectField label="清洁方式" value={cleaning} onChange={setCleaning} options={["湿布擦拭", "干布擦拭", "吸尘", "专业清洗"]} />
              </div>
            </div>
          </article>

          <article className="lifecycle-card">
            <CardHeader type="waste" title="废弃阶段参数">
              <span className="lifecycle-stage-status lifecycle-stage-status--partial">部分映射</span>
            </CardHeader>
            <div className="lifecycle-waste-table">
              <div className="lifecycle-waste-row lifecycle-waste-row--header">
                <span>材料组件</span><span>质量 (kg)</span><span>处理方式（含比例）</span><span>数据库映射</span>
              </div>
              {wasteItems.map((item) => (
                <div className="lifecycle-waste-row" key={item.id}>
                  <strong>{item.material}</strong>
                  <span>{item.massKg}</span>
                  <span className="lifecycle-waste-select">
                    <select
                      value={item.treatment}
                      onChange={(event) => setWasteItems((items) => items.map((entry) => entry.id === item.id ? { ...entry, treatment: event.target.value, mapped: event.target.value !== "待匹配" } : entry))}
                    >
                      <option>待匹配</option>
                      <option>废物处理（100%）</option>
                      <option>焚烧处理（100%）</option>
                      <option>填埋处理（100%）</option>
                    </select>
                    <ChevronIcon />
                  </span>
                  <span className="lifecycle-mapping-cell">
                    <span className={item.mapped ? "lifecycle-mapping lifecycle-mapping--done" : "lifecycle-mapping lifecycle-mapping--pending"}>
                      {item.mapped ? "✓ 已映射" : "待匹配"}
                    </span>
                    <button title={item.mapped ? "查看数据库映射说明" : "该材料尚未完成数据库匹配"}><InfoIcon /></button>
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <div className="lifecycle-actions">
          <button className="lifecycle-primary-button" onClick={onNext}>下一步：进行 LCA 分析</button>
        </div>
        <StepProgressBar currentStep={4} />
      </main>
    </div>
  )
}
