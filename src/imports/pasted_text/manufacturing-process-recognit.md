现在继续开发我的「AI驱动可持续家具设计与LCA分析平台」。

目前已经完成：

* 第一个界面：Home / 首页
* 第二个界面
* 第三个界面

现在我要继续开发：

# 第四个界面：工艺识别 / Manufacturing Process Recognition

我会同时上传第四个界面的【高保真 Figma 原型 / UI 设计图】。

请将我上传的高保真原型作为这个页面的：

**Visual Source of Truth（唯一视觉依据）**

你的任务不是重新设计这个页面，而是：

**在保持前面三个页面 Design System 一致的基础上，将第四个“工艺识别”高保真原型准确实现为真实、可运行、可交互的 React + TypeScript 页面。**

---

# 一、最高优先级：严格还原 Figma

请尽可能 1:1 还原我上传的第四个界面。

严格还原：

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
* Dropdown
* Tabs
* Stepper
* Progress
* Status
* AI Recognition Area
* Result Area
* Confirmation Area
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
* 图片比例
* 图片位置
* 信息层级
* 页面留白

**不要重新设计。**

不要因为你认为某种布局更符合 UX，就改变我的 Figma。

不要增加 Figma 中没有的视觉元素。

如果 Figma 中已经存在某个 Component：

**优先按照 Figma 实现。**

---

# 二、第四个页面必须属于同一个产品

这是一个连续的产品，而不是四个独立网页。

因此：

第四个页面必须和前面三个页面保持统一的：

* Design Language
* Color System
* Typography
* Spacing
* Component Style
* Navigation
* Layout
* Interaction Pattern

请首先检查当前项目已有代码。

优先复用：

* Button
* Card
* Input
* Select
* Dropdown
* Header
* Sidebar
* Navigation
* Modal
* Dialog
* Badge
* Stepper
* Progress
* FilePreview
* Layout

不要重新建立第二套设计系统。

---

# 三、不要破坏前面三个页面

这是非常重要的要求。

本次开发第四个页面时：

**不能破坏 Home、第二个页面、第三个页面。**

不要：

* 修改已有页面布局
* 修改已有页面颜色
* 修改已有页面 Typography
* 删除已有 Route
* 删除已有 Component
* 改变已有页面的交互
* 修改共享 Component 导致前面页面视觉变化

如果第四个页面需要新的样式：

优先创建：

**New Component / Variant**

而不是直接修改已有页面。

完成后必须检查：

**Home → 第二个页面 → 第三个页面 → 第四个页面**

都可以正常访问。

---

# 四、当前只开发第四个页面

现在只开发：

**Manufacturing Process Recognition / 工艺识别**

不要提前实现：

* 第五个页面
* Material Analysis
* Manufacturing Detail
* Transportation
* Use Phase
* End of Life
* LCA Analysis
* LCA Result
* Eco-design Recommendation
* Scenario Comparison
* Project History

后续页面等待我的下一步指令。

---

# 五、这个页面在产品中的作用

整个产品流程是：

Upload Furniture
→ AI Recognition
→ User Confirmation
→ Material
→ Manufacturing Process Recognition
→ Manufacturing
→ Transportation
→ Use Phase
→ End of Life
→ LCA Analysis
→ LCA Result
→ Eco-design Recommendation
→ Scenario Comparison

第四个页面的核心任务是：

**根据家具图片 / 模型 / 前序识别结果，对家具可能采用的制造工艺进行 AI 辅助识别，并让用户确认或修改识别结果。**

当前只实现：

**Frontend UI + Demo Interaction + Mock Data**

不要实现真实 AI。

---

# 六、工艺识别页面的核心交互

如果我的 Figma 原型中包含以下内容，请严格按照原型实现。

例如：

### AI Recognition

用户可以点击：

* Analyze
* Recognize
* AI Recognition
* Start Analysis

点击之后可以显示：

**Loading / Processing State**

然后进入：

**Mock Recognition Result**

---

### Recognition Result

如果原型中存在识别结果：

可以使用 Mock Data。

例如：

```text
Cutting
CNC Machining
Drilling
Sanding
Edge Banding
Assembly
Surface Finishing
```

但这些只是：

**Demo / Mock Data**

不能声称这是通过真实 AI 识别得到的结果。

---

# 七、工艺识别结果必须支持 User Confirmation

如果 Figma 中存在：

* Confirm
* Edit
* Add
* Remove
* Modify
* Accept
* Reject

请实现真实的 Frontend Interaction。

例如：

AI Result

→ 用户查看识别结果

→ 用户可以修改

→ 用户可以删除错误工艺

→ 用户可以添加遗漏工艺

→ 用户确认

→ 保存当前 Demo State

最终形成：

**AI Suggestion → Human Confirmation**

而不是：

**AI 自动决定最终结果。**

---

# 八、工艺数据结构

请不要把工艺识别结果全部硬编码在 JSX 中。

建议使用类似的数据结构：

```tsx
type ManufacturingProcess = {
  id: string;
  name: string;
  category?: string;
  confidence?: number;
  status?: "ai-suggested" | "confirmed" | "edited";
};
```

例如：

```tsx
const mockProcesses = [
  {
    id: "1",
    name: "CNC Machining",
    category: "Machining",
    confidence: 0.92,
    status: "ai-suggested",
  },
  {
    id: "2",
    name: "Sanding",
    category: "Surface Treatment",
    confidence: 0.87,
    status: "ai-suggested",
  },
];
```

具体字段以我的 Figma 页面实际需求为准。

不要强行增加原型中不存在的数据展示。

这些数据未来应该可以很容易替换成：

**Real AI API Response**

---

# 九、不要现在连接真实 AI

非常重要。

当前不要连接：

* Gemini API
* Gemini Vision
* OpenAI API
* Claude API
* 任何真实 AI API

不要实现真实：

* Image Recognition
* Manufacturing Process Recognition
* Material Recognition
* 3D Recognition

当前使用：

**Mock AI Recognition**

可以模拟：

```text
Analyzing furniture...
↓
Identifying manufacturing processes...
↓
Recognition completed
↓
Results displayed
```

但这是纯 Demo State。

---

# 十、如果原型中存在 Confidence Score

如果 Figma 中设计了：

* Confidence
* AI Confidence
* Probability
* Recognition Score

可以使用 Demo Data。

例如：

* 92%
* 87%
* 81%

但是请明确：

这些是：

**Mock / Demo Confidence**

不要声称这是实际模型输出。

---

# 十一、如果页面包含家具图片

如果第四个页面需要显示前序上传的家具：

优先复用前面页面已经产生的：

**Demo Furniture Data / Image State**

不要重新设计一个新的上传流程，除非 Figma 原型本身包含上传入口。

例如可以保持：

```text
Furniture Image
Furniture Name
File Name
Recognition Status
```

具体以 Figma 原型为准。

---

# 十二、如果页面包含 Manufacturing Process Timeline

如果原型中存在工艺流程：

例如：

Furniture
↓
Cutting
↓
Machining
↓
Sanding
↓
Assembly
↓
Finishing

请按照 Figma 原型实现。

如果存在：

* Step
* Timeline
* Process Flow
* Process Card
* Process Sequence

必须准确还原视觉结构。

如果允许用户调整顺序：

实现 Demo Drag / Move / Reorder Interaction。

如果原型没有这样的交互：

不要自行添加。

---

# 十三、如果页面存在 Process Card

如果每个工艺以 Card 形式展示：

请严格还原：

* Card Size
* Card Position
* Icon
* Process Name
* Category
* Confidence
* Status
* Edit
* Delete
* Spacing

不要自行增加额外的信息。

---

# 十四、页面状态

如果原型设计了多个状态，请实现：

### Initial State

用户进入页面。

↓

### Processing State

AI 正在识别。

↓

### Result State

显示 AI 识别结果。

↓

### Editing State

用户修改结果。

↓

### Confirmed State

用户确认结果。

这些状态都应该是：

**Frontend Demo State**

不需要真实 AI。

---

# 十五、数据与 UI 分离

请保持：

**Data ≠ UI**

不要把所有数据直接写在 JSX 中。

建议：

```text
data/
  manufacturingProcesses.ts
```

以及：

```text
components/
  ManufacturingProcessCard.tsx
  RecognitionResult.tsx
  ProcessList.tsx
```

具体文件结构请根据当前项目已有结构决定。

如果已有合理结构：

**继续沿用，不要为了示例而重构整个项目。**

---

# 十六、Reusable Components

如果第四个页面出现未来会复用的组件：

请抽象成 Reusable Component。

例如：

* ProcessCard
* RecognitionResult
* ConfidenceBadge
* StatusBadge
* ProcessList
* Stepper
* ProgressBar
* EditDialog
* ConfirmDialog

但不要过度组件化。

真正有复用价值的才抽象。

---

# 十七、Navigation

如果第四个页面需要：

Back
Continue
Next
Previous

请按照 Figma 实现。

如果项目已经使用 Router：

继续使用现有 Router。

不要建立新的 Routing System。

页面流程可以保持：

**Previous Page → Manufacturing Process Recognition → Next Placeholder**

但是不要提前开发下一完整页面。

---

# 十八、Responsive

优先保证：

**Desktop**

与我的高保真 Figma 原型尽可能一致。

同时合理支持：

* Laptop
* Tablet

Responsive 时：

不要改变核心设计。

允许：

* Grid 调整
* Column 调整
* Gap 调整
* Container 调整
* Card Stack

但不能让 Responsive 版本变成完全不同的设计。

---

# 十九、Icons 与 Assets

如果项目已经存在：

* Icon
* Image
* Logo
* Furniture Image
* Illustration

优先复用。

如果没有对应 Asset：

使用合理 Placeholder。

不要使用 Emoji 代替专业 UI Icon。

不要使用与现有产品风格不一致的 Icon。

---

# 二十、不要增加原型中没有的功能

不要自行增加：

* AI Chatbot
* Dashboard
* Analytics
* Extra Statistics
* Notification Center
* Extra Cards
* Extra Navigation
* Marketing Banner
* Chat Window
* LCA Chart

除非这些内容明确出现在我上传的第四个 Figma 原型中。

**Figma 中没有的，不要自己创造。**

---

# 二十一、技术要求

继续使用：

**React + TypeScript**

保持：

**Component-based Architecture**

不要改变当前项目技术栈。

不要因为第四个页面重新安装大量依赖。

继续使用当前项目已经存在的：

* Styling System
* Router
* Icon Library
* UI Components
* Utilities

---

# 二十二、代码质量

请确保：

* TypeScript 没有明显错误
* 没有明显 Console Error
* 没有重复代码
* 不使用不必要的复杂依赖
* Page 与 Components 分离
* Data 与 UI 适当分离
* 页面刷新正常
* Route 正常
* 没有明显 Layout Overflow
* 不影响前面三个页面

---

# 二十三、实现顺序

请严格按照以下步骤执行：

### Step 1

读取我上传的第四个高保真 Figma 原型。

### Step 2

分析：

* Page Structure
* Component Hierarchy
* Design System
* Interaction
* Page States
* Responsive Strategy

### Step 3

检查前面三个页面已有：

* Components
* Design Tokens
* Layout
* Router
* Data Structure

### Step 4

判断哪些 Component 可以复用。

### Step 5

创建第四个页面所需要的新 Component。

### Step 6

实现第四个页面视觉。

### Step 7

实现：

**AI Recognition Demo State**

### Step 8

实现：

**User Confirmation / Edit State**

如果这些交互出现在 Figma 中。

### Step 9

连接页面 Navigation。

### Step 10

进行 Visual QA。

### Step 11

进行 Product QA。

---

# 二十四、Visual QA

完成后严格对照我的 Figma：

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
□ Border Radius 一致
□ Shadow 一致
□ AI Recognition Area 一致
□ Process Card 一致
□ Status 一致
□ Result Area 一致
□ Confirmation Area 一致

---

# 二十五、Product QA

完成后检查：

□ Home 页面正常
□ 第二个页面正常
□ 第三个页面正常
□ 第四个页面正常
□ Navigation 正常
□ Back 正常
□ Continue 正常
□ AI Demo Interaction 正常
□ Loading State 正常
□ Recognition Result 正常
□ Edit 正常（如果存在）
□ Delete 正常（如果存在）
□ Add 正常（如果存在）
□ Confirm 正常（如果存在）
□ Mock Data 正常
□ 页面刷新不会崩溃
□ 没有明显 TypeScript Error
□ 没有明显 Console Error
□ 没有明显 Layout Error
□ 没有连接真实 AI API
□ 没有连接真实数据库
□ 没有实现真实 LCA Calculation
□ 没有虚构真实 LCA 数据

---

# 二十六、最终产品逻辑

请把第四个页面理解为：

**AI-Assisted Manufacturing Process Recognition**

而不是：

**Fully Automated Manufacturing Decision**

核心交互应该体现：

**AI Suggestion**
↓
**User Review**
↓
**User Edit**
↓
**User Confirmation**
↓
**Confirmed Manufacturing Process Data**

这样未来这些数据才能继续进入：

**Manufacturing**
↓
**LCA Calculation**
↓
**LCA Result**

---

# 二十七、最终目标

最终希望形成：

Home
↓
第二个页面
↓
第三个页面
↓
**Manufacturing Process Recognition**
↓
后续 LCA 流程

所有页面应该：

**共享同一个 Design System**

**共享同一个 Component Architecture**

**共享同一个 Frontend Architecture**

同时保留未来接入：

* Gemini
* AI Recognition
* LCA Database
* LCA Calculation
* Backend
* API
* User / Project Management

的能力。

---

# 二十八、最终指令

现在请：

1. 读取我上传的第四个高保真 Figma 原型
2. 分析页面结构
3. 分析组件层级
4. 分析 Design System
5. 检查前面三个页面
6. 尽可能复用已有 Components
7. 实现第四个工艺识别页面
8. 实现原型中需要的 AI Demo Interaction
9. 实现用户确认 / 编辑交互
10. 保持前四个页面视觉一致
11. 检查前面三个页面没有被破坏
12. 完成 Visual QA
13. 完成 Product QA

**当前只完成第四个界面：Manufacturing Process Recognition。**

不要继续开发第五个界面。

完成后停止，等待我的下一步指令。
