# gonnabe-musician

「外出先での3分が、次に楽器を持つ時間につながる音楽練習アプリ」を検討・開発するプロジェクトです。現在は構想・検証計画をまとめたナレッジベースと、そのドキュメントサイトを整備しています。

資料の入口は [docs/index.md](docs/index.md) です。サービス方針、学習体験、ブランド、技術案、予算、検証計画、出典、未決事項をテーマ別にまとめています。[初期提案の原文](docs/sources/initial-proposal.md)も全文保存しています。

[プロジェクト運用方針](docs/operations/index.md)では、オーナーが目的を指示し、AIエージェントが設計・実装・Git/PR管理・CI/CDと公開確認まで自律的に進める方針と、情報漏洩・プライバシー侵害・不正アクセスの禁止を定めています。エージェント向けの入口は [AGENTS.md](AGENTS.md) です。

## 開発

Node.js 24とnpmを使用します。リポジトリのルートで実行してください。

```sh
npm ci
npm run dev:docs
```

`apps/docs-app` はFumadocsを使う独立したnpm workspaceです。記事の正本は `docs/` にあり、アプリはそこを直接読み込みます。

## 確認と公開

```sh
npm run check:docs
npm run typecheck
npm run build:docs
```

静的サイトを `apps/docs-app/out/` に出力します。`.github/workflows/docs-pages.yml` により、`main` の `docs/` やサイト設定の更新を検証し、GitHub Pagesへデプロイします。PRでは検証とビルドを行います。

初回はGitHubの **Settings → Pages → Source** で **GitHub Actions** を選んでください。ベースパス、公開条件、詳細な手順は [ドキュメントサイトの開発・公開](docs/engineering/docs-site.md) を参照してください。

資料の追加・更新ルールは [ナレッジベースの育て方](docs/guide/knowledge-base.md) にまとめています。
