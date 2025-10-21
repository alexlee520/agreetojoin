# STAMP_IMAGE_SETUP.md

## 商店合作夥伴管理系統 - 設定與使用指南

### 系統架構

本系統包含：
- **後端伺服器** (server/): 使用 Express.js 和 TypeScript 建立
- **前端介面** (client/): 使用 Vite 和 TypeScript 建立
- **API 端點**: RESTful API 用於商店合作夥伴申請

### 安裝與啟動

#### 1. 安裝依賴套件
```bash
npm install
```

#### 2. 開發模式
啟動後端伺服器（含熱重載）：
```bash
npm run start:server
```

#### 3. 生產模式
建置專案：
```bash
npm run build
```

啟動生產伺服器：
```bash
npm start
```

### API 文檔

#### POST /api/stores
**描述**: 提交商店合作夥伴申請

**請求範例**:
```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "美食小館",
    "ownerName": "王小明",
    "address": "台北市大安區",
    "phone": "02-1234-5678",
    "email": "store@example.com"
  }'
```

**成功回應** (201 Created):
```json
{
  "message": "Store application submitted successfully",
  "store": {
    "storeName": "美食小館",
    "ownerName": "王小明",
    "address": "台北市大安區",
    "phone": "02-1234-5678",
    "email": "store@example.com",
    "status": "pending"
  }
}
```

**錯誤回應** (400 Bad Request):
```json
{
  "error": "Missing required fields: storeName, ownerName, and address are required"
}
```

### 日誌追蹤

系統在處理 `/api/stores` 請求時會記錄以下資訊：

1. **請求接收**:
   ```
   --- [BACKEND] Received POST /api/stores request ---
   ```
   
2. **成功處理**:
   ```
   [BACKEND] Successfully processed store application.
   ```
   
3. **錯誤處理**:
   ```
   !!! [BACKEND] Error processing /api/stores: [error details]
   ```

### 除錯與故障排除

#### 檢視伺服器日誌
當您執行 `npm run start:server` 時，所有的 console.log 輸出都會顯示在終端機中。

#### 測試 API
使用 curl 或 Postman 測試 API 端點：
```bash
# 健康檢查
curl http://localhost:3000/api/health

# 測試商店申請
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{"storeName":"測試商店","ownerName":"測試人員","address":"測試地址"}'
```

### 環境變數

在根目錄建立 `.env` 檔案來設定環境變數：

```env
PORT=3000
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
GEMINI_API_KEY=your_gemini_api_key
REMOVE_BG_API_KEY=your_remove_bg_api_key
```

### 部署到 Render

專案已設定 `render.yaml`，可直接部署到 Render.com：

1. 連結您的 GitHub 儲存庫到 Render
2. Render 會自動讀取 `render.yaml` 設定
3. 設定所需的環境變數
4. 部署完成後，伺服器將在指定的 URL 上運行

### 技術堆疊

- **後端**: Node.js, Express, TypeScript
- **前端**: Vite, TypeScript
- **開發工具**: tsx (TypeScript 執行器), concurrently (並行執行工具)
- **部署**: Render.com
