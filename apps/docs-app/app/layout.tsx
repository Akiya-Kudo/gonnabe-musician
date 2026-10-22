import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Provider } from '@/components/provider';
import { source } from '@/lib/source';
import { basePath, repositoryUrl, siteName } from '@/lib/site';
import './global.css';

export const metadata: Metadata = {
  title: { default: `${siteName} | ナレッジベース`, template: `%s | ${siteName}` },
  description: '音楽練習サービスの構想・設計・調査・検証を育てるナレッジベース。',
  icons: { icon: `${basePath}/icon.svg` },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Provider>
          <DocsLayout
            tree={source.getPageTree()}
            nav={{ title: siteName, url: '/' }}
            githubUrl={repositoryUrl}
          >
            {children}
          </DocsLayout>
        </Provider>
      </body>
    </html>
  );
}
