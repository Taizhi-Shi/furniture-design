// ⚠️ DEMO DATA — Not connected to real AI recognition or LCA database

export interface ProcessStep {
  id: number
  step: number
  name: string
  type: string         // 切割 / 加工 / 成型 / 表面处理 / 组装
  energyMJ: number
  carbonKgCO2e: number
}

export interface ComponentManufacturing {
  componentId: number
  mainProcess: string
  surfaceTreatment: string
  confidence: number       // 0–100
  carbonKgCO2e: number     // total estimated
  steps: ProcessStep[]
}

// ⚠️ DEMO DATA — Manufacturing processes per furniture component
export const DEMO_MANUFACTURING: ComponentManufacturing[] = [
  {
    componentId: 1,
    mainProcess: "CNC 加工",
    surfaceTreatment: "打磨 + 上油",
    confidence: 94,
    carbonKgCO2e: 0.48,
    steps: [
      { id: 1, step: 1, name: "开料切割", type: "切割",   energyMJ: 1.25, carbonKgCO2e: 0.08 },
      { id: 2, step: 2, name: "CNC 铣削", type: "加工",   energyMJ: 2.40, carbonKgCO2e: 0.18 },
      { id: 3, step: 3, name: "钻孔",     type: "加工",   energyMJ: 0.85, carbonKgCO2e: 0.05 },
      { id: 4, step: 4, name: "打磨",     type: "表面处理", energyMJ: 0.60, carbonKgCO2e: 0.04 },
      { id: 5, step: 5, name: "上油",     type: "表面处理", energyMJ: 0.35, carbonKgCO2e: 0.03 },
    ],
  },
  {
    componentId: 2,
    mainProcess: "手工成型",
    surfaceTreatment: "打磨 + 上漆",
    confidence: 89,
    carbonKgCO2e: 0.32,
    steps: [
      { id: 1, step: 1, name: "开料切割", type: "切割",   energyMJ: 0.90, carbonKgCO2e: 0.06 },
      { id: 2, step: 2, name: "手工成型", type: "加工",   energyMJ: 1.20, carbonKgCO2e: 0.09 },
      { id: 3, step: 3, name: "打磨",     type: "表面处理", energyMJ: 0.45, carbonKgCO2e: 0.03 },
      { id: 4, step: 4, name: "上漆",     type: "表面处理", energyMJ: 0.30, carbonKgCO2e: 0.02 },
    ],
  },
  {
    componentId: 3,
    mainProcess: "CNC 加工",
    surfaceTreatment: "上漆",
    confidence: 91,
    carbonKgCO2e: 0.41,
    steps: [
      { id: 1, step: 1, name: "开料切割", type: "切割",   energyMJ: 1.10, carbonKgCO2e: 0.07 },
      { id: 2, step: 2, name: "CNC 铣削", type: "加工",   energyMJ: 2.10, carbonKgCO2e: 0.15 },
      { id: 3, step: 3, name: "打磨",     type: "表面处理", energyMJ: 0.55, carbonKgCO2e: 0.04 },
      { id: 4, step: 4, name: "上漆",     type: "表面处理", energyMJ: 0.28, carbonKgCO2e: 0.02 },
    ],
  },
  {
    componentId: 4,
    mainProcess: "模压成型",
    surfaceTreatment: "无",
    confidence: 86,
    carbonKgCO2e: 0.61,
    steps: [
      { id: 1, step: 1, name: "发泡注塑", type: "成型",   energyMJ: 3.20, carbonKgCO2e: 0.22 },
      { id: 2, step: 2, name: "裁切",     type: "切割",   energyMJ: 0.40, carbonKgCO2e: 0.03 },
      { id: 3, step: 3, name: "包覆",     type: "组装",   energyMJ: 0.25, carbonKgCO2e: 0.02 },
    ],
  },
  {
    componentId: 5,
    mainProcess: "模压成型",
    surfaceTreatment: "无",
    confidence: 85,
    carbonKgCO2e: 0.49,
    steps: [
      { id: 1, step: 1, name: "发泡注塑", type: "成型",   energyMJ: 2.60, carbonKgCO2e: 0.18 },
      { id: 2, step: 2, name: "裁切",     type: "切割",   energyMJ: 0.35, carbonKgCO2e: 0.02 },
      { id: 3, step: 3, name: "包覆",     type: "组装",   energyMJ: 0.20, carbonKgCO2e: 0.01 },
    ],
  },
  {
    componentId: 6,
    mainProcess: "机织",
    surfaceTreatment: "热定型",
    confidence: 88,
    carbonKgCO2e: 0.38,
    steps: [
      { id: 1, step: 1, name: "纺纱",   type: "加工",   energyMJ: 0.80, carbonKgCO2e: 0.06 },
      { id: 2, step: 2, name: "机织",   type: "加工",   energyMJ: 1.10, carbonKgCO2e: 0.08 },
      { id: 3, step: 3, name: "裁切",   type: "切割",   energyMJ: 0.20, carbonKgCO2e: 0.01 },
      { id: 4, step: 4, name: "热定型", type: "表面处理", energyMJ: 0.40, carbonKgCO2e: 0.03 },
    ],
  },
  {
    componentId: 7,
    mainProcess: "冲压",
    surfaceTreatment: "镀锌",
    confidence: 95,
    carbonKgCO2e: 0.22,
    steps: [
      { id: 1, step: 1, name: "冲压",   type: "成型",   energyMJ: 0.60, carbonKgCO2e: 0.04 },
      { id: 2, step: 2, name: "打孔",   type: "加工",   energyMJ: 0.25, carbonKgCO2e: 0.02 },
      { id: 3, step: 3, name: "镀锌",   type: "表面处理", energyMJ: 0.35, carbonKgCO2e: 0.03 },
    ],
  },
]
