# agreetojoin

這是一個配置了 Render 自動部署的 Node.js 應用程式專案。

## Render 部署說明 / Render Deployment Guide

本專案已配置好 Render 自動部署設定。

### 快速部署 / Quick Deploy

點擊下方按鈕即可一鍵部署到 Render：

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/alexlee520/agreetojoin)

### 手動部署步驟 / Manual Deployment Steps

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
- **Auto Deploy**: 啟用（推送到 main 分支時自動部署）
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check**: `/`

### 注意事項 / Notes

1. 首次部署時，請在 Render Dashboard 中設定必要的環境變數
2. 資料庫會自動建立並連接到 Web Service
3. 使用免費方案時，服務在閒置 15 分鐘後會進入休眠狀態