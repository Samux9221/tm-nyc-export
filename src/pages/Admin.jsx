import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, LogOut, Plus, Search, Trash2, Edit, 
  X, Save, Loader2, DollarSign, ImagePlus, ImageIcon 
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  // 1. ARQUITETURA: Adicionado gallery como array vazio []
  const [formData, setFormData] = useState({
    id: null, name: '', price: '', category: 'Smartphones', image: '', featured: false, description: '', is_sold: false, gallery: []
  });

  const premiumGallery = [
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop"
  ];

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

  // Upload da Foto Principal
  async function handleImageUpload(e) {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `main_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
      toast.success('Imagem principal carregada!');
    } catch (error) {
      toast.error('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  // 2. ARQUITETURA: Nova função para Upload das Fotos Adicionais (Galeria)
  async function handleGalleryUpload(e) {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `gallery_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), data.publicUrl] }));
      toast.success('Imagem adicionada à galeria!');
    } catch (error) {
      toast.error('Erro no upload da galeria: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Por favor, adicione uma imagem principal ao produto.');
      return;
    }

    // 3. ARQUITETURA: Assegurar que o array vai formatado para o Supabase
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      featured: formData.featured,
      description: formData.description,
      is_sold: formData.is_sold,
      gallery: formData.gallery || [] 
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
    // Garante que se o produto antigo não tiver gallery, ele não quebra
    setFormData({ ...product, gallery: product.gallery || [] }); 
    setIsFormOpen(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este produto permanentemente?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      toast.success('Produto removido');
      fetchProducts();
    }
  }

  function handleNewProduct() {
    resetForm();
    setIsFormOpen(true);
  }

  function resetForm() {
    setFormData({ id: null, name: '', price: '', category: 'Smartphones', image: '', featured: false, description: '', is_sold: false, gallery: [] });
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
    <div className="flex h-screen bg-[#050505] text-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR ... (Mantido igual) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0a] border-r border-white/5 shrink-0 z-20">
        <div className="p-8">
          <h1 className="text-2xl font-black text-white tracking-tighter italic">
            ADMIN<span className="text-brand-red not-italic">.</span>
          </h1>
          <p className="text-neutral-500 text-xs font-medium mt-1">Gestão Premium</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === item.id ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm group">
            <LogOut size={20} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* HEADER MOBILE ... (Mantido igual) */}
      <header className="md:hidden absolute top-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 p-5 z-30 flex justify-between items-center">
        <h1 className="text-xl font-black text-white tracking-tighter italic">ADMIN<span className="text-brand-red not-italic">.</span></h1>
      </header>

      {/* MAIN ... */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar-hide pt-20 md:pt-0 pb-24 md:pb-0 relative z-10">
        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          
          <div className="hidden md:flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">{menuItems.find(i => i.id === activeTab)?.label}</h2>
            </div>
          </div>

          {activeTab === 'dashboard' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* ... Blocos de estatísticas mantidos ... */}
                <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-[24px] border border-white/5">
                  <p className="text-neutral-400 text-sm mb-4"><Package size={16} className="inline mr-2"/> Total de Produtos</p>
                  <h3 className="text-4xl font-extrabold">{products.length}</h3>
                </div>
                <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-[24px] border border-white/5">
                  <p className="text-neutral-400 text-sm mb-4"><DollarSign size={16} className="inline mr-2"/> Valor em Estoque</p>
                  <h3 className="text-3xl font-extrabold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}</h3>
                </div>
                <div className="bg-brand-red p-6 md:p-8 rounded-[24px] border border-white/5">
                  <h3 className="text-white font-bold text-xl mb-1">Expandir Catálogo</h3>
                  <button onClick={() => { setActiveTab('products'); handleNewProduct(); }} className="mt-6 bg-white text-black font-bold py-3 px-6 rounded-xl text-sm w-full">Novo Produto</button>
                </div>
             </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input type="text" placeholder="Buscar no catálogo..." className="w-full bg-[#0a0a0a] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:border-white/30 focus:bg-[#111] outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <button onClick={handleNewProduct} className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2"><Plus size={18} /> Adicionar Produto</button>
              </div>

              <div className="bg-[#0a0a0a] rounded-[24px] border border-white/5 overflow-hidden shadow-xl">
                {loading ? (
                  <div className="p-20 text-center"><Loader2 className="animate-spin text-white/20 mx-auto" size={32} /></div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                          <img src={product.image} className="w-12 h-12 object-contain bg-[#050505] rounded-xl border border-white/10 p-1" alt={product.name} />
                          <div>
                            <span className={`font-medium text-sm ${product.is_sold ? 'text-neutral-500 line-through' : 'text-white'}`}>{product.name}</span>
                            <div className="text-xs text-neutral-500 flex gap-2 mt-1">
                              {product.category}
                              {product.is_sold && <span className="text-brand-red">Esgotado</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(product)} className="p-2 text-neutral-400 hover:text-white rounded-lg"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-neutral-400 hover:text-brand-red rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MOBILE NAV ... */}

      {/* MODAL DE CADASTRO */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md sm:p-4">
          <div className="bg-[#050505] w-full md:max-w-4xl h-[95vh] md:h-auto md:max-h-[85vh] rounded-t-[32px] md:rounded-[32px] border border-white/10 flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0a0a]">
              <h3 className="text-xl font-bold text-white">{formData.id ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 text-neutral-400 hover:text-white rounded-full"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar-hide p-6 flex flex-col md:flex-row gap-8">
              
              <div className="w-full md:w-1/3 flex flex-col gap-3">
                <label className="text-sm font-medium text-neutral-400">Foto Principal (Capa)</label>
                <div className="aspect-square w-full rounded-[24px] bg-[#0a0a0a] border-2 border-dashed border-white/10 hover:border-white/30 relative overflow-hidden flex items-center justify-center">
                  {formData.image ? (
                    <img src={formData.image} className="w-full h-full object-contain p-4" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center text-neutral-600"><ImagePlus size={32} className="mb-2" /><span className="text-xs">Carregar Capa</span></div>
                  )}
                  {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 className="animate-spin text-white" size={32} /></div>}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploading} />
                </div>

                {/* 4. ARQUITETURA: Renderização e Adição da Galeria Extra */}
                <div className="mt-4 flex flex-col gap-3 bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                  <label className="text-sm font-medium text-neutral-400 flex items-center justify-between">
                    Fotos Extra 
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{formData.gallery?.length || 0}/4</span>
                  </label>
                  
                  <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar-hide">
                    {(formData.gallery || []).map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg border border-white/10 bg-[#111] shrink-0 group">
                        <img src={img} className="w-full h-full object-contain p-1" />
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({...prev, gallery: prev.gallery.filter((_, i) => i !== idx)}))} 
                          className="absolute -top-2 -right-2 bg-brand-red text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    
                    {(formData.gallery || []).length < 4 && (
                      <label className="w-16 h-16 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-neutral-600 hover:text-white cursor-pointer shrink-0 transition-colors">
                        <Plus size={20} />
                        <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" disabled={uploading} />
                      </label>
                    )}
                  </div>
                </div>

                {/* Checkboxes mantidos */}
                <label className="flex items-center gap-3 mt-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5 cursor-pointer hover:bg-white/[0.02]">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-white/10 bg-black accent-white" />
                  <span className="text-sm font-medium text-neutral-400">Destaque na Página Inicial</span>
                </label>

                <label className="flex items-center gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-brand-red/10 cursor-pointer hover:bg-brand-red/5">
                  <input type="checkbox" checked={formData.is_sold || false} onChange={e => setFormData({...formData, is_sold: e.target.checked})} className="w-5 h-5 rounded border-white/10 bg-black accent-brand-red" />
                  <span className="text-sm font-medium text-neutral-400">Marcar como Esgotado</span>
                </label>
              </div>

              <div className="w-full md:w-2/3 flex flex-col gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-400">Nome do Produto</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400">Preço (BRL)</label>
                    <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400">Categoria</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white">
                      <option>Apple</option><option>Smartphones</option><option>Notebooks</option><option>Sneakers</option><option>Grifes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="text-sm font-medium text-neutral-400">Descrição Detalhada</label>
                  <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full flex-1 bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white min-h-[120px]" />
                </div>

                <button type="submit" disabled={uploading} className="w-full bg-white text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2">
                  <Save size={18} /> Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}