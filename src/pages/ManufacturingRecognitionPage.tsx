import React, { useState } from "react"
import NavBar from "../components/NavBar"
import StepProgressBar from "../components/StepProgressBar"

import { DEMO_COMPONENTS, type FurnitureComponent } from "../data/materialData"
import {
  DEMO_PROCESS_STEPS,
  type ProcessStep,
} from "../data/manufacturingData"

// ─── Icons ────────────────────────────────────────────────────────────────────

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

function IconInfo() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6.5 5.7v3M6.5 3.8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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

const PART_OPTIONS = [
  "木质框架",
  "框架连接位置",
  "板材组件",
  "座垫",
  "靠背",
  "扶手",
  "椅腿",
  "软包面料",
  "软包组件",
  "框架",
  "连接件",
  "整椅",
]

function PartsMultiSelect({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) {
  return (
    <details style={{ position: "relative" }}>
      <summary style={{
        minHeight: "28px",
        display: "flex",
        alignItems: "center",
        padding: "4px 7px",
        border: "1px solid #D1D5DB",
        borderRadius: "5px",
        color: value.length ? "#111827" : "#9CA3AF",
        fontSize: "11px",
        cursor: "pointer",
        listStyle: "none",
      }}>
        {value.length ? value.join("、") : "选择部件"}
      </summary>
      <div style={{
        position: "absolute",
        zIndex: 30,
        top: "calc(100% + 4px)",
        left: 0,
        width: "156px",
        maxHeight: "180px",
        overflowY: "auto",
        padding: "6px",
        border: "1px solid #E5E7EB",
        borderRadius: "6px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 8px 20px rgba(17,24,39,0.1)",
      }}>
        {PART_OPTIONS.map((part) => (
          <label key={part} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px", fontSize: "11px", color: "#374151", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={value.includes(part)}
              onChange={() => onChange(value.includes(part) ? value.filter((item) => item !== part) : [...value, part])}
              style={{ accentColor: "#3B82F6" }}
            />
            {part}
          </label>
        ))}
      </div>
    </details>
  )
}

function ProcessTable({
  steps,
  onStepsChange,
  showAddRow,
  onShowAddRowChange,
}: {
  steps: ProcessStep[]
  onStepsChange: (steps: ProcessStep[]) => void
  showAddRow: boolean
  onShowAddRowChange: (show: boolean) => void
}) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<Partial<ProcessStep>>({})
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [newRow, setNewRow] = useState({ name: "", associatedParts: [] as string[], energyKWh: "" })

  const startEdit = (s: ProcessStep) => {
    setEditingId(s.id)
    setEditDraft({ name: s.name, associatedParts: [...s.associatedParts], energyKWh: s.energyKWh })
  }

  const saveEdit = (id: number) => {
    onStepsChange(steps.map((s) =>
      s.id === id
        ? {
            ...s,
            name: editDraft.name?.trim() || s.name,
            associatedParts: editDraft.associatedParts?.length ? editDraft.associatedParts : s.associatedParts,
            energyKWh: Math.max(0, Number(editDraft.energyKWh ?? s.energyKWh)),
          }
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
      associatedParts: newRow.associatedParts.length ? newRow.associatedParts : ["整椅"],
      energyKWh: Math.max(0, Number(newRow.energyKWh) || 0),
      databaseMapping: "待补充",
    }])
    setNewRow({ name: "", associatedParts: [], energyKWh: "" })
    onShowAddRowChange(false)
  }

  const thStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "#9CA3AF",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    padding: "0 6px 10px",
    textAlign: "left",
    whiteSpace: "nowrap",
  }

  const tdStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#111827",
    fontFamily: "Inter, sans-serif",
    padding: "8px 6px",
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
      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
              <th style={{ ...thStyle, width: "32px" }}>序号</th>
              <th style={{ ...thStyle, width: "86px" }}>工序名称</th>
              <th style={{ ...thStyle, width: "112px" }}>关联部件</th>
              <th style={{ ...thStyle, width: "100px", textAlign: "left" }}>电耗（kWh/把）</th>
              <th style={{ ...thStyle, width: "112px", paddingLeft: "14px" }}>数据库映射</th>
              <th style={{ ...thStyle, width: "52px", textAlign: "center" }}>操作</th>
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

                  {/* 关联部件 */}
                  <td style={tdStyle}>
                    {isEditing ? (
                      <PartsMultiSelect
                        value={editDraft.associatedParts ?? []}
                        onChange={(associatedParts) => setEditDraft((draft) => ({ ...draft, associatedParts }))}
                      />
                    ) : (
                      <span style={{ color: "#6B7280", lineHeight: 1.45 }}>{s.associatedParts.join("、")}</span>
                    )}
                  </td>

                  {/* 电耗 */}
                  <td style={{ ...tdStyle, textAlign: "left", color: isHovered && !isEditing ? "#2563EB" : "#111827" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={String(editDraft.energyKWh ?? "")}
                        onChange={(e) => setEditDraft((d) => ({ ...d, energyKWh: Math.max(0, Number(e.target.value)) }))}
                        style={{ ...inputStyle, textAlign: "left" }}
                      />
                    ) : (
                      s.energyKWh.toFixed(2)
                    )}
                  </td>

                  {/* 数据库映射 */}
                  <td style={{ ...tdStyle, paddingLeft: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 7px",
                        borderRadius: "999px",
                        color: s.databaseMapping === "电力供应" ? "#16883B" : s.databaseMapping === "加工服务" ? "#2563EB" : "#6B7280",
                        backgroundColor: s.databaseMapping === "电力供应" ? "#E9F8ED" : s.databaseMapping === "加工服务" ? "#EFF6FF" : "#F1F3F5",
                        fontSize: "10px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}>
                        {s.databaseMapping}
                      </span>
                      <button
                        type="button"
                        title="查看数据库映射说明"
                        onClick={() => window.alert(
                          s.databaseMapping === "待补充"
                            ? "该工序尚未完成生命周期数据库匹配。"
                            : `${s.databaseMapping}：当前为原型展示映射，需在正式计算前完成数据库过程审核。`
                        )}
                        style={{ display: "flex", padding: "2px", border: 0, background: "transparent", color: "#9CA3AF", cursor: "pointer" }}
                      >
                        <IconInfo />
                      </button>
                    </div>
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
                  <PartsMultiSelect
                    value={newRow.associatedParts}
                    onChange={(associatedParts) => setNewRow((row) => ({ ...row, associatedParts }))}
                  />
                </td>
                <td style={{ ...tdStyle, textAlign: "left" }}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newRow.energyKWh}
                    onChange={(e) => setNewRow((r) => ({ ...r, energyKWh: e.target.value.startsWith("-") ? "0" : e.target.value }))}
                    style={{ ...inputStyle, textAlign: "left" }}
                  />
                </td>
                <td style={{ ...tdStyle, paddingLeft: "14px" }}>
                  <span style={{ display: "inline-flex", padding: "3px 7px", borderRadius: "999px", backgroundColor: "#F1F3F5", color: "#6B7280", fontSize: "10px", fontWeight: 600 }}>待补充</span>
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
  steps,
  onStepsChange,
  onNext,
}: {
  steps: ProcessStep[]
  onStepsChange: (s: ProcessStep[]) => void
  onNext?: () => void
}) {
  const [showAddRow, setShowAddRow] = useState(false)

  return (
    <div style={{
      flex: "3 1 0",
      minWidth: 0,
      borderLeft: "1px solid #E5E7EB",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>
    {/* Scrollable content */}
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 0" }}>

      {/* Process table title */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <IconWrench />
          </div>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>工艺步骤（可编辑）</span>
        </div>
        <button
          onClick={() => setShowAddRow(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 0",
            border: "none",
            backgroundColor: "transparent",
            color: "#3B82F6",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <IconPlus />
          添加工艺步骤
        </button>
      </div>

      {/* Process steps table */}
      <ProcessTable steps={steps} onStepsChange={onStepsChange} showAddRow={showAddRow} onShowAddRowChange={setShowAddRow} />
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
  const [steps, setSteps] = useState<ProcessStep[]>(() => DEMO_PROCESS_STEPS.map((step) => ({ ...step, associatedParts: [...step.associatedParts] })))

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
          <div style={{ flex: "2 1 0", display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
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
              </div>
            </div>

            {/* Viewer body */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
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

              </div>
            </div>
          </div>

          {/* ─── Right: Detail Panel ─────────────────────────────── */}
          <DetailPanel
            steps={steps}
            onStepsChange={setSteps}
            onNext={onNext}
          />
        </div>

        {/* Bottom nav bar */}
        <StepProgressBar currentStep={3} />
      </div>
    </div>
  )
}
