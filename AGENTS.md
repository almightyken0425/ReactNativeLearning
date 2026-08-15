# 專案代理指令

## 專案定位

- 本庫是 React Native 學習專案。
- 應用使用 Expo。
- 路由使用 Expo Router。
- 每個畫面聚焦單一主題。
- 範例重點是清楚可學習。

---

## 常用指令

- 啟動 Expo 開發伺服器。

```bash
npm start
```

- 啟動 Android 預覽。

```bash
npm run android
```

- 啟動 iOS 預覽。

```bash
npm run ios
```

- 啟動 Web 預覽。

```bash
npm run web
```

- 執行程式碼 lint。

```bash
npm run lint
```

---

## 路由架構

- `app/_layout.tsx`
  - 設定根層導航
- `app/index.tsx`
  - 列出學習入口
- `app` 內的主題頁
  - 展示單一學習概念
- 主題子目錄
  - 收納相關示範頁
  - 使用 `main.tsx` 作入口
- 路由由檔案結構產生。
- 新頁面需加入首頁入口。

---

## 範例設計

- 每頁只教一組概念。
- 畫面文字應說明重點。
- 示例狀態保持可觀察。
- 互動結果必須明確。
- 避免無關抽象層。
- 沿用既有檔案風格。
- 共用元件只在必要時新增。
- 路由名稱需反映主題。
- 不改無關學習範例。

---

## 驗證

- 程式修改後執行 lint。
- 路由修改後檢查入口。
- 文件修改後執行寫作 lint。

```bash
python3 ~/.agents/skills/universal_writing_linter/scripts/lint_spec.py "$target"
```

- 交付前檢查指令漂移。

```bash
./scripts/check-instruction-drift.sh
```

- 預覽只在使用者要求時啟動。
- iOS 驗證使用 `sim-review`。

---

## 指令維護

- 原生規則只維護於本檔。
- 相容入口只保留匯入語法。
- 不可複製第二份規則正文。
- 規則變更後執行漂移檢查。
