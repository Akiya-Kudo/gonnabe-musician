import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-2xl font-semibold">資料が見つかりません</h1>
      <p className="mt-4 text-fd-muted-foreground">ページが移動したか、まだ作成されていません。</p>
      <Link className="mt-6 inline-block underline" href="/">ナレッジベースに戻る</Link>
    </main>
  );
}
