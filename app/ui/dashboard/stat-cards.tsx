import { Card } from './cards';

export default function StatCards({ data }: { data: any }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card title="Total Customers" value={data.numberOfCustomers.toString()} type={'invoices'} />
      <Card title="Total Invoices" value={data.numberOfInvoices.toString()} type={'invoices'} />
      <Card title="Paid Invoices" value={data.totalPaidInvoices} type={'invoices'} />
      <Card title="Pending Invoices" value={data.totalPendingInvoices} type={'invoices'} />
    </div>
  );
}
