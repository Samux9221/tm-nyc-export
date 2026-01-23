import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, LogOut, Plus, Search, Trash2, Edit, X, Save, DollarSign, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para controlar o upload da imagem
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    category: 'Smartphones',
    image: '',
    featured: false
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

  // === MÁGICA DO UPLOAD DE IMAGEM ===
  async function handleImageUpload(e) {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      // 1. Cria um nome único para o arquivo (para não substituir outros)
      // Ex: 123456789-iphone.jpg
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Sobe o arquivo para o bucket 'images'
      const { error: uploadError } = await supabase.storage
        .from('images') // <--- NOME DO SEU BUCKET
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Pega a URL pública para salvar no banco
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      // 4. Atualiza o formulário com a URL gerada
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
      
    } catch (error) {
      alert('Erro no upload: ' + error.message);
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
      featured: formData.featured
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
      alert('Erro: ' + error.message);
    } else {
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
    if (!window.confirm("Excluir produto?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  }

  function handleNewProduct() {
    resetForm();
    setIsFormOpen(true);
  }

  function resetForm() {
    setFormData({ id: null, name: '', price: '', category: 'Smartphones', image: '', featured: false });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  const totalValue = products.reduce((acc, p) => acc + p.price, 0);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-brand-dark text-gray-100 font-sans overflow-hidden">
      {/* SIDEBAR - MANTIDA IGUAL */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-2xl font-bold text-white tracking-tighter">ADMIN<span className="text-brand-red">.</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'products' ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <Package size={20} /> <span className="font-medium">Produtos</span>
          </button>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Visão Geral</span>
          </button>
        </nav>
        <div className="p-4"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg"><LogOut size={20} /><span>Sair</span></button></div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-black/20 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">{activeTab === 'products' ? 'Gerenciar Produtos' : 'Visão Geral'}</h2>
        </header>

        {activeTab === 'dashboard' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
               <h3 className="text-3xl font-bold text-white mb-1">{products.length}</h3>
               <p className="text-gray-400 text-sm">Produtos</p>
             </div>
             <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
               <h3 className="text-3xl font-bold text-white mb-1">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}</h3>
               <p className="text-gray-400 text-sm">Valor em Estoque</p>
             </div>
           </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-neutral-900 p-4 rounded-xl border border-neutral-800">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input type="text" placeholder="Buscar..." className="w-full bg-black border border-neutral-800 text-white pl-10 pr-4 py-3 rounded-lg focus:border-brand-red outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <button onClick={handleNewProduct} className="bg-brand-green hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2"><Plus size={20} /> Novo</button>
            </div>

            <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 text-gray-400 text-xs uppercase"><th className="p-5">Produto</th><th className="p-5">Preço</th><th className="p-5 text-right">Ações</th></tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5">
                      <td className="p-5 flex items-center gap-4">
                        <img src={product.image} className="w-12 h-12 rounded object-cover bg-gray-800" />
                        <span className="font-bold text-white">{product.name}</span>
                      </td>
                      <td className="p-5 text-brand-green font-mono">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
                      <td className="p-5 text-right flex justify-end gap-2">
                        <button onClick={() => handleEdit(product)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* FORMULÁRIO COM UPLOAD */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 w-full max-w-lg rounded-2xl border border-neutral-700 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
              <h3 className="text-xl font-bold text-white">{formData.id ? 'Editar' : 'Novo'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="text-sm text-gray-400">Nome</label><input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white" required /></div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-400">Preço</label><input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white" required /></div>
                <div>
                  <label className="text-sm text-gray-400">Categoria</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white">
                    <option>Smartphones</option><option>Notebooks</option><option>Tablets</option><option>Acessórios</option>
                  </select>
                </div>
              </div>

              {/* === CAMPO DE UPLOAD DE IMAGEM === */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Imagem do Produto</label>
                
                <div className="flex items-center gap-4">
                  {/* Pré-visualização da imagem */}
                  {formData.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-neutral-700 relative group">
                       <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Botão de Upload Customizado */}
                  <label className="flex-1 cursor-pointer">
                    <div className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-dashed border-neutral-600 hover:border-brand-red transition-colors ${uploading ? 'bg-white/5 opacity-50' : 'bg-black'}`}>
                      {uploading ? (
                         <> <Loader2 className="animate-spin" size={20} /> <span className="text-sm text-gray-400">Enviando...</span> </>
                      ) : (
                         <> <Upload size={20} className="text-gray-400" /> <span className="text-sm text-gray-400">Clique para enviar foto</span> </>
                      )}
                    </div>
                    {/* Input file invisível */}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                <input type="checkbox" id="featModal" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="accent-brand-red" />
                <label htmlFor="featModal" className="text-gray-300">Destaque na Home</label>
              </div>

              <button type="submit" disabled={uploading} className="w-full bg-brand-green hover:bg-green-600 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50">
                <Save size={20} /> SALVAR
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}