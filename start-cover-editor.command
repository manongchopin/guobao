#!/bin/zsh
cd "$(dirname "$0")" || exit 1
echo "正在启动封面编辑器…"
echo "浏览器会自动打开；关闭这个终端窗口即可停止服务。"
(sleep 1; open "http://127.0.0.1:8787/cover-editor.html") &
node scripts/cover-editor-server.mjs
