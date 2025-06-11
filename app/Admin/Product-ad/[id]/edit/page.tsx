import Form from '@/app/ui/home-adpro/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers, fetchProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id_produk = params.id;
  const [products] = await Promise.all([
    fetchProductById(id_produk)
  ]);

  if (!products) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Product', href: '/Admin/Product-ad' },
          {
            label: 'Edit Product',
            href: `/Admin/Product-ad/${id_produk}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={products} />
    </main>
  );
}