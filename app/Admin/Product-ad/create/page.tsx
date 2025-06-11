import Form from '@/app/ui/home-adpro/create-form'; // Update path sesuai struktur folder Anda
import Breadcrumbs from '@/app/ui/home-adpro/breadcrumbs';
import { fetchProducts } from '@/app/lib/data';

export default async function Page() {
    const products = await fetchProducts();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/Admin/Product-ad' },
          {
            label: 'Create Product',
            href: '/Admin/Product-ad/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}