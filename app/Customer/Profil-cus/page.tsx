'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CustomerProfilPage() {
  const router = useRouter();

  const customer = {
    name: 'Dadang Cepot',
    email: 'Dadangg@gmail.com',
    phone: '0812-3456-7890',
    address: 'Bekasi',
    avatar: '/Profil.jpeg',
  };

  const handleLogout = () => {
    // Hapus data login (misalnya token)
    localStorage.removeItem('token'); // atau sessionStorage/session cookie sesuai implementasi kamu

    // Redirect ke halaman login
    router.push('/Auth/Login');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-2xl mt-10">
      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-4 inline-block hover:underline"
      >
        ← Kembali
      </button>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 relative">
          <Image
            src={customer.avatar}
            alt="Foto Profil"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">{customer.name}</h1>
          <p className="text-gray-600">{customer.email}</p>
          <p className="text-gray-500">{customer.phone}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-gray-700 font-semibold mb-2">Alamat</h2>
        <p className="text-gray-600">{customer.address}</p>
      </div>

      {/* Tombol Logout */}
      <div className="mt-8 text-right">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
