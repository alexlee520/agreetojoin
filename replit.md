# 商店合作夥伴管理系統 (Store Partner Management System)

## 專案結構 (Project Structure)

```
agreetojoin/
├── server/           # 後端 Node.js/Express 程式碼
│   └── index.ts      # 主要伺服器檔案，包含 API 路由
├── client/           # 前端程式碼
│   ├── index.html
│   └── src/
│       └── main.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## API 端點 (API Endpoints)

### POST /api/stores
商店合作夥伴申請端點

**請求格式:**
```json
{
  "storeName": "商店名稱",
  "ownerName": "店主姓名",
  "address": "地址",
  "phone": "電話",
  "email": "電子郵件"
}
```

**回應格式:**
```json
{
  "message": "Store application submitted successfully",
  "store": {
    "storeName": "商店名稱",
    "ownerName": "店主姓名",
    "address": "地址",
    "phone": "電話",
    "email": "電子郵件",
    "status": "pending"
  }
}
```

## 執行指令 (Commands)

- `npm install` - 安裝依賴套件
- `npm run start:server` - 啟動後端開發伺服器
- `npm run dev` - 同時啟動前端和後端開發伺服器
- `npm run build` - 建置專案
- `npm start` - 啟動生產環境伺服器

## 日誌追蹤 (Logging)

後端 `/api/stores` 端點包含以下日誌：

1. **請求開始**: `console.log('--- [BACKEND] Received POST /api/stores request ---')`
2. **成功處理**: `console.log('[BACKEND] Successfully processed store application.')`
3. **錯誤處理**: `console.error('!!! [BACKEND] Error processing /api/stores:', error)`
