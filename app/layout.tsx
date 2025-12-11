import React from 'react';
import { AppShell } from '../components/AppShell';
import './globals.css';

export const metadata = {
  title: 'EchoMatch - Anonieme Ideeën',
  description: 'Deel je gedachten anoniem.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
