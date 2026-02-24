import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importação corrigida para navegação fluida

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 6890.00,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      badge: "Mais Vendido"
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 7499.00,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop",
      badge: "Oferta"
    },
    {
      id: 3,
      name: "Apple Watch Ultra 2",
      price: 4599.00,
      image: "https://images.unsplash.com/photo-1697227092323-93d396a84c8a?q=80&w=800&auto=format&fit=crop",
      badge: null
    },
    {
      id: 4,
      name: "iPad Pro 12.9",
      price: 6200.00,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
      badge: null
    },
  ];

  return (
    // Fundo alinhado com o resto do site (#050505)
    <section className="bg-[#050505] py-20 lg:py-24 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* === HEADER EDITORIAL (Mesmo estilo das Categorias) === */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-3 block">
              Top Sellers
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Destaques da Semana.
            </h2>
          </div>
          
          {/* Link para desktop corrigido com o ícone combinando */}
          <Link 
            to="/catalogo" 
            className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white font-medium transition-colors group"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-red" />
          </Link>
        </div>

        {/* === GRID DE PRODUTOS === */}
        {/* No mobile mantivemos 1 por linha para a foto brilhar. Se espremer 2 por linha com preço e botão, fica confuso. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-500 shadow-lg hover:shadow-brand-red/5"
            >
              
              {/* Área da Imagem */}
              <div className="relative overflow-hidden aspect-square">
                {/* Overlay sutil que some ao passar o mouse */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                
                {/* Badge Premium (Estilo Pílula Transparente/Blur) */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-brand-red/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full z-20 shadow-xl">
                    {product.badge}
                  </div>
                )}

                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Área de Texto e Compra */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-6 line-clamp-1">{product.name}</h3>
                
                <div className="mt-auto">
                  {/* Preço Branco e Clean (Luxo) */}
                  <div className="flex flex-col mb-6">
                    <span className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">A partir de</span>
                    <span className="text-2xl font-bold text-white tracking-tight">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                  </div>

                  {/* Botão Refinado */}
                  <button className="w-full bg-neutral-900 border border-white/10 hover:bg-brand-red hover:border-brand-red text-white py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <ShoppingCart className="w-4 h-4 text-neutral-400 group-hover/btn:text-white transition-colors" />
                    Tenho Interesse
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Botão Mobile (Ver tudo) Corrigido */}
        <div className="mt-10 text-center md:hidden">
           <Link 
             to="/catalogo" 
             className="inline-flex items-center justify-center gap-2 w-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 text-white px-6 py-4 rounded-xl font-medium transition-colors"
           >
             Ver Catálogo Completo
             <ArrowRight className="w-4 h-4 text-neutral-400" />
           </Link>
        </div>

      </div>
    </section>
  );
}