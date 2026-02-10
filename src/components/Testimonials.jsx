import { useState, useEffect } from 'react';
import { Star, Quote, User } from 'lucide-react'; // Adicionei o User para caso não tenha foto
import { supabase } from '../supabaseClient';

export function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false }); // Mostra os mais recentes primeiro

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error.message);
    } finally {
      setLoading(false);
    }
  }

  // Se estiver carregando ou não tiver depoimentos, não mostra a seção (ou mostra vazia)
  if (!loading && reviews.length === 0) return null;

  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Elemento decorativo de fundo (Mantido do seu original) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Quem comprou, aprovou</h2>
          <p className="text-gray-400">Junte-se a centenas de clientes satisfeitos em todo o Brasil.</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">Carregando opiniões...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 relative hover:border-brand-red/30 transition-colors">
                
                {/* Ícone de Aspas (Mantido) */}
                <Quote className="absolute top-6 right-6 text-brand-red/20 w-10 h-10" />

                {/* Estrelas (Agora dinâmico baseado na nota do banco) */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      // Se o índice for menor que a nota (rating), pinta de vermelho. Senão, cinza.
                      className={i < (review.rating || 5) ? "fill-brand-red text-brand-red" : "text-gray-600"} 
                    />
                  ))}
                </div>

                {/* Texto do Depoimento */}
                <p className="text-gray-300 mb-8 italic leading-relaxed">
                  "{review.content}"
                </p>

                {/* Rodapé do Card (Avatar e Nome) */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-brand-red/50 overflow-hidden bg-neutral-800 flex items-center justify-center">
                    {review.avatar_url ? (
                      <img 
                        src={review.avatar_url} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">
                      {review.role || 'Cliente Verificado'}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}