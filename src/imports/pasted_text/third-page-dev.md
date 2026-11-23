现在继续开发我的「AI驱动可持续家具设计与LCA分析平台」。

目前你已经完成了：

* 第一个界面：Home / 首页
* 第二个界面：第二阶段页面

现在我要继续开发：

**第三个界面。**

我会同时上传第三个界面的【高保真 Figma 原型 / UI 设计图】。

你的任务是：

**在不破坏前两个页面的前提下，将第三个高保真 Figma 原型准确实现为真实、可运行、可交互的 React + TypeScript 页面。**

---

# 一、最高优先级：第三个原型是 Visual Source of Truth

本次开发请严格遵循：

**第三个界面的高保真 Figma 原型**

>

**前两个页面已经建立的 Design System / Components**

>

**你的默认 UI 设计习惯**

第三个 Figma 原型是这个页面的：

**Visual Source of Truth（唯一视觉依据）**

请尽可能 1:1 还原。

重点还原：

* 页面整体布局
* 页面结构
* Header
* Navigation
* Sidebar
* Main Content
* Section
* Card
* Button
* Input
* Select
* Dropdown
* Tabs
* Table
* Upload Area
* Stepper
* Progress
* Badge
* Modal
* Dialog
* Icon
* Typography
* Font Size
* Font Weight
* Line Height
* Color
* Background
* Border
* Border Radius
* Shadow
* Padding
* Margin
* Gap
* 图片尺寸
* 图片比例
* 图片裁切
* 元素位置
* 信息层级
* 页面留白

**不要重新设计我的页面。**

不要因为你认为某种布局更符合 UX，就擅自改变原型。

---

# 二、这是同一个产品，不是新的网页

非常重要。

现在已经有两个页面。

第三个页面必须和前两个页面看起来属于：

**同一个产品 / 同一个 Design System / 同一个 Design Language。**

请先检查当前项目已有代码。

识别并继续使用已经存在的：

* Color Tokens
* Typography
* Spacing
* Border Radius
* Shadows
* Buttons
* Cards
* Inputs
* Navigation
* Header
* Sidebar
* Modal
* Icons
* Layout
* Responsive Rules

如果已经存在对应 Component：

**直接复用。**

不要因为第三个页面重新创建一套：

* Button
* Card
* Input
* Header
* Sidebar
* Navigation

---

# 三、不要破坏前两个页面

本次修改必须保持：

**Home 页面正常。**

**第二个页面正常。**

不要因为第三个页面的开发：

* 改变 Home 的视觉效果
* 改变第二个页面的布局
* 修改已有 Component 导致旧页面出现问题
* 删除已有 Route
* 删除已有功能
* 重构整个项目而导致已有页面失效

如果第三个页面需要新的功能：

优先：

**新增 Component / Variant / Style**

而不是破坏已有页面。

完成后请检查：

**Home → 第二个页面 → 第三个页面**

三个页面都可以正常访问。

---

# 四、当前只实现第三个页面

当前任务：

**只实现第三个界面。**

不要继续开发第四个、第五个页面。

不要主动实现完整 LCA 系统。

不要提前实现：

* 后续页面
* 真实 AI
* 真实数据库
* 真实 LCA Calculation
* ecoinvent
* GaBi
* ELCD
* openLCA
* Gemini API

当前仍然是：

**Frontend UI + Demo Interaction**

---

# 五、先分析原型，再 Coding

在开始修改代码之前，请先分析我上传的第三个高保真原型。

请分析：

## 1. Page Structure

识别：

* Header
* Navigation
* Sidebar
* Main Content
* Sections
* Cards
* Footer
* Modal
* Overlay

以及它们之间的层级关系。

---

## 2. Component Hierarchy

识别：

### 已有 Component

可以直接从前两个页面复用。

### 新 Component

第三个页面独有，需要新增。

### Future Reusable Component

未来第四、第五个页面可能继续使用。

不要为了组件化而过度拆分。

只抽象真正有复用价值的组件。

---

## 3. Design System

分析：

* Colors
* Typography
* Font Size
* Font Weight
* Line Height
* Spacing
* Border
* Border Radius
* Shadow
* Icon
* Button State
* Input State
* Card Style

如果这些元素已经存在于前两个页面：

**优先使用已有 Design System。**

如果第三个 Figma 原型存在新的特殊设计：

在不破坏已有设计系统的情况下进行扩展。

---

# 六、交互要求

第三个页面不能只是一个静态页面。

请根据 Figma 原型实现真实的 Frontend Interaction。

如果页面存在：

* Button
* Tab
* Dropdown
* Input
* Checkbox
* Radio
* Toggle
* Upload
* Drag & Drop
* Modal
* Dialog
* Edit
* Delete
* Continue
* Back
* Navigation

都应该具有合理的 Demo Interaction。

例如：

点击 Button：

→ 改变 UI State
→ 打开 Modal
→ 切换 Tab
→ 显示下一步状态
→ 或进入 Placeholder Route

具体行为以第三个页面原型中的逻辑为准。

---

# 七、如果第三个页面涉及家具 / 材料 / AI识别

这是一个：

**AI-driven Sustainable Furniture Design & LCA Platform**

完整流程是：

Upload Furniture
→ AI Recognition
→ User Confirmation
→ Material
→ Manufacturing
→ Transportation
→ Use Phase
→ End of Life
→ LCA Analysis
→ LCA Result
→ Eco-design Recommendation
→ Scenario Comparison

如果第三个页面属于上述流程中的某一个阶段：

请严格按照当前页面原型实现。

可以使用：

**Mock Data**

例如：

* Furniture Name
* Material
* Quantity
* Weight
* Percentage
* Manufacturing Data
* Transportation Data
* AI Recognition Result
* Environmental Data

但是：

**这些只能作为 Demo Data。**

不能声称这些是实际计算得到的 LCA 数据。

---

# 八、AI功能

如果第三个页面存在 AI 相关功能：

例如：

* AI Recognition
* AI Analysis
* AI Detection
* Material Recognition
* AI Suggestion
* Generate
* Analyze

当前不要连接：

**Gemini API**

也不要实现真正的 AI 模型。

只实现：

**UI + Demo State + Mock Result**

例如：

点击 Analyze：

→ Loading
→ Demo Processing State
→ Mock Result

并确保代码结构未来可以方便替换成真实 API。

---

# 九、数据结构

不要把大量动态数据直接写死在 JSX。

例如：

不要大量出现：

```tsx
<div>Oak Wood</div>
<div>Steel</div>
<div>Plastic</div>
```

应该尽量：

```tsx
const materials = [...]
```

再通过 Component 渲染。

类似：

* Furniture Data
* Material Data
* Project Data
* AI Result
* Table Data
* Dropdown Options
* Status
* Statistics
* Navigation Items

都尽量与 UI Component 分离。

这样未来接入真实 API 时，可以直接替换 Data Source。

---

# 十、技术要求

继续使用：

**React + TypeScript**

并保持：

**Component-based Architecture**

不要为了第三个页面改变当前项目技术栈。

不要重新安装大量不必要的依赖。

如果项目已经使用某个 UI / Icon / CSS 方案：

**继续使用当前项目已有方案。**

不要为了第三个页面擅自更换技术栈。

---

# 十一、代码结构

继续沿用当前项目已有的合理结构。

例如：

```text
src/
├── pages/
├── components/
├── layouts/
├── data/
├── hooks/
├── utils/
└── ...
```

不要求你必须严格使用这个目录。

如果现有项目已经有更好的结构：

**继续沿用。**

核心原则：

* Page 与 Components 分离
* UI 与 Data 适当分离
* 可复用 Component 独立
* 避免巨大 Component
* 避免重复代码
* TypeScript 类型清晰

---

# 十二、Responsive

优先保证：

### Desktop

与高保真 Figma 原型尽可能一致。

同时考虑：

* Laptop
* Tablet

不要为了 Responsive 改变核心设计。

允许：

* 调整 Grid
* 调整 Column
* 调整 Gap
* 调整 Container
* Stack Layout

但是：

**不要把 Desktop 页面变成完全不同的设计。**

---

# 十三、图片与图标

如果第三个原型存在图片：

优先使用项目已有 Asset。

保持：

* 比例
* 尺寸关系
* Crop
* Position
* Radius

如果没有对应 Asset：

使用合理 Placeholder。

不要因为缺少图片而改变整个 Layout。

如果存在 Icon：

优先使用当前项目已有 Icon System。

**不要使用 Emoji 代替 UI Icon。**

不要随意使用风格不一致的 Icon。

---

# 十四、不要增加原型中不存在的内容

除非交互确实需要，否则不要自行添加：

* Dashboard
* AI Chat
* Analytics
* Extra Cards
* Extra Buttons
* Extra Statistics
* Extra Navigation
* Marketing Banner
* Notification Center
* 其他页面入口

**Figma 中没有的，不要自己创造。**

---

# 十五、页面之间的 Navigation

如果第三个页面需要从前两个页面进入：

请建立合理的 Frontend Route。

例如：

Home
→ 第二个页面
→ 第三个页面

如果当前项目已经存在 Router：

**继续使用已有 Router。**

不要创建第二套 Routing System。

如果需要返回：

Back

应该能够正常回到前一个页面。

但不要因为第三个页面而提前实现后续完整流程。

---

# 十六、完成后进行 Visual QA

完成第三个页面以后，请严格对照 Figma 检查：

□ Page Structure 一致
□ Layout 一致
□ Element Position 一致
□ Typography 一致
□ Font Size 一致
□ Font Weight 一致
□ Line Height 一致
□ Colors 一致
□ Spacing 一致
□ Padding / Margin 一致
□ Button 一致
□ Card 一致
□ Input 一致
□ Icon 一致
□ Image 一致
□ Border 一致
□ Radius 一致
□ Shadow 一致
□ Active 状态一致
□ Selected 状态一致
□ Hover 状态合理
□ 没有明显 Overflow

---

# 十七、完成后进行产品 QA

请同时检查：

□ Home 页面仍然正常
□ 第二个页面仍然正常
□ 第三个页面可以正常访问
□ Navigation 正常
□ Button 正常
□ Input 正常
□ Dropdown 正常
□ Modal 正常（如果存在）
□ Upload 正常（如果存在）
□ Demo Data 正常
□ 页面刷新不会崩溃
□ 没有明显 TypeScript Error
□ 没有明显 Console Error
□ 没有明显 Layout Error
□ 没有连接真实后端
□ 没有连接 Gemini API
□ 没有实现真实 LCA Calculation
□ 没有虚构真实 LCA 数据

---

# 十八、最终目标

现在我们的开发方式是：

**第一个高保真原型**
↓
**Home Frontend**

**第二个高保真原型**
↓
**第二个 Frontend**

**第三个高保真原型**
↓
**第三个 Frontend**

三个页面必须逐渐形成：

**一个完整、统一、可维护的 React 产品前端。**

最终这个前端还会继续进入：

**Google AI Studio**

进行后续：

* Backend
* API
* Database
* Gemini
* AI Recognition
* LCA Calculation
* LCA Database
* User / Project Management

所以现在请：

**保持代码干净、组件化、可扩展，不要为了快速做出视觉效果而把代码写成一次性 Demo。**

---

# 十九、最终指令

请：

1. 读取我上传的第三个高保真 Figma 原型
2. 分析 Page Structure
3. 分析 Component Hierarchy
4. 分析 Design System
5. 检查前两个页面已有 Components
6. 尽可能复用已有 Components
7. 实现第三个页面
8. 实现必要的 Demo Interaction
9. 保持三个页面视觉一致
10. 检查 Home 和第二个页面没有被破坏
11. 完成 Visual QA
12. 完成 Product QA

**当前只完成第三个界面。**

完成后停止。

**不要继续开发第四个页面，等待我的下一步指令。**
