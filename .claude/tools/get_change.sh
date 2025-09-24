#!/bin/bash

# PR作成用変更内容取得スクリプト
# Usage: bash .claude/tools/get-pr-changes.sh [target_branch]
# Example: bash .claude/tools/get-pr-changes.sh main

set -e

# 設定
DIFF_THRESHOLD=2000  # 差分表示する最大行数（この値を超えるファイルは表示をスキップ）

# 引数処理
target_branch="${1:-main}"


# 現在のブランチ名を取得
current_branch=$(git branch --show-current)

echo "=== PR変更内容取得 ==="
echo "現在のブランチ: $current_branch"
echo "ターゲットブランチ: $target_branch"
echo



# 変更内容の取得
echo "=== 変更内容の取得 ==="

# マージベースを取得（現在のブランチとターゲットブランチの共通祖先）
merge_base=$(git merge-base HEAD origin/"$target_branch")
echo "マージベース: $merge_base"
echo

# コミットメッセージの取得
echo "ブランチのコミットメッセージ:"
echo "----------------------------------------"
# ブランチの全コミットの完全なメッセージを表示
git log --format="%h - %B" "$merge_base".."$current_branch" | sed 's/^/  /'
echo

# 変更したファイルの一覧と統計
echo "変更ファイル一覧と統計:"
git diff --stat "$merge_base"..HEAD
echo

# 変更量の多いファイルを特定し、適切なファイルのみ差分を取得
echo "=== ファイル別変更内容 ==="

# 変更されたファイルを取得
changed_files=$(git diff --name-only "$merge_base"..HEAD)

if [ -z "$changed_files" ]; then
    echo "変更されたファイルがありません"
    exit 0
fi

# 各ファイルの変更行数をチェック
suitable_files=()
large_files=()

while IFS= read -r file; do
    # ファイルの変更行数を取得（追加+削除の合計）
    changes=$(git diff --numstat "$merge_base"..HEAD -- "$file" | awk '{print $1 + $2}')

    if [ "$changes" -gt "$DIFF_THRESHOLD" ]; then
        large_files+=("$file ($changes lines)")
    else
        suitable_files+=("$file")
    fi
done <<< "$changed_files"

# 変更量が大きすぎるファイルがある場合は警告
if [ ${#large_files[@]} -gt 0 ]; then
    echo "⚠️  以下のファイルは変更量が多いため差分表示をスキップします（閾値: ${DIFF_THRESHOLD}行）:"
    printf '%s\n' "${large_files[@]}"
    echo
fi

# 適切なサイズのファイルの差分を表示
if [ ${#suitable_files[@]} -gt 0 ]; then
    echo "差分内容（変更量${DIFF_THRESHOLD}行以下のファイル）:"
    echo "----------------------------------------"
    git diff "$merge_base"..HEAD -- "${suitable_files[@]}"
else
    echo "表示可能な差分がありません（すべて大きなファイルまたは削除ファイル）"
fi

echo
echo "=== 変更内容取得完了 ==="
echo "この情報を使用してPRを作成してください"