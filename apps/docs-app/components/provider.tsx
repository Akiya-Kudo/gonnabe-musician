'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { translations } from '@/lib/i18n';
import SearchDialog from './search';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      i18n={{ locale: 'ja', translations }}
    >
      {children}
    </RootProvider>
  );
}
