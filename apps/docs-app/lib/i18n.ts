import type { Translations } from 'fumadocs-ui/i18n';

// Fumadocs translation keys include their context in parentheses.
export const translations = {
  'Search(search trigger)': '資料を検索',
  'Search(search dialog)': '資料を検索',
  'Open Search(search trigger)(aria-label)': '検索を開く',
  'Close Search(search dialog)(aria-label)': '検索を閉じる',
  'No results found(search dialog)': '該当する資料がありません',
  'Search failed(search dialog)': '検索に失敗しました',
  'Search failed, showing results for {query}(search dialog)': '検索に失敗しました。「{query}」の結果を表示しています',
  'On this page(table of contents)': 'このページの内容',
  'No Headings(table of contents)': '見出しはありません',
  'Last updated on(page footer)': '最終更新',
  'Next Page(pagination)': '次のページ',
  'Previous Page(pagination)': '前のページ',
  'Open Sidebar(sidebar)(aria-label)': 'メニューを開く',
  'Close Sidebar(sidebar)(aria-label)': 'メニューを閉じる',
  'Close Sidebar(aria-label)': 'メニューを閉じる',
  'Collapse Sidebar(sidebar)(aria-label)': 'メニューを折りたたむ',
  'Toggle Theme(theme switcher)(aria-label)': '配色を切り替える',
  'Light(theme switcher)(aria-label)': 'ライト',
  'Dark(theme switcher)(aria-label)': 'ダーク',
  'System(theme switcher)(aria-label)': 'システム設定',
  'Copy Anchor Link(heading anchor)(aria-label)': '見出しへのリンクをコピー',
  'Copied Anchor Link(heading anchor)(aria-label)': 'リンクをコピーしました',
  'Copy Text(code block)(aria-label)': 'コードをコピー',
  'Copied Text(code block)(aria-label)': 'コードをコピーしました',
} satisfies Partial<Translations>;
