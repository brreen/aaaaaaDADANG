// app/Customer/Profil-cus/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// ⛔ Komponen ini menggunakan useRouter atau useSearchParams
const CustomerProfilPage = dynamic(() => import('./CustomerProfilPage'), {
  ssr: false, // <== Penting: cegah pre-render
});

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat profil pelanggan...</div>}>
      <CustomerProfilPage />
    </Suspense>
  );
}
