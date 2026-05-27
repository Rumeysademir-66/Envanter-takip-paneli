import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFormData } from '../types';

// API ile urun listesi CRUD islemleri
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // GET /api/products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (data: ProductFormData) => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await fetchProducts();
  };

  const updateProduct = async (product: Product) => {
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    await fetchProducts();
  };

  return { products, loading, addProduct, updateProduct, deleteProduct };
}
