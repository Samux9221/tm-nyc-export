import { ArrowRight, Sparkles } from 'lucide-react';

export function Streetwear() {
  const WHATSAPP_NUMBER = "18627869891"; 

  const handleVIPOrder = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o serviço de Encomenda VIP para roupas e itens de grife.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Brilho de fundo sutil para separar as seções */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- CABEÇALHO DA SEÇÃO --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <span className="flex items-center gap-2 text-neutral-400 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} className="text-white" /> High Fashion & Streetwear
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
              O seu estilo,<br className="hidden sm:block" /> sem fronteiras.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl">
              Peças exclusivas, edições limitadas e as grifes mais cobiçadas do mundo. O que é tendência nas ruas de Nova York, entregue direto no seu closet no Brasil.
            </p>
          </div>
          
          <button 
            onClick={handleVIPOrder}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-sm font-bold transition-all duration-300 w-full md:w-max active:scale-[0.98] hover:bg-neutral-200"
          >
            Encomenda VIP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- GRID BENTO BOX (VITRINE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto] gap-4 lg:gap-6">
          
          {/* Caixa Grande (Destaque Principal) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-[32px] overflow-hidden group min-h-[400px] md:min-h-[500px] bg-[#0a0a0a] border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=1200&auto=format&fit=crop" 
              alt="Sneakers Exclusivos" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10 z-20">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Sneakers Premium</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Nike, Jordan & Yeezy</h3>
            </div>
          </div>

          {/* Caixa Pequena Superior (Bolsas/Acessórios) */}
          <div className="relative rounded-[32px] overflow-hidden group min-h-[250px] bg-[#0a0a0a] border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop" 
              alt="Bolsas de Grife" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">Luxo</span>
              <h3 className="text-xl font-bold text-white tracking-tight">Bolsas & Grifes</h3>
            </div>
          </div>

          {/* Caixa Pequena Inferior (Vestuário/Urban) */}
          <div className="relative rounded-[32px] overflow-hidden group min-h-[250px] bg-[#0a0a0a] border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=800&auto=format&fit=crop" 
              alt="Streetwear Vestuário" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">Apparel</span>
              <h3 className="text-xl font-bold text-white tracking-tight">Supreme & Urban</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}