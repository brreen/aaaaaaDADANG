'use client';

import { CustomerField, InvoiceForm, Product, ProductField } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  HashtagIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { editProduct } from '@/app/lib/actions';
import { CubeIcon } from '@heroicons/react/16/solid';

export default function EditProductForm({
  product
}: {
  product: ProductField;
}) {
  const editProductWithId = editProduct.bind(null, product.id_produk);

  return (
    <form action={editProductWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="nama_produk" className="mb-2 block text-sm font-medium">
            Nama Produk
          </label>
          <div className="relative">
            <input
              id="nama_produk"
              name="nama_produk"
              type="text"
              defaultValue={product.nama_produk}
              placeholder="Masukkan nama produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="harga" className="mb-2 block text-sm font-medium">
            Harga Produk
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="harga"
                name="harga"
                type="number"
                step="0.01"
                defaultValue={product.harga / 100} // Convert from cents back to original value
                placeholder="Masukkan harga produk"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Product Stock */}
        <div className="mb-4">
          <label htmlFor="stok" className="mb-2 block text-sm font-medium">
            Stok Produk
          </label>
          <div className="relative">
            <input
              id="stok"
              name="stok"
              type="number"
              defaultValue={product.stok}
              placeholder="Masukkan jumlah stok"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label htmlFor="deskripsi" className="mb-2 block text-sm font-medium">
            Deskripsi Produk
          </label>
          <div className="relative">
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows={4}
              defaultValue={product.deskripsi}
              placeholder="Masukkan deskripsi produk"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500" />
          </div>
        </div>

        {/* Product Photo */}
        <div className="mb-4">
          <label htmlFor="foto" className="mb-2 block text-sm font-medium">
            Foto Produk
          </label>
          <div className="relative">
          <input
            id="foto"
            name="foto"
            type="text"
            placeholder="/map.png atau https://contoh.com/img.jpg"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
            <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {product.foto && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">Foto saat ini: {product.foto}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/Admin/Product-ad"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Product</Button>
      </div>
    </form>
  );
}