import React, { useState } from "react"
import HomePage from "./pages/HomePage"
import AnalysisUploadPage from "./pages/AnalysisUploadPage"
import MaterialRecognitionPage from "./pages/MaterialRecognitionPage"
import ManufacturingRecognitionPage from "./pages/ManufacturingRecognitionPage"
import LifecycleParametersPage from "./pages/LifecycleParametersPage"
import LcaReportPage from "./pages/LcaReportPage"
import HistoryReportsPage from "./pages/HistoryReportsPage"
import AboutPage from "./pages/AboutPage"
import VersionComparisonPage from "./pages/VersionComparisonPage"
import { NavigationContext, type NavigationDestination } from "./components/NavigationContext"

type PageName = "home" | "analysis-upload" | "material-recognition" | "manufacturing-recognition" | "lifecycle-parameters" | "lca-report" | "history" | "comparison" | "about"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageName>("home")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [reportBackPage, setReportBackPage] = useState<PageName>("lifecycle-parameters")

  const handleFileSelect = (file: File) => {
    setUploadedFile(file)
    setCurrentPage("analysis-upload")
  }

  const navigate = (destination: NavigationDestination) => setCurrentPage(destination)

  let content: React.ReactNode

  if (currentPage === "manufacturing-recognition") {
    content = (
      <ManufacturingRecognitionPage
        onBack={() => setCurrentPage("material-recognition")}
        onNext={() => setCurrentPage("lifecycle-parameters")}
      />
    )
  } else if (currentPage === "lifecycle-parameters") {
    content = (
      <LifecycleParametersPage
        onBack={() => setCurrentPage("manufacturing-recognition")}
        onNext={() => {
          setReportBackPage("lifecycle-parameters")
          setCurrentPage("lca-report")
        }}
      />
    )
  } else if (currentPage === "lca-report") {
    content = <LcaReportPage onBack={() => setCurrentPage(reportBackPage)} />
  } else if (currentPage === "material-recognition") {
    content = (
      <MaterialRecognitionPage
        onBack={() => setCurrentPage("analysis-upload")}
        onNext={() => setCurrentPage("manufacturing-recognition")}
      />
    )
  } else if (currentPage === "analysis-upload") {
    content = (
      <AnalysisUploadPage
        file={uploadedFile}
        onBack={() => {
          setCurrentPage("home")
          setUploadedFile(null)
        }}
        onNext={() => setCurrentPage("material-recognition")}
      />
    )
  } else if (currentPage === "history") {
    content = <HistoryReportsPage onViewReport={() => {
      setReportBackPage("history")
      setCurrentPage("lca-report")
    }} />
  } else if (currentPage === "about") {
    content = <AboutPage />
  } else if (currentPage === "comparison") {
    content = <VersionComparisonPage />
  } else {
    content = <HomePage onFileSelect={handleFileSelect} />
  }

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {content}
    </NavigationContext.Provider>
  )
}
