import React, { Suspense } from 'react';
import CustomerProfilPage from './CustomerProfilPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat profil pelanggan...</div>}>
      <CustomerProfilPage />
    </Suspense>
  );
}
