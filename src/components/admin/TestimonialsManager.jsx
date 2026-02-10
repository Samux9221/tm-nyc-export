import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Trash2, Plus, Star, User, MessageSquare, Pencil, Save, X, DownloadCloud, AlertCircle } from 'lucide-react';

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoaded, setListLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null); // Para mostrar o erro na tela
  
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadTestimonials() {
    setLoading(true);
    setErrorMsg(null);
    setListLoaded(true); 

    try {
      // O FIX ESTÁ AQUI: Adicionei .select('*')
      const { data, error } = await supabase
        .from('testimonials')
        .select('*') // <--- FALTAVA ISSO AQUI!
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erro detalhado:', error);
      setErrorMsg(error.message || 'Falha desconhecida ao conectar.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!formData.name || !formData.content) return;
    
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      if (editingId) {
        // === ATUALIZAR ===
        const { data, error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            role: formData.role,
            content: formData.content,
            rating: formData.rating,
          })
          .eq('id', editingId)
          .select();

        if (error) throw error;

        if (listLoaded) {
          setTestimonials(prev => prev.map(item => item.id === editingId ? data[0] : item));
        }
        alert('Atualizado com sucesso!'); // Feedback simples

      } else {
        // === CRIAR ===
        const { data, error } = await supabase
          .from('testimonials')
          .insert([{
            name: formData.name,
            role: formData.role,
            content: formData.content,
            rating: formData.rating,
          }])
          .select();

        if (error) throw error;

        if (listLoaded) {
          setTestimonials(prev => [data[0], ...prev]);
        }
        
        // Feedback visual no botão
        const btn = document.getElementById('submitBtn');
        if(btn) {
           const originalText = btn.innerHTML;
           btn.innerText = "Salvo!";
           setTimeout(() => btn.innerHTML = originalText, 2000);
        }
      }

      resetForm();

    } catch (error) {
      setErrorMsg('Erro ao salvar: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      alert('Erro ao deletar: ' + error.message);
    }
  }

  function startEditing(item) {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setFormData({ name: '', role: '', content: '', rating: 5 });
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn pb-20">
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-brand-red" /> Gestão de Depoimentos
          </h2>
        </div>
      </div>

      {/* ÁREA DE ERRO (Se houver algum problema, aparece aqui em cima) */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 flex items-center gap-3">
          <AlertCircle className="shrink-0" />
          <div>
            <p className="font-bold">Ocorreu um erro:</p>
            <p className="text-sm opacity-80">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="ml-auto hover:bg-red-500/20 p-2 rounded">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* === FORMULÁRIO === */}
        {/* Lógica de layout: Se a lista NÃO foi carregada, usa lg:col-span-3 (TELA TODA). Se carregou, usa lg:col-span-1 */}
        <div className={`transition-all duration-500 ${listLoaded ? 'lg:col-span-1 lg:sticky lg:top-4' : 'lg:col-span-3 w-full'}`}>
          <div className={`rounded-2xl border p-6 shadow-2xl relative overflow-hidden transition-colors duration-300 ${editingId ? 'bg-neutral-900 border-brand-red/50' : 'bg-neutral-900 border-neutral-800'}`}>
            
            {editingId && (
              <div className="absolute top-0 right-0 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                EDITANDO
              </div>
            )}
            
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              {editingId ? <Pencil size={18} className="text-brand-red" /> : <Plus size={18} className="text-brand-green" />}
              {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
            </h3>

            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</label>
                  <input
                    type="text"
                    placeholder="Nome..."
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo / Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: SP"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-black/40 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avaliação</label>
                <div className="flex gap-2 bg-black/20 p-3 rounded-lg border border-neutral-800 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className={`transition-all duration-200 hover:scale-110 p-1 ${formData.rating >= star ? 'text-brand-red' : 'text-neutral-700'}`}
                    >
                      <Star size={24} fill={formData.rating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Depoimento</label>
                <textarea
                  placeholder="Escreva aqui..."
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full h-32 bg-black/40 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="flex gap-2">
                {editingId && (
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Cancelar
                  </button>
                )}
                
                <button 
                  id="submitBtn"
                  type="submit" 
                  disabled={isSubmitting}
                  className={`flex-[2] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${editingId ? 'bg-brand-red hover:bg-red-600' : 'bg-brand-green hover:bg-green-600'}`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Salvando...</span>
                  ) : (
                    <> <Save size={18} /> {editingId ? 'Atualizar' : 'Publicar'} </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* === ÁREA DA LISTA === */}
        {/* Se a lista estiver carregada (mesmo que com erro ou vazia), ela ocupa 2 colunas. Se não, ela some ou mostra o botão de carregar abaixo se quisermos (mas neste layout full width, vamos colocar o botão de carregar no topo ou abaixo do form full width) */}
        
        <div className={`space-y-4 ${listLoaded ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          
          {!listLoaded ? (
             /* BOTÃO PARA CARREGAR A LISTA (Agora Full Width abaixo do form) */
             <div className="text-center py-8 bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-800 flex flex-col items-center justify-center gap-4 mt-8">
                <div className="flex flex-col items-center">
                  <h3 className="text-gray-300 font-bold text-lg">Gerenciar Depoimentos Antigos</h3>
                  <p className="text-gray-500 text-sm">Carregar a lista consome recursos. Só carregue se precisar editar ou excluir.</p>
                </div>
                <button 
                  onClick={loadTestimonials}
                  className="bg-neutral-800 hover:bg-neutral-700 text-brand-red border border-brand-red/30 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:scale-105"
                >
                  <DownloadCloud size={20} /> Carregar Lista Agora
                </button>
             </div>
          ) : (
            /* A LISTA DE VERDADE */
            <>
              <div className="flex justify-between items-center mb-4 pl-2 border-l-4 border-brand-red bg-neutral-900/50 p-2 rounded-r-lg">
                 <h3 className="text-lg font-bold text-gray-300">Depoimentos Ativos</h3>
                 <button onClick={() => setListLoaded(false)} className="text-xs text-gray-500 hover:text-white underline">Ocultar Lista</button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                  {[1,2,3].map(i => <div key={i} className="h-40 bg-neutral-900 rounded-2xl"></div>)}
                </div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-20 bg-neutral-900/50 rounded-2xl border border-dashed border-neutral-800">
                   {/* Se tiver erroMsg, o aviso já está lá no topo. Se não tiver erro e estiver vazio: */}
                  {!errorMsg && <p className="text-gray-500">Nenhum depoimento encontrado.</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((item) => (
                    <div key={item.id} className={`relative bg-neutral-900 p-6 rounded-2xl border transition-all hover:bg-neutral-800/80 group ${editingId === item.id ? 'border-brand-red ring-1 ring-brand-red' : 'border-neutral-800 hover:border-brand-red/30'}`}>
                      
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                          onClick={() => startEditing(item)}
                          className="bg-neutral-800 text-blue-400 hover:bg-blue-400/10 p-2 rounded-lg transition-colors border border-neutral-700"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-neutral-800 text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-neutral-700"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < item.rating ? "fill-brand-red text-brand-red" : "text-neutral-700"} />
                            ))}
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm italic mb-6 line-clamp-3 leading-relaxed">"{item.content}"</p>

                      <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/50">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-500 border border-neutral-700 shrink-0">
                          <User size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-gray-500 uppercase tracking-wide line-clamp-1">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}