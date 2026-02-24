import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, LogOut, Plus, Search, Trash2, Edit, 
  X, Save, Upload, Loader2, MessageSquare, Menu, TrendingUp, DollarSign, ExternalLink
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

// IMPORT DO SEU COMPONENTE
import { TestimonialsManager } from '../components/admin/TestimonialsManager';

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    { id: 'products', label: 'Produtos', icon: <Package size={20} /> },
    { id: 'dashboard', label: 'Visão Geral', icon: <LayoutDashboard size={20} /> },
    { id: 'testimonials', label: 'Depoimentos', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-gray-100 font-sans overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed lg:relative z-50 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300 h-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white tracking-tighter italic">ADMIN<span className="text-brand-red not-italic">.</span></h1>
          <button className="lg:hidden text-neutral-500" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold text-sm ${activeTab === item.id ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-neutral-500 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 text-neutral-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-sm">
            <LogOut size={20} /> <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto relative">
        
        {/* TOP BAR MOBILE */}
        <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 p-4 lg:p-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 bg-white/5 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-xl lg:text-3xl font-black text-white uppercase tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Master Admin</span>
              <span className="text-xs text-neutral-400">tmnyc.export</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-red to-red-800 border border-white/10" />
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Package size={80} /></div>
                <h3 className="text-4xl font-black text-white mb-1 tracking-tighter">{products.length}</h3>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Produtos em Linha</p>
                <div className="mt-4 flex items-center gap-2 text-brand-green text-xs font-bold">
                  <TrendingUp size={14} /> <span>Estoque Ativo</span>
                </div>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><DollarSign size={80} /></div>
                <h3 className="text-4xl font-black text-white mb-1 tracking-tighter">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
                </h3>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Valor do Inventário</p>
                <div className="mt-4 flex items-center gap-2 text-blue-400 text-xs font-bold">
                  <ExternalLink size={14} /> <span>Cotação do Dia</span>
                </div>
              </div>

              <div className="bg-brand-red p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-center">
                <h3 className="text-white font-black text-xl mb-2">Novo Pedido?</h3>
                <p className="text-white/70 text-sm mb-4">Adicione novos itens ao seu catálogo agora mesmo.</p>
                <button onClick={handleNewProduct} className="bg-white text-black font-black py-3 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                  Cadastrar Agora
                </button>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="animate-in fade-in duration-500">
              <TestimonialsManager />
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0a0a0a] p-4 lg:p-6 rounded-3xl border border-white/5">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                  <input 
                    type="text" 
                    placeholder="Filtrar por nome ou categoria..." 
                    className="w-full bg-black border border-white/5 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:border-brand-red/50 outline-none transition-all text-sm" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
                <button onClick={handleNewProduct} className="w-full md:w-auto bg-brand-green hover:bg-green-600 text-white font-black px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20">
                  <Plus size={20} /> NOVO ITEM
                </button>
              </div>

              {/* LISTA DE PRODUTOS */}
              <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <th className="p-6">Informações do Produto</th>
                        <th className="p-6 hidden md:table-cell">Categoria</th>
                        <th className="p-6">Preço Final</th>
                        <th className="p-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loading ? (
                         <tr><td colSpan="4" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-red" /></td></tr>
                      ) : filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black border border-white/10 flex-shrink-0">
                                <img src={product.image} className="w-full h-full object-contain" alt="" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-white text-sm lg:text-base group-hover:text-brand-red transition-colors">{product.name}</span>
                                {product.featured && <span className="text-[9px] bg-brand-red/20 text-brand-red px-2 py-0.5 rounded mt-1 w-fit font-bold uppercase">Destaque</span>}
                              </div>
                            </div>
                          </td>
                          <td className="p-6 hidden md:table-cell text-neutral-400 font-medium text-sm">
                            {product.category}
                          </td>
                          <td className="p-6">
                            <span className="text-brand-green font-black text-sm lg:text-base tracking-tighter">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleEdit(product)} className="p-3 text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"><Edit size={18} /></button>
                              <button onClick={() => handleDelete(product.id)} className="p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL DE FORMULÁRIO PREMIUM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsFormOpen(false)} />
          
          <div className="bg-[#0a0a0a] w-full max-w-2xl rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{formData.id ? 'EDITAR PRODUTO' : 'NOVO PRODUTO'}</h3>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">Gerenciamento de Inventário</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 text-neutral-400 hover:text-white rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Nome do Dispositivo</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white focus:border-brand-red/50 outline-none transition-all" required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Preço Final (BRL)</label>
                  <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white focus:border-brand-red/50 outline-none transition-all" required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Categoria</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white focus:border-brand-red/50 outline-none transition-all appearance-none">
                    <option>Smartphones</option><option>Notebooks</option><option>Tablets</option><option>Acessórios</option><option>Apple</option><option>Xiaomi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Descrição Técnica</label>
                <textarea rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white focus:border-brand-red/50 outline-none resize-none" placeholder="Especificações, cor, estado..." />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Mídia do Produto</label>
                <div className="flex items-center gap-6 p-4 bg-black rounded-2xl border border-white/5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 flex-shrink-0 flex items-center justify-center">
                    {formData.image ? <img src={formData.image} className="w-full h-full object-contain" /> : <Package className="text-neutral-800" />}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <div className={`flex flex-col items-center justify-center gap-1 w-full py-4 rounded-xl border-2 border-dashed border-white/10 hover:border-brand-red/30 transition-all ${uploading ? 'opacity-50' : ''}`}>
                      {uploading ? <Loader2 className="animate-spin text-brand-red" /> : <><Upload size={20} className="text-neutral-500" /><span className="text-[10px] font-bold text-neutral-500 uppercase">Subir Foto</span></>}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 bg-black rounded-2xl border border-white/5 cursor-pointer group">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-white/10 bg-black text-brand-red focus:ring-brand-red accent-brand-red" />
                <span className="text-xs font-bold text-neutral-400 group-hover:text-white transition-colors uppercase tracking-widest">Definir como produto em destaque</span>
              </label>

              <button type="submit" disabled={uploading} className="w-full bg-brand-green hover:bg-green-600 text-white font-black py-5 rounded-2xl flex justify-center items-center gap-2 transition-all shadow-xl shadow-green-900/20 disabled:opacity-50 uppercase tracking-[0.2em] text-xs">
                {uploading ? 'PROCESSANDO...' : <><Save size={18} /> SALVAR ALTERAÇÕES</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}