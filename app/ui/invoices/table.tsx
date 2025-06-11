'use client';

import { DeleteInvoice, UpdateInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

type Invoices = {
  image_url: string;
  name: string;
  email: string;
  status: string;
  amount: number;
  date: string;
  quantity: number;
  id: string;
};

interface InvoicesTableProps {
  invoices: Invoices[];
  query: string;
  currentPage: number;
}

export default function InvoicesTable({
  invoices,
  query,
  currentPage,
}: InvoicesTableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* Mobile view */}
          {/* <div className="md:hidden p-2 space-y-2">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{invoice.name}</p>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                    <p className="mt-2 text-gray-700">{formatCurrency(invoice.amount)}</p>
                    <p className="text-sm text-gray-500">Quantity: {invoice.quantity}</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <InvoiceStatus status={invoice.status} />
                    <div className="flex gap-2">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Desktop view */}
          <table className="hidden min-w-full divide-y divide-gray-200 md:table">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium"> {invoice.name} </td> 
                  <td className="whitespace-nowrap px-4 py-3"> {invoice.email} </td> 
                  <td className="whitespace-nowrap px-4 py-3"> {formatCurrency(invoice.amount)} </td> 
                  <td className="whitespace-nowrap px-4 py-3"> {invoice.quantity } </td> 
                  <td className="whitespace-nowrap px-4 py-3"> {formatDateToLocal(invoice.date)} </td> 
                  <td className="whitespace-nowrap px-4 py-3"> <InvoiceStatus status={invoice.status} /> </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
