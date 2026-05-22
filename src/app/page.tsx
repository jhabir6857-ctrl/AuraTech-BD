import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function Home() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
