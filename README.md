# agreetojoin

商店合作夥伴管理系統 (Store Partner Management System)

完整的前後端日誌追蹤系統，提供商店合作夥伴申請表單功能。

## 快速開始 (Quick Start)

```bash
# 安裝依賴
npm install

# 啟動後端伺服器（終端機 1）
npm run start:server

# 啟動前端開發伺服器（終端機 2）
npx vite

# 或者同時啟動前後端
npm run dev
```

訪問應用：
- 前端應用：http://localhost:5173
- 後端 API：http://localhost:3000/api/stores

## 專案特色

✅ **前端 React 表單** - 完整的申請表單 UI  
✅ **後端 API 日誌追蹤** - 7 個前端日誌點 + 3 個後端日誌點  
✅ **TypeScript 完整支援** - 前後端都使用 TypeScript  
✅ **Express.js RESTful API** - 標準的 REST API 設計  
✅ **檔案上傳功能** - 支援印章和存摺圖片上傳  
✅ **即時驗證** - 前端表單驗證和後端資料驗證  
✅ **完整文檔** - 測試指南、結果報告、實作摘要  

## 日誌功能

### 前端日誌（7 個點）
在 `client/src/pages/Form.tsx` 中實作，記錄：
1. 📥 表單提交開始
2. 📝 表單資料內容
3. 🖼️ 印章圖片附件
4. 🖼️ 存摺圖片附件
5. 🚀 API 呼叫開始
6. ✅ 成功回應或 ❌ 錯誤回應
7. 🏁 表單提交完成

### 後端日誌（3 個點）
在 `server/index.ts` 中實作，記錄：
1. 📥 請求接收時記錄
2. ✅ 成功處理時記錄  
3. ❌ 錯誤發生時記錄

## 測試 API

使用 curl 測試後端 API：

```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "測試商店",
    "ownerName": "王小明",
    "address": "台北市大安區"
  }'
```

## 文檔

### 核心文檔
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - 📋 完整測試流程指南
- [TEST_RESULTS.md](./TEST_RESULTS.md) - 📊 詳細測試結果報告
- [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) - 🎉 實作完成總結

### 參考文檔
- [replit.md](./replit.md) - 專案結構與 API 說明
- [STAMP_IMAGE_SETUP.md](./STAMP_IMAGE_SETUP.md) - 完整設定與使用指南
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - 後端實作摘要

## 技術棧

### 後端
- Node.js 20.x
- Express.js 4.18.2
- TypeScript 5.3.3
- tsx (TypeScript 執行器)
- CORS 支援

### 前端
- React 18.x
- Vite 5.4.21
- TypeScript 5.3.3
- React Hooks

## 專案結構

```
agreetojoin/
├── client/                 # 前端程式碼
│   ├── src/
│   │   ├── pages/
│   │   │   └── Form.tsx   # 表單組件（含日誌）
│   │   ├── main.ts        # 前端入口
│   │   └── vite-env.d.ts  # Vite 類型定義
│   └── index.html         # HTML 模板
├── server/                 # 後端程式碼
│   └── index.ts           # Express 伺服器（含日誌）
├── package.json           # 專案依賴
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 安全性

✅ CodeQL 掃描通過，無安全漏洞  
✅ 依賴套件已檢查，無已知漏洞  
✅ 輸入驗證已實作  
✅ 錯誤處理已實作  

## 授權

ISC License

---

**專案狀態**: ✅ 已完成並通過所有測試  
**版本**: 1.0.0  
**最後更新**: 2025-10-21
