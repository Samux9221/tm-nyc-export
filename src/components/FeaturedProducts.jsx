import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Importação do Supabase adicionada

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Busca real no Supabase: apenas produtos marcados como 'featured'
    async function fetchFeaturedProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4); // Limita aos 4 destaques mais recentes para manter o design limpo

      if (!error && data) {
        setProducts(data);
      }
    }

    fetchFeaturedProducts();
  }, []);

  // Se não houver destaques, não renderiza a secção para não ficar um espaço vazio
  if (products.length === 0) return null;

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
              to={`/catalogo?search=${product.name}`} // Direciona para o catálogo ou para a rota do modal
              key={product.id} 
              className="shrink-0 w-[65vw] sm:w-[45vw] md:w-full snap-center group flex flex-col items-center cursor-pointer"
            >
              
              {/* Caixa da Imagem */}
              <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#0e0e0e] to-[#050505] rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-colors duration-500 overflow-hidden flex items-center justify-center p-6 mb-6 shadow-2xl shadow-black/50">
                
                {/* Tag de Categoria */}
                {product.category && !product.is_sold && (
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full z-20 border border-white/5">
                    {product.category}
                  </div>
                )}

                {/* MÁSCARA PREMIUM DE ESGOTADO */}
                {product.is_sold && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center">
                    <span className="bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
                      Esgotado
                    </span>
                  </div>
                )}

                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover rounded-xl transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${product.is_sold ? 'opacity-40 grayscale-[0.3]' : 'group-hover:scale-105'}`}
                />
              </div>

              {/* Textos Centralizados e Limpos */}
              <div className="text-center w-full px-2 flex flex-col gap-1">
                <h3 className={`text-base lg:text-lg font-semibold tracking-tight mb-1 transition-colors ${product.is_sold ? 'text-neutral-500' : 'text-white group-hover:text-neutral-300'}`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm font-light mb-4 ${product.is_sold ? 'text-neutral-600 line-through' : 'text-neutral-500'}`}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>

                {/* Detalhes Hover (Apenas PC) - Oculto se esgotado */}
                {!product.is_sold && (
                  <div className="hidden lg:flex items-center justify-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-brand-red text-xs font-bold uppercase tracking-wider">Ver Detalhes</span>
                    <ChevronRight className="w-3 h-3 text-brand-red" />
                  </div>
                )}
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