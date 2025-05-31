import { Suspense } from 'react';
import { ProductTableSkeleton } from '@/app/ui/skeletons';
import { fetchProducts } from '@/app/lib/data';
import ProductList from '@/app/ui/customers/products';

export default async function ProductPageWithSkeleton() {
  const products = await fetchProducts();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </main>
  );
}
