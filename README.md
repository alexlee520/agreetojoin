# agreetojoin

商店合作夥伴管理系統 (Store Partner Management System)

## 快速開始 (Quick Start)

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run start:server

# 測試 API
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{"storeName":"測試商店","ownerName":"測試","address":"台北市"}'
```

## 專案特色

✅ 後端 API 日誌追蹤  
✅ TypeScript 完整支援  
✅ Express.js RESTful API  
✅ 自動建置與部署設定  

## 文檔

- [replit.md](./replit.md) - 專案結構與 API 說明
- [STAMP_IMAGE_SETUP.md](./STAMP_IMAGE_SETUP.md) - 完整設定與使用指南

## 日誌功能

本系統在 `/api/stores` 端點實作完整的日誌追蹤：

1. 📥 請求接收時記錄
2. ✅ 成功處理時記錄  
3. ❌ 錯誤發生時記錄

查看 [server/index.ts](./server/index.ts) 了解實作細節。
