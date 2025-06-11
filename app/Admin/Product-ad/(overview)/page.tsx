import { Suspense } from 'react';
import { ProductTableSkeleton } from '@/app/ui/skeletons';
import { fetchProductsPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { CreateProduct } from '@/app/ui/home-adpro/buttons';
import ProductsTable from '@/app/ui/home-adpro/table'; // Pastikan sudah ada komponen ini
import Pagination from '@/app/ui/home-adpro/pagination'; // Buat pagination umum jika belum ada

export default async function ProductPage(props: {
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
      <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} fallback={<ProductTableSkeleton />}>
        <ProductsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </main>
  );
}
