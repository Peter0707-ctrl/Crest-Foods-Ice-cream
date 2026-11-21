import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { IceCreamPage } from './pages/IceCreamPage';
import { PopcornPage } from './pages/PopcornPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  return (
    <CartProvider>
      <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#FAF7F2] text-[#051B47]">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ice-cream" element={<IceCreamPage />} />
            <Route path="/popcorn" element={<PopcornPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <ProductModal />
      </div>
    </CartProvider>
  );
}

export default App;
