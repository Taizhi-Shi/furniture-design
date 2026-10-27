import React, { useState } from "react"
import HomePage from "./pages/HomePage"
import AnalysisUploadPage from "./pages/AnalysisUploadPage"
import MaterialRecognitionPage from "./pages/MaterialRecognitionPage"
import ManufacturingRecognitionPage from "./pages/ManufacturingRecognitionPage"
import LifecycleParametersPage from "./pages/LifecycleParametersPage"
import LcaReportPage from "./pages/LcaReportPage"

type PageName = "home" | "analysis-upload" | "material-recognition" | "manufacturing-recognition" | "lifecycle-parameters" | "lca-report"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageName>("home")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setUploadedFile(file)
    setCurrentPage("analysis-upload")
  }

  if (currentPage === "manufacturing-recognition") {
    return (
      <ManufacturingRecognitionPage
        onBack={() => setCurrentPage("material-recognition")}
        onNext={() => setCurrentPage("lifecycle-parameters")}
      />
    )
  }

  if (currentPage === "lifecycle-parameters") {
    return (
      <LifecycleParametersPage
        onBack={() => setCurrentPage("manufacturing-recognition")}
        onNext={() => setCurrentPage("lca-report")}
      />
    )
  }

  if (currentPage === "lca-report") {
    return <LcaReportPage onBack={() => setCurrentPage("lifecycle-parameters")} />
  }

  if (currentPage === "material-recognition") {
    return (
      <MaterialRecognitionPage
        onBack={() => setCurrentPage("analysis-upload")}
        onNext={() => setCurrentPage("manufacturing-recognition")}
      />
    )
  }

  if (currentPage === "analysis-upload") {
    return (
      <AnalysisUploadPage
        file={uploadedFile}
        onBack={() => {
          setCurrentPage("home")
          setUploadedFile(null)
        }}
        onNext={() => setCurrentPage("material-recognition")}
      />
    )
  }

  return <HomePage onFileSelect={handleFileSelect} />
}
