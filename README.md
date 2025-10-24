# agreetojoin

## Render 部署說明 / Render Deployment Guide

本專案已配置好 Render 自動部署設定。

### 部署步驟 / Deployment Steps

1. 登入 [Render Dashboard](https://dashboard.render.com/)
2. 點擊 "New +" 按鈕，選擇 "Blueprint"
3. 連接您的 GitHub 帳號並選擇此 repository
4. Render 會自動讀取 `render.yaml` 檔案並建立以下服務：
   - Web Service: `agreetojoin-app` (Node.js 應用程式)
   - PostgreSQL Database: `agreetojoin-db`

### 環境變數設定 / Environment Variables

部署時需要設定以下環境變數：
- `GEMINI_API_KEY`: Google Gemini API 金鑰
- `REMOVE_BG_API_KEY`: Remove.bg API 金鑰
- `SESSION_SECRET`: 自動生成
- `DATABASE_URL`: 自動從資料庫連接
- `NODE_ENV`: 預設為 production

### 配置詳情 / Configuration Details

- **Region**: Singapore (新加坡)
- **Plan**: Free tier (免費方案)
- **Branch**: main
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`