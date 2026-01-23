import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

// === IMPORTANDO SEUS COMPONENTES VISUAIS ===
import { Header } from '../components/Header';
import { Hero } from '../components/Hero'; // <--- Seu Hero original volta aqui!
import { Categories } from '../components/Categories';
import { Logistics } from '../components/Logistics';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export function Home() {
  // Lógica do Supabase (Mantém igual)
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);

    if (error) { console.error('Erro:', error); } 
    else { setFeaturedProducts(data); }
  }

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        
        {/* 1. SEU HERO ORIGINAL (Logitech Style) */}
        <Hero />

        {/* 2. SUAS CATEGORIAS ORIGINAIS */}
        <Categories />

        {/* 3. AQUI ENTRA A SEÇÃO INTELIGENTE (SUPABASE) */}
        {/* Substituímos o componente estático FeaturedProducts por esse código dinâmico */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Destaques da Semana</h3>
              <p className="text-gray-400">Ofertas reais vindas do estoque.</p>
            </div>
            <Link to="/catalogo" className="text-brand-red hover:text-red-400 font-bold flex items-center gap-2 group">
              Ver tudo <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Carregando ofertas...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800 hover:border-brand-red/50 transition-all hover:-translate-y-2">
                  <div className="h-64 overflow-hidden relative group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">OFERTA</div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
                    <span className="text-2xl font-bold text-brand-green">
                       {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. SEUS OUTROS COMPONENTES ORIGINAIS */}
        <Testimonials />
        <Logistics />

      </main>

      <Footer />
    </div>
  );
}