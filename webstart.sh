#!/bin/bash

# ---------- 配置参数 ----------
REPO_DIR="/www/MiragEdge/docweb/doc-web"
BRANCH="main"
SSH_KEY="/root/.ssh/docusaurus"

cd $REPO_DIR || exit 1

# 启动 SSH 代理
eval "$(ssh-agent -s)"
ssh-add $SSH_KEY

# 强制重置代码
git fetch origin $BRANCH
git reset --hard origin/$BRANCH

# 清理并安装依赖
rm -rf node_modules
npm install --force

# 构建网站
npm run build

# 重启 Systemd 服务
systemctl restart docweb

echo "构建完成！文档网站服务现在运行在后台。"
