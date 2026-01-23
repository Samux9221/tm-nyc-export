import { useState } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Header } from '../components/Header'; // Importe seus componentes
import { Footer } from '../components/Footer';

export function Catalog() {
  // Estado para guardar o texto da busca
  const [searchTerm, setSearchTerm] = useState("");

  // Dados Mockados (Simulando banco de dados completo)
  const allProducts = [
    { id: 1, name: "iPhone 15 Pro Max", price: 6890.00, category: "Smartphones", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "MacBook Air M2", price: 7499.00, category: "Laptops", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Apple Watch Ultra 2", price: 4599.00, category: "Smartwatches", image: "https://images.unsplash.com/photo-1697227092323-93d396a84c8a?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "iPad Pro 12.9", price: 6200.00, category: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "AirPods Max", price: 3800.00, category: "Audio", image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "PS5 Slim", price: 3500.00, category: "Games", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop" },
  ];

  // Lógica simples de filtro (Filtrar pelo nome digitado)
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20 container mx-auto px-4">
        
        {/* Cabeçalho do Catálogo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Catálogo Completo</h1>
          
          {/* Barra de Busca */}
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-red transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* === SIDEBAR (FILTROS) === */}
          <aside className="lg:w-1/4">
            <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 sticky top-32">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="text-brand-red w-5 h-5" />
                <h3 className="text-white font-bold">Filtros</h3>
              </div>

              {/* Categorias */}
              <div className="mb-8">
                <h4 className="text-gray-400 text-sm font-bold uppercase mb-4">Categorias</h4>
                <ul className="space-y-2">
                  {["Todos", "Smartphones", "Laptops", "Tablets", "Audio", "Games"].map((cat) => (
                    <li key={cat}>
                      <label className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
                        <input type="checkbox" className="rounded border-neutral-700 bg-neutral-800 text-brand-red focus:ring-brand-red" />
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preço (Visual apenas por enquanto) */}
              <div>
                <h4 className="text-gray-400 text-sm font-bold uppercase mb-4">Faixa de Preço</h4>
                <input type="range" className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-red" />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>R$ 0</span>
                  <span>R$ 15.000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* === GRID DE PRODUTOS === */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-brand-red/50 transition-all hover:-translate-y-1 group">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-brand-red font-bold uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-green font-bold text-lg">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </span>
                      <button className="bg-neutral-800 p-2 rounded-lg hover:bg-brand-red text-white transition-colors">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mensagem se não achar nada na busca */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado com esse nome.</p>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}