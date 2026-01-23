import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Ricardo Silva",
      role: "Fotógrafo, SP",
      text: "Comprei minha lente Canon e um MacBook Pro. Chegou em 15 dias, lacrado e muito mais barato que no Brasil. Recomendo demais!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Fernanda Costa",
      role: "Designer, RJ",
      text: "Atendimento impecável via WhatsApp. Me ajudaram a escolher o modelo certo do iPad e o rastreio funcionou perfeitamente.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Eduardo Santos",
      role: "Gamer, MG",
      text: "Melhor cotação que achei para o PS5. A transparência sobre as taxas me passou muita segurança. Já estou orçando o próximo pedido.",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg"
    }
  ];

  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Quem comprou, aprovou</h2>
          <p className="text-gray-400">Junte-se a centenas de clientes satisfeitos em todo o Brasil.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 relative hover:border-brand-red/30 transition-colors">
              {/* Ícone de Aspas */}
              <Quote className="absolute top-6 right-6 text-brand-red/20 w-10 h-10" />

              {/* Estrelas */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-red text-brand-red" />
                ))}
              </div>

              <p className="text-gray-300 mb-8 italic leading-relaxed">"{review.text}"</p>

              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full border-2 border-brand-red/50"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}