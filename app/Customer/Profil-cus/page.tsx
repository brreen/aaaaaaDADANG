'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CustomerProfilPage = dynamic(() => import('./CustomerProfilPage'), {
  ssr: false, // ⛔️ Matikan server-side rendering
});

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat profil pelanggan...</div>}>
      <CustomerProfilPage />
    </Suspense>
  );
}
