import { fetchProductsPages } from '@/app/lib/data';
import Pagination from '@/app/ui/home-adpro/pagination';
import ProductsTable from '@/app/ui/home-cus/table';
import Search from '@/app/ui/search';
import { ProductTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function customerProductPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);


  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Produk Kami</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari produk..." />
      </div>
      <Suspense key={query + currentPage} fallback={<ProductTableSkeleton />}>
        <ProductsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
