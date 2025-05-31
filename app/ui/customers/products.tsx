import React from 'react';

interface Product {
  id_produk: string;
  nama_produk: string;
  harga: number;
  stok: number;
  foto: string;
  deskripsi: string;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return <p>Tidak ada produk tersedia.</p>;
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Daftar Produk</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Foto</th>
              <th className="border px-4 py-2">Nama Produk</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Stok</th>
              <th className="border px-4 py-2">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_produk} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{product.id_produk}</td>
                <td className="border px-4 py-2">
                  {product.foto ? (
                    <img
                      src={product.foto}
                      alt={product.nama_produk}
                      className="h-16 w-16 object-cover rounded"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded">
                      No Image
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">{product.nama_produk}</td>
                <td className="border px-4 py-2">
                  Rp {product.harga.toLocaleString('id-ID')}
                </td>
                <td className="border px-4 py-2">
                  {product.stok > 0 ? product.stok : 'Stok habis'}
                </td>
                <td className="border px-4 py-2 text-sm text-gray-700">
                  {product.deskripsi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
