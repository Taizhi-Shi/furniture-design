// ⚠️ DEMO DATA — Not connected to real manufacturing or LCA databases

export type DatabaseMapping = "电力供应" | "加工服务" | "待补充"

export interface ProcessStep {
  id: number
  step: number
  name: string
  associatedParts: string[]
  energyKWh: number
  databaseMapping: DatabaseMapping
}

export const DEMO_PROCESS_STEPS: ProcessStep[] = [
  { id: 1, step: 1, name: "木材锯切", associatedParts: ["木质框架"], energyKWh: 0.35, databaseMapping: "电力供应" },
  { id: 2, step: 2, name: "CNC加工", associatedParts: ["木质框架"], energyKWh: 0.75, databaseMapping: "电力供应" },
  { id: 3, step: 3, name: "钻孔", associatedParts: ["框架连接位置"], energyKWh: 0.12, databaseMapping: "电力供应" },
  { id: 4, step: 4, name: "木材打磨", associatedParts: ["木质框架"], energyKWh: 0.28, databaseMapping: "电力供应" },
  { id: 5, step: 5, name: "胶合板裁切", associatedParts: ["板材组件"], energyKWh: 0.15, databaseMapping: "电力供应" },
  { id: 6, step: 6, name: "PU泡沫裁切", associatedParts: ["座垫", "靠背"], energyKWh: 0.08, databaseMapping: "电力供应" },
  { id: 7, step: 7, name: "织物裁切", associatedParts: ["软包面料"], energyKWh: 0.06, databaseMapping: "电力供应" },
  { id: 8, step: 8, name: "缝纫", associatedParts: ["软包组件"], energyKWh: 0.16, databaseMapping: "电力供应" },
  { id: 9, step: 9, name: "软包装配", associatedParts: ["座垫", "靠背", "框架"], energyKWh: 0.12, databaseMapping: "加工服务" },
  { id: 10, step: 10, name: "最终装配", associatedParts: ["整椅"], energyKWh: 0.08, databaseMapping: "待补充" },
]
