export function downloadDemoReport() {
  const content =
    "EcoDesign LCA Analysis Report\nDEMO DATA\nProduct: Armchair\nEnvironmental score: 68/100\nGWP: 48.7 kg CO2-eq"
  const url = URL.createObjectURL(new Blob([content], { type: "application/pdf" }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "EcoDesign-LCA-Report-demo.pdf"
  anchor.click()
  URL.revokeObjectURL(url)
}
