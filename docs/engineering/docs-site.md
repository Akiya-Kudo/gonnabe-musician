---
title: ドキュメントサイトの開発・公開
description: docs/ をFumadocsで表示し、GitHub ActionsからGitHub Pagesへ公開する手順。
---

この資料は、今回構築したナレッジベースの実装と運用手順です。[音楽練習サービスの技術案](./product-approach.md)とは別のものです。

## 構成

| 場所 | 役割 |
| --- | --- |
| `docs/` | Markdownとナビゲーション設定の正本 |
| `apps/docs-app/` | Next.js App Router・Fumadocs・Tailwind CSSによる表示アプリ |
| `apps/docs-app/lib/source.ts` | `../../docs` を読み込むFumadocsコレクション |
| `scripts/check-docs.mjs` | タイトル・説明、相対リンク先、ナビゲーションJSONの基本検証 |
| `.github/workflows/docs-pages.yml` | PR検証と、`main` 更新時のGitHub Pagesデプロイ |
| `package-lock.json` | npm workspaces全体の依存バージョン固定 |

FumadocsはMarkdownからページ・目次・サイドバーを生成します。相対的な `.md` リンクは表示用URLへ変換されます。検索用インデックスもビルド時に生成し、ブラウザで検索するため、GitHub PagesにAPIサーバーは必要ありません。

## ローカル開発

Node.js 24とnpmを使い、リポジトリのルートで実行します。

```sh
npm ci
npm run dev:docs
```

`docs/` のMarkdownを編集すると開発サーバーに反映されます。ページは `title` と `description` を持つfrontmatterから始めます。`meta.json` でフォルダ名と並び順を設定でき、`...` は明示していない新しい項目の表示を許可します。

FumadocsのMDX macroをwebpackで処理する構成のため、`dev` と `build` のスクリプトに `--webpack` を指定しています。記事をアプリ内へコピーしたり、記事ごとにReactのルートを追加したりする必要はありません。

クラウド環境でnpmの既定キャッシュに書き込めない場合は、`npm --cache /tmp/gonnabe-musician-npm-cache ci` のように書き込み可能なキャッシュ先を指定します。

## 検証と静的ビルド

ルートから次を実行します。

```sh
npm run check:docs
npm run typecheck
npm run build:docs
```

成果物は `apps/docs-app/out/` です。GitHub Pagesと同じリポジトリ配下のパスで確認する場合は、ビルド時に次を指定します。

```sh
NEXT_PUBLIC_BASE_PATH=/gonnabe-musician npm run build:docs
```

`NEXT_PUBLIC_BASE_PATH` は末尾の `/` を含めずに指定します。ローカル開発で省略するとルート配下になり、GitHub Actionsではリポジトリ名をもとに設定されます。Next.jsの静的エクスポートと末尾スラッシュ付きURLを使い、各ページを `index.html` として出力します。

検索インデックスは `search-index.json` です。検索の取得先にも同じベースパスを設定します。外部フォントのダウンロードを必要としないシステムフォントを使用しています。

日本語の句読点や括弧に隣接する `**強調**` を表示できるよう、`source.config.ts` で `remark-cjk-friendly` を追加しています。原文の表記を変更せずに日本語Markdownを扱います。

## GitHub Pagesの初回設定

1. GitHubリポジトリの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選びます。リポジトリにPagesを利用できるプラン・公開設定が必要です。
2. この変更を `main` に取り込みます。
3. **Actions → Documentation** の成功を確認します。初回や手動での再公開には **Run workflow** を使えます。公開ジョブは `main` のみを対象にします。

追加の個人用アクセストークンは不要です。デプロイジョブはGitHub標準の `GITHUB_TOKEN` に `pages: write` と `id-token: write` を付与し、`github-pages` environmentへ公開します。environmentに承認ルールがある場合は、そのルールに従います。

実際の公開先はデプロイジョブが出力するURLを確認してください。GitHub Pagesへのデプロイ成功は、ワークフローの実行後に確認するものです。

## 自動実行の条件

- `main` へのpushで、`docs/**`、`apps/docs-app/**`、検証スクリプト、ルートのnpm設定・ロックファイル、エージェント向けの `AGENTS.md`、Node.jsバージョン、ワークフローが変わった場合：検証、ビルド、公開。
- `main` 向けPRで同じ範囲が変わった場合：検証とビルド。公開ジョブは実行しない。
- 手動実行：検証とビルド。`main` で実行した場合に公開。

検証が失敗するとデプロイには進みません。記事の追加は通常、`docs/` の編集だけで公開対象になります。

## ナレッジを増やすとき

[ナレッジベースの育て方](../guide/knowledge-base.md)に従ってテーマ別Markdownを更新します。リンク先が存在しない場合やタイトル・説明が欠ける場合は `check:docs` が失敗します。外部リンクの到達性・引用内容・権利・事実の正しさはこの機械的検証の対象外なので、資料のレビューで確認します。
