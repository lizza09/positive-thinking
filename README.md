# MindfulBreath (正念息)

一款基於 React 的沉浸式正念呼吸練習應用程式，結合了引導式呼吸技術與 Gemini AI 啟發小語。

## 🌟 特色

- **三種專業呼吸法**：箱式呼吸、4-7-8 呼吸法、放鬆呼吸。
- **沉浸式視覺化**：動態圓圈與導引文字，幫助您專注當下。
- **AI 智慧啟發**：整合 Google Gemini API，每次開啟都會為您提供一段正念提示。
- **磨砂玻璃設計**：現代且清新且具有呼吸感的視覺介面。

## 🛠️ 技術棧

- **框架**: React 19 + TypeScript
- **構建工具**: Vite
- **樣式**: Tailwind CSS 4
- **動畫**: Framer Motion
- **AI**: @google/genai (Gemini AI SDK)

## 🚀 快速開始

### 1. 複製專案

```bash
git clone https://github.com/your-username/mindful-breath.git
cd mindful-breath
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 設定環境變數

在根目錄建立 `.env` 檔案，並填入您的 Gemini API Key：

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

*注意：雖然程式碼中使用了 `process.env.GEMINI_API_KEY`，在 Vite 環境下建議通過 `vite.config.ts` 的定義或將代碼中的引用改為 `import.meta.env.VITE_GEMINI_API_KEY`。目前的設定會自動抓取環境變數。*

### 4. 啟動開發伺服器

```bash
npm run dev
```

伺服器預設運行在 `http://localhost:3000`。

### 5. 構建生產版本

```bash
npm run build
```

## 📄 授權

本專案採用 [MIT License](LICENSE) 授權。
