import { ShoppingCart } from 'lucide-react';

export function FeaturedProducts() {
  // Simulação dos dados (depois isso virá do Banco de Dados)
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
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho da Seção */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Destaques da Semana</h2>
            <p className="text-gray-400">As melhores oportunidades selecionadas para você.</p>
          </div>
          <a href="#" className="hidden md:block text-brand-red font-bold hover:text-white transition-colors">
            Ver tudo &rarr;
          </a>
        </div>

        {/* GRID de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all">
              
              {/* Área da Imagem */}
              <div className="relative overflow-hidden">
                
                {/* Etiqueta (Badge) - Só mostra se tiver texto */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                    {product.badge}
                  </div>
                )}

                {/* Imagem Quadrada */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Área de Texto */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                
                {/* Preço Formatado (R$) */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-400 text-sm">A partir de</span>
                  <span className="text-xl font-bold text-brand-green">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                </div>

                <button className="w-full mt-6 bg-neutral-800 hover:bg-brand-red text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                  <ShoppingCart size={18} />
                  Tenho Interesse
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Mobile (Ver tudo) */}
        <div className="mt-8 text-center md:hidden">
           <a href="#" className="inline-block border border-neutral-700 text-white px-6 py-3 rounded-lg font-bold">
             Ver Catálogo Completo
           </a>
        </div>

      </div>
    </section>
  );
}