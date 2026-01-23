import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { FAQ } from './pages/FAQ';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// IMPORTANTE: Você precisa importar essas duas páginas novas!
import { Admin } from './pages/Admin';
import { Login } from './pages/Login'; 

function App() {
  return (
    <BrowserRouter>
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
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