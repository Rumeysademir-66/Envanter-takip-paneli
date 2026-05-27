'use client';

// Ana sayfa - urun listesi ve dashboard burada
import { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import { Product, ProductFormData } from '@/features/products/types';
import ProductTable from '@/features/products/components/ProductTable';
import ProductForm from '@/features/products/components/ProductForm';
import SummaryCards from '@/features/dashboard/SummaryCards';
import DashboardCharts from '@/features/dashboard/DashboardCharts';
import AppToolbar from '@/components/AppToolbar';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function Home() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form gonderilince ekle veya guncelle
  const handleSubmit = async (data: ProductFormData) => {
    if (editingProduct) {
      await updateProduct({ ...editingProduct, ...data });
    } else {
      await addProduct(data);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <main className="app-wrap">
      <header className="app-header">
        <h1>{t('appTitle')}</h1>
        
      </header>

      <AppToolbar products={products} />

      <div className="top-bar">
        <span style={{ fontFamily: 'Arial', fontSize: '14px' }}>
          {/* bosluk - baslik zaten headerda */}
        </span>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          {t('newProduct')}
        </button>
      </div>

      {loading ? (
        <p className="loading-text">{t('loading')}</p>
      ) : (
        <>
          <SummaryCards products={products} />
          <DashboardCharts products={products} />
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />
        </>
      )}

      {/* Urun ekleme / duzenleme popup */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editingProduct ? t('editProduct') : t('addProduct')}</h2>
            <ProductForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              initialData={editingProduct ?? undefined}
            />
          </div>
        </div>
      )}

      <footer className="app-footer">{t('footer')}</footer>
    </main>
  );
}
