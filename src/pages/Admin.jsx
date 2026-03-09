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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // Controle da Galeria Premium
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: null, name: '', price: '', category: 'Smartphones', image: '', featured: false, description: ''
  });

  // ACERVO DE IMAGENS PREMIUM (Curadoria de alta conversão)
  // ACERVO DE IMAGENS PREMIUM (Curadoria Expandida de Alta Conversão)
  const premiumGallery = [
    // --- IPHONES & SMARTPHONES ---
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop", // Ecossistema Apple (Caixas)
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop", // iPhone em mão (Fundo vermelho)
    "https://images.unsplash.com/photo-1592899677977-9c134141b184?q=80&w=800&auto=format&fit=crop", // iPhone Pro (Câmeras)
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800&auto=format&fit=crop", // iPhone Preto Clean
    "https://images.unsplash.com/photo-1530319067432-d2a7202b8e3a?q=80&w=800&auto=format&fit=crop", // Setup de Mesa Apple
    
    // --- MACBOOKS & NOTEBOOKS ---
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", // MacBook Pro aberto
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop", // Laptop Lifestyle
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop", // Laptop em mesa premium
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop", // Notebook Fechado Prata

    // --- ACESSÓRIOS (AirPods, Relógios) ---
    "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=800&auto=format&fit=crop", // AirPods Pro
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop", // AirPods Max
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop", // Apple Watch (Sport)
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop", // Apple Watch (Metal/Clássico)

    // --- SNEAKERS & CALÇADOS ---
    "https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=800&auto=format&fit=crop", // Nike Sneakers Escuro
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", // Jordan Sneakers pendurados
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop", // Jordan Detalhe (Premium)
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop", // Yeezy / Street

    // --- VESTUÁRIO & STREETWEAR ---
    "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=800&auto=format&fit=crop", // Jaqueta / Streetwear
    "https://images.unsplash.com/photo-1550614000-4b95f4ea6c58?q=80&w=800&auto=format&fit=crop", // Roupas / Arara
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop", // Street Fashion Casual
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", // Alta Costura / Feminino

    // --- LUXO (Bolsas, Relógios Tradicionais) ---
    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop", // Bolsa Preta Luxo
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop", // Carteira / Grife
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", // Bolsa Designer Clara
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop", // Relógio Rolex / Clássico

    // --- GAMING & HARDWARE ---
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop", // Comando PS5
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop", // Headset Premium
    "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop", // Setup Gaming Completo
    "https://images.unsplash.com/photo-1592840496694-26d035b52b48?q=80&w=800&auto=format&fit=crop"  // Comando Xbox
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
      toast.success('Imagem carregada com sucesso!', { style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } });
    } catch (error) {
      toast.error('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Por favor, adicione uma imagem ao produto.');
      return;
    }

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
      toast.success(formData.id ? 'Produto atualizado!' : 'Produto cadastrado!', { style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } });
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
    if (!window.confirm("Deseja realmente excluir este produto permanentemente? Esta ação não pode ser desfeita.")) return;
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
    <div className="flex h-screen bg-[#050505] text-gray-100 font-sans overflow-hidden selection:bg-brand-red selection:text-white">
      
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
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
              <p className="text-neutral-500 text-sm mt-1">Gerencie o seu negócio e inventário.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-red to-red-900 border border-white/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
          </div>

          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-6 md:p-8 rounded-[24px] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
                <p className="text-neutral-400 text-sm font-medium mb-4 flex items-center gap-2 relative z-10">
                  <Package size={16} /> Total de Produtos
                </p>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter relative z-10">
                  {products.length}
                </h3>
              </div>

              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-6 md:p-8 rounded-[24px] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full group-hover:bg-green-500/10 transition-colors" />
                <p className="text-neutral-400 text-sm font-medium mb-4 flex items-center gap-2 relative z-10">
                  <DollarSign size={16} /> Valor em Estoque
                </p>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter relative z-10">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
                </h3>
              </div>

              <div className="bg-brand-red p-6 md:p-8 rounded-[24px] border border-white/5 flex flex-col justify-between items-start relative overflow-hidden shadow-[0_10px_30px_rgba(239,68,68,0.2)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-xl mb-1">Expandir Catálogo</h3>
                  <p className="text-white/80 text-sm font-light">Adicione novidades à vitrine.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('products'); handleNewProduct(); }} 
                  className="mt-6 bg-white text-black font-bold py-3 px-6 rounded-xl text-sm transition-transform active:scale-95 shadow-lg w-full md:w-auto hover:bg-neutral-200 relative z-10"
                >
                  Novo Produto
                </button>
              </div>

            </div>
          )}

          {/* TAB: PRODUTOS */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar no catálogo..." 
                    className="w-full bg-[#0a0a0a] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:border-white/30 focus:bg-[#111] outline-none transition-all text-sm font-light placeholder:text-neutral-600" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
                <button 
                  onClick={handleNewProduct} 
                  className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-sm"
                >
                  <Plus size={18} /> Adicionar Produto
                </button>
              </div>

              <div className="bg-[#0a0a0a] rounded-[24px] border border-white/5 overflow-hidden shadow-xl">
                {loading ? (
                  <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-white/20" size={32} />
                    <span className="text-neutral-500 text-sm font-medium">A carregar acervo...</span>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-20 text-center text-neutral-500 text-sm flex flex-col items-center gap-3">
                    <Package size={32} className="text-neutral-700" />
                    Nenhum produto encontrado.
                  </div>
                ) : (
                  <>
                    <div className="hidden md:grid grid-cols-12 gap-4 p-5 border-b border-white/5 text-neutral-500 text-xs font-semibold uppercase tracking-wider bg-white/[0.02]">
                      <div className="col-span-6">Produto</div>
                      <div className="col-span-2">Categoria</div>
                      <div className="col-span-2">Preço</div>
                      <div className="col-span-2 text-right pr-4">Ações</div>
                    </div>

                    <div className="divide-y divide-white/5">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="p-4 md:p-5 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                          
                          <div className="col-span-6 flex items-center gap-4">
                            <div className="w-16 h-16 md:w-12 md:h-12 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:border-white/20 transition-colors">
                              <img src={product.image} className="w-full h-full object-contain" alt={product.name} />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-white text-sm line-clamp-1 group-hover:text-neutral-200">{product.name}</span>
                              <span className="md:hidden text-neutral-500 text-xs mt-0.5">{product.category}</span>
                              {product.featured && <span className="text-[9px] bg-brand-red/10 text-brand-red border border-brand-red/20 px-2 py-0.5 rounded mt-1.5 w-max font-bold uppercase tracking-widest md:hidden">Destaque</span>}
                            </div>
                          </div>

                          <div className="hidden md:flex col-span-2 flex-col items-start justify-center">
                            <span className="text-neutral-400 text-sm">{product.category}</span>
                            {product.featured && <span className="text-[9px] bg-brand-red/10 text-brand-red border border-brand-red/20 px-2 py-0.5 rounded mt-1.5 font-bold uppercase tracking-widest">Destaque</span>}
                          </div>

                          <div className="md:col-span-2 flex items-center">
                            <span className="text-white font-medium text-sm">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                            </span>
                          </div>

                          <div className="md:col-span-2 flex items-center justify-end gap-2 border-t border-white/5 md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0 w-full md:w-auto">
                            <button onClick={() => handleEdit(product)} className="flex-1 md:flex-none p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex justify-center items-center">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="flex-1 md:flex-none p-2 text-neutral-400 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors flex justify-center items-center">
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
        <button onClick={handleLogout} className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-neutral-500 hover:text-brand-red transition-colors">
          <LogOut size={20} />
          <span className="text-[10px] font-medium tracking-wide">Sair</span>
        </button>
      </nav>

      {/* === MODAL DE CADASTRO / EDIÇÃO DE PRODUTO === */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md sm:p-4">
          
          <div className="bg-[#050505] w-full md:max-w-4xl h-[95vh] md:h-auto md:max-h-[85vh] rounded-t-[32px] md:rounded-[32px] border border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 overflow-hidden relative">
            
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0a0a] z-10">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {formData.id ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar-hide p-6 md:p-8 flex flex-col md:flex-row gap-8">
              
              {/* Coluna Esquerda: Imagem & Galeria */}
              <div className="w-full md:w-1/3 flex flex-col gap-3">
                <label className="text-sm font-medium text-neutral-400">Foto Principal</label>
                
                {/* Zona de Upload */}
                <div className="aspect-square w-full rounded-[24px] bg-[#0a0a0a] border-2 border-dashed border-white/10 hover:border-white/30 transition-colors relative group overflow-hidden flex items-center justify-center">
                  {formData.image ? (
                    <img src={formData.image} className="w-full h-full object-contain p-4" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center text-neutral-600 group-hover:text-white transition-colors">
                      <ImagePlus size={32} className="mb-2" />
                      <span className="text-xs font-medium">Carregar Ficheiro</span>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" disabled={uploading} />
                </div>
                
                {/* Botão da Galeria Premium */}
                <button 
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="w-full bg-brand-red/10 hover:bg-brand-red/20 text-brand-red border border-brand-red/20 py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-[11px] font-bold uppercase tracking-widest mt-1 active:scale-[0.98]"
                >
                  <ImageIcon size={16} />
                  Galeria Premium
                </button>
                
                <label className="flex items-center gap-3 mt-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5 cursor-pointer group hover:bg-white/[0.02] transition-colors">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-white/10 bg-black text-white focus:ring-0 accent-white" />
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                    Destaque na Página Inicial
                  </span>
                </label>
              </div>

              {/* Coluna Direita: Informações */}
              <div className="w-full md:w-2/3 flex flex-col gap-5">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-400">Nome do Produto</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none transition-all placeholder:text-neutral-700" required placeholder="Ex: iPhone 15 Pro Max 256GB" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400">Preço (BRL)</label>
                    <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none transition-all placeholder:text-neutral-700" required placeholder="0.00" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400">Categoria</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none transition-all appearance-none">
                      <option>Apple</option><option>Smartphones</option><option>Notebooks</option><option>Sneakers</option><option>Gaming</option><option>Grifes</option><option>Acessórios</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="text-sm font-medium text-neutral-400">Descrição Detalhada</label>
                  <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full flex-1 min-h-[120px] bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:border-white/30 focus:bg-[#111] outline-none resize-none transition-all placeholder:text-neutral-700" placeholder="Especificações técnicas, garantia, cores disponíveis..." />
                </div>

                <div className="pt-2 pb-8 md:pb-0">
                  <button type="submit" disabled={uploading} className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all disabled:opacity-50 text-sm active:scale-[0.98]">
                    {uploading ? <><Loader2 size={18} className="animate-spin" /> Salvando...</> : <><Save size={18} /> Salvar Produto</>}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL DA GALERIA PREMIUM === */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#050505] w-full max-w-5xl h-[85vh] rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="flex justify-between items-center p-6 lg:p-8 border-b border-white/5 bg-[#0a0a0a] shrink-0">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <ImageIcon className="text-brand-red" size={24} /> Acervo Premium
                </h3>
                <p className="text-neutral-500 text-xs lg:text-sm mt-1">Clique numa imagem para a associar imediatamente ao produto.</p>
              </div>
              <button onClick={() => setIsGalleryOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 text-neutral-400 hover:text-white hover:bg-brand-red/20 rounded-full transition-colors shrink-0">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar-hide bg-[#050505]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {premiumGallery.map((imgUrl, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image: imgUrl }));
                      setIsGalleryOpen(false);
                      toast.success('Imagem Premium aplicada!', { style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } });
                    }}
                    className="group relative aspect-square rounded-[20px] overflow-hidden cursor-pointer border border-white/10 hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 bg-[#0a0a0a]"
                  >
                    <img src={imgUrl} alt="Premium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="absolute inset-0 bg-brand-red/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                        <ImagePlus size={18} /> Selecionar
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}