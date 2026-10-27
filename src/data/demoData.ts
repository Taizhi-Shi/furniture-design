// ⚠️ DEMO DATA — Not connected to real database or AI system

export interface ModelInfo {
  name: string
  format: string
  size: string
  faces: string
  vertices: string
  uploadTime: string
}

export const DEMO_MODEL_INFO: ModelInfo = {
  name: "armchair_model.glb",
  format: "GLB",
  size: "2.4 MB",
  faces: "128,456",
  vertices: "64,213",
  uploadTime: "2024-06-05 14:30",
}

export interface WizardStep {
  num: string
  label: string
}

export const WIZARD_STEPS: WizardStep[] = [
  { num: "01", label: "基础信息分析" },
  { num: "02", label: "材料识别" },
  { num: "03", label: "工艺识别" },
  { num: "04", label: "补充参数" },
  { num: "05", label: "生命周期分析" },
]

export interface BasicInfo {
  modelName: string
  itemType: string
  designStyle: string
  useScene: string
  primaryUse: string
  description: string
}

export const DEMO_BASIC_INFO: BasicInfo = {
  modelName: "armchair_model",
  itemType: "单人椅",
  designStyle: "北欧简约",
  useScene: "客厅",
  primaryUse: "休闲坐卧",
  description: "简约风格的单人椅，木质框架，布艺软包，用于客厅休闲使用。",
}

export const ITEM_TYPE_OPTIONS = ["单人椅", "双人沙发", "三人沙发", "床", "餐桌", "书桌", "柜子", "书架", "茶几", "其他"]
export const DESIGN_STYLE_OPTIONS = ["北欧简约", "现代简约", "工业风", "中式", "日式", "美式", "欧式古典", "其他"]
export const USE_SCENE_OPTIONS = ["客厅", "卧室", "餐厅", "办公室", "书房", "户外", "商业空间", "其他"]
export const PRIMARY_USE_OPTIONS = ["休闲坐卧", "工作学习", "用餐", "储物", "展示", "睡眠", "其他"]

export function fileToModelInfo(file: File): ModelInfo {
  const name = file.name
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE"
  const sizeMB = (file.size / (1024 * 1024)).toFixed(1)
  const now = new Date()
  const uploadTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  return {
    name,
    format: ext,
    size: `${sizeMB} MB`,
    faces: "—",
    vertices: "—",
    uploadTime,
  }
}
