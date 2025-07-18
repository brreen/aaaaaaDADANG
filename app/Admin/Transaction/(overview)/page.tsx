import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/home-adpro/pagination';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import InvoicesTable from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  // Fetch data
  const totalPages = await fetchInvoicesPages(query);
  const invoices = await fetchFilteredInvoices(query, currentPage);
  return (
    <div className="w-full">
      {/* header dan tombol */}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      
      <InvoicesTable 
        invoices={invoices}  
        query={query} 
        currentPage={currentPage} 
      />

      {/* pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}