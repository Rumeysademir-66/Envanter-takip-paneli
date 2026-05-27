'use client';

// Urun ekleme / duzenleme formu - react-hook-form + zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product, ProductFormData } from '../types';
import { useI18n } from '@/lib/i18n/I18nContext';

interface Props {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  initialData?: Product;
}

export default function ProductForm({ onSubmit, onCancel, initialData }: Props) {
  const { t } = useI18n();

  // Validasyon mesajlari dile gore
  const schema = z.object({
    name: z.string().min(1, t('errName')),
    category: z.string().min(1, t('errCategory')),
    quantity: z.number().min(0, t('errQuantity')),
    unit: z.string().min(1, t('errUnit')),
    status: z.enum(['stokta', 'kritik', 'tükendi']),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>{t('labelName')}</label>
        <input {...register('name')} className="form-input" style={{ width: '100%' }} />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>{t('labelCategory')}</label>
        <input {...register('category')} className="form-input" style={{ width: '100%' }} />
        {errors.category && <p className="form-error">{errors.category.message}</p>}
      </div>
      <div className="form-group">
        <label>{t('labelQuantity')}</label>
        <input
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          className="form-input"
          style={{ width: '100%' }}
        />
        {errors.quantity && <p className="form-error">{errors.quantity.message}</p>}
      </div>
      <div className="form-group">
        <label>{t('labelUnit')}</label>
        <input
          {...register('unit')}
          placeholder={t('unitPlaceholder')}
          className="form-input"
          style={{ width: '100%' }}
        />
        {errors.unit && <p className="form-error">{errors.unit.message}</p>}
      </div>
      <div className="form-group">
        <label>{t('labelStatus')}</label>
        <select {...register('status')} className="form-input" style={{ width: '100%' }}>
          <option value="stokta">{t('statusStokta')}</option>
          <option value="kritik">{t('statusKritik')}</option>
          <option value="tükendi">{t('statusTukendi')}</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          {t('cancel')}
        </button>
        <button type="submit" className="btn-primary">
          {t('save')}
        </button>
      </div>
    </form>
  );
}
