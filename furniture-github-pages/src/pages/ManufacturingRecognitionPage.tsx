import React, { useState } from "react"
import NavBar from "../components/NavBar"
import StepProgressBar from "../components/StepProgressBar"

import { DEMO_COMPONENTS, type FurnitureComponent } from "../data/materialData"
import {
  DEMO_MANUFACTURING,
  type ComponentManufacturing,
  type ProcessStep,
} from "../data/manufacturingData"

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

function IconLines() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 2l2.5 2.5-7 7H2.5v-2.5L9.5 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5.5 3.5V2.5h3v1M5.5 6v4M8.5 6v4M3 3.5l.7 7.5h6.6l.7-7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconWrench() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M10.5 1.5a3 3 0 0 0-3 3c0 .4.08.78.22 1.13L2 11.5l1 1 5.87-5.72A3 3 0 1 0 10.5 1.5z" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5L8.5 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

// ─── XYZ Axes ─────────────────────────────────────────────────────────────────

function CoordinateAxes() {
  return (
    <svg width="60" height="54" viewBox="0 0 60 54" fill="none" aria-label="XYZ coordinate axes">
      <circle cx="18" cy="40" r="2.5" fill="#9CA3AF" />
      <line x1="18" y1="37" x2="18" y2="8" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 16 18 8l3.5 8" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="22" y="12" fill="#22C55E" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="500">Y</text>
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
      <div style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: comp.materialColor,
        flexShrink: 0,
      }} />
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
      <div style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: isSelected ? "#3B82F6" : (hovered ? "#6B7280" : "#9CA3AF"),
        border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
        transition: "background-color 100ms",
      }} />
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

// ─── Process Steps Table ──────────────────────────────────────────────────────

function ProcessTable({
  steps,
  onStepsChange,
}: {
  steps: ProcessStep[]
  onStepsChange: (steps: ProcessStep[]) => void
}) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<Partial<ProcessStep>>({})
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [showAddRow, setShowAddRow] = useState(false)
  const [newRow, setNewRow] = useState({ name: "", type: "", energyMJ: "", carbonKgCO2e: "" })

  const startEdit = (s: ProcessStep) => {
    setEditingId(s.id)
    setEditDraft({ name: s.name, type: s.type, energyMJ: s.energyMJ, carbonKgCO2e: s.carbonKgCO2e })
  }

  const saveEdit = (id: number) => {
    onStepsChange(steps.map((s) =>
      s.id === id
        ? { ...s, name: editDraft.name ?? s.name, type: editDraft.type ?? s.type,
            energyMJ: Number(editDraft.energyMJ) || s.energyMJ,
            carbonKgCO2e: Number(editDraft.carbonKgCO2e) || s.carbonKgCO2e }
        : s
    ))
    setEditingId(null)
  }

  const addRow = () => {
    if (!newRow.name.trim()) return
    const nextId = Math.max(0, ...steps.map((s) => s.id)) + 1
    const nextStep = steps.length + 1
    onStepsChange([...steps, {
      id: nextId,
      step: nextStep,
      name: newRow.name,
      type: newRow.type || "加工",
      energyMJ: Number(newRow.energyMJ) || 0,
      carbonKgCO2e: Number(newRow.carbonKgCO2e) || 0,
    }])
    setNewRow({ name: "", type: "", energyMJ: "", carbonKgCO2e: "" })
    setShowAddRow(false)
  }

  const thStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "#9CA3AF",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    padding: "0 12px 10px",
    textAlign: "left",
    whiteSpace: "nowrap",
  }

  const tdStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#111827",
    fontFamily: "Inter, sans-serif",
    padding: "10px 12px",
  }

  const inputStyle: React.CSSProperties = {
    fontSize: "13px",
    fontFamily: "Inter, sans-serif",
    color: "#111827",
    border: "1px solid #D1D5DB",
    borderRadius: "5px",
    padding: "4px 7px",
    outline: "none",
    width: "100%",
  }

  return (
    <div>
      {/* Section header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}>
          工艺步骤（可编辑）
        </span>
        <button
          onClick={() => setShowAddRow(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: "#3B82F6",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "2px 0",
          }}
        >
          <IconPlus />
          添加工艺步骤
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
              <th style={{ ...thStyle, width: "36px" }}>序号</th>
              <th style={thStyle}>工艺名称</th>
              <th style={thStyle}>工艺类型</th>
              <th style={{ ...thStyle, textAlign: "right" }}>能耗 (MJ)</th>
              <th style={{ ...thStyle, textAlign: "right" }}>
                <div>单位碳排放</div>
                <div style={{ fontWeight: 400, color: "#B0B7C3" }}>(kg CO₂e)</div>
              </th>
              <th style={{ ...thStyle, width: "60px" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => {
              const isEditing = editingId === s.id
              const isHovered = hoveredRow === s.id && !isEditing
              return (
                <tr
                  key={s.id}
                  onMouseEnter={() => setHoveredRow(s.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: "1px solid #F9FAFB",
                    backgroundColor: isEditing ? "#EFF6FF" : isHovered ? "#F5F9FF" : "transparent",
                    transition: "background-color 80ms",
                  }}
                >
                  {/* 序号 */}
                  <td style={{ ...tdStyle, color: "#9CA3AF" }}>{s.step}</td>

                  {/* 工艺名称 */}
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        value={String(editDraft.name ?? "")}
                        onChange={(e) => setEditDraft((d) => ({ ...d, name: e.target.value }))}
                        style={inputStyle}
                        autoFocus
                      />
                    ) : (
                      <span style={{ fontWeight: isHovered ? 500 : 400 }}>{s.name}</span>
                    )}
                  </td>

                  {/* 工艺类型 */}
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        value={String(editDraft.type ?? "")}
                        onChange={(e) => setEditDraft((d) => ({ ...d, type: e.target.value }))}
                        style={inputStyle}
                      />
                    ) : (
                      <span style={{ color: "#6B7280" }}>{s.type}</span>
                    )}
                  </td>

                  {/* 能耗 */}
                  <td style={{ ...tdStyle, textAlign: "right", color: isHovered && !isEditing ? "#2563EB" : "#111827" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        value={String(editDraft.energyMJ ?? "")}
                        onChange={(e) => setEditDraft((d) => ({ ...d, energyMJ: Number(e.target.value) }))}
                        style={{ ...inputStyle, textAlign: "right" }}
                      />
                    ) : (
                      s.energyMJ.toFixed(2)
                    )}
                  </td>

                  {/* 碳排放 */}
                  <td style={{ ...tdStyle, textAlign: "right", color: isHovered && !isEditing ? "#2563EB" : "#111827" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        value={String(editDraft.carbonKgCO2e ?? "")}
                        onChange={(e) => setEditDraft((d) => ({ ...d, carbonKgCO2e: Number(e.target.value) }))}
                        style={{ ...inputStyle, textAlign: "right" }}
                      />
                    ) : (
                      s.carbonKgCO2e.toFixed(2)
                    )}
                  </td>

                  {/* 操作 */}
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    {isEditing ? (
                      <button
                        onClick={() => saveEdit(s.id)}
                        style={{
                          fontSize: "11px",
                          color: "#3B82F6",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        保存
                      </button>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <button
                          onClick={() => startEdit(s)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#9CA3AF",
                            display: "flex",
                            alignItems: "center",
                            padding: "2px",
                            transition: "color 100ms",
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4B5563" }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF" }}
                          title="编辑"
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => onStepsChange(
                            steps
                              .filter((r) => r.id !== s.id)
                              .map((r, i) => ({ ...r, step: i + 1 }))
                          )}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#9CA3AF",
                            display: "flex",
                            alignItems: "center",
                            padding: "2px",
                            transition: "color 100ms",
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#EF4444" }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF" }}
                          title="删除"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}

            {/* Add row */}
            {showAddRow && (
              <tr style={{ borderBottom: "1px solid #F3F4F6", backgroundColor: "#F8FAFF" }}>
                <td style={{ ...tdStyle, color: "#9CA3AF" }}>{steps.length + 1}</td>
                <td style={tdStyle}>
                  <input
                    placeholder="工艺名称"
                    value={newRow.name}
                    onChange={(e) => setNewRow((r) => ({ ...r, name: e.target.value }))}
                    style={inputStyle}
                    autoFocus
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    placeholder="类型"
                    value={newRow.type}
                    onChange={(e) => setNewRow((r) => ({ ...r, type: e.target.value }))}
                    style={inputStyle}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newRow.energyMJ}
                    onChange={(e) => setNewRow((r) => ({ ...r, energyMJ: e.target.value }))}
                    style={{ ...inputStyle, textAlign: "right" }}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newRow.carbonKgCO2e}
                    onChange={(e) => setNewRow((r) => ({ ...r, carbonKgCO2e: e.target.value }))}
                    style={{ ...inputStyle, textAlign: "right" }}
                  />
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={addRow}
                    style={{
                      fontSize: "11px",
                      color: "#3B82F6",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    确认
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Right Detail Panel ───────────────────────────────────────────────────────

function DetailPanel({
  comp,
  mfg,
  steps,
  onStepsChange,
  onSave,
  savedFlash,
  onNext,
}: {
  comp: FurnitureComponent
  mfg: ComponentManufacturing
  steps: ProcessStep[]
  onStepsChange: (s: ProcessStep[]) => void
  onSave: () => void
  savedFlash: boolean
  onNext?: () => void
}) {
  return (
    <div style={{
      width: "520px",
      flexShrink: 0,
      borderLeft: "1px solid #E5E7EB",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>
    {/* Scrollable content */}
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 0" }}>

      {/* Component info row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      }}>
        {/* Blue circle badge */}
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#3B82F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "white" }}>{comp.numLabel}</span>
        </div>
        {/* Name + material */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginRight: "8px" }}>
            {comp.name}
          </span>
          <span style={{ fontSize: "12px", color: "#6B7280" }}>
            {comp.material}
          </span>
        </div>
      </div>

      {/* Info row — 4 items in one row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        columnGap: "16px",
        paddingBottom: "18px",
        borderBottom: "1px solid #F3F4F6",
        marginBottom: "20px",
      }}>
        {/* 主要工艺 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>主要工艺</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#6B7280" }}><IconWrench /></span>
            <span style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{mfg.mainProcess}</span>
          </div>
        </div>

        {/* 表面处理 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>表面处理</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#6B7280" }}><IconWrench /></span>
            <span style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{mfg.surfaceTreatment}</span>
          </div>
        </div>

        {/* 工艺置信度 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>工艺置信度</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>{mfg.confidence}%</div>
        </div>

        {/* 工艺碳排放 */}
        <div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "5px" }}>工艺碳排放（估算）</div>
          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 500 }}>
            {mfg.carbonKgCO2e.toFixed(2)} kg CO₂e
          </div>
        </div>
      </div>

      {/* Process steps table */}
      <ProcessTable steps={steps} onStepsChange={onStepsChange} />
    </div>

    {/* Fixed button — outside scroll area */}
    <div style={{ padding: "16px 24px", borderTop: "1px solid #F3F4F6", flexShrink: 0 }}>
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
          transition: "background-color 150ms",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1F2937" }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111111" }}
      >
        下一步：补充参数
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
    </div>
  )
}

// ─── Bottom Navigation Bar ────────────────────────────────────────────────────

// ─── Main Page ────────────────────────────────────────────────────────────────

interface ManufacturingRecognitionPageProps {
  onBack: () => void
  onNext?: () => void
}

export default function ManufacturingRecognitionPage({ onBack, onNext }: ManufacturingRecognitionPageProps) {
  const [selectedId, setSelectedId] = useState<number>(1)
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeToolIcon, setActiveToolIcon] = useState<number | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)

  // Per-component process steps (editable)
  const [componentSteps, setComponentSteps] = useState<Record<number, ProcessStep[]>>(() => {
    const init: Record<number, ProcessStep[]> = {}
    DEMO_MANUFACTURING.forEach((m) => {
      init[m.componentId] = [...m.steps]
    })
    return init
  })

  const comp = DEMO_COMPONENTS.find((c) => c.id === selectedId) ?? DEMO_COMPONENTS[0]
  const mfg = DEMO_MANUFACTURING.find((m) => m.componentId === selectedId) ?? DEMO_MANUFACTURING[0]
  const steps = componentSteps[selectedId] ?? []

  const handleStepsChange = (newSteps: ProcessStep[]) => {
    setComponentSteps((prev) => ({ ...prev, [selectedId]: newSteps }))
  }

  const handleSave = () => {
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
          <span style={{ fontSize: "15px", fontWeight: 500, color: "#111827" }}>工艺识别</span>
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
          {/* ─── Left: 3D Viewer ─────────────────────────────────── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
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

            {/* Viewer body */}
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

                {DEMO_COMPONENTS.map((c) => (
                  <ViewerDot
                    key={c.id}
                    comp={c}
                    isSelected={c.id === selectedId}
                    onClick={() => setSelectedId(c.id)}
                  />
                ))}

                <div style={{ position: "absolute", bottom: "16px", right: "16px" }}>
                  <CoordinateAxes />
                </div>

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

          {/* ─── Right: Detail Panel ─────────────────────────────── */}
          <DetailPanel
            comp={comp}
            mfg={mfg}
            steps={steps}
            onStepsChange={handleStepsChange}
            onSave={handleSave}
            savedFlash={savedFlash}
            onNext={onNext}
          />
        </div>

        {/* Bottom nav bar */}
        <StepProgressBar currentStep={3} />
      </div>
    </div>
  )
}
