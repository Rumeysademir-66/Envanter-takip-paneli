// Urun tip tanimlari - API ve formda kullanilir
export type ProductStatus = 'stokta' | 'kritik' | 'tükendi';

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: ProductStatus;
}

export interface ProductFormData {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: ProductStatus;
}
