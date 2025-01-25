#!/bin/bash

# スクリーンをオンにする
caffeinate -u -t 1

# テキストファイルからランダムに1行選択して動画URLを取得
VIDEO_URL=$(sort -R /Users/nandemotoken/SystemDevelopment/GitHubNight/202501/0101/mezamashimac/mikuuta0108.txt | head -n 1)
echo "$VIDEO_URL"

# Safariで動画を開く
open -a Safari "$VIDEO_URL"
