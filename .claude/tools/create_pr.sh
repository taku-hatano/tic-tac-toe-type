#!/bin/bash

# PR作成スクリプト
# 使用方法: ./create_pr.sh "タイトル" "説明" "ベースブランチ"

set -e

# 引数チェック
if [[ $# -ne 3 ]]; then
    echo "使用方法: $0 \"タイトル\" \"説明\" \"ベースブランチ\""
    echo "例: $0 \"feat: 新機能追加\" \"新機能の実装\" \"main\""
    exit 1
fi

TITLE="$1"
BODY="$2"
BASE_BRANCH="$3"

echo "PR作成処理を開始します..."
echo "タイトル: $TITLE"
echo "ベースブランチ: $BASE_BRANCH"

# 新規PR作成
gh pr create --base "$BASE_BRANCH" --title "$TITLE" --body "$BODY" --draft

# PRをブラウザで開く
echo "PRをブラウザで開きます..."
gh pr view --web

echo "処理が完了しました"