import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

// === IMPORTANDO SEUS COMPONENTES VISUAIS ===
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { Logistics } from '../components/Logistics';
import { Footer } from '../components/Footer';
import { Streetwear } from '../components/Streetwear';
import { ValueProp } from '../components/ValueProp';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
    // Garante que a Home sempre abra no topo ao ser montada
    window.scrollTo(0, 0);
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
    <div className="bg-[#050505] min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        
        {/* 1. HERO */}
        <Hero />

        <ValueProp />

        {/* 2. CATEGORIAS */}
        <Categories />

        {/* 3. DESTAQUES DA SEMANA (ESTILO VITRINE APPLE) */}
        <section className="py-20 lg:py-32 relative overflow-hidden bg-[#050505]">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            
            {/* --- CABEÇALHO --- */}
            <div className="mb-12 lg:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-4 block">
                  Seleção Exclusiva
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                  Destaques da <br className="hidden sm:block" /> Semana.
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl">
                  As peças mais cobiçadas do momento, com curadoria especial e prontas para importação. Acesso rápido aos lançamentos mais quentes.
                </p>
              </div>
              
              <Link 
                to="/catalogo" 
                onClick={() => window.scrollTo(0,0)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all duration-300 backdrop-blur-md w-full md:w-max active:scale-[0.98]"
              >
                Ver Catálogo Completo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* --- LISTA DE PRODUTOS --- */}
            {featuredProducts.length === 0 ? (
              <div className="text-center py-20 text-neutral-500 font-light border border-neutral-800/50 rounded-[24px] bg-[#0a0a0a]">
                Preparando curadoria...
              </div>
            ) : (
              /* Gap ajustado para 4, mantendo os cards mais próximos no celular */
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
                {featuredProducts.map((product) => (
                  <Link 
                    to={`/produto/${product.id}`} 
                    key={product.id} 
                    onClick={() => window.scrollTo(0,0)}
                    // NOVO TAMANHO: w-[55vw] no mobile. Cabem quase dois inteiros!
                    className="group shrink-0 w-[55vw] sm:w-[200px] lg:w-auto snap-center flex flex-col cursor-pointer"
                  >
                    {/* Container da Imagem: Aspect Square (1:1) com padding (p-5) */}
                    <div className="relative aspect-square w-full bg-[#0a0a0a] rounded-[24px] overflow-hidden mb-4 border border-white/5 group-hover:border-brand-red/30 transition-colors duration-500 flex items-center justify-center p-5">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        // object-contain garante que a foto caiba inteira sem cortar, cercada pelo fundo escuro
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Badge "Em Alta" miniaturizada e chique */}
                      <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                        Em Alta
                      </div>
                    </div>
                    
                    {/* Área de Texto Minimalista */}
                    <div className="px-1 flex flex-col gap-0.5">
                      <h4 className="text-white font-medium text-sm lg:text-base leading-snug group-hover:text-brand-red transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                      <span className="text-neutral-500 font-light text-xs lg:text-sm tracking-wide">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <Streetwear />

        {/* 4. LOGÍSTICA */}
        <Logistics />

      </main>

      <Footer />
    </div>
  );
}