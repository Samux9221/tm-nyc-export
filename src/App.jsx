import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { FAQ } from './pages/FAQ';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartSidebar } from './components/CartSidebar';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login'; 
import { Toaster } from 'react-hot-toast';
import { About } from './components/About';

function App() {
  return (
    <BrowserRouter>
    <CartSidebar />
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">
        <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#171717', // neutral-900
                color: '#fff',
                border: '1px solid #333',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e', // brand-green
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444', // brand-red
                  secondary: '#fff',
                },
              },
            }}
          />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/duvidas" element={<FAQ />} />
          
          {/* Essas duas linhas SÃO OBRIGATÓRIAS agora: */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />

        </Routes>
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;