import {
  fetchCardData,
  fetchMostSoldProducts,
  fetchRevenue,
  fetchLatestInvoices,
} from '@/app/lib/data';
import ProductList from '@/app/ui/home-adpro/products';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import StatCards from '@/app/ui/dashboard/stat-cards';
import { lusitana } from '@/app/ui/fonts';
import {
  ProductTableSkeleton,
  RevenueChartSkeleton,
  StatCardsSkeleton,
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
  const [cardData, revenue, latestInvoices, mostSoldProducts] = await Promise.all([
    fetchCardData(),
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchMostSoldProducts(), // Tetap di sini
  ]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <Suspense fallback={<StatCardsSkeleton />}>
        <StatCards data={cardData} />
      </Suspense>

      <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Produk Terlaris (Berdasarkan Jumlah Terjual)
        </h2>

        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductList products={mostSoldProducts} />
        </Suspense>
      </section>
    </main>
  );
}
