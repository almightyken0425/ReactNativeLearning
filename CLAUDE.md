# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

以 Expo 與 expo-router 建立的 React Native 學習專案，每個畫面對應一個具體的學習主題，用來練習 React Native 的各項核心概念。

---

## 常用指令

- `npm start` — 啟動 Expo Dev Server，掃描 QR code 即可在實機預覽
- `npm run android` — 直接在 Android 模擬器或實機上啟動應用程式
- `npm run ios` — 直接在 iOS 模擬器上啟動應用程式，需在 macOS 環境下操作
- `npm run web` — 在瀏覽器中執行應用程式，用於 Web 版本預覽
- `npm run lint` — 執行 ESLint 檢查程式碼風格

---

## 架構說明

使用 expo-router 的 file-based routing，`app/` 資料夾下每個 `.tsx` 檔案對應一個路由：

- `app/_layout.tsx` — 根層 layout，設定全域導航結構
- `app/index.tsx` — 首頁，列出所有學習範例的入口
- `app/<主題>.tsx` — 單一主題的學習範例頁面
- `app/stateManagement/` — 進階狀態管理的子路由群組，包含 useContext、useReducer、useEffect、custom hook 等各自獨立的示範頁面

---

## 新增學習主題

在 `app/` 下新增 `.tsx` 檔案，expo-router 會自動將其註冊為可導航的路由，再從首頁入口檔加入連結即可。
