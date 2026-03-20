import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { Logistics } from '../components/Logistics';
import { Footer } from '../components/Footer';
import { Streetwear } from '../components/Streetwear';
import { ValueProp } from '../components/ValueProp';

const marcas = [
  { 
    id: 1, 
    name: "Apple", 
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop", 
    tag: "Tecnologia"
  },
  { 
    id: 2, 
    name: "Nike & Jordan", 
    image: "https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=800&auto=format&fit=crop", 
    tag: "Sneakers Premium"
  },
  { 
    id: 3, 
    name: "PlayStation & Xbox", 
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop", 
    tag: "Gaming"
  },
  { 
    id: 4, 
    name: "Grifes Exclusivas", 
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop", 
    tag: "Vestuário"
  }
];

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
    window.scrollTo(0, 0);
  }, []);

  async function fetchFeaturedProducts() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);

    if (error) { console.error('Erro:', error); } 
    else { setFeaturedProducts(data); }
    setIsLoading(false);
  }

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        
        <Hero />

        <section className="py-20 lg:py-32 relative overflow-hidden bg-[#050505]">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            
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

            {isLoading ? (
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="shrink-0 w-[55vw] sm:w-[200px] lg:w-auto snap-center flex flex-col animate-pulse">
                    <div className="relative aspect-square w-full bg-white/5 rounded-[24px] mb-4 border border-white/5"></div>
                    <div className="px-1 flex flex-col gap-2 mt-1">
                      <div className="h-4 bg-white/10 rounded-md w-3/4"></div>
                      <div className="h-3 bg-white/5 rounded-md w-1/2 mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="text-center py-20 text-neutral-500 font-light border border-neutral-800/50 rounded-[24px] bg-[#0a0a0a]">
                Nenhum destaque encontrado.
              </div>
            ) : (
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
                {featuredProducts.map((product) => (
                  <Link 
                    to={`/catalogo?search=${encodeURIComponent(product.name)}`} 
                    key={product.id} 
                    className="group shrink-0 w-[55vw] sm:w-[200px] lg:w-auto snap-center flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-square w-full bg-[#0a0a0a] rounded-[24px] overflow-hidden mb-4 border border-white/5 group-hover:border-white/20 transition-colors duration-500 flex items-center justify-center p-5">
                      
                      {/* EFEITO GLARE (LUZ DIAGONAL NO HOVER) */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30 mix-blend-overlay"></div>

                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`w-full h-full object-contain transition-transform duration-700 ease-out ${product.is_sold ? 'opacity-40 grayscale-[0.3]' : 'group-hover:scale-110'}`}
                      />
                      
                      {!product.is_sold && (
                        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full z-10">
                          Em Alta
                        </div>
                      )}

                      {product.is_sold && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center">
                          <span className="bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
                            Esgotado
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="px-1 flex flex-col gap-0.5">
                      <h4 className={`font-medium text-sm lg:text-base leading-snug transition-colors line-clamp-1 ${product.is_sold ? 'text-neutral-500' : 'text-white group-hover:text-brand-red'}`}>
                        {product.name}
                      </h4>
                      <span className={`font-light text-xs lg:text-sm tracking-wide ${product.is_sold ? 'text-neutral-600 line-through' : 'text-neutral-500'}`}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <ValueProp />

        <section className="block lg:hidden bg-[#050505] pt-12 pb-6">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between mb-5 px-1">
              <span className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">
                Marcas Disponíveis
              </span>
            </div>
            
            <div className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
              {marcas.map((marca) => (
                <Link          
                 to={`/catalogo?category=${marca.tag}`} 
                 key={marca.id} 
                  className="relative shrink-0 w-[65vw] sm:w-[45vw] h-auto rounded-[24px] overflow-hidden snap-center group bg-[#0a0a0a] border border-neutral-800/60 active:scale-[0.98] transition-all flex flex-col"
                >
                  <div className="h-40 w-full overflow-hidden relative">
                     <img 
                       src={marca.image} 
                       alt={marca.name}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  
                  <div className="p-5 flex flex-col justify-center bg-[#0f0f0f]">
                    <span className="text-neutral-500 text-[10px] font-medium uppercase tracking-wider mb-1">{marca.tag}</span>
                    <h3 className="text-white font-semibold text-lg tracking-tight leading-none group-hover:text-brand-red transition-colors">
                      {marca.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Categories />
        <Streetwear />
        <Logistics />

      </main>

      <Footer />
    </div>
  );
}