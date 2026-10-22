---
title: 出典と根拠の扱い
description: 初期提案に含まれる参照資料、根拠の限界、整理先の対応。
---

## 元資料と状態

このナレッジベースの初期方針は、ユーザーが提供した「貼り付けたテキスト.txt」を整理したものです。[初期提案の原文](../sources/initial-proposal.md)を全文保存しています。原文に作成日・調査日は記載されていません。

以下は原文に含まれる出典です。この整理作業で内容・価格・リンク先の現状を独立に再調査したものではありません。検証済みの事実、引用元の主張、本プロジェクトの仮説を分けて扱います。

## 原文中の参照先

| 分類 | 参照先 | 原文が参照する内容と留保 |
| --- | --- | --- |
| 研究 | [イメージ練習に関する研究論文](https://pmc.ncbi.nlm.nih.gov/articles/PMC3747442/) | 熟練ピアニストの演奏改善。実際に弾く練習の改善がより大きく、初心者への同じ効果は保証しない |
| 競合 | [Duolingo Music](https://blog.duolingo.com/music-course/) | 画面上の鍵盤を使った読譜・リズム・音の学習 |
| 競合 | [EarMaster Mobile](https://www.earmaster.com/products/ear-training-sight-singing/earmaster-for-mobile.html) | 聴音、リズムタップ、成績に応じた出題 |
| 競合 | [Tomplay](https://tomplay.com/how-it-works) | 楽譜と音源の連動、テンポ変更、部分反復 |
| 技術 | [MDN：PWAのオフライン動作](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation) | 教材の端末保存と通信が不安定な状況への対応 |
| 技術 | [Web Audio：outputLatency](https://www.w3.org/TR/webaudio/#dom-audiocontext-outputlatency) | 出力遅延。採点には遅延補正・実機確認が別途必要 |
| 技術 | [Spotify Basic Pitch](https://github.com/spotify/basic-pitch) | 採譜技術の例。一度に一つの楽器での利用が最適とされ、指導への転換には追加検証が必要 |
| 権利 | [JASRAC：インターネットでの音楽利用](https://www.jasrac.or.jp/users/internet/procedure-business/) | 楽曲の権利処理。市販音源には別途音源の許諾も必要 |
| 料金 | [Supabase Pricing](https://supabase.com/pricing) | 原文はProを月額25ドルからと紹介。現行料金や採用は未確認 |
| 料金 | [Cloudflare Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/) | 原文は有料プランを月額5ドルからと紹介。現行料金や採用は未確認 |

## 原文とテーマ別資料の対応

| 原文の主題 | 整理先 |
| --- | --- |
| 個人でAIを使う初期開発の可能性、事業の核、能力、限界、イメージ練習の研究 | [サービスの方針](../product/vision.md)、[技術方針](../engineering/product-approach.md) |
| 初期対象者、楽器ごとの適性、初級ピアノの提案と例外 | [対象者と対象楽器](../product/audience.md) |
| 学習の流れ、9機能案、付点リズムの体験、3利用モード、通勤時の操作 | [学習体験と機能](../product/experience.md) |
| 競合3サービスと演奏上のつまずきに基づく差別化 | [サービスの方針](../product/vision.md) |
| ブランド6要素、仮称、タグライン、商標・ドメインの未確認 | [ブランドの方向性](../product/brand.md) |
| AIの使い方、6領域の実現性、採点、PWA・オフライン、遅延、採譜、教材の権利 | [プロダクトの技術方針](../engineering/product-approach.md) |
| 開発条件、期間、人数、教材数、費用、費用に含まれないもの、参考料金、運営の仕事 | [ロードマップと予算](../business/roadmap-and-budget.md) |
| 聞き取り、4週間の試用、演奏の前後比較、比較群、練習時間、有料継続、仮基準、見直し | [検証計画と価格仮説](../business/validation.md) |

## 今後の調査記録

追加調査では、確認日、対象、参照先、観察結果、解釈、適用範囲を記録します。新しい根拠で方針を変更する際は、変更理由を意思決定として残します。
