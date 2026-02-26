import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulando a busca do Supabase
    setProducts([
      { id: 1, name: "iPhone 15 Pro Max", price: 6890.00, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop", badge: "Mais Vendido" },
      { id: 2, name: "MacBook Air M2", price: 7499.00, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop", badge: "Oferta" },
      { id: 3, name: "Apple Watch Ultra 2", price: 4599.00, image: "https://images.unsplash.com/photo-1697227092323-93d396a84c8a?q=80&w=800&auto=format&fit=crop", badge: null },
      { id: 4, name: "iPad Pro 12.9", price: 6200.00, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop", badge: null },
    ]);
  }, []);

  return (
    <section className="bg-[#050505] py-24 lg:py-32 relative overflow-hidden">
      
      {/* Luz de fundo minimalista */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* === HEADER CLEAN === */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-neutral-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">
              Seleção Exclusiva
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
              Destaques.
            </h2>
          </div>
          
          <Link 
            to="/catalogo" 
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
          >
            Ver catálogo <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-brand-red" />
          </Link>
        </div>

        {/* === CARROSSEL PREMIUM (Estilo Vitrine) === */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          
          {products.map((product) => (
            <Link 
              to={`/produto/${product.id}`}
              key={product.id} 
              // w-[65vw] deixa o card mais estreito no mobile, mostrando o próximo e dando elegância
              className="shrink-0 w-[65vw] sm:w-[45vw] md:w-full snap-center group flex flex-col items-center cursor-pointer"
            >
              
              {/* Caixa da Imagem (Fundo escuro em vidro, imagem com espaço em volta) */}
              <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#0e0e0e] to-[#050505] rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-colors duration-500 overflow-hidden flex items-center justify-center p-6 mb-6 shadow-2xl shadow-black/50">
                
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full z-20 border border-white/5">
                    {product.badge}
                  </div>
                )}

                {/* Imagem do produto solta dentro do card, com leve zoom no hover */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                />
              </div>

              {/* Textos Centralizados e Limpos */}
              <div className="text-center w-full px-2">
                <h3 className="text-base lg:text-lg font-semibold text-white tracking-tight mb-1">
                  {product.name}
                </h3>
                
                <p className="text-neutral-500 text-sm font-light mb-4">
                  A partir de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>

                {/* Link que aparece sutilmente no hover (Apenas PC) */}
                <div className="hidden lg:flex items-center justify-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-brand-red text-xs font-bold uppercase tracking-wider">Detalhes</span>
                  <ChevronRight className="w-3 h-3 text-brand-red" />
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* Botão Mobile (Minimalista) */}
        <div className="mt-4 flex justify-center md:hidden">
           <Link 
             to="/catalogo" 
             className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2 py-4 px-6 active:scale-95 transition-transform"
           >
             Ver Todos <ChevronRight className="w-3 h-3" />
           </Link>
        </div>

      </div>
    </section>
  );
}