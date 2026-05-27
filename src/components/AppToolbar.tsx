'use client';

// Ust bar: tema, dil, disa aktarma butonlari
import { useTheme } from '@/lib/theme/ThemeContext';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Locale } from '@/lib/i18n/translations';
import { exportToCsv, exportToExcel } from '@/lib/export';
import { Product } from '@/features/products/types';

type Props = {
  products: Product[];
};

export default function AppToolbar({ products }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="toolbar">
      <button type="button" className="btn-toolbar" onClick={toggleTheme}>
        {theme === 'light' ? t('themeDark') : t('themeLight')}
      </button>
      <select
        className="select-toolbar"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label="Language"
      >
        <option value="tr">{t('langTr')}</option>
        <option value="en">{t('langEn')}</option>
      </select>
      <button
        type="button"
        className="btn-toolbar btn-export"
        onClick={() => exportToCsv(products)}
        disabled={products.length === 0}
      >
        {t('exportCsv')}
      </button>
      <button
        type="button"
        className="btn-toolbar btn-export"
        onClick={() => exportToExcel(products)}
        disabled={products.length === 0}
      >
        {t('exportExcel')}
      </button>
    </div>
  );
}
