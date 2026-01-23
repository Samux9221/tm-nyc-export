import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importe suas páginas e componentes
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Logistics } from "./components/Logistics";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Testimonials } from './components/Testimonials';
import { FAQ } from "./pages/FAQ";

// Importe a nova página
import { Catalog } from "./pages/Catalog"; // Crie a pasta 'pages' ou ajuste o caminho

// Vamos criar um componente só para a Home para ficar organizado
function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <Logistics />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">
        <Routes>
          {/* Quando o link for "/" (raiz), mostra a Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* Quando o link for "/catalogo", mostra o Catálogo */}
          <Route path="/catalogo" element={<Catalog />} />

          <Route path="/duvidas" element={<FAQ />} />
        </Routes>
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;