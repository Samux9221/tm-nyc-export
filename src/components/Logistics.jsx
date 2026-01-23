import { Search, Calculator, CreditCard, Plane } from 'lucide-react';

export function Logistics() {
  const steps = [
    {
      id: 1,
      title: "Escolha o Produto",
      desc: "Envie o link do produto desejado (Amazon, BestBuy, eBay) ou escolha em nosso catálogo.",
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
      desc: "Pague via PIX ou Cartão. Garantimos a compra assistida nos EUA.",
      icon: CreditCard
    },
    {
      id: 4,
      title: "Receba em Casa",
      desc: "Enviamos para o Brasil com rastreio total. Entrega média de 15 a 20 dias.",
      icon: Plane
    }
  ];

  return (
    <section className="py-24 bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Importação Simplificada
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Esqueça a burocracia da alfândega. Nós cuidamos de todo o processo logístico para você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Linha pontilhada conectando os passos (Só aparece em telas grandes lg) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-neutral-800 z-0" />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
              
              {/* O Círculo com o Ícone */}
              <div className="w-24 h-24 rounded-full bg-brand-dark border-4 border-neutral-800 flex items-center justify-center mb-6 group hover:border-brand-red transition-colors duration-300">
                <step.icon className="w-10 h-10 text-white group-hover:text-brand-red transition-colors" />
                
                {/* O Número Flutuante (Badge) */}
                <div className="absolute top-0 right-0 bg-brand-green text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-neutral-900">
                  {step.id}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}