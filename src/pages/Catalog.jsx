import { useState, useEffect } from 'react';
import { Search, ChevronRight, PackageSearch } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer'; 
import { supabase } from '../supabaseClient'; 
import { ProductModal } from '../components/ProductModal';
import { useCart } from '../context/CartContext';

export function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category'); 
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "Todos");
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      toast.error("Erro ao carregar produtos");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  function openProductDetails(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleAddToCart(product, quantity) {
    addToCart(product, quantity); 
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold text-sm">Adicionado à sacola</span>
        <span className="text-xs text-neutral-500">{quantity}x {product.name}</span>
      </div>,
      {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        }
      }
    );
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
    <div className="bg-[#050505] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header /> 
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-24">
        
        {/* Cabeçalho da Página */}
        <div className="mb-8 lg:mb-12">
          <span className="text-brand-red text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 block">
            Coleção Exclusiva
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            {selectedCategory === 'Todos' ? 'Catálogo' : selectedCategory}
          </h2>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col lg:flex-row gap-5 mb-10 items-start lg:items-center justify-between">
          
          {/* Categorias (Pills) */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto custom-scrollbar-hide snap-x">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 snap-start border ${
                  selectedCategory.toLowerCase() === cat.toLowerCase() 
                    ? 'bg-brand-red border-brand-red text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Barra de Busca Premium */}
          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-brand-red transition-colors duration-300" size={16} />
            <input 
              type="text" 
              placeholder="Buscar modelo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0a] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-brand-red/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-neutral-600 text-sm"
            />
          </div>
        </div>

        {/* Status e Grid de Produtos */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-50">
             <div className="w-12 h-12 border-4 border-neutral-800 border-t-brand-red rounded-full animate-spin mb-4"></div>
             <p className="text-neutral-400 font-medium tracking-wide uppercase text-xs">Carregando acervo...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 lg:py-32 text-center border border-white/5 rounded-2xl bg-[#0a0a0a] px-4">
             <PackageSearch size={40} className="text-neutral-700 mb-4" />
             <h3 className="text-white font-bold text-lg lg:text-xl mb-2">Nenhum produto encontrado.</h3>
             <p className="text-neutral-500 text-xs lg:text-sm">Tente buscar por outro termo ou limpe os filtros.</p>
             <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("Todos");}}
                className="mt-6 text-brand-red hover:text-white text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors border-b border-brand-red/30 pb-1"
             >
               Limpar Filtros
             </button>
           </div>
        ) : (
          /* O SEGREDO ESTÁ AQUI: grid-cols-2 no mobile, gap menor (gap-3) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-[#0a0a0a] rounded-xl sm:rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-500 group flex flex-col cursor-pointer relative shadow-lg"
                onClick={() => openProductDetails(product)}
              >
                {/* Linha vermelha no hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red/0 via-brand-red/50 to-brand-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                {/* Imagem (Menor no mobile: h-36, Maior no PC: h-56) */}
                <div className="h-36 sm:h-56 bg-gradient-to-b from-[#0e0e0e] to-[#050505] overflow-hidden relative p-4 sm:p-6 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-lighten group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                  />
                  {/* Tag de Categoria (Pequenininha no celular) */}
                  {product.category && (
                    <span className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-[8px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md z-10">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Info do Produto (Paddings e fontes ajustados) */}
                <div className="p-3 sm:p-5 flex flex-col flex-1 border-t border-white/5 bg-[#0a0a0a]">
                  <h3 
                    className="text-neutral-300 font-medium text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-snug group-hover:text-white transition-colors" 
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  <div className="mt-auto flex items-end justify-between gap-1">
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[9px] sm:text-[10px] text-neutral-600 uppercase tracking-wider block mb-0.5">
                        Por apenas
                      </span>
                      {/* Tighter tracking no celular pra caber o preço inteiro */}
                      <p className="text-white font-bold text-sm sm:text-lg tracking-tighter sm:tracking-tight truncate">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </p>
                    </div>
                    
                    {/* Botão de seta (Menor no mobile) */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shrink-0">
                       <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setTimeout(() => setSelectedProduct(null), 300); 
          }} 
          product={selectedProduct}
          onAddToCart={handleAddToCart} 
        />
      )}
      
    </div>
  );
}