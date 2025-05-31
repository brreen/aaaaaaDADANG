import { formatCurrency } from '@/app/lib/utils';
import { fetchInvoices, } from '@/app/lib/data';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import InvoicesTable from '@/app/ui/invoices/table';


export default async function InvoicesPage() {
  const invoices = await fetchInvoices();
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Invoice</h1>

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable invoices={invoices} />
      </Suspense>

    </main>
  );
}
