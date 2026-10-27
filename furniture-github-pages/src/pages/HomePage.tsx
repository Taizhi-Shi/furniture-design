import React, { useState, useRef } from "react"
import NavBar from "../components/NavBar"
import UploadZone from "../components/UploadZone"
import imgArmchair from "@/imports/1b810446-e48b-47af-8f2d-893a48b42375.png"
import imgRattan from "@/imports/322f9a0a-9d08-4127-8c3e-843447cfc412.png"
import imgSofa from "@/imports/b908df5b-e6fd-4206-bedf-2bf1b691862b.png"
import imgBed from "@/imports/4ae5055d-9bdd-4f26-8e1c-0833284ea8d8.png"
import imgStool from "@/imports/55a02b1d-af6d-471a-9976-33fbc77695c8.png"
import imgLounge from "@/imports/964d870e-a40a-47f8-95d2-44e6b6b62b8f.png"
import imgOttoman from "@/imports/4f445a36-74b8-494e-9075-9362cb60d569.png"

interface HomePageProps {
  onFileSelect?: (file: File) => void
}

// Positions from 2364×1156 reference.
// height = % of content area height (viewport − 60px nav), width = auto from aspect ratio.
// This prevents the sofa from overlapping the stool as viewport width grows.
const ITEMS = [
  // top row — shifted right so rattan center ≈ 50% of viewport
  {
    src: imgArmchair,
    name: "bouclé_armchair.png",
    alt: "Cream bouclé armchair",
    left: "16%",
    top: "3%",
    height: "22%",
  },
  {
    src: imgRattan,
    name: "rattan_side_table.png",
    alt: "Rattan cylindrical side table",
    left: "43%",
    top: "0%",
    height: "21%",
  },
  {
    src: imgSofa,
    name: "leather_sofa.png",
    alt: "Dark leather sofa",
    left: "64%",
    top: "2%",
    height: "21%",
  },
  // middle row — stool.top > sofa.top + sofa.height always, regardless of viewport width
  {
    src: imgBed,
    name: "leather_bed.png",
    alt: "Dark leather platform bed",
    left: "2%",
    top: "32%",
    height: "22%",
  },
  {
    src: imgStool,
    name: "ceramic_stool.png",
    alt: "Ceramic accent stool",
    left: "84%",
    top: "27.6%",
    height: "29.1%",
  },
  // bottom row
  {
    src: imgLounge,
    name: "eames_lounge_chair.png",
    alt: "Eames lounge chair with ottoman",
    left: "10%",
    top: "60%",
    height: "30%",
  },
  {
    src: imgOttoman,
    name: "round_ottoman.png",
    alt: "Round bouclé ottoman",
    left: "64%",
    top: "67%",
    height: "22%",
  },
]

export default function HomePage({ onFileSelect }: HomePageProps) {
  const [dropActive, setDropActive] = useState(false)
  const dragSrcRef = useRef<{ src: string name: string } | null>(null)

  function handleDragStart(
    item: { src: string name: string },
    e: React.DragEvent,
  ) {
    dragSrcRef.current = item
    e.dataTransfer.effectAllowed = "copy"
  }

  function handleDropZoneDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setDropActive(true)
  }

  function handleDropZoneDragLeave() {
    setDropActive(false)
  }

  async function handleDropZoneDrop(e: React.DragEvent) {
    e.preventDefault()
    setDropActive(false)
    const item = dragSrcRef.current
    if (!item || !onFileSelect) return
    try {
      const res = await fetch(item.src)
      const blob = await res.blob()
      onFileSelect(new File([blob], item.name, { type: "image/png" }))
    } catch {
      onFileSelect(new File([""], item.name, { type: "image/png" }))
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />

      {/* Content area — position: relative so children can be absolutely placed */}
      <main
        style={{
          flex: 1,
          marginTop: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Furniture images ─────────────────────────────────── */}
        {ITEMS.map((item) => (
          <img
            key={item.name}
            src={item.src}
            alt={item.alt}
            draggable
            onDragStart={(e) => handleDragStart(item, e)}
            style={{
              position: "absolute",
              left: item.left,
              top: item.top,
              height: item.height,
              width: "auto",
              cursor: "grab",
              userSelect: "none",
              transition: "transform 200ms, filter 200ms",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.transform = "scale(1.04)"
              el.style.filter = "drop-shadow(0 8px 24px rgba(0,0,0,0.15))"
              el.style.zIndex = "10"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.transform = "scale(1)"
              el.style.filter = "none"
              el.style.zIndex = "1"
            }}
            loading="lazy"
          />
        ))}

        {/* ── Upload zone — absolutely centered ────────────────── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "26%",
            transform: "translateX(-50%)",
            width: "clamp(340px, 30%, 460px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            zIndex: 5,
          }}
        >
          <div
            onDragOver={handleDropZoneDragOver}
            onDragLeave={handleDropZoneDragLeave}
            onDrop={handleDropZoneDrop}
            style={{
              width: "100%",
              borderRadius: "12px",
              transition: "background-color 150ms, outline 150ms",
              backgroundColor: dropActive ? "#EFF6FF" : "transparent",
              outline: dropActive ? "2px dashed #60A5FA" : "none",
            }}
          >
            <UploadZone onFileSelect={onFileSelect} />
          </div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "13px",
              lineHeight: "1.75",
              color: "#9CA3AF",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
            }}
          >
            上传 3D 模型，AI 将自动识别材料与工艺
            <br />
            并进行生命周期评估，生成可持续设计分析结果
          </p>

          {dropActive && (
            <p
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#3B82F6",
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
              }}
            >
              松开即可开始分析
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
