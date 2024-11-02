FROM alpine:3.18

# 必要なパッケージのインストール
RUN apk add --no-cache \
    lua5.4 \
    lua5.4-dev \
    luarocks5.4 \
    gcc \
    musl-dev \
    make

# luasocketのインストール
RUN luarocks-5.4 install luasocket

# 作業ディレクトリの設定
WORKDIR /app

# アプリケーションファイルのコピー
COPY . .

# ポートの公開
EXPOSE 8080

# 実行コマンド
CMD ["lua5.4", "server.lua"]