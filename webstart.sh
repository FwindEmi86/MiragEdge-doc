#!/bin/bash

# ---------- 配置参数 ----------
REPO_DIR="/www/MiragEdge/docweb/doc-web"
BRANCH="main"
SSH_KEY="/root/.ssh/docusaurus"

cd $REPO_DIR || exit 1

# 启动 SSH 代理
eval "$(ssh-agent -s)"
ssh-add $SSH_KEY

echo "启动SSH代理完成！正在拉取最新git代码..."

# 强制重置代码
git fetch origin $BRANCH
git reset --hard origin/$BRANCH

echo "代码拉取完成！正在清理安装npm依赖..."

# 清理并安装依赖
rm -rf node_modules
npm install --force


echo "清理安装完成！正在构建网站..."

# 构建网站
npm run build

echo "构建完成！正在启动文档网站服务..."

# 重启 Systemd 服务
systemctl restart docweb

echo "服务重启完成！文档网站服务现在运行在后台。"
