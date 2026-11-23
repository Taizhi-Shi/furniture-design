import React from "react"
import NavBar from "../components/NavBar"

function EngineIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8M8 13h5M8 17h3M9 2v3M15 2v3" /></svg>
}

function DatabaseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <NavBar />
      <main className="about-shell">
        <section className="about-introduction">
          <h2>平台介绍</h2>
          <div>
            <p>EcoDesign 是一款面向家具设计过程的可持续设计辅助平台，旨在将人工智能技术与生命周期评价（Life Cycle Assessment，LCA）方法相结合，为设计师提供从家具材料识别、制造工艺分析到环境影响评价的一体化支持。</p>
            <p>传统生命周期评价通常需要专业人员手动整理材料清单、匹配背景数据库并建立产品系统，操作复杂，难以直接融入家具设计流程。本平台通过AI辅助识别、参数化建模与生命周期数据库映射，降低LCA应用门槛，帮助设计师在设计阶段识别环境影响热点，为材料选择、工艺调整和可持续设计优化提供参考。</p>
          </div>
        </section>

        <section className="about-technology">
          <h2>技术支持</h2>
          <div className="about-card-grid">
            <article className="about-tech-card">
              <div className="about-tech-icon"><EngineIcon /></div>
              <div><span>LCA计算引擎</span><h3>openLCA 2.7.0</h3><p>采用openLCA作为生命周期建模与环境影响计算工具，通过本地IPC接口支持过程查询、产品系统构建及LCIA计算。</p></div>
            </article>
            <article className="about-tech-card">
              <div className="about-tech-icon"><DatabaseIcon /></div>
              <div><span>生命周期数据库</span><h3>ecoinvent 3.12 — Cut-off Unit</h3><p>为材料生产、能源供应、运输、加工服务及废弃物处理等生命周期活动提供背景清单数据。具体材料与过程的适用性需要经过匹配审核。</p></div>
            </article>
          </div>
        </section>

        <footer className="about-notice">
          <p>EcoDesign 当前为研究开发中的原型平台。部分AI识别结果、制造参数及生命周期情景采用工程模拟数据，环境评价结果应结合数据库代表性、模型边界及不确定性进行解释。</p>
        </footer>
      </main>
    </div>
  )
}
