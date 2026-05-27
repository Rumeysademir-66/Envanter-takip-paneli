'use client';

// Urun detay popup - satira tiklayinca acilir
import { Product } from '../types';
import { useI18n } from '@/lib/i18n/I18nContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

function statusBadgeClass(status: string) {
  if (status === 'stokta') return 'badge badge-stokta';
  if (status === 'kritik') return 'badge badge-kritik';
  return 'badge badge-tukendi';
}

export default function ProductModal({ product, onClose }: Props) {
  const { t } = useI18n();

  if (!product) return null;

  const statusLabel =
    product.status === 'stokta'
      ? t('statusStokta')
      : product.status === 'kritik'
        ? t('statusKritik')
        : t('statusTukendi');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>
          {t('productDetail')}
          <button
            type="button"
            onClick={onClose}
            style={{ float: 'right', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            X
          </button>
        </h2>
        <div style={{ fontFamily: 'Arial', fontSize: '14px', lineHeight: '1.8' }}>
          <div>
            <b>{t('labelAd')}</b> {product.name}
          </div>
          <div>
            <b>{t('labelKategori')}</b> {product.category}
          </div>
          <div>
            <b>{t('labelMiktar')}</b> {product.quantity} {product.unit}
          </div>
          <div>
            <b>{t('labelDurum')}</b>{' '}
            <span className={statusBadgeClass(product.status)}>{statusLabel}</span>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={onClose} style={{ width: '100%', marginTop: '12px' }}>
          {t('close')}
        </button>
      </div>
    </div>
  );
}
