import React, { useState } from "react"
import NavBar from "../components/NavBar"
import StepProgressBar from "../components/StepProgressBar"

import {
  DEMO_COMPONENTS,
  MATERIAL_OPTIONS,
  materialEnToId,
  type FurnitureComponent,
  type MaterialOption,
} from "../data/materialData"

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconCube() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L15.5 5.75v7.5L9 17 2.5 13.25V5.75L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M9 2v7.5M2.5 5.75L9 9.5l6.5-3.75" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function IconOrbit() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M15.5 9A6.5 6.5 0 1 1 9 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9 1v4.5h4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFullscreen() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 2h4.5M2 2v4.5M16 2h-4.5M16 2v4.5M2 16h4.5M2 16v-4.5M16 16h-4.5M16 16v-4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.58 3.58l1.42 1.42M12.99 12.99l1.42 1.42M14.42 3.58l-1.42 1.42M5.01 12.99l-1.42 1.42" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconGear() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 1.2v1.5M7 11.3v1.5M1.2 7h1.5M11.3 7h1.5M3.05 3.05l1.06 1.06M9.9 9.9l1.05 1.06M10.95 3.05l-1.06 1.06M4.11 9.9l-1.06 1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconLines() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── XYZ Axes ─────────────────────────────────────────────────────────────────

function CoordinateAxes() {
  return (
    <svg width="60" height="54" viewBox="0 0 60 54" fill="none" aria-label="XYZ coordinate axes">
      {/* origin dot */}
      <circle cx="18" cy="40" r="2.5" fill="#9CA3AF" />
      {/* Y axis — green, upward */}
      <line x1="18" y1="37" x2="18" y2="8" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 16 18 8l3.5 8" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="22" y="12" fill="#22C55E" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="500">Y</text>
      {/* X axis — red, right-down */}
      <line x1="20" y1="41" x2="50" y2="51" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M44 45.5l6 5.5-7 .5" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="51" y="47" fill="#EF4444" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="500">X</text>
    </svg>
  )
}

// ─── Sidebar Component Item ───────────────────────────────────────────────────

function SidebarItem({
  comp,
  isSelected,
  onClick,
}: {
  comp: FurnitureComponent
  isSelected: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        width: "100%",
        padding: "9px 14px",
        textAlign: "left",
        border: "none",
        borderLeft: isSelected ? "2.5px solid #3B82F6" : "2.5px solid transparent",
        backgroundColor: isSelected ? "#EFF6FF" : hovered ? "#F9FAFB" : "transparent",
        cursor: "pointer",
        transition: "background-color 100ms",
      }}
    >
      {/* Color dot */}
      <div style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: comp.materialColor,
        flexShrink: 0,
        marginTop: "1px",
      }} />

      {/* Labels */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: "13px",
          fontWeight: isSelected ? 600 : 400,
          color: isSelected ? "#2563EB" : "#111827",
          fontFamily: "Inter, sans-serif",
          lineHeight: 1.4,
        }}>
          <span style={{ color: isSelected ? "#93C5FD" : "#9CA3AF", fontWeight: 500, marginRight: "5px" }}>
            {comp.numLabel}
          </span>
          {comp.name}
        </div>
        <div style={{
          fontSize: "11px",
          color: "#9CA3AF",
          fontFamily: "Inter, sans-serif",
          marginTop: "1px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {comp.material}
        </div>
      </div>
    </button>
  )
}

// ─── Viewer Dot ───────────────────────────────────────────────────────────────

function ViewerDot({
  comp,
  isSelected,
  onClick,
}: {
  comp: FurnitureComponent
  isSelected: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${comp.numLabel} ${comp.name}`}
      style={{
        position: "absolute",
        left: `${comp.dotPosition.x}%`,
        top: `${comp.dotPosition.y}%`,
        transform: "translate(-50%, -50%)",
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      {/* Outer ring when selected */}
      {isSelected && (
        <div style={{
          position: "absolute",
          inset: "-5px",
          borderRadius: "50%",
          border: "1.5px solid #3B82F6",
          opacity: 0.5,
          pointerEvents: "none",
        }} />
      )}
      {/* Dot */}
      <div style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: isSelected ? "#3B82F6" : (hovered ? "#6B7280" : "#9CA3AF"),
        border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
        transition: "background-color 100ms",
      }} />
      {/* Tooltip */}
      {(isSelected || hovered) && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 5px)",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: isSelected ? "#2563EB" : "#1F2937",
          color: "white",
          fontSize: "11px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          padding: "3px 8px",
          borderRadius: "4px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}>
          {comp.numLabel} {comp.name}
        </div>
      )}
    </button>
  )
}

// ─── Right Detail Panel ───────────────────────────────────────────────────────

function DetailPanel({
  comp,
  selectedMaterialId,
  onMaterialChange,
  onCancel,
  onSave,
  savedFlash,
  onNext,
}: {
  comp: FurnitureComponent
  selectedMaterialId: string
  onMaterialChange: (id: string) => void
  onCancel: () => void
  onSave: () => void
  savedFlash: boolean
  onNext?: () => void
}) {
  const selectedMat: MaterialOption =
    MATERIAL_OPTIONS.find((m) => m.id === selectedMaterialId) ?? MATERIAL_OPTIONS[0]

  return (
    <div style={{
      width: "500px",
      flexShrink: 0,
      borderLeft: "1px solid #E5E7EB",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      padding: "24px 24px 20px",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Component info block */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "20px",
      }}>
        {/* Blue number badge */}
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#3B82F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>{comp.numLabel}</span>
        </div>
        {/* Name + desc */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>
            {comp.name}
          </div>
          <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "3px", lineHeight: 1.5 }}>
            {comp.description}
          </div>
        </div>
      </div>

      {/* Info grid — 2 rows × 3 columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        rowGap: "16px",
        columnGap: "16px",
        paddingBottom: "20px",
        borderBottom: "1px solid #F3F4F6",
        marginBottom: "22px",
      }}>
        {/* AI识别材料 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>AI识别材料</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: comp.materialColor,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
              {comp.material}
            </span>
          </div>
        </div>

        {/* 类别 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>类别</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
            {comp.category}
          </div>
        </div>

        {/* 识别置信度 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>识别置信度</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
            {comp.confidence}%
          </div>
        </div>

        {/* 质量(估算) */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>质量（估算）</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
            {comp.massKg.toFixed(2)} kg
          </div>
        </div>

        {/* 体积(估算) */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>体积（估算）</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
            {comp.volumeM3} m³
          </div>
        </div>

        {/* 总碳排放(估算) */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>总碳排放（估算）</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
            {comp.carbonKgCO2e} kg CO₂e
          </div>
        </div>
      </div>

      {/* Replace material heading */}
      <div style={{ marginBottom: "14px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#111827", margin: 0 }}>替换材料</h3>
      </div>

      {/* Material swatch row */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "4px",
      }}>
        {MATERIAL_OPTIONS.map((opt) => {
          const isSel = selectedMaterialId === opt.id
          return (
            <MaterialSwatchCard
              key={opt.id}
              opt={opt}
              isSelected={isSel}
              onClick={() => onMaterialChange(opt.id)}
            />
          )
        })}
        {/* Custom material */}
        <CustomSwatchCard />
      </div>

      <div style={{ flex: 1 }} />

      {/* Next step button */}
      <button
        onClick={onNext}
        style={{
          width: "100%",
          height: "56px",
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
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1F2937" }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111111" }}
      >
        下一步：工艺识别
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

// ─── Material Swatch Card ─────────────────────────────────────────────────────

function MaterialSwatchCard({
  opt,
  isSelected,
  onClick,
}: {
  opt: MaterialOption
  isSelected: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        border: isSelected ? "2px solid #3B82F6" : "1px solid #E5E7EB",
        borderRadius: "10px",
        padding: isSelected ? "11px 7px" : "12px 8px",
        cursor: "pointer",
        backgroundColor: hovered && !isSelected ? "#F9FAFB" : "#ffffff",
        transition: "border-color 100ms, background-color 100ms",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        position: "relative",
        textAlign: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Blue checkmark badge top-right */}
      {isSelected && (
        <div style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#3B82F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M2 4.5l1.8 1.8 3.5-3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {/* Circle swatch */}
      <div style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: opt.swatchColor,
        flexShrink: 0,
      }} />
      {/* Labels */}
      <div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{opt.nameZh}</div>
        <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>{opt.nameEn}</div>
      </div>
    </button>
  )
}

function CustomSwatchCard() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        border: "1px dashed #D1D5DB",
        borderRadius: "10px",
        padding: "12px 8px",
        cursor: "pointer",
        backgroundColor: hovered ? "#F9FAFB" : "#ffffff",
        transition: "border-color 100ms, background-color 100ms",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "Inter, sans-serif",
        color: "#9CA3AF",
      }}
    >
      <div style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1.5px dashed #D1D5DB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#D1D5DB",
      }}>
        <IconPlus />
      </div>
      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>自定义材料</div>
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface MaterialRecognitionPageProps {
  onBack: () => void
  onNext?: () => void
}

export default function MaterialRecognitionPage({ onBack, onNext }: MaterialRecognitionPageProps) {
  const [selectedId, setSelectedId] = useState<number>(1)
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeToolIcon, setActiveToolIcon] = useState<number | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)

  // Per-component material selections
  const [componentMaterials, setComponentMaterials] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {}
    DEMO_COMPONENTS.forEach((c) => { init[c.id] = materialEnToId(c.materialEn) })
    return init
  })
  const [savedMaterials, setSavedMaterials] = useState<Record<number, string>>({ ...componentMaterials })

  const comp = DEMO_COMPONENTS.find((c) => c.id === selectedId) ?? DEMO_COMPONENTS[0]

  const handleMaterialChange = (matId: string) => {
    setComponentMaterials((prev) => ({ ...prev, [selectedId]: matId }))
    setSavedFlash(false)
  }

  const handleCancel = () => {
    setComponentMaterials((prev) => ({ ...prev, [selectedId]: savedMaterials[selectedId] }))
    setSavedFlash(false)
  }

  const handleSave = () => {
    setSavedMaterials((prev) => ({ ...prev, [selectedId]: componentMaterials[selectedId] }))
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 2000)
  }

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
          justifyContent: "space-between",
          padding: "0 32px",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            <span style={{ fontSize: "15px", fontWeight: 500, color: "#111827" }}>材料识别</span>
          </div>

        </div>

        {/* Main card */}
        <div style={{
          flex: 1,
          margin: "0 32px",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
        }}>
          {/* ─── Left: Viewer area ──────────────────────────────────── */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}>
            {/* Viewer header */}
            <div style={{
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              borderBottom: "1px solid #F3F4F6",
              flexShrink: 0,
            }}>
              <div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginRight: "10px" }}>
                  3D 模型预览
                </span>
                <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                  点击模型部件查看材料识别结果
                </span>
              </div>
              {/* Toolbar */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
            </div>

            {/* Viewer body = sidebar + canvas */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
              {/* Sidebar */}
              {showSidebar && (
                <div style={{
                  width: "170px",
                  flexShrink: 0,
                  borderRight: "1px solid #F3F4F6",
                  backgroundColor: "#FAFAFA",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}>
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    {DEMO_COMPONENTS.map((c) => (
                      <SidebarItem
                        key={c.id}
                        comp={c}
                        isSelected={c.id === selectedId}
                        onClick={() => setSelectedId(c.id)}
                      />
                    ))}
                  </div>
                  {/* Hide sidebar button — pinned at bottom of sidebar */}
                  <div style={{ borderTop: "1px solid #F3F4F6", padding: "8px 10px" }}>
                    <button
                      onClick={() => setShowSidebar(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        fontSize: "12px",
                        color: "#374151",
                        fontFamily: "Inter, sans-serif",
                        cursor: "pointer",
                        transition: "border-color 150ms",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#9CA3AF" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB" }}
                    >
                      <IconLines />
                      隐藏部件列表
                    </button>
                  </div>
                </div>
              )}

              {/* 3D canvas */}
              <div style={{
                flex: 1,
                backgroundColor: "#FAFAFA",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
                {/* Chair image */}
                <img
                  src="https://images.unsplash.com/photo-1763279934323-edb3735f6a6e?w=800&h=700&fit=crop&auto=format"
                  alt="3D model preview: armchair"
                  style={{
                    maxWidth: "72%",
                    maxHeight: "80%",
                    objectFit: "contain",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />

                {/* Clickable component dots */}
                {DEMO_COMPONENTS.map((c) => (
                  <ViewerDot
                    key={c.id}
                    comp={c}
                    isSelected={c.id === selectedId}
                    onClick={() => setSelectedId(c.id)}
                  />
                ))}

                {/* XYZ axes */}
                <div style={{ position: "absolute", bottom: "16px", right: "16px" }}>
                  <CoordinateAxes />
                </div>

                {/* Show sidebar button — only visible when sidebar is hidden */}
                {!showSidebar && (
                  <button
                    onClick={() => setShowSidebar(true)}
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      padding: "5px 11px",
                      fontSize: "12px",
                      color: "#374151",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "border-color 150ms",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#9CA3AF" }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB" }}
                  >
                    <IconLines />
                    显示部件列表
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ─── Right: Detail Panel ─────────────────────────────────── */}
          <DetailPanel
            comp={comp}
            selectedMaterialId={componentMaterials[selectedId]}
            onMaterialChange={handleMaterialChange}
            onCancel={handleCancel}
            onSave={handleSave}
            savedFlash={savedFlash}
            onNext={onNext}
          />
        </div>

        {/* Step progress bar */}
        <StepProgressBar currentStep={2} />
      </div>
    </div>
  )
}
