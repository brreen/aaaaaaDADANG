import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";
import { Suspense } from 'react';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <Navbar />
       */}
           <Suspense fallback={<div>Loading navbar...</div>}>
      <Navbar />
    </Suspense>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
