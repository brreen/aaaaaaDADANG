import Image from 'next/image';
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';
import { DeleteProduct, UpdateProduct } from '@/app/ui/home-adpro/buttons';

type Product = {
  id_produk: string;
  nama_produk: string;
  harga: number;
  stok: number;
  foto: string;
  deskripsi: string;
};

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  if (!products || products.length === 0) {
    return <p className="p-4 text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* Mobile View */}
          <div className="md:hidden p-4 space-y-4">
            {products.map((product) => (
              <div key={product.id_produk} className="rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex gap-4">
                  <Image
                    src={product.foto}
                    alt={product.nama_produk}
                    width={64}
                    height={64}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{product.nama_produk}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(product.harga)}</p>
                    <p className="text-sm text-gray-500">Stok: {product.stok}</p>
                    <p className="mt-1 text-sm text-gray-700">{product.deskripsi}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end gap-2">
                  <UpdateProduct id_produk={product.id_produk} />
                  <DeleteProduct id={product.id_produk} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-sm text-gray-700 md:table">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Foto</th>
                <th className="px-4 py-3 text-left">Nama Produk</th>
                <th className="px-4 py-3 text-left">Harga</th>
                <th className="px-4 py-3 text-left">Stok</th>
                <th className="px-4 py-3 text-left">Deskripsi</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {products.map((product) => (
                <tr key={product.id_produk} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <Image
                      src={product.foto}
                      alt={product.nama_produk}
                      width={48}
                      height={48}
                      className="rounded object-cover"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{product.nama_produk}</td>
                  <td className="whitespace-nowrap px-4 py-3">{formatCurrency(product.harga)}</td>
                  <td className="whitespace-nowrap px-4 py-3">{product.stok}</td>
                  <td className="px-4 py-3">{product.deskripsi}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <UpdateProduct id_produk={product.id_produk} />
                      <DeleteProduct id={product.id_produk} />
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
