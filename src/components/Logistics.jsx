import { Search, Calculator, CreditCard, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export function Logistics() {
  const steps = [
    {
      id: 1,
      title: "Escolha o Produto",
      desc: "Envie o link do desejado ou escolha em nosso catálogo exclusivo.",
      icon: Search
    },
    {
      id: 2,
      title: "Orçamento Rápido",
      desc: "Calculamos o valor final com frete e taxas inclusas. Sem surpresas.",
      icon: Calculator
    },
    {
      id: 3,
      title: "Pagamento Seguro",
      desc: "Pague via PIX ou Cartão. Garantimos a compra diretamente nos EUA.",
      icon: CreditCard
    },
    {
      id: 4,
      title: "Receba em Casa",
      desc: "Enviamos para o Brasil com rastreio total e entrega 100% segura.",
      icon: Plane
    }
  ];

  // --- ANIMAÇÕES SUTIS ---
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  // Linhas agora sem brilho neon, apenas um preenchimento sólido e elegante
  const lineHorizontalVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 } }
  };

  const lineVerticalVariants = {
    hidden: { height: "0%" },
    visible: { height: "100%", transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 } }
  };

  return (
    <section id="como-funciona" className="bg-[#050505] py-20 lg:py-32 border-t border-white/5 relative overflow-hidden">
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* === HEADER === */}
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-4 block">
              Como Funciona
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              Importação <br className="hidden md:block" /> simplificada.
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-sm md:text-right md:border-r-2 border-brand-red/30 md:pr-4 font-light leading-relaxed">
            Esqueça a burocracia da alfândega. Nós cuidamos de todo o processo logístico, de Nova York até a sua porta.
          </p>
        </div>

        {/* === TIMELINE EDITORIAL === */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          {/* TRILHOS E LINHAS ANIMADAS */}
          {/* Desktop (Horizontal) - Fica na altura exata do meio do ícone (top-7 = 28px) */}
          <div className="hidden lg:block absolute top-7 left-7 right-7 h-[2px] bg-white/5 z-0" />
          <motion.div 
            variants={lineHorizontalVariants}
            className="hidden lg:block absolute top-7 left-7 h-[2px] bg-brand-red z-0 origin-left" 
          />

          {/* Mobile (Vertical) - Fica alinhado à esquerda passando pelo meio dos ícones (left-7 = 28px) */}
          <div className="block lg:hidden absolute top-7 bottom-7 left-7 w-[2px] bg-white/5 z-0" />
          <motion.div 
            variants={lineVerticalVariants}
            className="block lg:hidden absolute top-7 left-7 w-[2px] bg-brand-red z-0 origin-top" 
          />
          {/* --------------------------- */}

          {/* GRID DE ITENS - Mobile: flex-col (Lista) | PC: grid de 4 colunas */}
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {steps.map((step) => (
              // No mobile, usamos flex-row para o ícone ficar na esquerda e o texto na direita
              <motion.div 
                key={step.id} 
                variants={itemVariants}
                className="relative flex flex-row lg:flex-col items-start gap-6 lg:gap-8 group cursor-default"
              >
                
                {/* O Círculo com o Ícone (Reduzido para w-14 h-14, mais elegante) */}
                <div className="shrink-0 w-14 h-14 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative group-hover:border-brand-red/50 transition-colors duration-500 z-10">
                  <step.icon className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Textos - Alinhados à esquerda sempre */}
                <div className="flex flex-col pt-1 lg:pt-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-red transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}