import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast'; // <--- 1. IMPORTAR TOAST

import { Header } from '../components/Header';
import { supabase } from '../supabaseClient'; 
import { ProductModal } from '../components/ProductModal';
import { useCart } from '../context/CartContext'; // <--- 2. IMPORTAR CONTEXTO

export function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category'); 
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "Todos");
  
  // Estados do Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. PEGAR A FUNÇÃO REAL DE ADICIONAR
  const { addToCart } = useCart(); 

  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
    else setSelectedCategory("Todos");
  }, [categoryFromUrl]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Erro Supabase:', error);
      toast.error("Erro ao carregar produtos"); // <--- MUDANÇA VISUAL
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  function openProductDetails(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  // === 4. A CORREÇÃO MÁGICA ESTÁ AQUI ===
  function handleAddToCart(product, quantity) {
    // Chama a função real do Contexto
    addToCart(product, quantity); 
    
    // Mostra a notificação bonita em vez do alert
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Adicionado ao carrinho!</span>
        <span className="text-xs text-gray-400">{quantity}x {product.name}</span>
      </div>
    );

    // Fecha o modal
    setIsModalOpen(false);
  }

  const categories = ["Todos", "Smartphones", "Notebooks", "Tablets", "Acessórios", "Apple", "Xiaomi"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = false;
    if (selectedCategory === "Todos") matchesCategory = true;
    else {
      const productCat = product.category ? product.category.toLowerCase() : '';
      const productName = product.name.toLowerCase();
      const filter = selectedCategory.toLowerCase();
      const isCategoryMatch = productCat.includes(filter) || filter.includes(productCat);
      let isNameMatch = productName.includes(filter);
      if (filter === 'apple' && productName.includes('iphone')) isNameMatch = true;
      matchesCategory = isCategoryMatch || isNameMatch;
    }
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header /> {/* O Header já tem o carrinho dentro? Se não, certifique-se que o Header está atualizado */}
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <h2 className="text-3xl font-bold text-white mb-8 capitalize">
          {selectedCategory === 'Todos' ? 'Catálogo Completo' : `Filtro: ${selectedCategory}`}
        </h2>

        {/* Barra de Busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar produto..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 text-white pl-12 pr-4 py-3 rounded-lg border border-neutral-800 focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory.toLowerCase() === cat.toLowerCase() 
                    ? 'bg-brand-red text-white font-bold' 
                    : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Produtos */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
            <p className="text-gray-400">Buscando produtos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-brand-red transition-all group flex flex-col">
                <div 
                  className="h-48 overflow-hidden relative cursor-pointer"
                  onClick={() => openProductDetails(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.category && (
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm capitalize">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 
                    className="text-white font-bold text-lg mb-1 truncate cursor-pointer hover:text-brand-red transition-colors" 
                    title={product.name}
                    onClick={() => openProductDetails(product)}
                  >
                    {product.name}
                  </h3>

                  <p className="text-brand-red font-bold text-xl mb-4">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </p>
                  
                  <div className="mt-auto space-y-2">
                     <button 
                       onClick={() => openProductDetails(product)}
                       className="block w-full text-center bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded font-bold uppercase text-sm transition-colors"
                     >
                       Ver Detalhes
                     </button>
                     <a 
                       href={`https://wa.me/5511SEUNUMEROAQUI?text=Olá! Gostaria de saber mais sobre o ${product.name}`}
                       target="_blank"
                       rel="noreferrer"
                       className="block w-full text-center bg-brand-green hover:bg-green-500 text-white py-2 rounded font-bold uppercase text-sm transition-colors"
                     >
                       Orçar no Zap
                     </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
        onAddToCart={handleAddToCart} // Passando a função corrigida
      />
      
    </div>
  );
}