import React, { useEffect, useRef, useState } from "react"
import { useAppNavigation, type NavigationDestination } from "./NavigationContext"

const NAV_LINKS: Array<{ label: string; destination?: NavigationDestination }> = [
  { label: "历史报告", destination: "history" },
  { label: "版本对比", destination: "comparison" },
  { label: "关于平台", destination: "about" },
]

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

function AccountMenuIcon({ type }: { type: "switch" | "register" | "logout" }) {
  if (type === "switch") {
    return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 5h9m0 0-2-2m2 2-2 2M13 11H4m0 0 2 2m-2-2 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
  if (type === "register") {
    return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" /><path d="M1.8 13c.4-2.2 2-3.5 4.2-3.5 1.2 0 2.2.4 3 1M12 7.8v4.5M9.8 10h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
  }
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 2.5H3.5v11H6M9.5 5 13 8l-3.5 3M13 8H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function NavBar() {
  const navigation = useAppNavigation()
  const [accountOpen, setAccountOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState("Taizhi Shi")
  const accountRef = useRef<HTMLDivElement>(null)
  const activeDestination =
    navigation?.currentPage === "history"
      ? "history"
      : navigation?.currentPage === "comparison"
        ? "comparison"
      : navigation?.currentPage === "about"
        ? "about"
        : null

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false)
    }
    document.addEventListener("mousedown", closeOnOutsideClick)
    return () => document.removeEventListener("mousedown", closeOnOutsideClick)
  }, [])

  const switchAccount = () => {
    setCurrentUser((user) => user === "Taizhi Shi" ? "Demo Designer" : "Taizhi Shi")
    setAccountOpen(false)
  }

  const registerAccount = () => {
    setAccountOpen(false)
    window.alert("当前为 DEMO DATA，注册账号功能将在账户系统接入后开放。")
  }

  const logout = () => {
    setCurrentUser("未登录")
    setAccountOpen(false)
  }

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
      <button
        type="button"
        onClick={() => navigation?.navigate("home")}
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#111111",
          letterSpacing: "-0.02em",
          userSelect: "none",
          marginRight: "56px",
          fontFamily: "Inter, sans-serif",
          padding: 0,
          border: 0,
          background: "none",
          cursor: "pointer",
        }}
      >
        EcoDesign
      </button>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: "36px", flex: 1 }}>
        {NAV_LINKS.map((link) => {
          const isActive = link.destination === activeDestination
          return (
          <button
            type="button"
            key={link.label}
            onClick={() => link.destination && navigation?.navigate(link.destination)}
            style={{
              fontSize: "14px",
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#111111" : "#6B7280",
              background: "none",
              border: 0,
              padding: "5px 0",
              cursor: link.destination ? "pointer" : "default",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.color = "#111111"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.color = isActive ? "#111111" : "#6B7280"
            }}
          >
            {link.label}
          </button>
          )
        })}
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
        <div ref={accountRef} style={{ position: "relative" }}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={accountOpen}
            onClick={() => setAccountOpen((open) => !open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: accountOpen ? "#111111" : "#4B5563",
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
              ;(e.currentTarget as HTMLButtonElement).style.color = accountOpen ? "#111111" : "#4B5563"
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
              {currentUser === "未登录" ? "访" : currentUser.charAt(0)}
            </div>
            <span>{currentUser}</span>
            <span style={{ display: "flex", transform: accountOpen ? "rotate(180deg)" : "none", transition: "transform 150ms" }}><ChevronDown /></span>
          </button>

          {accountOpen && (
            <div
              role="menu"
              style={{
                position: "absolute",
                top: "calc(100% + 12px)",
                right: 0,
                width: "164px",
                padding: "6px",
                border: "1px solid #E5E7EB",
                borderRadius: "9px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 10px 28px rgba(17, 24, 39, 0.11)",
              }}
            >
              {[
                { label: "切换账号", type: "switch" as const, action: switchAccount },
                { label: "注册账号", type: "register" as const, action: registerAccount },
                { label: "退出登录", type: "logout" as const, action: logout },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  role="menuitem"
                  onClick={item.action}
                  style={{
                    width: "100%",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "0 10px",
                    border: 0,
                    borderRadius: "6px",
                    background: "transparent",
                    color: item.type === "logout" ? "#C2413A" : "#374151",
                    fontSize: "12px",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = item.type === "logout" ? "#FFF7F6" : "#F8F9FA" }}
                  onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = "transparent" }}
                >
                  <AccountMenuIcon type={item.type} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
