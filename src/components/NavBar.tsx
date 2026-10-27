import React from "react"

const NAV_LINKS = ["分析", "材料库", "工艺库", "案例", "报告", "帮助中心"]

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="7.5" cy="7.5" rx="2.5" ry="6" stroke="currentColor" strokeWidth="1.1" />
      <line x1="1.5" y1="7.5" x2="13.5" y2="7.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function NavBar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "60px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#111111",
          letterSpacing: "-0.02em",
          userSelect: "none",
          marginRight: "56px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        EcoDesign
      </span>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: "36px", flex: 1 }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: "14px",
              color: "#6B7280",
              textDecoration: "none",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = "#111111"
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = "#6B7280"
            }}
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Language picker */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "13px",
            color: "#6B7280",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = "#111111"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = "#6B7280"
          }}
        >
          <GlobeIcon />
          <span>中文</span>
          <ChevronDown />
        </button>

        {/* User avatar + name */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#4B5563",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = "#111111"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = "#4B5563"
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#1F2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            T
          </div>
          <span>Taizhi Shi</span>
          <ChevronDown />
        </button>
      </div>
    </header>
  )
}
