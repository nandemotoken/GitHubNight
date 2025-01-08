#!/bin/bash

# テキストファイルからランダムに1行選択して動画URLを取得
VIDEO_URL=$(sort -R ./mezamashimac/mikuuta0108.txt | head -n 1)

# Safariで動画を開く
open -a Safari "$VIDEO_URL"