import React, { useState } from "react"
import NavBar from "../components/NavBar"
import StepProgressBar from "../components/StepProgressBar"
import {
  fileToModelInfo,
  type ModelInfo,
  DEMO_BASIC_INFO,
  type BasicInfo,
  ITEM_TYPE_OPTIONS,
  DESIGN_STYLE_OPTIONS,
  USE_SCENE_OPTIONS,
  PRIMARY_USE_OPTIONS,
} from "../data/demoData"

// ─── Toolbar Icons ────────────────────────────────────────────────────────────

function IconCube() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2L15.5 5.75v7.5L9 17 2.5 13.25V5.75L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M9 2v7.5M2.5 5.75L9 9.5l6.5-3.75" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function IconOrbit() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M15.5 9A6.5 6.5 0 1 1 9 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9 1v4.5h4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFullscreen() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2 2h4.5M2 2v4.5M16 2h-4.5M16 2v4.5M2 16h4.5M2 16v-4.5M16 16h-4.5M16 16v-4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.58 3.58l1.42 1.42M12.99 12.99l1.42 1.42M14.42 3.58l-1.42 1.42M5.01 12.99l-1.42 1.42" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M9 2l2 2-7 7H2v-2L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── XYZ Coordinate Axes ─────────────────────────────────────────────────────

function CoordinateAxes() {
  return (
    <svg width="58" height="52" viewBox="0 0 58 52" fill="none" aria-label="XYZ coordinate axes">
      <circle cx="18" cy="40" r="2.5" fill="#9CA3AF" />
      <line x1="18" y1="37" x2="18" y2="8" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 16 18 8l3.5 8" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="22" y="12" fill="#22C55E" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="500">Y</text>
      <line x1="20" y1="41" x2="48" y2="50" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M43 44.5l5 5.5-7 .5" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="50" y="46" fill="#EF4444" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="500">X</text>
    </svg>
  )
}

// ─── Form field components ────────────────────────────────────────────────────

const LABEL_STYLE: React.CSSProperties = {
  width: "72px",
  flexShrink: 0,
  fontSize: "13px",
  color: "#9CA3AF",
  fontFamily: "Inter, sans-serif",
  paddingTop: "10px",
}

const INPUT_BASE: React.CSSProperties = {
  flex: 1,
  fontSize: "13px",
  fontFamily: "Inter, sans-serif",
  color: "#111827",
  backgroundColor: "#ffffff",
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  padding: "9px 12px",
  outline: "none",
  transition: "border-color 150ms",
  width: "100%",
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
      <span style={LABEL_STYLE}>{label}</span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

function StyledSelect({
  value,
  options,
  disabled,
  onChange,
}: {
  value: string
  options: string[]
  disabled: boolean
  onChange: (v: string) => void
}) {
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...INPUT_BASE,
          appearance: "none",
          WebkitAppearance: "none",
          paddingRight: "36px",
          cursor: "pointer",
          backgroundColor: "#ffffff",
          color: "#111827",
        }}
        onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = "#9CA3AF" }}
        onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = "#E5E7EB" }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "#9CA3AF",
      }}>
        <IconChevronDown />
      </span>
    </div>
  )
}

// ─── Right Panel: 基础信息分析 ──────────────────────────────────────────────────

interface BasicInfoPanelProps {
  modelInfo: ModelInfo
  onNext?: () => void
}

function BasicInfoPanel({ modelInfo, onNext }: BasicInfoPanelProps) {
  const [form, setForm] = useState<BasicInfo>({
    ...DEMO_BASIC_INFO,
    modelName: modelInfo.name.replace(/\.[^.]+$/, ""),
  })

  const update = (key: keyof BasicInfo) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))


  return (
    <div
      style={{
        width: "360px",
        flexShrink: 0,
        backgroundColor: "#ffffff",
        borderLeft: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "28px 24px 20px",
      }}
    >
      {/* Panel title */}
      <h2 style={{
        fontSize: "16px",
        fontWeight: 600,
        color: "#111827",
        margin: "0 0 4px",
        fontFamily: "Inter, sans-serif",
      }}>
        基础信息分析
      </h2>
      <p style={{
        fontSize: "12px",
        color: "#9CA3AF",
        margin: "0 0 24px",
        fontFamily: "Inter, sans-serif",
      }}>
        系统识别结果，支持您进行修改
      </p>


      {/* Form fields */}
      <div>
        {/* 模型名称 */}
        <FormRow label="模型名称">
          <input
            type="text"
            value={form.modelName}
            readOnly={false}
            onChange={(e) => update("modelName")(e.target.value)}
            style={{
              ...INPUT_BASE,
              backgroundColor: "#ffffff",
              cursor: "text",
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#9CA3AF" }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E5E7EB" }}
          />
        </FormRow>

        {/* 物品类型 */}
        <FormRow label="物品类型">
          <StyledSelect
            value={form.itemType}
            options={ITEM_TYPE_OPTIONS}
            disabled={false}
            onChange={update("itemType")}
          />
        </FormRow>

        {/* 设计风格 */}
        <FormRow label="设计风格">
          <StyledSelect
            value={form.designStyle}
            options={DESIGN_STYLE_OPTIONS}
            disabled={false}
            onChange={update("designStyle")}
          />
        </FormRow>

        {/* 使用场景 */}
        <FormRow label="使用场景">
          <StyledSelect
            value={form.useScene}
            options={USE_SCENE_OPTIONS}
            disabled={false}
            onChange={update("useScene")}
          />
        </FormRow>

        {/* 主要用途 */}
        <FormRow label="主要用途">
          <StyledSelect
            value={form.primaryUse}
            options={PRIMARY_USE_OPTIONS}
            disabled={false}
            onChange={update("primaryUse")}
          />
        </FormRow>

      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Save & continue */}
      <button
        style={{
          width: "100%",
          height: "48px",
          backgroundColor: "#111111",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
          transition: "background-color 150ms",
        }}
        onClick={onNext}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1F2937" }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111111" }}
      >
        下一步：材料识别
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface AnalysisUploadPageProps {
  file?: File | null
  onBack: () => void
  onNext?: () => void
}

export default function AnalysisUploadPage({ file, onBack, onNext }: AnalysisUploadPageProps) {
  const modelInfo: ModelInfo = file ? fileToModelInfo(file) : {
    name: "armchair_model.glb",
    format: "GLB",
    size: "2.4 MB",
    faces: "128,456",
    vertices: "64,213",
    uploadTime: "2024-06-05 14:30",
  }

  const [activeToolIcon, setActiveToolIcon] = useState<number | null>(null)

  const toolIcons = [
    { Icon: IconCube, title: "3D视图" },
    { Icon: IconOrbit, title: "旋转视角" },
    { Icon: IconFullscreen, title: "全屏" },
    { Icon: IconSettings, title: "设置" },
  ]

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>
      <NavBar />

      <div style={{
        flex: 1,
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Page header */}
        <div style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: "10px",
          flexShrink: 0,
        }}>
          <button
            onClick={onBack}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              color: "#374151",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#111111" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#374151" }}
            aria-label="返回"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#111827",
            fontFamily: "Inter, sans-serif",
          }}>
            新建分析
          </span>
        </div>

        {/* Main content card */}
        <div style={{
          flex: 1,
          margin: "0 32px",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
        }}>
          {/* Left: 3D Viewer */}
          <div style={{
            flex: 1,
            backgroundColor: "#FAFAFA",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}>
            {/* Toolbar */}
            <div style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}>
              {toolIcons.map(({ Icon, title }, i) => (
                <button
                  key={i}
                  title={title}
                  onClick={() => setActiveToolIcon(activeToolIcon === i ? null : i)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: activeToolIcon === i ? "#111111" : "#9CA3AF",
                    transition: "color 150ms",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (activeToolIcon !== i)
                      (e.currentTarget as HTMLButtonElement).style.color = "#4B5563"
                  }}
                  onMouseLeave={(e) => {
                    if (activeToolIcon !== i)
                      (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF"
                  }}
                >
                  <Icon />
                </button>
              ))}
            </div>

            {/* Interactive chair model */}
            <iframe
              src="https://sketchfab.com/models/2ff7a36d89394e7c8b5e77d8b6ef3290/embed?autostart=1&ui_theme=light&dnt=1"
              title="Elegant Chair 交互式 3D 模型"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />

            {/* XYZ axes */}
            <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
              <CoordinateAxes />
            </div>
          </div>

          {/* Right: Basic Info Panel */}
          <BasicInfoPanel modelInfo={modelInfo} onNext={onNext} />
        </div>

        {/* Step bar */}
        <StepProgressBar currentStep={1} />
      </div>
    </div>
  )
}
