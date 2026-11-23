现在继续开发我的「AI驱动可持续家具设计与LCA分析平台」。

你已经完成了第一个界面：Home / 首页。

现在我要开发第二个界面。

我会同时上传第二个界面的【高保真 Figma 原型 / UI 设计图】。

你的任务不是重新设计这个页面，而是：

基于当前已经完成的 Home 页面设计系统，将我上传的第二个高保真原型准确实现为真实、可运行、可交互的 React 前端页面。

一、最高优先级原则

本次开发请遵循以下优先级：

第二个界面的高保真 Figma 原型




当前项目已经建立的 Design System / Components




你自己的默认 UI 设计习惯

也就是说：

第二个高保真原型是这个页面的 Visual Source of Truth。

请严格按照我上传的原型实现，不要自行重新设计。

重点还原：

页面整体布局
页面结构
Header
Navigation
Sidebar
Main Content
Card
Button
Input
Select
Dropdown
Tabs
Table
Upload Area
Progress
Stepper
Modal
Dialog
Icon
Typography
Font Size
Font Weight
Line Height
Color
Background
Border
Border Radius
Shadow
Padding
Margin
Gap
图片尺寸
图片比例
元素位置
信息层级
页面留白
Active / Hover / Disabled / Selected 状态

不要把原型“优化”为你认为更好的 UI。

如果你认为某种布局更符合 UX，也不要擅自修改。

二、与第一个 Home 页面保持一致

这是一个连续的产品，不是两个独立网页。

请首先检查当前项目中已经实现的 Home 页面，并识别已经存在的：

Color Tokens
Typography
Font System
Spacing System
Border Radius
Shadow
Button
Card
Input
Navigation
Header
Sidebar
Modal
Icon
Layout
Responsive Rules

如果这些 Component 已经存在：

优先复用，不要重新创建一套新的组件。

例如：

如果 Home 页面已经存在 Button Component，那么第二个页面应该继续使用同一个 Button Component。

如果第二个页面需要不同状态，可以扩展现有 Component，而不是创建完全不同的 Button。

三、不要破坏第一个页面

非常重要：

本次开发第二个页面时，不要破坏已经完成的 Home 页面。

不要因为第二个页面需要新的组件，而修改 Home 页面的视觉表现。

如果需要修改共享 Component：

请确保：

Home 页面视觉仍然正确
第二个页面也可以正确使用
修改不会导致已有页面出现 Regression

如果第二个页面需要特殊样式：

优先创建新的 Variant 或局部 Component。

不要直接修改全局样式导致 Home 页面发生变化。

四、当前开发范围

这一次：

只实现第二个界面。

不要提前实现整个系统。

不要主动开发后续页面。

除非第二个页面为了正常导航必须创建一个简单的 Placeholder Route，否则不要实现：

AI Recognition
Furniture Information
Material List
Manufacturing
Transportation
Use Phase
End of Life
LCA Analysis
LCA Result
Eco-design Recommendation
Scenario Comparison
Project History

这些页面将在后续步骤中逐个开发。

五、第二个页面的实现方式

请先读取我上传的高保真原型。

在 Coding 之前，请分析：

1. Page Structure

识别：

页面有哪些区域
Header / Navigation
Sidebar
Main Content
Content Sections
Footer
Modal / Overlay
页面层级关系
2. Component Hierarchy

识别：

哪些是已有 Component
哪些是新的 Component
哪些 Component 可以复用
哪些 Component 应该抽象出来供后续页面使用

例如：

Page
→ Layout
→ Header
→ Sidebar
→ Main
→ Section
→ Card
→ Button

请按照实际原型建立合理的组件层级。

3. Design System

分析第二个原型中的：

Colors
Typography
Font Size
Font Weight
Line Height
Spacing
Border
Border Radius
Shadow
Icons
Image treatment
Button states
Input states

如果这些已经在 Home 页面存在：

优先复用现有 Design System。

4. Interaction

识别原型中的所有明显交互，包括：

Click
Hover
Active
Selected
Dropdown
Input
Upload
Drag & Drop
Tab
Toggle
Checkbox
Radio
Modal
Dialog
Navigation
Back
Continue
Delete
Edit

这些交互应该尽可能实现为真实的前端交互，而不是只做成静态视觉。

六、交互原则

当前阶段：

Frontend + Demo Interaction Only

不要连接真实后端。

不要连接数据库。

不要调用真实 API。

不要连接 Gemini API。

不要进行真正的 LCA 计算。

不要连接 ecoinvent、GaBi、ELCD、openLCA 等数据库。

如果需要数据：

使用 Mock Data。

七、如果页面包含上传功能

如果第二个原型中存在 Upload / Drag & Drop：

请实现真实的浏览器文件选择和拖拽交互。

如果原型设计了图片上传：

支持：

JPG
JPEG
PNG
WEBP

如果原型设计了 3D Model 上传入口：

可以支持文件选择：

STL
OBJ
FBX

但是当前阶段：

不需要真正解析 3D 模型。

可以：

读取文件
显示文件名
显示文件类型
显示文件大小
显示 Preview（如果适用）
显示 Remove / Replace
更新页面状态

但不要实现真实 AI Recognition。

八、如果页面包含 AI 功能

如果原型中出现：

AI Analysis
AI Recognition
AI Detect
Material Recognition
Generate
Analyze
AI Suggestion

当前只需要实现：

UI + Demo State

例如：

点击 Analyze：

→ 显示 Loading 状态
→ 使用短暂的 Demo 状态变化
→ 显示 Mock Result

但：

不要调用 Gemini API。

不要虚构真实 AI 结果。

如果需要展示结果：

明确使用 Demo / Mock Data。

九、如果页面包含数据

不要把所有数据直接硬编码在 JSX 中。

例如：

不要：

<div>Wood</div>
<div>Steel</div>
<div>Plastic</div>

优先：

const materials = [...]

然后通过 Component Render。

类似：

Material Data
Furniture Data
Project Data
Statistics
Status
Dropdown Options
Table Data
Navigation Items

都应该尽量与 UI Component 分离。

这样以后连接真实 API 时可以直接替换数据源。

十、Component Architecture

请继续保持当前项目的：

React + TypeScript + Component-based Architecture

不要把第二个页面全部写进一个巨大 Component。

推荐按照实际项目结构合理拆分：

src/
├── pages/
├── components/
├── layouts/
├── data/
├── hooks/
├── utils/
└── ...

具体目录可以根据当前项目已有结构调整。

如果项目已经存在合理结构：

不要为了满足这个示例结构而重构整个项目。

优先延续当前项目。

十一、Reusable Components

如果第二个页面出现未来很可能复用的组件：

请将其设计为 Reusable Component。

例如：

Button
Card
Input
Select
UploadArea
FilePreview
ProjectCard
StatusBadge
Stepper
ProgressBar
Modal
Dialog
Navigation
SectionHeader

但不要为了“组件化”而过度拆分。

原则：

真正具有复用价值的组件才抽象。

十二、Responsive

优先保证：

Desktop

与我的高保真原型尽可能 1:1。

同时合理支持：

Laptop
Tablet

Responsive 时：

不要改变页面核心视觉层级。

不要为了响应式：

随意删除内容
随意改变组件顺序
随意改变颜色
随意改变视觉层级
把页面变成完全不同的 Mobile UI

可以根据屏幕宽度：

调整 spacing
调整 grid
调整 column
调整 container width
进行合理的 stacking

但必须保持原型的设计语言。

十三、图片和图标

如果原型中存在图片：

请尽可能保持：

相同位置
相同比例
相同裁切方式
相同圆角
相同尺寸关系

如果项目中已经存在对应图片 Asset：

优先复用。

如果没有真实 Asset：

使用合理的 Placeholder。

不要因为找不到图片就擅自改变布局。

如果原型中存在 Icon：

优先使用项目已有 Icon System。

不要随意用 Emoji 代替。

也不要随意使用风格完全不同的 Icon。

十四、不要加入不属于原型的内容

除非为了基本交互所必需，否则不要自行增加：

Dashboard
Analytics
Chatbot
AI Chat Window
Sidebar Menu
Notification Center
Extra Cards
Extra Buttons
Extra Statistics
Extra Sections
Extra Navigation
Marketing Banner

原型没有的内容，不要自己创造。

十五、代码质量

请保证：

TypeScript 类型清晰
Component 结构清晰
没有明显 TypeScript Error
没有明显 Console Error
没有重复代码
不使用不必要的复杂依赖
页面刷新后可以正常运行
Route 不应该因为刷新而崩溃
不影响 Home 页面
不产生明显 Layout Overflow
十六、实现顺序

请严格按照以下顺序工作：

Step 1

读取第二个高保真原型。

Step 2

分析：

Page Structure
Component Hierarchy
Design System
Interaction
Responsive Strategy
Step 3

检查当前 Home 页面已经存在的：

Components
Styles
Tokens
Layout
Routes
Step 4

判断哪些可以 Reuse。

Step 5

实现第二个页面。

Step 6

实现页面中的 Demo Interaction。

Step 7

检查第二个页面与原型的视觉一致性。

Step 8

检查 Home 页面是否被破坏。

Step 9

检查 Console / TypeScript / Layout Error。

十七、视觉验收标准

完成后，请进行一次严格的 Visual QA。

逐项检查：

□ Page Structure 与 Figma 一致
□ Layout 与 Figma 一致
□ Element Position 一致
□ Typography 一致
□ Font Size 一致
□ Font Weight 一致
□ Line Height 一致
□ Colors 一致
□ Spacing 一致
□ Padding / Margin 一致
□ Buttons 一致
□ Cards 一致
□ Inputs 一致
□ Icons 一致
□ Images 一致
□ Border Radius 一致
□ Shadows 一致
□ Hover / Active / Selected 状态合理
□ 页面没有明显 Overflow
□ Desktop 正常
□ Tablet 不崩坏
□ Home 页面没有被破坏

十八、产品逻辑验收

同时检查：

□ 页面可以正常运行
□ Button 可以点击
□ Input 可以操作
□ Dropdown 可以操作
□ Upload 可以操作（如果原型中存在）
□ Drag & Drop 可以操作（如果原型中存在）
□ Navigation 可以操作
□ Modal 可以打开 / 关闭（如果存在）
□ Demo Data 正常
□ 没有连接真实后端
□ 没有连接 Gemini API
□ 没有实现真实 LCA Calculation
□ 没有虚构真实 LCA 数据

十九、最终目标

请记住：

我不是要你“参考我的 Figma 做一个类似的页面”。

我要的是：

把我的第二个高保真 Figma 原型准确转换成真实、可运行、可交互的 React 页面。

同时：

它必须和已经完成的 Home 页面属于同一个产品、同一个 Design System。

因此最终结果应该是：

Figma High-Fidelity Prototype
↓
Pixel-accurate Frontend
↓
Reusable Components
↓
Demo Interaction
↓
与 Home 页面保持一致
↓
为后续 Google AI Studio 全栈开发做好代码基础

当前只完成第二个界面。

完成后停止。

不要继续开发第三个页面或其他系统功能，等待我的下一步指令。