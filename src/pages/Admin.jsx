import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, LogOut, Plus, Search, Trash2, Edit, 
  X, Save, Upload, Loader2, MessageSquare, TrendingUp, DollarSign, ExternalLink
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

import { TestimonialsManager } from '../components/admin/TestimonialsManager';

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
      toast.success('Imagem carregada!');
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
    if (!window.confirm("Deseja realmente excluir este produto?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      toast.success('Removido com sucesso');
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
    { id: 'products', label: 'Produtos', icon: <Package size={22} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'testimonials', label: 'Social', icon: <MessageSquare size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans pb-28">
      
      {/* HEADER EXCLUSIVO DO ADMIN */}
      <header className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-lg border-b border-white/5 px-4 py-4 md:px-8 md:py-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter italic">
            ADMIN<span className="text-brand-red not-italic">.</span>
          </h1>
          <h2 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Master Admin</span>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-brand-red to-red-800 border border-white/10" />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* TAB: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Package size={80} /></div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">{products.length}</h3>
              <p className="text-neutral-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Produtos em Linha</p>
              <div className="mt-4 flex items-center gap-2 text-brand-green text-[10px] md:text-xs font-bold">
                <TrendingUp size={14} /> <span>Estoque Ativo</span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5"><DollarSign size={80} /></div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
              </h3>
              <p className="text-neutral-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Valor do Inventário</p>
              <div className="mt-4 flex items-center gap-2 text-blue-400 text-[10px] md:text-xs font-bold">
                <ExternalLink size={14} /> <span>Cotação do Dia</span>
              </div>
            </div>

            <div className="bg-brand-red p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-center items-start">
              <h3 className="text-white font-black text-lg md:text-xl mb-1">Novo Pedido?</h3>
              <p className="text-white/80 text-xs md:text-sm mb-4">Adicione novos itens ao seu catálogo.</p>
              <button onClick={() => { setActiveTab('products'); handleNewProduct(); }} className="bg-white text-black font-black py-2.5 px-6 rounded-xl text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto">
                Cadastrar Agora
              </button>
            </div>
          </div>
        )}

        {/* TAB: SOCIAL */}
        {activeTab === 'testimonials' && (
          <div className="animate-in fade-in duration-500">
            <TestimonialsManager />
          </div>
        )}

        {/* TAB: PRODUTOS */}
        {activeTab === 'products' && (
          <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Barra de Busca e Ação Responsiva */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center bg-[#0a0a0a] p-3 md:p-4 rounded-3xl border border-white/5">
              <div className="relative w-full sm:w-auto flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar produto..." 
                  className="w-full bg-black border border-white/5 text-white pl-11 pr-4 py-3 rounded-2xl focus:border-brand-red/50 outline-none transition-all text-sm" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
              </div>
              <button onClick={handleNewProduct} className="w-full sm:w-auto bg-brand-green hover:bg-green-600 text-white font-black px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all text-xs md:text-sm tracking-widest uppercase">
                <Plus size={18} /> Novo
              </button>
            </div>

            {/* Lista Responsiva (Cards no Mobile / Linhas no Desktop) */}
            <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
                  <Loader2 className="animate-spin text-brand-red" size={24} />
                  <span className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Sincronizando...</span>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 md:w-14 md:h-14 rounded-2xl overflow-hidden bg-black border border-white/10 flex-shrink-0 p-1">
                          <img src={product.image} className="w-full h-full object-contain" alt="" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm md:text-base line-clamp-1">{product.name}</span>
                          <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{product.category}</span>
                          {product.featured && <span className="text-[9px] bg-brand-red/20 text-brand-red px-2 py-0.5 rounded mt-1.5 w-fit font-black uppercase tracking-widest">Destaque</span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end md:gap-8 border-t border-white/5 md:border-t-0 pt-3 md:pt-0 mt-1 md:mt-0 w-full md:w-auto">
                        <span className="text-brand-green font-black text-sm md:text-base tracking-tighter">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </span>
                        <div className="flex justify-end gap-1">
                          <button onClick={() => handleEdit(product)} className="p-2.5 md:p-3 text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(product.id)} className="p-2.5 md:p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>

                    </div>
                  ))}
                  {filteredProducts.length === 0 && !loading && (
                    <div className="p-8 text-center text-neutral-500 text-xs font-bold uppercase tracking-widest">Nenhum produto encontrado.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* DOCK DE NAVEGAÇÃO INFERIOR EXCLUSIVO DO ADMIN */}
      <nav className="fixed bottom-0 md:bottom-6 left-0 w-full md:w-auto md:left-1/2 md:-translate-x-1/2 z-40">
        <div className="bg-black/95 md:bg-black/80 backdrop-blur-xl border-t md:border border-white/10 p-2 md:p-1.5 md:rounded-2xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)] flex justify-around md:justify-center items-center gap-1 md:gap-2 pb-safe">
          
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-3 md:px-5 py-3 md:py-2.5 rounded-xl transition-all ${activeTab === item.id ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
            >
              {item.icon}
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight">{item.label}</span>
            </button>
          ))}

          <div className="hidden md:block w-[1px] h-4 bg-white/10 mx-1" />

          <button onClick={handleLogout} className="flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-3 md:py-2.5 text-neutral-600 hover:text-red-500 transition-colors">
            <LogOut size={22} className="md:w-4 md:h-4" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight md:hidden">Sair</span>
          </button>
        </div>
      </nav>

      {/* MODAL RESPONSIVO */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-md sm:p-4">
          
          <div className="bg-[#0a0a0a] w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-[2.5rem] border-t md:border border-white/10 shadow-2xl relative flex flex-col animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
            
            <div className="flex justify-between items-center p-6 border-b border-white/5 flex-shrink-0">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white tracking-tight">{formData.id ? 'EDITAR PRODUTO' : 'NOVO PRODUTO'}</h3>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Gestão de Catálogo</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 text-neutral-400 hover:text-white rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Nome do Dispositivo</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-brand-red/50 outline-none transition-all" required placeholder="Ex: iPhone 15 Pro Max 256GB" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Preço (BRL)</label>
                  <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-brand-red/50 outline-none transition-all" required placeholder="0.00" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Categoria</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-brand-red/50 outline-none transition-all appearance-none">
                    <option>Smartphones</option><option>Notebooks</option><option>Tablets</option><option>Acessórios</option><option>Apple</option><option>Xiaomi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Descrição</label>
                <textarea rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-brand-red/50 outline-none resize-none" placeholder="Especificações técnicas, cores disponíveis..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Foto do Produto</label>
                <div className="flex items-center gap-4 p-3 bg-black rounded-2xl border border-white/5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 flex-shrink-0 flex items-center justify-center p-1">
                    {formData.image ? <img src={formData.image} className="w-full h-full object-contain" /> : <Package className="text-neutral-700" size={24} />}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <div className={`flex flex-col items-center justify-center gap-1 w-full py-3 rounded-xl border-2 border-dashed border-white/10 hover:border-brand-red/30 transition-all ${uploading ? 'opacity-50' : ''}`}>
                      {uploading ? <Loader2 className="animate-spin text-brand-red" size={20} /> : <span className="text-[10px] font-bold text-neutral-400 uppercase">Procurar Imagem</span>}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 bg-black rounded-2xl border border-white/5 cursor-pointer group">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-white/10 bg-black text-brand-red focus:ring-0 accent-brand-red" />
                <span className="text-[10px] font-bold text-neutral-400 group-hover:text-white transition-colors uppercase tracking-widest">Produto em Destaque na Home</span>
              </label>

              {/* Espaçamento extra no fim do formulário no mobile */}
              <div className="pb-4 md:pb-0 pt-2">
                <button type="submit" disabled={uploading} className="w-full bg-brand-green hover:bg-green-600 text-white font-black py-4 rounded-2xl flex justify-center items-center gap-2 transition-all shadow-xl shadow-green-900/20 disabled:opacity-50 uppercase tracking-[0.2em] text-xs">
                  {uploading ? 'SALVANDO...' : <><Save size={18} /> SALVAR ALTERAÇÕES</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}