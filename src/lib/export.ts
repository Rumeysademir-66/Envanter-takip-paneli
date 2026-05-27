// Envanter listesini disari aktarma fonksiyonlari
import * as XLSX from 'xlsx';
import { Product } from '@/features/products/types';

// CSV - tarayicida indirme
export function exportToCsv(products: Product[], filename = 'envanter.csv') {
  const headers = ['id', 'name', 'category', 'quantity', 'unit', 'status'];
  const rows = products.map((p) =>
    [p.id, p.name, p.category, p.quantity, p.unit, p.status]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
}

// Excel - xlsx kutuphanesi ile
export function exportToExcel(products: Product[], filename = 'envanter.xlsx') {
  const data = products.map((p) => ({
    ID: p.id,
    Urun: p.name,
    Kategori: p.category,
    Miktar: p.quantity,
    Birim: p.unit,
    Durum: p.status,
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Envanter');
  XLSX.writeFile(wb, filename);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
