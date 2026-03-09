import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { FAQ } from './pages/FAQ';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartSidebar } from './components/CartSidebar';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login'; 
import { Toaster } from 'react-hot-toast';
import { About } from './components/About';
import { MobileNav } from './components/MobileNav';
import { PageTransition } from './components/PageTransition';

// Criamos um componente interno para poder usar o useLocation()
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // mode="wait" garante que a página atual suma ANTES da nova aparecer, evitando quebras de layout
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/catalogo" element={<PageTransition><Catalog /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><About /></PageTransition>} />
        <Route path="/duvidas" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/admin" element={<Admin />} /> {/* Admin sem transição para ser mais rápido */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartSidebar />
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">
        <Toaster 
            position="top-center"
            toastOptions={{
              style: { background: '#171717', color: '#fff', border: '1px solid #333' },
              success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        
        <AnimatedRoutes />
        
        <MobileNav />
      </div>
    </BrowserRouter>
  );
}

export default App;