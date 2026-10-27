import React, { useState } from "react"
import NavBar from "../components/NavBar"
import StepProgressBar from "../components/StepProgressBar"

type LifecycleParametersPageProps = {
  onBack: () => void
  onNext?: () => void
}

type MaintenanceItem = {
  id: number
  component: string
  interval: string
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
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [disassemblable, setDisassemblable] = useState(true)
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([])
  const [transportMode, setTransportMode] = useState("卡车运输（16–32 吨）")
  const [distance, setDistance] = useState("500")
  const [loadRate, setLoadRate] = useState("75")
  const [fuel, setFuel] = useState("柴油")
  const [returnTrip, setReturnTrip] = useState("是（有回程）")
  const [life, setLife] = useState("10")
  const [scene, setScene] = useState("室内（家庭/办公）")
  const [frequency, setFrequency] = useState("正常使用")
  const [cleaning, setCleaning] = useState("湿布擦拭")
  const [cleanerAmount, setCleanerAmount] = useState("0.05")
  const [cleaningFrequency, setCleaningFrequency] = useState("2")
  const [disposal, setDisposal] = useState("回收利用")
  const [recycleRate, setRecycleRate] = useState("65")
  const [landfillRate, setLandfillRate] = useState("10")
  const [incinerationRate, setIncinerationRate] = useState("25")
  const [energy, setEnergy] = useState("0.20")

  const addMaintenanceItem = () => {
    setMaintenanceItems((items) => [...items, { id: Date.now(), component: "", interval: "" }])
  }

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
            <CardHeader type="transport" title="运输过程参数" />
            <div className="lifecycle-grid lifecycle-grid--three">
              <SelectField label="运输方式" required value={transportMode} onChange={setTransportMode} options={["卡车运输（16–32 吨）", "铁路运输", "海运", "空运"]} />
              <NumberField label="运输距离" required value={distance} onChange={setDistance} unit="km" />
              <NumberField label="载重利用率" required value={loadRate} onChange={setLoadRate} unit="%" />
            </div>
            <div className="lifecycle-grid lifecycle-grid--two lifecycle-row-gap">
              <SelectField label="燃料类型" required value={fuel} onChange={setFuel} options={["柴油", "汽油", "生物柴油", "电力"]} />
              <SelectField label="是否回程" value={returnTrip} onChange={setReturnTrip} options={["是（有回程）", "否（无回程）"]} />
            </div>
            <div className="lifecycle-advanced">
              <button className="lifecycle-expand-button" onClick={() => setAdvancedOpen((open) => !open)} aria-expanded={advancedOpen}>
                <span>高级参数（可选）</span>
                <ChevronIcon open={advancedOpen} />
              </button>
              {advancedOpen && (
                <div className="lifecycle-advanced-content">
                  <NumberField label="空驶距离" value="0" onChange={() => undefined} unit="km" />
                  <NumberField label="冷链能耗" value="0" onChange={() => undefined} unit="kWh" />
                </div>
              )}
            </div>
          </article>

          <article className="lifecycle-card">
            <CardHeader type="use" title="使用阶段参数" />
            <div className="lifecycle-grid lifecycle-grid--three">
              <NumberField label="产品使用寿命" required value={life} onChange={setLife} unit="年" />
              <SelectField label="使用场景" required value={scene} onChange={setScene} options={["室内（家庭/办公）", "室内（商业）", "半户外", "户外"]} />
              <SelectField label="使用频率" value={frequency} onChange={setFrequency} options={["低频使用", "正常使用", "高频使用"]} />
            </div>

            <div className="lifecycle-inset lifecycle-inset--cleaning">
              <div className="lifecycle-grid lifecycle-grid--three">
                <SelectField label="清洁方式" value={cleaning} onChange={setCleaning} options={["湿布擦拭", "干布擦拭", "吸尘", "专业清洗"]} />
                <NumberField label="清洁剂用量" value={cleanerAmount} onChange={setCleanerAmount} unit="L/次" step="0.01" />
                <NumberField label="清洁频率" value={cleaningFrequency} onChange={setCleaningFrequency} unit="次/月" />
              </div>
            </div>
            <div className="lifecycle-inset lifecycle-maintenance">
              <span className="lifecycle-inset-title">维护更换部件（如有）</span>
              {maintenanceItems.map((item, index) => (
                <div className="lifecycle-maintenance-row" key={item.id}>
                  <input
                    aria-label={`维护项 ${index + 1} 部件名称`}
                    placeholder="部件名称"
                    value={item.component}
                    onChange={(event) => setMaintenanceItems((items) => items.map((entry) => entry.id === item.id ? { ...entry, component: event.target.value } : entry))}
                  />
                  <input
                    aria-label={`维护项 ${index + 1} 更换周期`}
                    placeholder="更换周期（年）"
                    type="number"
                    min="0"
                    value={item.interval}
                    onChange={(event) => setMaintenanceItems((items) => items.map((entry) => entry.id === item.id ? { ...entry, interval: event.target.value } : entry))}
                  />
                  <button aria-label="删除维护项" onClick={() => setMaintenanceItems((items) => items.filter((entry) => entry.id !== item.id))}>×</button>
                </div>
              ))}
              <button className="lifecycle-add-button" onClick={addMaintenanceItem}>＋ 添加维护项</button>
            </div>
          </article>

          <article className="lifecycle-card">
            <CardHeader type="waste" title="废弃阶段参数" />
            <div className="lifecycle-grid lifecycle-grid--two-equal">
              <SelectField label="处置方式" required value={disposal} onChange={setDisposal} options={["回收利用", "综合处置", "焚烧发电", "填埋"]} />
              <NumberField label="回收率" required value={recycleRate} onChange={setRecycleRate} unit="%" />
              <div className="lifecycle-row-gap">
                <NumberField label="填埋率" value={landfillRate} onChange={setLandfillRate} unit="%" />
              </div>
              <div className="lifecycle-row-gap">
              <NumberField label="焚烧率" value={incinerationRate} onChange={setIncinerationRate} unit="%" />
              </div>
            </div>
            <div className="lifecycle-ratio-note">
              处理比例合计：{Number(recycleRate || 0) + Number(landfillRate || 0) + Number(incinerationRate || 0)}%
            </div>
            <div className="lifecycle-inset lifecycle-disassembly">
              <span className="lifecycle-inset-title">拆解假设</span>
              <label className="lifecycle-checkbox-row">
                <input type="checkbox" checked={disassemblable} onChange={(event) => setDisassemblable(event.target.checked)} />
                <span>可拆解设计</span>
                <span className="lifecycle-muted-info" title="产品在寿命结束时可由常规工具拆解"><InfoIcon /></span>
              </label>
              {disassemblable && (
                <div className="lifecycle-energy-row">
                  <span>拆解能耗</span>
                  <label className="lifecycle-number-wrap">
                    <input type="number" min="0" step="0.01" value={energy} onChange={(event) => setEnergy(event.target.value)} />
                    <span>MJ/件</span>
                  </label>
                </div>
              )}
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
