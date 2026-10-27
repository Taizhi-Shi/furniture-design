// ⚠️ DEMO DATA — Not connected to real AI recognition or LCA database

export interface FurnitureComponent {
  id: number
  numLabel: string
  name: string
  description: string
  material: string
  materialEn: string
  materialColor: string       // dot / swatch color
  category: string
  confidence: number          // 0–100
  massKg: number
  volumeM3: number
  carbonKgCO2e: number
  dotPosition: { x: number; y: number } // % of viewer container
}

export interface MaterialOption {
  id: string
  nameZh: string
  nameEn: string
  swatchColor: string
}

export const DEMO_COMPONENTS: FurnitureComponent[] = [
  {
    id: 1,
    numLabel: "01",
    name: "椅腿",
    description: "支撑椅子主体重量，与地面接触的主要部件",
    material: "橡木 (Oak)",
    materialEn: "Oak",
    materialColor: "#C4874A",
    category: "天然木材 > 硬木",
    confidence: 95,
    massKg: 3.2,
    volumeM3: 0.0026,
    carbonKgCO2e: 1.09,
    dotPosition: { x: 62, y: 80 },
  },
  {
    id: 2,
    numLabel: "02",
    name: "扶手",
    description: "椅子两侧的扶手结构，提供手臂支撑",
    material: "橡木 (Oak)",
    materialEn: "Oak",
    materialColor: "#C4874A",
    category: "天然木材 > 硬木",
    confidence: 92,
    massKg: 1.8,
    volumeM3: 0.0015,
    carbonKgCO2e: 0.62,
    dotPosition: { x: 22, y: 52 },
  },
  {
    id: 3,
    numLabel: "03",
    name: "座框",
    description: "座椅的主体框架结构，承载坐垫的支撑部分",
    material: "橡木 (Oak)",
    materialEn: "Oak",
    materialColor: "#C4874A",
    category: "天然木材 > 硬木",
    confidence: 90,
    massKg: 2.1,
    volumeM3: 0.0018,
    carbonKgCO2e: 0.72,
    dotPosition: { x: 74, y: 62 },
  },
  {
    id: 4,
    numLabel: "04",
    name: "座垫",
    description: "提供坐姿舒适性的软质填充部件",
    material: "PU 泡沫",
    materialEn: "PU Foam",
    materialColor: "#C8C8C8",
    category: "高分子材料 > 泡沫",
    confidence: 88,
    massKg: 1.5,
    volumeM3: 0.012,
    carbonKgCO2e: 3.45,
    dotPosition: { x: 52, y: 65 },
  },
  {
    id: 5,
    numLabel: "05",
    name: "靠背",
    description: "提供背部支撑的软质填充结构",
    material: "PU 泡沫",
    materialEn: "PU Foam",
    materialColor: "#C8C8C8",
    category: "高分子材料 > 泡沫",
    confidence: 87,
    massKg: 1.2,
    volumeM3: 0.0096,
    carbonKgCO2e: 2.76,
    dotPosition: { x: 50, y: 28 },
  },
  {
    id: 6,
    numLabel: "06",
    name: "面料",
    description: "覆盖座垫和靠背的外表面织物材料",
    material: "涤纶织物",
    materialEn: "Polyester Fabric",
    materialColor: "#B0B0B0",
    category: "纺织材料 > 合成纤维",
    confidence: 86,
    massKg: 0.5,
    volumeM3: 0.0008,
    carbonKgCO2e: 1.2,
    dotPosition: { x: 35, y: 43 },
  },
  {
    id: 7,
    numLabel: "07",
    name: "连接件",
    description: "各部件之间的金属连接固定零件",
    material: "钢 (Steel)",
    materialEn: "Steel",
    materialColor: "#8888A0",
    category: "金属材料 > 钢铁",
    confidence: 96,
    massKg: 0.3,
    volumeM3: 0.000038,
    carbonKgCO2e: 0.54,
    dotPosition: { x: 50, y: 83 },
  },
]

export const MATERIAL_OPTIONS: MaterialOption[] = [
  { id: "oak",    nameZh: "橡木",   nameEn: "Oak",     swatchColor: "#C4874A" },
  { id: "walnut", nameZh: "胡桃木", nameEn: "Walnut",  swatchColor: "#6B3F2A" },
  { id: "ash",    nameZh: "白蜡木", nameEn: "Ash",     swatchColor: "#C9AA82" },
  { id: "bamboo", nameZh: "竹材",   nameEn: "Bamboo",  swatchColor: "#D4AF5E" },
]

/** Map a material English name to the closest MaterialOption id */
export function materialEnToId(materialEn: string): string {
  const map: Record<string, string> = {
    Oak: "oak",
    Walnut: "walnut",
    Ash: "ash",
    Bamboo: "bamboo",
  }
  return map[materialEn] ?? "oak"
}
