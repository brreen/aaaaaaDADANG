import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers,fetchProducts } from '@/app/lib/data'; // ✅ hanya fetchCustomers yang dibutuhkan

export default async function Page() {
  const customers = await fetchCustomers(); // ✅ Ambil data customer
  const products = await fetchProducts();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/Admin/Transaction' },
          {
            label: 'Create Invoice',
            href: '/Admin/Transaction/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} products={products} /> {/* ✅ prop yang benar */}
    </main>
  );
}
