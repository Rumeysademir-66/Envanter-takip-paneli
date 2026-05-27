'use client';

// Ozet kartlari - toplam, kritik, tukenen sayilari
import { Product } from '@/features/products/types';
import { useI18n } from '@/lib/i18n/I18nContext';

interface Props {
  products: Product[];
}

export default function SummaryCards({ products }: Props) {
  const { t } = useI18n();

  const total = products.length;
  const critical = products.filter((p) => p.status === 'kritik').length;
  const outOfStock = products.filter((p) => p.status === 'tükendi').length;

  return (
    <div className="summary-row">
      <div className="summary-card total">
        <p className="label">{t('totalProducts')}</p>
        <p className="value">{total}</p>
      </div>
      <div className="summary-card critical">
        <p className="label">{t('criticalStock')}</p>
        <p className="value">{critical}</p>
      </div>
      <div className="summary-card out">
        <p className="label">{t('outOfStock')}</p>
        <p className="value">{outOfStock}</p>
      </div>
    </div>
  );
}
