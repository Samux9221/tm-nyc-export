import { useState, useEffect } from 'react';
import { Star, Quote, User } from 'lucide-react';
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error.message);
    } finally {
      setLoading(false);
    }
  }

  // Se não houver depoimentos e já carregou, não renderiza a seção
  if (!loading && reviews.length === 0) return null;

  return (
    // Fundo unificado (#050505) e mesmo espaçamento das outras seções
    <section className="bg-[#050505] py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
      
      {/* Luz de fundo (Glow) sutil para manter a profundidade */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* === HEADER EDITORIAL (Padrão do site) === */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-3 block">
              Aprovação Garantida
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Quem comprou, aprovou.
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm md:text-right border-l-2 md:border-l-0 md:border-r-2 border-brand-red/30 pl-4 md:pl-0 md:pr-4">
            Junte-se a centenas de clientes satisfeitos em todo o Brasil. Logística segura e transparente.
          </p>
        </div>

        {/* === CONTEÚDO (Loading ou Grid) === */}
        {loading ? (
          // Skeleton Loading Premium
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
             {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="bg-[#0a0a0a] border border-white/5 rounded-2xl h-[250px] animate-pulse"></div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="group relative overflow-hidden bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 hover:border-brand-red/30 transition-all duration-500 shadow-lg hover:shadow-brand-red/5 flex flex-col justify-between h-full"
              >
                {/* Efeito de Gradiente que acende no hover (Padrão) */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Ícone de Aspas Premium */}
                <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-brand-red/10 transition-colors duration-500 w-12 h-12" />

                <div className="relative z-10">
                  {/* Estrelas */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < (review.rating || 5) ? "fill-brand-red text-brand-red" : "fill-neutral-800 text-neutral-800"} 
                      />
                    ))}
                  </div>

                  {/* Texto do Depoimento */}
                  <p className="text-neutral-300 text-sm lg:text-base leading-relaxed mb-8 italic">
                    "{review.content}"
                  </p>
                </div>

                {/* Rodapé do Card (Avatar e Nome) - Empurrado para baixo com mt-auto */}
                <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-neutral-900 flex items-center justify-center shrink-0">
                    {review.avatar_url ? (
                      <img 
                        src={review.avatar_url} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="text-neutral-500 w-5 h-5" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold text-sm lg:text-base">{review.name}</h4>
                    <span className="text-brand-red text-[10px] lg:text-xs uppercase tracking-widest font-semibold">
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