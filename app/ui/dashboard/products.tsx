import React from 'react';

interface Product {
  id_produk: string;
  nama_produk: string;
  harga: number;
  stok: number;
  foto: string;
  deskripsi: string;
  quantity?: number; // quantity terjual
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
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product.id_produk}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            {product.foto ? (
              <img
                src={product.foto}
                alt={product.nama_produk}
                className="w-full h-48 object-cover rounded mb-3"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-3 text-gray-500">
                No Image
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{product.nama_produk}</h3>
            <p className="mb-2 text-green-700 font-semibold">
              Harga: Rp {product.harga.toLocaleString('id-ID')}
            </p>
            <p className="mb-2">
              Stok: {product.stok}
            </p>
            {/* Tampilkan jumlah terjual jika ada */}
            {product.quantity !== undefined && (
              <p className="mb-2 text-blue-600 font-medium">
                Terjual: {product.quantity}
              </p>
            )}
            <p className="text-sm text-gray-600">{product.deskripsi}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
