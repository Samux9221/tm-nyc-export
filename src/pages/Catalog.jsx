import { useState, useEffect } from 'react'; // Adicionamos useEffect
import { Search, Filter } from 'lucide-react';
import { Header } from '../components/Header';
import { supabase } from '../supabaseClient'; // <--- IMPORTANTE: Importando a conexão

export function Catalog() {
  // Estado para guardar os produtos que vêm do Banco
  const [products, setProducts] = useState([]);
  
  // Estado de carregamento (para não mostrar tela em branco enquanto busca)
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // === A MÁGICA ACONTECE AQUI ===
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    console.log("Iniciando busca..."); // <--- NOVO
    
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('ERRO DO SUPABASE:', error); // <--- Vai mostrar o erro real
      alert('Erro na conexão! Abra o console (F12) para ver.');
    } else {
      console.log('DADOS RECEBIDOS:', data); // <--- Vai mostrar o que veio
      if (data.length === 0) {
        alert('Conexão feita, mas a tabela veio VAZIA. Provavelmente é o RLS.');
      }
      setProducts(data);
    }
    setLoading(false);
  }

  /*async function fetchProducts() {
    setLoading(true);
    // Vai na tabela 'products' e traz tudo (*)
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Erro ao buscar produtos:', error);
    } else {
      setProducts(data); // Guarda os dados no estado
    }
    setLoading(false);
  }*/
  // ==============================

  const categories = ["Todos", "Smartphones", "Notebooks", "Tablets", "Acessórios"];

  // Lógica de Filtro (continua igual, mas agora filtra os dados reais)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <h2 className="text-3xl font-bold text-white mb-8">Catálogo Completo</h2>

        {/* Barra de Busca e Filtros */}
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
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-brand-red text-white font-bold' 
                    : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* === ÁREA DE PRODUTOS === */}
        {loading ? (
          // Efeito de "Carregando" simples
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
            <p className="text-gray-400">Buscando produtos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-brand-red transition-all group">
                {/* Imagem */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Badge de Categoria */}
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">{product.name}</h3>
                  <p className="text-brand-red font-bold text-xl mb-4">
                    {/* Formatação automática de dinheiro R$ */}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </p>
                  
                  <button className="w-full bg-brand-green hover:bg-green-500 text-white py-2 rounded font-bold uppercase text-sm transition-colors">
                    Orçar no Zap
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensagem se não achar nada */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Nenhum produto encontrado com esses filtros.
          </div>
        )}

      </main>
    </div>
  );
}