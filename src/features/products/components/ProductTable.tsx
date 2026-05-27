'use client';

// Urun tablosu - arama, filtre, sayfalama
import { useState } from 'react';
import { Product } from '../types';
import ProductModal from './ProductModal';
import { useI18n } from '@/lib/i18n/I18nContext';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

// Duruma gore css class
function statusBadgeClass(status: string) {
  if (status === 'stokta') return 'badge badge-stokta';
  if (status === 'kritik') return 'badge badge-kritik';
  return 'badge badge-tukendi';
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  const { t } = useI18n();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Benzersiz kategoriler
  const categories = [...new Set(products.map((p) => p.category))];

  // Filtreleme mantigi
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchStatus = statusFilter ? p.status === statusFilter : true;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const statusLabel = (s: string) => {
    if (s === 'stokta') return t('statusStokta');
    if (s === 'kritik') return t('statusKritik');
    return t('statusTukendi');
  };

  return (
    <div className="panel">
      <div className="filter-row">
        <input
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ flex: 1, minWidth: '120px' }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">{t('allCategories')}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">{t('allStatuses')}</option>
          <option value="stokta">{t('statusStokta')}</option>
          <option value="kritik">{t('statusKritik')}</option>
          <option value="tükendi">{t('statusTukendi')}</option>
        </select>
      </div>

      <table className="data-table" cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>{t('colName')}</th>
            <th>{t('colCategory')}</th>
            <th>{t('colQuantity')}</th>
            <th>{t('colStatus')}</th>
            <th>{t('colActions')}</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id}>
              <td onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
                {product.name}
              </td>
              <td onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
                {product.category}
              </td>
              <td onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
                {product.quantity} {product.unit}
              </td>
              <td onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
                <span className={statusBadgeClass(product.status)}>
                  {statusLabel(product.status)}
                </span>
              </td>
              <td>
                <button type="button" className="link-btn" onClick={() => onEdit(product)}>
                  {t('edit')}
                </button>
                <button
                  type="button"
                  className="link-btn danger"
                  onClick={() => onDelete(product.id)}
                >
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pager">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
             className={page === i + 1 ? 'active' : 'btn-page'}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
