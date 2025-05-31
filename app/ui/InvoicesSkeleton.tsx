import React from 'react';

export default function InvoicesSkeleton() {
  const dummyRows = Array.from({ length: 5 });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Invoice</h1>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyRows.map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="p-2 border border-gray-300">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </td>
              <td className="p-2 border border-gray-300">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="p-2 border border-gray-300">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td className="p-2 border border-gray-300">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </td>
              <td className="p-2 border border-gray-300">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td className="p-2 border border-gray-300">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
