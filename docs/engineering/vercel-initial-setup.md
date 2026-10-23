---
title: Vercel初回設定手順（オーナー向け）
description: GitHubリポジトリをVercelへ接続し、ドキュメントサイトを初回公開するための画面操作と確認項目。
---

## この手順の目的

このリポジトリにはVercel向けのビルド設定が入っています。Vercel上でプロジェクトを作成してGitHubリポジトリを接続する操作は、この手順に沿って行ってください。接続後はVercelがPRプレビューと `main` の本番公開を自動で行います。

設定ファイルはリポジトリ直下の `vercel.json` です。公開対象の資料は `docs/` 全体で、サイトの静的成果物は `apps/docs-app/out/` に作られます。

## 初回接続とデプロイ

1. [Vercel](https://vercel.com/)にサインインします。GitHubリポジトリの管理権限があるアカウントを選びます。
2. ダッシュボードの **Add New → Project** を選択し、GitプロバイダーとしてGitHubを接続します。
3. リポジトリ一覧から **`Akiya-Kudo/gonnabe-musician`** を選んでImportします。一覧にない場合は **Configure GitHub App** からこのリポジトリへのアクセスを許可します。権限はこのリポジトリだけに絞ってください。
4. Project Configurationを次のように確認します。

   | 項目 | 設定 |
   | --- | --- |
   | Project Name | `gonnabe-musician`（任意の名前でも可） |
   | Root Directory | リポジトリのルート。`apps/docs-app` は選ばない |
   | Framework Preset | **Other** |
   | Production Branch | **main** |
   | Install Command | `npm ci` |
   | Build Command | `npm run check:docs && npm run typecheck && npm run build:docs` |
   | Output Directory | `apps/docs-app/out` |
   | Environment Variables | 追加不要。`NEXT_PUBLIC_BASE_PATH` も設定しない |

   ルートディレクトリが正しいことが特に重要です。アプリはリポジトリ直下の `docs/` とnpm lockfileも読むため、`apps/docs-app` をルートにすると必要なファイルが見えません。設定ファイルの値が画面に反映されない場合は、上表のコマンドと出力先をProject Settingsで設定してください。

5. **Deploy** を選び、Deployments画面で初回デプロイが **Ready** になるまで待ちます。Build Logsに失敗があれば、その内容を控えてください。
6. ReadyになったProductionデプロイのURLを開いて、次を確認します。

   - トップページが表示される。
   - `/operations/` と `/product/vision/` が開く。
   - 検索が使え、ページ間のリンクが正しく移動する。
   - ログインを求められず、公開サイトとして閲覧できる。

7. VercelのProject SettingsでGit接続先がこのリポジトリ、Production Branchが `main` になっていることを確認します。Production URLを控えて、AIエージェントへ共有してください。トークンやパスワードは共有しないでください。

独自ドメインの設定は初回公開には不要です。Vercelが割り当てたURLを使えます。GitHub Actions SecretsへのVercelトークン登録も不要です。

## 次回以降の動作

- GitHubのPRを作ると、VercelがPreviewデプロイを作成します。内容確認にはPRに表示されるPreview URLを使います。
- PRを `main` にマージすると、VercelがProductionデプロイを作成し、Production URLを新しい内容へ更新します。
- GitHub Actionsの **Documentation CI** は別に動き、Markdown検査、型検査、静的ビルドを行います。

公開を伴う変更では、AIエージェントへPRまたはマージ結果を伝えてください。エージェントが対象コミットのCI・Vercelデプロイ・Production URL上の内容を確認します。

## うまくいかない場合

| 状況 | 確認すること |
| --- | --- |
| リポジトリが選択肢に出ない | VercelのGitHub App設定で `Akiya-Kudo/gonnabe-musician` へのアクセスを許可する。 |
| `docs/` や `package-lock.json` が見つからずビルドが失敗する | Root Directoryがリポジトリルートであることを確認する。 |
| 出力フォルダがないというエラーになる | Framework PresetがOtherで、`vercel.json` の設定がDashboardから上書きされていないことを確認する。 |
| CSS・検索・リンクがルートで正しく動かない | VercelのEnvironment Variablesに `NEXT_PUBLIC_BASE_PATH` が設定されていないことを確認し、変更後に再デプロイする。 |
| URLでログインを求められる | ProductionデプロイのURLとDeployment Protection設定を確認する。公開サイトとして見せる範囲に合わせて設定する。 |
| GitHub連携後もデプロイが始まらない | Vercel Project SettingsのGit接続先とProduction Branch、およびDeployments画面のイベント・ログを確認する。 |

Build Logsや設定画面を共有して相談するときは、トークン、個人メールアドレス、不要なアカウント情報が画像やログに写らないようにしてください。
