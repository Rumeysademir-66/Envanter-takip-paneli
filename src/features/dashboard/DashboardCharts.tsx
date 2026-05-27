'use client';

// Dashboard grafikleri - Recharts kullaniyoruz
import {
  
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Product } from '@/features/products/types';
import { useI18n } from '@/lib/i18n/I18nContext';
import { useTheme } from '@/lib/theme/ThemeContext';



const PIE_COLORS = ['#3366cc', '#ff9900', '#cc3333', '#33aa33', '#9933cc', '#0099cc'];

interface Props {
  products: Product[];
}

export default function DashboardCharts({ products }: Props) {
   const { theme } = useTheme();
  const { t } = useI18n();

  // Kategori bazinda urun sayisi
  const byCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  // Durum dagilimi
  const byStatus = [
    { name: t('statusStokta'), value: products.filter((p) => p.status === 'stokta').length },
    { name: t('statusKritik'), value: products.filter((p) => p.status === 'kritik').length },
    { name: t('statusTukendi'), value: products.filter((p) => p.status === 'tükendi').length },
  ].filter((d) => d.value > 0);

  // Kategori toplam miktar
  const qtyByCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.quantity;
      return acc;
    }, {})
  ).map(([name, total]) => ({ name, total }));

  if (products.length === 0) return null;

  return (
    <div className="charts-row">
      <div className="chart-box">
        <h3 className="chart-title">{t('chartCategory')}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byCategory}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: theme === 'dark' ? '#ffffff' : '#333333' }} />
            <YAxis tick={{ fontSize: 11, fill: theme === 'dark' ? '#ffffff' : '#333333' }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3366cc" name={t('colName')} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3 className="chart-title">{t('chartStatus')}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={byStatus}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={{ fill: theme === 'dark' ? '#ffffff' : '#333333', fontSize: 13 }}
            >
              {byStatus.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box chart-box-wide">
        <h3 className="chart-title">{t('chartQuantity')}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={qtyByCategory}>
           <XAxis dataKey="name" tick={{ fontSize: 14, fill: theme === 'dark' ? '#cccccc' : '#333333' }} />
            <YAxis tick={{ fontSize: 14, fill: theme === 'dark' ? '#ffffff' : '#333333' }} />
            <Tooltip />
            <Bar dataKey="total" fill="#ff9900" name={t('colQuantity')} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
