#!/bin/bash
# 驗證腳本 - 測試日誌功能
# Verification Script - Test Logging Functionality

echo "=========================================="
echo "商店合作夥伴管理系統 - 日誌測試"
echo "Store Partner Management System - Log Test"
echo "=========================================="
echo ""

# 檢查依賴是否已安裝
if [ ! -d "node_modules" ]; then
    echo "❌ 依賴套件未安裝。請先執行: npm install"
    echo "❌ Dependencies not installed. Please run: npm install"
    exit 1
fi

echo "✅ 依賴套件已安裝"
echo ""

# 啟動伺服器
echo "🚀 啟動伺服器..."
echo "🚀 Starting server..."
npm run start:server > /tmp/agreetojoin-server.log 2>&1 &
SERVER_PID=$!
echo "   Server PID: $SERVER_PID"
echo ""

# 等待伺服器啟動
echo "⏳ 等待伺服器啟動 (5秒)..."
sleep 5

# 檢查伺服器是否運行
if ! ps -p $SERVER_PID > /dev/null; then
    echo "❌ 伺服器啟動失敗"
    cat /tmp/agreetojoin-server.log
    exit 1
fi

echo "✅ 伺服器已啟動"
echo ""

# 測試 1: 健康檢查
echo "📍 測試 1: 健康檢查"
echo "-------------------"
HEALTH_RESPONSE=$(curl -s http://localhost:3000/api/health)
if echo "$HEALTH_RESPONSE" | grep -q "ok"; then
    echo "✅ 健康檢查通過"
    echo "   回應: $HEALTH_RESPONSE"
else
    echo "❌ 健康檢查失敗"
    echo "   回應: $HEALTH_RESPONSE"
fi
echo ""

# 測試 2: 成功的商店申請
echo "📍 測試 2: 成功的商店申請"
echo "------------------------"
echo "📝 發送 POST 請求到 /api/stores"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "測試商店",
    "ownerName": "測試人員",
    "address": "台北市",
    "phone": "02-1234-5678",
    "email": "test@example.com"
  }')

if echo "$RESPONSE" | grep -q "successfully"; then
    echo "✅ 商店申請成功"
    echo "   回應: $RESPONSE"
else
    echo "❌ 商店申請失敗"
    echo "   回應: $RESPONSE"
fi
echo ""

# 測試 3: 缺少必填欄位
echo "📍 測試 3: 缺少必填欄位 (驗證錯誤)"
echo "----------------------------------"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{"storeName": "測試"}')

if echo "$RESPONSE" | grep -q "Missing required fields"; then
    echo "✅ 驗證錯誤正確處理"
    echo "   回應: $RESPONSE"
else
    echo "❌ 驗證錯誤處理失敗"
    echo "   回應: $RESPONSE"
fi
echo ""

# 等待日誌寫入
sleep 2

# 顯示伺服器日誌
echo "=========================================="
echo "📋 伺服器控制台日誌 (Console Logs)"
echo "=========================================="
echo ""
grep -E "\[BACKEND\]|Error" /tmp/agreetojoin-server.log | tail -20
echo ""

# 檢查三個關鍵日誌是否存在
echo "=========================================="
echo "🔍 日誌檢查結果"
echo "=========================================="
echo ""

if grep -q "BACKEND\] Received POST /api/stores request" /tmp/agreetojoin-server.log; then
    echo "✅ 日誌點 1: 請求接收時記錄 - 已找到"
else
    echo "❌ 日誌點 1: 請求接收時記錄 - 未找到"
fi

if grep -q "BACKEND\] Successfully processed store application" /tmp/agreetojoin-server.log; then
    echo "✅ 日誌點 2: 成功處理時記錄 - 已找到"
else
    echo "❌ 日誌點 2: 成功處理時記錄 - 未找到"
fi

echo "ℹ️  日誌點 3: 錯誤處理時記錄 - 需要觸發實際錯誤才會出現"
echo ""

# 停止伺服器
echo "🛑 停止伺服器..."
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo "=========================================="
echo "✅ 測試完成！"
echo "=========================================="
echo ""
echo "查看完整日誌: /tmp/agreetojoin-server.log"
