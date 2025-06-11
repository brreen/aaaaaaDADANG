'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = (path: string) => {
    const currentPath = pathname?.replace(/\/$/, '') || '';
    return currentPath.includes(path);
  };

  const getLinkClass = (path: string) => {
    return isActive(path)
      ? 'font-bold border-b-2 border-black'
      : 'font-medium text-gray-500 hover:text-gray-800 transition-colors duration-200';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Hanya jalankan search jika sedang di halaman /Customer/product-cus
    if (pathname.includes('/Customer/product-cus')) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('query', searchQuery);
      params.set('page', '1'); // reset halaman jika pakai pagination
      router.replace(`/Customer/product-cus?${params.toString()}`);
    }
  };

  return (
    <nav className="py-6 px-12 bg-[#f8f3ea] flex justify-between items-center">
      {/* Logo kiri */}
      <div className="flex items-center">
        <Image
          src="/logoflorea.png"
          alt="Florea logo"
          width={100}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Navigasi tengah */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-12">
        <Link href="/Customer/home-cus" className={getLinkClass('home-cus')}>
          Home
        </Link>
        <Link href="/Customer/product-cus" className={getLinkClass('product-cus')}>
          Product
        </Link>
        <Link href="/Customer/blog-cus" className={getLinkClass('blog-cus')}>
          Blog
        </Link>
        <Link href="/Customer/review-cus" className={getLinkClass('review-cus')}>
          Review
        </Link>
        <Link href="/Customer/about-cus" className={getLinkClass('about-cus')}>
          About Us
        </Link>
      </div>

      {/* Search + Profile kanan */}
      <div className="flex items-center space-x-6">
        <Link href="/Customer/profil-cus" aria-label="Profile">
          <Image
            src="/profilad.jpg"
            alt="User Profile"
            width={36}
            height={36}
            className="rounded-full border border-gray-300 hover:border-gray-500 transition-all duration-200"
          />
        </Link>
      </div>
    </nav>
  );
}
