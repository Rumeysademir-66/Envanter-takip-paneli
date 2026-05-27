'use client';

// Tum context providerlari tek yerde
import { I18nProvider } from '@/lib/i18n/I18nContext';
import { ThemeProvider } from '@/lib/theme/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
