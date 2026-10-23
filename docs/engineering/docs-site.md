---
title: ドキュメントサイトの開発・公開
description: docs/ をFumadocsで表示し、GitHub Actionsで検証してVercelへ公開する手順。
---

この資料は、今回構築したナレッジベースの実装と運用手順です。[音楽練習サービスの技術案](./product-approach.md)とは別のものです。

## 構成

| 場所 | 役割 |
| --- | --- |
| `docs/` | Markdownとナビゲーション設定の正本 |
| `apps/docs-app/` | Next.js App Router・Fumadocs・Tailwind CSSによる表示アプリ |
| `apps/docs-app/lib/source.ts` | `../../docs` を読み込むFumadocsコレクション |
| `scripts/check-docs.mjs` | タイトル・説明、相対リンク先、ナビゲーションJSONの基本検証 |
| `.github/workflows/docs-ci.yml` | PRと `main` 更新時のメタデータ検証・型検査・静的ビルド |
| `vercel.json` | リポジトリルートからのインストール・検証・ビルドと静的成果物の指定 |
| `package-lock.json` | npm workspaces全体の依存バージョン固定 |

FumadocsはMarkdownからページ・目次・サイドバーを生成します。相対的な `.md` リンクは表示用URLへ変換されます。検索用インデックスもビルド時に生成し、ブラウザで検索します。サイトは静的に書き出すため、アプリ用のAPIサーバーは必要ありません。

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

成果物は `apps/docs-app/out/` です。VercelではプロジェクトのルートURLで公開するため、通常のビルドでは `NEXT_PUBLIC_BASE_PATH` を指定しません。

```sh
NEXT_PUBLIC_BASE_PATH=/docs npm run build:docs
```

`NEXT_PUBLIC_BASE_PATH` は末尾の `/` を含めずに指定します。通常は省略し、ルート配下で公開します。Next.jsの静的エクスポートと末尾スラッシュ付きURLを使い、各ページを `index.html` として出力します。

検索インデックスは `search-index.json` です。検索の取得先にも同じベースパスを設定します。外部フォントのダウンロードを必要としないシステムフォントを使用しています。

日本語の句読点や括弧に隣接する `**強調**` を表示できるよう、`source.config.ts` で `remark-cjk-friendly` を追加しています。原文の表記を変更せずに日本語Markdownを扱います。

## Vercelの初回設定

1. Vercelで **Add New → Project** から `Akiya-Kudo/gonnabe-musician` を取り込みます。
2. **Root Directory** をリポジトリルート (`.`) にします。アプリの場所だけをルートにすると、アプリが参照する `../../docs` とルートのnpm lockfileをビルドから参照できません。
3. Production Branchが `main` であることを確認します。Git連携を有効にすると、PRにプレビュー、本番ブランチへの更新にProductionデプロイが作られます。
4. `vercel.json` の設定により、ルートの `npm ci`、ドキュメント検証・型検査・ビルドを行い、`apps/docs-app/out/` を公開します。Framework PresetはOther（自動検出を無効）にし、Install Command、Build Command、Output Directoryを `vercel.json` の値で管理します。
5. VercelのDeploymentsで初回のProductionデプロイが成功し、割り当てられた公開URLでドキュメントが表示されることを確認します。

この方式ではVercelがGitHubから直接ソースを取得してデプロイするため、GitHub Actions SecretsへVercelトークンを登録しません。GitHub Actionsは検証とビルドを担当し、PRと `main` の両方で動きます。Vercel側のGit連携・アカウント・チームの権限設定はVercelで管理します。

`vercel.json` はVercelプロジェクトの作成・Git接続までは行いません。初回プロジェクトの取り込み後、PRプレビューと `main` のProductionデプロイを実際のVercel Deploymentsで確認します。公開先URLはVercelが割り当てた値を使います。

## 自動実行の条件

- `main` へのpushで、`docs/**`、`apps/docs-app/**`、検証スクリプト、ルートのnpm設定・ロックファイル、エージェント向けの `AGENTS.md`、Node.jsバージョン、CIワークフロー、`vercel.json` が変わった場合：検証とビルド。VercelのGit連携がProductionデプロイを作成。
- `main` 向けPRで同じ範囲が変わった場合：検証とビルド。VercelのGit連携がPreviewデプロイを作成。
- 手動実行：GitHub Actionsで検証とビルド。公開はVercelのGit連携によるブランチ更新で行う。

GitHub Actionsのビルド失敗はPRと `main` の変更を検出するための確認結果です。記事の追加は通常、`docs/` の編集だけで検証・公開対象になります。

## ナレッジを増やすとき

[ナレッジベースの育て方](../guide/knowledge-base.md)に従ってテーマ別Markdownを更新します。リンク先が存在しない場合やタイトル・説明が欠ける場合は `check:docs` が失敗します。外部リンクの到達性・引用内容・権利・事実の正しさはこの機械的検証の対象外なので、資料のレビューで確認します。
