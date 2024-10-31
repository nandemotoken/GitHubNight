# Dockerfile
FROM ghost:5-alpine

# タイムゾーンを日本に設定
ENV TZ=Asia/Tokyo

# カスタムの設定を追加する場合はここに
COPY config.production.json /var/lib/ghost/config.production.json

# 必要な追加パッケージがある場合はここでインストール
RUN apk add --no-cache tzdata

# Ghost CLIのインストール（必要な場合）
# RUN npm install ghost-cli@latest -g

EXPOSE 2368