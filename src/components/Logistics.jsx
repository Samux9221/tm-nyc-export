import { Search, Calculator, CreditCard, Plane } from 'lucide-react';

export function Logistics() {
  const steps = [
    {
      id: 1,
      title: "Escolha o Produto",
      desc: "Envie o link do produto desejado ou escolha em nosso catálogo exclusivo.",
      icon: Search
    },
    {
      id: 2,
      title: "Orçamento Rápido",
      desc: "Calculamos o valor final com frete e taxas inclusas. Sem surpresas na chegada.",
      icon: Calculator
    },
    {
      id: 3,
      title: "Pagamento Seguro",
      desc: "Pague via PIX ou Cartão. Garantimos a compra assistida diretamente nos EUA.",
      icon: CreditCard
    },
    {
      id: 4,
      title: "Receba em Casa",
      desc: "Enviamos para o Brasil com rastreio total. Entrega ágil e 100% segura.",
      icon: Plane
    }
  ];

  return (
    // Fundo alinhado com o site inteiro (#050505)
    <section className="bg-[#050505] py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* === HEADER EDITORIAL === */}
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-3 block">
              Como Funciona
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Importação simplificada.
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm md:text-right border-l-2 md:border-l-0 md:border-r-2 border-brand-red/30 pl-4 md:pl-0 md:pr-4">
            Esqueça a burocracia da alfândega. Nós cuidamos de todo o processo logístico, de Nova York até a sua porta.
          </p>
        </div>

        {/* === GRID DOS PASSOS === */}
        <div className="relative">
          
          {/* Linha conectando os passos (Desktop) - Fina e Elegante */}
          {/* top-10 centraliza perfeitamente com o meio do círculo de tamanho h-20 (80px) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {/* gap-12 no mobile dá um respiro maior para a leitura vertical */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group cursor-default">
                
                {/* O Círculo com o Ícone (Design Glass) */}
                <div className="w-20 h-20 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center mb-8 relative group-hover:border-brand-red/30 group-hover:bg-brand-red/5 transition-all duration-500 shadow-lg group-hover:shadow-brand-red/5 group-hover:-translate-y-2">
                  
                  <step.icon className="w-8 h-8 text-neutral-400 group-hover:text-brand-red transition-colors duration-500" />
                  
                  {/* O Número Flutuante (Agora luxuoso e sutil) */}
                  <div className="absolute -top-2 -right-2 bg-[#050505] border border-white/10 text-neutral-400 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold group-hover:border-brand-red/50 group-hover:text-brand-red transition-colors duration-500">
                    0{step.id}
                  </div>

                </div>

                {/* Textos */}
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-[260px] group-hover:text-neutral-300 transition-colors duration-300">
                  {step.desc}
                </p>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}