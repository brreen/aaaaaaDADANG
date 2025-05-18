import Image from "next/image";
import Link from "next/link";

const ProductPage = () => {
  return (
    <div className="min-h-screen p-8">
      {/* Product Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Product</h2>
        <Link href="/Admin/formulir-tmpro">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Add+</button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-300 flex flex-col items-center">
          <div className="w-full h-48 flex items-center justify-center">
            <img
              src="/RusticBloomBox.png"
              alt="Rustic Bloom Box"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-4 text-lg font-semibold">Rustic Bloom Box</div>
          <div className="text-sm text-gray-500">Rp 800.000</div>
          <div className="mt-4 flex space-x-4">
            <Link href="/Admin/formulir-edpro">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">Edit</button>
            </Link>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Delete</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-300 flex flex-col items-center">
          <div className="w-full h-48 flex items-center justify-center">
            <img
              src="/LavenderSerenity (1).png"
              alt="Lavender Serenity"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-4 text-lg font-semibold">Lavender Serenity</div>
          <div className="text-sm text-gray-500">Rp 650.000</div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Edit</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Delete</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-300 flex flex-col items-center">
          <div className="w-full h-48 flex items-center justify-center">
            <img
              src="/RoyalHarmony.png"
              alt="Blushing Elegance"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-4 text-lg font-semibold">Blushing Elegance</div>
          <div className="text-sm text-gray-500">Rp 850.000</div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Edit</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage