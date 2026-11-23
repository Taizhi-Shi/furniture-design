import React, { useMemo, useState } from "react"
import NavBar from "../components/NavBar"
import chairImage from "@/imports/1b810446-e48b-47af-8f2d-893a48b42375.png"
import rattanImage from "@/imports/322f9a0a-9d08-4127-8c3e-843447cfc412.png"
import { downloadDemoReport } from "../utils/reportExport"

type HistoryReportsPageProps = {
  onViewReport: () => void
}

type ReportRecord = {
  id: number
  name: string
  description: string
  version: string
  scope: string
  productType: string
  createdAt: string
  image: string
}

const REPORTS: ReportRecord[] = [
  { id: 1, name: "Elegant Chair", description: "简约软包单椅", version: "V3 Partial · 部分废弃", scope: "材料 + 制造 + 运输 + 使用 + 废弃（部分）", productType: "单椅", createdAt: "2025-01-20", image: chairImage },
  { id: 2, name: "Elegant Chair", description: "简约软包单椅", version: "V2 · 增加运输", scope: "材料 + 制造 + 运输", productType: "单椅", createdAt: "2024-12-28", image: chairImage },
  { id: 3, name: "Elegant Chair", description: "简约软包单椅", version: "V1 · 材料与制造", scope: "材料 + 制造", productType: "单椅", createdAt: "2024-12-15", image: chairImage },
  { id: 4, name: "Rattan Stool", description: "藤编边几", version: "V1 · 基准情景", scope: "材料 + 制造 + 使用", productType: "边几", createdAt: "2024-11-30", image: rattanImage },
]

function SearchIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m12.5 12.5 4 4" /></svg>
}

function EyeIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2 9s2.5-4 7-4 7 4 7 4-2.5 4-7 4-7-4-7-4Z" /><circle cx="9" cy="9" r="1.8" /></svg>
}

function DownloadIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 2.5v8m0 0 3-3m-3 3-3-3M3 12v3h12v-3" /></svg>
}

function TrashIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 5h11M7 5V3.5h4V5m2 0-.6 10h-6.8L5 5m3 3v4.5m2-4.5v4.5" /></svg>
}

function ChevronIcon({ direction = "down" }: { direction?: "down" | "left" | "right" }) {
  const path = direction === "left" ? "m11 4-5 5 5 5" : direction === "right" ? "m7 4 5 5-5 5" : "m4 7 5 5 5-5"
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d={path} /></svg>
}

export default function HistoryReportsPage({ onViewReport }: HistoryReportsPageProps) {
  const [reports, setReports] = useState(REPORTS)
  const [search, setSearch] = useState("")
  const [productType, setProductType] = useState("全部")
  const [dateRange, setDateRange] = useState("最近一年")
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredReports = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    const latestDate = reports.length > 0 ? Math.max(...reports.map((report) => new Date(report.createdAt).getTime())) : Date.now()
    const days = dateRange === "最近半年" ? 183 : dateRange === "最近一年" ? 366 : Number.POSITIVE_INFINITY
    return reports.filter((report) => {
      const matchesSearch = !query || `${report.name} ${report.description}`.toLocaleLowerCase().includes(query)
      const matchesType = productType === "全部" || report.productType === productType
      const ageInDays = (latestDate - new Date(report.createdAt).getTime()) / 86400000
      return matchesSearch && matchesType && ageInDays <= days
    }).sort((a, b) => {
      const difference = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      return sortDirection === "asc" ? difference : -difference
    })
  }, [dateRange, productType, reports, search, sortDirection])

  const pageCount = Math.max(1, Math.ceil(filteredReports.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const visibleReports = filteredReports.slice((safePage - 1) * pageSize, safePage * pageSize)

  const updateFilter = (setter: (value: string) => void, value: string) => {
    setter(value)
    setPage(1)
  }

  const deleteReport = (report: ReportRecord) => {
    if (!window.confirm(`确定删除“${report.name} ${report.version}”吗？`)) return
    setReports((current) => current.filter((item) => item.id !== report.id))
  }

  return (
    <div className="history-page">
      <NavBar />
      <main className="history-shell">
        <section className="history-filters" aria-label="筛选历史报告">
          <label className="history-search">
            <SearchIcon />
            <input value={search} onChange={(event) => updateFilter(setSearch, event.target.value)} placeholder="搜索项目名称或备注" />
          </label>
          <label className="history-filter"><span>产品类型</span><span className="history-select-wrap"><select value={productType} onChange={(event) => updateFilter(setProductType, event.target.value)}><option>全部</option><option>单椅</option><option>边几</option></select><ChevronIcon /></span></label>
          <label className="history-filter"><span>创建时间</span><span className="history-select-wrap"><select value={dateRange} onChange={(event) => updateFilter(setDateRange, event.target.value)}><option>最近一年</option><option>最近半年</option><option>全部时间</option></select><ChevronIcon /></span></label>
        </section>

        <section className="history-table-card">
          <div className="history-table-scroll">
            <table className="history-table">
              <thead><tr>
                <th>项目名称</th><th>模型版本 / 分析范围</th>
                <th><button className="history-sort" onClick={() => setSortDirection((current) => current === "desc" ? "asc" : "desc")}>创建时间 <span className={sortDirection === "asc" ? "history-sort-icon history-sort-icon--asc" : "history-sort-icon"}>↕</span></button></th>
                <th>操作</th>
              </tr></thead>
              <tbody>
                {visibleReports.map((report) => (
                  <tr key={report.id}>
                    <td><div className="history-project"><div className="history-thumbnail"><img src={report.image} alt="" /></div><div><strong>{report.name}</strong><span>{report.productType} · {report.description}</span></div></div></td>
                    <td><div className="history-version"><strong>{report.version}</strong><span>{report.scope}</span></div></td>
                    <td className="history-date">{report.createdAt}</td>
                    <td><div className="history-actions"><button onClick={onViewReport}><EyeIcon />查看详情</button><button onClick={downloadDemoReport}><DownloadIcon />导出 PDF</button><button className="history-delete-action" onClick={() => deleteReport(report)}><TrashIcon />删除</button></div></td>
                  </tr>
                ))}
                {visibleReports.length === 0 && <tr><td colSpan={4} className="history-empty">没有符合当前筛选条件的记录</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="history-pagination">
            <span>共 {filteredReports.length} 条记录</span>
            <div>
              <button aria-label="上一页" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronIcon direction="left" /></button>
              <button className="history-current-page">{safePage}</button>
              <button aria-label="下一页" disabled={safePage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}><ChevronIcon direction="right" /></button>
              <span className="history-page-size"><select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}><option value={10}>10 条/页</option><option value={20}>20 条/页</option></select><ChevronIcon /></span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}
