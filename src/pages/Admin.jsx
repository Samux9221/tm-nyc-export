import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, LogOut, Plus, Search, Trash2, Edit, 
  X, Save, Loader2, TrendingUp, DollarSign, ImagePlus
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: null, name: '', price: '', category: 'Smartphones', image: '', featured: false, description: ''
  });

  useEffect(() => {
    checkUser();
    fetchProducts();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/login');
  }

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error) setProducts(data);
    setLoading(false);
  }

  async function handleImageUpload(e) {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
      toast.success('Imagem carregada com sucesso!');
    } catch (error) {
      toast.error('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      featured: formData.featured,
      description: formData.description
    };

    let error;
    if (formData.id) {
      const response = await supabase.from('products').update(productData).eq('id', formData.id);
      error = response.error;
    } else {
      const response = await supabase.from('products').insert([productData]);
      error = response.error;
    }

    if (error) {
      toast.error('Erro ao salvar: ' + error.message);
    } else {
      toast.success(formData.id ? 'Produto atualizado!' : 'Produto cadastrado!');
      setIsFormOpen(false);
      fetchProducts();
      resetForm();
    }
  }

  function handleEdit(product) {
    setFormData({ ...product }); 
    setIsFormOpen(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir este produto permanentemente?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      toast.success('Produto removido do catálogo');
      fetchProducts();
    }
  }

  function handleNewProduct() {
    resetForm();
    setIsFormOpen(true);
  }

  function resetForm() {
    setFormData({ id: null, name: '', price: '', category: 'Smartphones', image: '', featured: false, description: '' });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  const totalValue = products.reduce((acc, p) => acc + (p.price || 0), 0);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Catálogo', icon: <Package size={20} /> },
  ];

  return (
    // Layout Híbrido: Flex-row no PC (Sidebar + Conteúdo) e Flex-col no Mobile
    <div className="flex h-screen bg-[#050505] text-gray-100 font-sans overflow-hidden">
      
      {/* === SIDEBAR (DESKTOP) === */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0a] border-r border-white/5 shrink-0 z-20">
        <div className="p-8">
          <h1 className="text-2xl font-black text-white tracking-tighter italic">
            ADMIN<span className="text-brand-red not-italic">.</span>
          </h1>
          <p className="text-neutral-500 text-xs font-medium mt-1">Gestão Premium</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === item.id 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm"
          >
            <LogOut size={20} />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* === HEADER (MOBILE) === */}
      <header className="md:hidden absolute top-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 p-5 z-30 flex justify-between items-center">
        <h1 className="text-xl font-black text-white tracking-tighter italic">
          ADMIN<span className="text-brand-red not-italic">.</span>
        </h1>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-red to-red-900 border border-white/10" />
      </header>

      {/* === ÁREA PRINCIPAL === */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar-hide pt-20 md:pt-0 pb-24 md:pb-0 relative z-10">
        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          
          {/* HEADER DA ABA ATIVA (Apenas Desktop) */}
          <div className="hidden md:flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-neutral-500 text-sm mt-1">Gerencie seu negócio e inventário.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-red to-red-900 border border-white/10" />
          </div>

          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-[24px] border border-white/5">
                <p className="text-neutral-400 text-sm font-medium mb-4 flex items-center gap-2">
                  <Package size={16} /> Total de Produtos
                </p>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
                  {products.length}
                </h3>
              </div>

              <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-[24px] border border-white/5">
                <p className="text-neutral-400 text-sm font-medium mb-4 flex items-center gap-2">
                  <DollarSign size={16} /> Valor em Estoque
                </p>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
                </h3>
              </div>

              <div className="bg-brand-red p-6 md:p-8 rounded-[24px] border border-white/5 flex flex-col justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Expandir Catálogo</h3>
                  <p className="text-white/80 text-sm font-light">Adicione novidades à vitrine.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('products'); handleNewProduct(); }} 
                  className="mt-6 bg-white text-black font-bold py-3 px-6 rounded-xl text-sm transition-transform active:scale-95 shadow-lg w-full md:w-auto"
                >
                  Novo Produto
                </button>
              </div>

            </div>
          )}

          {/* TAB: PRODUTOS */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Barra de Busca e Ação */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar no catálogo..." 
                    className="w-full bg-[#0a0a0a] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:border-white/30 focus:bg-[#111] outline-none transition-all text-sm font-light" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
                <button 
                  onClick={handleNewProduct} 
                  className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <Plus size={18} /> Adicionar Produto
                </button>
              </div>

              {/* Lista de Produtos (Tabela no PC, Cards no Mobile) */}
              <div className="bg-[#0a0a0a] rounded-[24px] border border-white/5 overflow-hidden">
                {loading ? (
                  <div className="p-16 text-center flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-white/20" size={32} />
                    <span className="text-neutral-500 text-sm font-medium">Carregando acervo...</span>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-16 text-center text-neutral-500 text-sm">Nenhum produto encontrado.</div>
                ) : (
                  <>
                    {/* CABEÇALHO DA TABELA (Apenas PC) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-neutral-500 text-xs font-semibold uppercase tracking-wider bg-white/[0.02]">
                      <div className="col-span-6">Produto</div>
                      <div className="col-span-2">Categoria</div>
                      <div className="col-span-2">Preço</div>
                      <div className="col-span-2 text-right pr-4">Ações</div>
                    </div>

                    {/* LINHAS DA TABELA */}
                    <div className="divide-y divide-white/5">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="p-4 md:p-4 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                          
                          {/* Coluna 1: Produto (Imagem + Nome) */}
                          <div className="col-span-6 flex items-center gap-4">
                            <div className="w-16 h-16 md:w-12 md:h-12 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center p-1 shrink-0">
                              <img src={product.image} className="w-full h-full object-contain" alt={product.name} />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-white text-sm line-clamp-1">{product.name}</span>
                              {/* Mobile Only: Mostra categoria embaixo do nome */}
                              <span className="md:hidden text-neutral-500 text-xs mt-0.5">{product.category}</span>
                              {product.featured && <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded mt-1.5 w-max font-medium tracking-wide md:hidden">Destaque</span>}
                            </div>
                          </div>

                          {/* Coluna 2: Categoria (Apenas PC) */}
                          <div className="hidden md:flex col-span-2 flex-col items-start justify-center">
                            <span className="text-neutral-400 text-sm">{product.category}</span>
                            {product.featured && <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded mt-1 font-medium tracking-wide">Destaque</span>}
                          </div>

                          {/* Coluna 3: Preço */}
                          <div className="md:col-span-2 flex items-center">
                            <span className="text-white font-medium text-sm">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                            </span>
                          </div>

                          {/* Coluna 4: Ações */}
                          <div className="md:col-span-2 flex items-center justify-end gap-2 border-t border-white/5 md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0 w-full md:w-auto">
                            <button onClick={() => handleEdit(product)} className="flex-1 md:flex-none p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex justify-center items-center">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="flex-1 md:flex-none p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex justify-center items-center">
                              <Trash2 size={16} />
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* === DOCK DE NAVEGAÇÃO INFERIOR (APENAS MOBILE) === */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl z-40 flex justify-between items-center">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)} 
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-full transition-all ${activeTab === item.id ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
          >
            {item.icon}
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        ))}
        <div className="w-[1px] h-6 bg-white/10 mx-1" />
        <button onClick={handleLogout} className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-neutral-500 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="text-[10px] font-medium tracking-wide">Sair</span>
        </button>
      </nav>

      {/* === MODAL DE CADASTRO / EDIÇÃO === */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md sm:p-4">
          
          <div className="bg-[#050505] w-full md:max-w-4xl h-[95vh] md:h-auto md:max-h-[85vh] rounded-t-[32px] md:rounded-[32px] border border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 overflow-hidden relative">
            
            {/* Header do Modal */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0a0a] z-10">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {formData.id ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Corpo do Modal (2 Colunas no PC) */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar-hide p-6 md:p-8 flex flex-col md:flex-row gap-8">
              
              {/* Coluna 1: Imagem */}
              <div className="w-full md:w-1/3 flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-400">Foto Principal</label>
                <div className="aspect-square w-full rounded-[24px] bg-[#0a0a0a] border-2 border-dashed border-white/10 hover:border-white/30 transition-colors relative group overflow-hidden flex items-center justify-center">
                  
                  {formData.image ? (
                    <img src={formData.image} className="w-full h-full object-contain p-4" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center text-neutral-600 group-hover:text-white transition-colors">
                      <ImagePlus size={32} className="mb-2" />
                      <span className="text-xs font-medium">Fazer Upload</span>
                    </div>
                  )}

                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                  )}
                  
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" disabled={uploading} />
                </div>
                
                <label className="flex items-center gap-3 mt-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5 cursor-pointer group">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-white/10 bg-black text-white focus:ring-0 accent-white" />
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                    Destaque na Página Inicial
                  </span>
                </label>
              </div>

              {/* Coluna 2: Informações */}
              <div className="w-full md:w-2/3 flex flex-col gap-5">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-400">Nome do Produto</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none transition-all" required placeholder="Ex: iPhone 15 Pro Max 256GB" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400">Preço (BRL)</label>
                    <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none transition-all" required placeholder="0.00" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400">Categoria</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none transition-all appearance-none">
                      <option>Smartphones</option><option>Notebooks</option><option>Tablets</option><option>Acessórios</option><option>Apple</option><option>Xiaomi</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="text-sm font-medium text-neutral-400">Descrição Detalhada</label>
                  <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full flex-1 min-h-[120px] bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none resize-none transition-all" placeholder="Especificações técnicas, garantia, cores disponíveis..." />
                </div>

                {/* Botão Salvar - Agora fica no final da coluna direita no PC */}
                <div className="pt-2 pb-8 md:pb-0">
                  <button type="submit" disabled={uploading} className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all disabled:opacity-50 text-sm">
                    {uploading ? 'Salvando...' : <><Save size={18} /> Salvar Produto</>}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}