import React, { useCallback, useRef, useState } from "react"

const ACCEPTED = ".jpg,.jpeg,.png,.webp,.glb,.gltf,.stl,.obj,.fbx,.skp"
const FORMAT_HINT = ".glb  .gltf  .fbx  .obj  .stl  .skp"

function CloudUploadIcon() {
  return (
    <svg
      width="52"
      height="44"
      viewBox="0 0 52 44"
      fill="none"
      aria-hidden="true"
    >
      {/* Cloud */}
      <path
        d="M13 36H9C4.582 36 1 32.418 1 28C1 23.791 4.29 20.355 8.46 20.037C8.816 13.207 14.42 8 21.5 8C28.075 8 33.44 12.635 34.35 18.762C34.398 18.754 34.449 18.75 34.5 18.75C34.5 18.75 34.534 18.75 34.566 18.751C34.711 18.75 34.855 18.75 35 18.75C40.523 18.75 45 23.227 45 28.75C45 34.273 40.523 38.75 35 38.75H39"
        stroke="#BFBFBF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upward arrow */}
      <path
        d="M26 44V26"
        stroke="#BFBFBF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 33l7-7 7 7"
        stroke="#BFBFBF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface UploadZoneProps {
  onFileSelect?: (file: File) => void
}

export default function UploadZone({ onFileSelect }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      setSelectedFile(file)
      onFileSelect?.(file)
    },
    [onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ""
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "520px",
        minHeight: "190px",
        borderRadius: "12px",
        border: isDragging ? "1.5px dashed #9CA3AF" : "1.5px dashed #D1D5DB",
        backgroundColor: isDragging ? "#F3F4F6" : "#F9FAFB",
        cursor: "pointer",
        transition: "border-color 150ms, background-color 150ms",
        padding: "32px 24px",
        gap: "0px",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      {/* Icon */}
      <div style={{ marginBottom: "12px" }}>
        <CloudUploadIcon />
      </div>

      {/* Title */}
      {selectedFile ? (
        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#374151",
            margin: "0 0 6px",
            textAlign: "center",
          }}
        >
          {selectedFile.name}
        </p>
      ) : (
        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#374151",
            margin: "0 0 6px",
            textAlign: "center",
          }}
        >
          拖拽 3D 模型到这里开始分析
        </p>
      )}

      {/* Format hint */}
      <p
        style={{
          fontSize: "12px",
          color: "#9CA3AF",
          margin: "0 0 20px",
          textAlign: "center",
        }}
      >
        支持 {FORMAT_HINT}
      </p>

      {/* Select file button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current?.click()
        }}
        style={{
          padding: "8px 24px",
          backgroundColor: "#111111",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 500,
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 150ms, transform 100ms",
          fontFamily: "Inter, sans-serif",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "#333333"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "#111111"
        }}
        onMouseDown={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"
        }}
      >
        选择文件
      </button>
    </div>
  )
}
