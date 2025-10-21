# 完整流程測試指南 (Complete Flow Testing Guide)

## 測試目標

驗證商店合作夥伴管理系統的前後端日誌功能，確保從前端表單提交到後端 API 處理的完整流程都有適當的日誌記錄。

## 前置準備

### 1. 確認專案已安裝依賴

```bash
npm install
```

### 2. 啟動後端伺服器

打開第一個終端機視窗：

```bash
npm run start:server
```

**預期輸出：**
```
> agreetojoin@1.0.0 start:server
> tsx watch server/index.ts

Server is running on port 3000
```

✅ **檢查點**：確認看到 "Server is running on port 3000" 訊息，表示後端伺服器已成功啟動。

### 3. 啟動前端開發伺服器

打開第二個終端機視窗：

```bash
npx vite
```

或者使用完整的開發命令（會同時啟動前後端）：

```bash
npm run dev
```

**預期輸出：**
```
VITE v5.4.21  ready in 182 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **檢查點**：確認看到 Vite 伺服器啟動訊息，前端應用已在 http://localhost:5173 運行。

---

## 執行完整測試流程

### 步驟 1：打開瀏覽器並準備開發者工具

1. 開啟網頁瀏覽器（建議使用 Chrome 或 Firefox）
2. 前往 http://localhost:5173
3. 按 `F12` 打開開發者工具
4. 切換到 **Console（主控台）** 分頁

✅ **檢查點**：確認在 Console 中看到初始化訊息：
```
Store Partner Management System - Client initialized
```

### 步驟 2：準備後端日誌視窗

將運行後端伺服器的終端機視窗放在能清楚看到的位置，這裡會顯示後端的日誌輸出。

### 步驟 3：填寫表單

在瀏覽器中的表單頁面，依序填寫以下資料：

1. **商店名稱** (必填)：測試商店
2. **負責人姓名** (必填)：王小明
3. **商店地址** (必填)：台北市大安區忠孝東路四段 123 號
4. **聯絡電話**：02-2345-6789
5. **電子郵件**：test@example.com

### 步驟 4：上傳測試圖片

#### 4.1 上傳印章圖片（必填）

1. 點擊「印章圖片」的檔案上傳按鈕
2. 選擇任意測試圖片檔案

✅ **檢查點（前端日誌）**：在瀏覽器 Console 應該看到：
```
[FRONTEND] Stamp image selected: [檔案名稱]
```

#### 4.2 上傳存摺圖片（選填）

1. 點擊「存摺圖片」的檔案上傳按鈕
2. 選擇任意測試圖片檔案

✅ **檢查點（前端日誌）**：在瀏覽器 Console 應該看到：
```
[FRONTEND] Bankbook image selected: [檔案名稱]
```

### 步驟 5：提交表單

點擊「提交申請」按鈕。

---

## 觀察日誌輸出

### 前端日誌（瀏覽器 Console）

提交表單後，你應該依序看到以下日誌：

```
--- [FRONTEND] Form submission process started ---
[FRONTEND] Form data: {storeName: "測試商店", ownerName: "王小明", address: "台北市大安區忠孝東路四段 123 號", phone: "02-2345-6789", email: "test@example.com"}
[FRONTEND] Stamp image attached: test-stamp.png
[FRONTEND] Bankbook image attached: test-bankbook.png
[FRONTEND] Sending data to /api/stores...
```

**成功情況：**
```
[FRONTEND] ✅ Received successful response from /api/stores: {message: "Store application submitted successfully", store: {...}}
[FRONTEND] Form submission process completed
```

**失敗情況（例如缺少必填欄位）：**
```
[FRONTEND] ❌ Error response from /api/stores: {error: "..."}
[FRONTEND] Form submission process completed
```

**網路錯誤情況：**
```
!!! [FRONTEND] Error calling /api/stores: [錯誤詳情]
[FRONTEND] Form submission process completed
```

### 後端日誌（伺服器終端機）

當前端發送請求時，後端終端機應該顯示：

```
--- [BACKEND] Received POST /api/stores request ---
[BACKEND] Successfully processed store application.
```

如果處理過程中發生錯誤：
```
--- [BACKEND] Received POST /api/stores request ---
!!! [BACKEND] Error processing /api/stores: [錯誤詳情]
```

---

## 日誌檢查清單

### ✅ 前端日誌檢查項目

- [ ] 看到 `[FRONTEND] Form submission process started` 訊息
- [ ] 看到表單資料的完整內容
- [ ] 看到圖片附件的檔案名稱
- [ ] 看到 `[FRONTEND] Sending data to /api/stores...` 訊息
- [ ] 看到成功或錯誤的回應訊息
- [ ] 看到 `[FRONTEND] Form submission process completed` 訊息

### ✅ 後端日誌檢查項目

- [ ] 看到 `[BACKEND] Received POST /api/stores request` 訊息
- [ ] 看到 `[BACKEND] Successfully processed store application.` 訊息（成功情況）
- [ ] 或看到 `[BACKEND] Error processing /api/stores` 訊息（錯誤情況）

---

## 測試案例

### 測試案例 1：正常提交（所有必填欄位都已填寫）

**步驟：**
1. 填寫所有必填欄位
2. 上傳印章圖片
3. 點擊提交

**預期結果：**
- 前端顯示成功訊息
- 表單被清空
- 前端 Console 顯示完整的日誌流程
- 後端終端機顯示請求接收和成功處理的日誌

### 測試案例 2：缺少必填欄位

**步驟：**
1. 只填寫部分欄位（例如只填商店名稱）
2. 嘗試提交

**預期結果：**
- 瀏覽器顯示 HTML5 驗證錯誤（不會發送請求）
- 如果繞過前端驗證，後端會返回 400 錯誤
- 前端 Console 會顯示錯誤訊息

### 測試案例 3：後端伺服器未啟動

**步驟：**
1. 停止後端伺服器
2. 填寫完整表單並提交

**預期結果：**
- 前端 Console 顯示網路錯誤：`!!! [FRONTEND] Error calling /api/stores`
- 頁面顯示錯誤訊息：「網路錯誤，請檢查連線後再試」

---

## 使用 curl 測試後端 API

如果想直接測試後端 API（不透過前端表單），可以使用以下命令：

### 成功案例

```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "測試商店",
    "ownerName": "王小明",
    "address": "台北市大安區"
  }'
```

**預期回應：**
```json
{
  "message": "Store application submitted successfully",
  "store": {
    "storeName": "測試商店",
    "ownerName": "王小明",
    "address": "台北市大安區",
    "status": "pending"
  }
}
```

**後端日誌：**
```
--- [BACKEND] Received POST /api/stores request ---
[BACKEND] Successfully processed store application.
```

### 失敗案例（缺少必填欄位）

```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "測試商店"
  }'
```

**預期回應：**
```json
{
  "error": "Missing required fields: storeName, ownerName, and address are required"
}
```

**後端日誌：**
```
--- [BACKEND] Received POST /api/stores request ---
```

---

## 日誌位置總結

### 前端日誌
- **位置**：瀏覽器開發者工具的 Console 分頁
- **來源檔案**：`client/src/pages/Form.tsx`
- **關鍵日誌點**：
  1. 表單提交開始
  2. 發送 API 請求
  3. 接收回應（成功或失敗）
  4. 表單提交完成

### 後端日誌
- **位置**：運行 `npm run start:server` 的終端機視窗
- **來源檔案**：`server/index.ts`
- **關鍵日誌點**：
  1. 接收 POST 請求
  2. 成功處理申請
  3. 錯誤處理

---

## 疑難排解

### 問題：前端無法連接到後端

**檢查項目：**
1. 後端伺服器是否正在運行（檢查終端機）
2. 後端伺服器是否監聽在 port 3000
3. 瀏覽器 Console 是否有 CORS 錯誤
4. Vite 的 proxy 設定是否正確（檢查 `vite.config.ts`）

**解決方法：**
```bash
# 重新啟動後端
npm run start:server

# 確認後端正在運行
curl http://localhost:3000/api/health
```

### 問題：前端頁面空白

**檢查項目：**
1. Vite 開發伺服器是否正在運行
2. 瀏覽器 Console 是否有 JavaScript 錯誤
3. React 相關依賴是否已安裝

**解決方法：**
```bash
# 確認依賴已安裝
npm install

# 重新啟動前端
npx vite
```

### 問題：看不到日誌輸出

**檢查項目：**
1. 瀏覽器開發者工具的 Console 是否已打開
2. Console 的日誌等級篩選是否正確（確保包含 "Verbose" 或 "All"）
3. 後端終端機是否在正確的視窗

---

## 完成確認

當你完成完整流程測試後，確認以下項目：

- [x] 後端伺服器成功啟動並顯示 "Server is running on port 3000"
- [x] 前端 Vite 伺服器成功啟動並可以訪問 http://localhost:5173
- [x] 能在瀏覽器中看到完整的表單頁面
- [x] 填寫表單並上傳圖片時，前端 Console 顯示相應日誌
- [x] 提交表單時，前端 Console 顯示完整的日誌流程
- [x] 提交表單時，後端終端機顯示請求接收和處理的日誌
- [x] 成功提交後，頁面顯示成功訊息並清空表單

恭喜！你已經成功完成商店合作夥伴管理系統的完整流程測試，並驗證了前後端的日誌功能都正常運作。
