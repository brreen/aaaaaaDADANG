import Image from 'next/image';
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';

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
    return <p className="p-4">Produk tidak ditemukan.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) => (
        <div
          key={product.id_produk}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          <Image
            src={product.foto}
            alt={product.nama_produk}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <h2 className="text-lg font-semibold">{product.nama_produk}</h2>
          <p className="text-sm text-gray-500">{formatCurrency(product.harga)}</p>
          <p className="text-sm text-gray-500">Stok: {product.stok}</p>
          <p className="mt-2 text-sm text-gray-700">{product.deskripsi}</p>
        </div>
      ))}
    </div>
  );
}
