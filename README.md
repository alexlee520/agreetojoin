# agreetojoin

## 設置與部署 (Setup and Deployment)

### 使用 Git Token 推送程式碼 (Using Git Token for Code Push)

當您需要將程式碼推送到此儲存庫時，請使用個人存取權杖（Personal Access Token）進行身份驗證。以下是設置步驟：

#### 1. 創建 GitHub Personal Access Token
1. 前往 GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. 點擊 "Generate new token"
3. 選擇所需的權限範圍（至少需要 `repo` 權限）
4. 生成並複製您的權杖

#### 2. 在本地電腦設置遠端儲存庫
```bash
# 添加遠端儲存庫
git remote add origin https://github.com/alexlee520/agreetojoin.git

# 或者如果已經設置過，可以更新 URL
git remote set-url origin https://github.com/alexlee520/agreetojoin.git
```

#### 3. 使用權杖進行推送
有兩種方式可以使用權杖進行推送：

**方式一：在 URL 中包含權杖**
```bash
git remote set-url origin https://<YOUR_TOKEN>@github.com/alexlee520/agreetojoin.git
git push origin main
```

**方式二：在推送時輸入權杖**
```bash
git push origin main
# 當提示輸入用戶名時，輸入您的 GitHub 用戶名
# 當提示輸入密碼時，輸入您的個人存取權杖（而非 GitHub 密碼）
```

#### 4. 使用 Git Credential Helper（推薦）
為了避免每次都輸入權杖，可以使用 Git 憑證輔助工具：

```bash
# 在 macOS
git config --global credential.helper osxkeychain

# 在 Windows
git config --global credential.helper wincred

# 在 Linux
git config --global credential.helper store
```

設置後，在第一次推送時輸入權杖，之後系統會自動記住。

## 專案資訊 (Project Information)

此專案使用 Render.com 進行部署，配置詳情請參考 `render.yaml` 文件。