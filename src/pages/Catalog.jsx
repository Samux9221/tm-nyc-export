import { useState, useEffect } from 'react';
import { Search, PackageSearch } from 'lucide-react';
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
  
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category'); 
  const searchFromUrl = searchParams.get('search'); 

  // Inicializações seguras
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "Todos");
  const [searchTerm, setSearchTerm] = useState(searchFromUrl || "");
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCart(); 

  // --- EFEITO PARA LER A URL ---
  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
    else setSelectedCategory("Todos");

    if (searchFromUrl) setSearchTerm(searchFromUrl);
    else setSearchTerm(""); // Limpa a busca se tirar o parâmetro da URL

  }, [categoryFromUrl, searchFromUrl]);

  // --- EFEITO PARA BUSCAR DO BANCO ---
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
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }
    );
    setIsModalOpen(false);
  }

  // --- ARRAY ATUALIZADO DE CATEGORIAS ---
  const categories = ["Todos", "Apple", "Smartphones", "Notebooks", "Sneakers", "Gaming", "Grifes", "Acessórios"];

  // --- FILTRO À PROVA DE BALAS (DEFENSIVO) ---
  const filteredProducts = products.filter(product => {
    // String() garante que nunca teremos erro de null/undefined
    const safeProductName = product.name ? String(product.name).toLowerCase() : "";
    const safeSearchTerm = searchTerm ? String(searchTerm).toLowerCase() : "";
    const safeCategory = selectedCategory ? String(selectedCategory).toLowerCase() : "todos";

    // Filtro 1: Nome do produto bate com a barra de pesquisa?
    const matchesSearch = safeProductName.includes(safeSearchTerm);

    // Filtro 2: Categoria
    let matchesCategory = false;
    
    if (safeCategory === "todos") {
      matchesCategory = true;
    } else {
      const productCat = product.category ? String(product.category).toLowerCase() : '';
      const isCategoryMatch = productCat.includes(safeCategory) || safeCategory.includes(productCat);
      
      let isNameMatch = safeProductName.includes(safeCategory);
      // Regra especial para Apple
      if (safeCategory === 'apple' && safeProductName.includes('iphone')) isNameMatch = true;

      matchesCategory = isCategoryMatch || isNameMatch;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header /> 
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-24">
        
        {/* === HEADER DA PÁGINA === */}
        <div className="mb-10 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            {selectedCategory === 'Todos' ? 'Catálogo.' : `${selectedCategory}.`}
          </h2>
          <p className="text-neutral-500 mt-4 text-sm sm:text-base max-w-xl font-light">
            Explore nossa seleção de produtos premium, importados com segurança e garantia de autenticidade.
          </p>
        </div>

        {/* === FILTROS E BUSCA === */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
          
          {/* Categorias */}
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 snap-start ${
                  selectedCategory.toLowerCase() === cat.toLowerCase() 
                    ? 'bg-white text-black shadow-sm' 
                    : 'bg-transparent border border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Barra de Busca */}
          <div className="relative w-full lg:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors duration-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar modelo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-3 rounded-full border border-white/10 focus:border-white/30 focus:bg-[#111] focus:outline-none transition-all placeholder:text-neutral-600 text-sm font-light"
            />
          </div>
        </div>

        {/* === STATUS E GRID DE PRODUTOS === */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-50">
             <div className="w-10 h-10 border-2 border-neutral-800 border-t-white rounded-full animate-spin mb-6"></div>
             <p className="text-neutral-400 font-light tracking-widest uppercase text-xs">Acessando acervo...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-[24px] bg-[#0a0a0a] px-6">
             <PackageSearch size={48} className="text-neutral-700 mb-6" />
             <h3 className="text-white font-medium text-xl mb-2">Nenhum resultado.</h3>
             <p className="text-neutral-500 text-sm font-light max-w-md">Não encontramos produtos para esta categoria ou busca no momento.</p>
             <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("Todos");}}
                className="mt-8 text-white hover:text-neutral-300 text-xs font-bold uppercase tracking-widest transition-colors border-b border-white/20 pb-1"
             >
               Limpar Filtros
             </button>
           </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => openProductDetails(product)}
                className="group flex flex-col cursor-pointer"
              >
                <div className="w-full aspect-square bg-[#0a0a0a] rounded-[24px] border border-white/5 group-hover:border-white/20 transition-all duration-500 mb-4 p-5 sm:p-8 flex items-center justify-center overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {product.category && (
                    <span className="absolute top-4 left-4 bg-[#111] border border-white/10 text-neutral-400 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md z-10">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="px-2 flex flex-col gap-1">
                  <h3 className="text-white font-medium text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-neutral-300 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-neutral-500 font-light text-sm tracking-wide">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
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