import { useNavigate } from 'react-router-dom';
import { Smartphone, Shirt, Sparkles, Package, ArrowUpRight } from 'lucide-react';
// 1. Importamos o componente 'motion'
import { motion } from 'framer-motion';

export function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryFilter) => {
    if (categoryFilter === 'custom') {
      window.open('https://wa.me/5511999999999?text=Olá! Gostaria de cotar a encomenda de um produto dos EUA.', '_blank');
      return;
    }
    navigate(`/catalogo?category=${categoryFilter}`);
    window.scrollTo(0, 0); 
  };

  // --- CONFIGURAÇÃO DAS ANIMAÇÕES (VARIANTS) ---
  
  // Configuração do Container Pai (Controla a cascata/stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Atrasa o início de cada filho em 0.15s.
        // Cria aquele efeito dominó elegante no Desktop.
        staggerChildren: 0.15,
        delayChildren: 0.2, // Um pequeno delay inicial antes de começar tudo
      },
    },
  };

  // Configuração de cada Card individual
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 // Começa 50px para baixo
    },
    visible: {
      opacity: 1,
      y: 0, // Chega na posição original
      transition: {
        // Usamos física de mola para ficar super suave, estilo iOS
        type: "spring",
        stiffness: 100, // Tensão da mola (menor = mais suave)
        damping: 15,    // Amortecimento (para não quicar demais)
        mass: 1
      }
    },
  };
  // --------------------------------------------

  const categories = [
    // ... (Seu array de categorias permanece idêntico)
    { 
      id: 1,
      name: "Apple & Tech", 
      desc: "Lançamentos globais e topos de linha.", 
      icon: Smartphone,
      filter: "tech",
      gridClass: "lg:col-span-2 lg:row-span-2 min-h-[120px] lg:min-h-[400px]",
      bgClass: "bg-[#0a0a0a]"
    },
    { 
      id: 2,
      name: "Vestuário Premium", 
      desc: "Streetwear e alta costura.", 
      icon: Shirt,
      filter: "apparel",
      gridClass: "lg:col-span-1 min-h-[120px] lg:min-h-[200px]",
      bgClass: "bg-[#0a0a0a]"
    },
    { 
      id: 3,
      name: "Beleza & Perfumaria", 
      desc: "Fragrâncias e cosméticos importados.", 
      icon: Sparkles,
      filter: "beauty",
      gridClass: "lg:col-span-1 min-h-[120px] lg:min-h-[200px]",
      bgClass: "bg-[#0a0a0a]"
    },
    { 
      id: 4,
      name: "Encomendas Especiais", 
      desc: "Não achou? Nós trazemos sob medida para você.", 
      icon: Package,
      filter: "custom",
      gridClass: "lg:col-span-2 min-h-[120px] lg:min-h-[200px]",
      bgClass: "bg-gradient-to-br from-[#0a0a0a] to-brand-red/10 border-brand-red/20" 
    },
  ];

  return (
    <section className="bg-[#050505] py-20 lg:py-32 relative overflow-hidden">
      
      {/* O glow vermelho */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* HEADER (Podemos animar também se quiser depois, mas vamos focar nos cards) */}
        <div className="mb-12 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
          {/* ... (Header idêntico ao anterior) */}
           <div className="max-w-2xl">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-4 block">
              Nossos Departamentos
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              O mundo premium, <br className="hidden sm:block" />
              direto para você.
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-sm font-light leading-relaxed">
            De lançamentos da Apple a grifes exclusivas e perfumaria importada. Explore nossas categorias ou faça uma encomenda sob medida.
          </p>
        </div>

        {/* === BENTO GRID COM FRAMER MOTION === 
          1. Mudamos de 'div' para 'motion.div'.
          2. Adicionamos as props de controle: initial, whileInView e viewport.
          3. Passamos as variantes do container.
        */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // 'once: true' garante que anima só na primeira vez que desce a tela.
          // 'amount: 0.2' significa que a animação dispara quando 20% do grid estiver visível.
          viewport={{ once: true, amount: 0.2 }}
        >
          
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              /* 4. Cada Card agora é um 'motion.div'.
                 5. Passamos as variantes do card individual.
                 Ele herda automaticamente o estado "hidden" e "visible" do pai.
              */
              <motion.div 
                key={item.id} 
                variants={cardVariants}
                onClick={() => handleCategoryClick(item.filter)}
                // ATENÇÃO: Adicionei 'h-full' aqui para garantir que no Bento Grid do PC
                // os cards estiquem para ocupar a altura total da linha.
                className={`
                  group relative overflow-hidden p-6 lg:p-8 rounded-[24px] md:rounded-3xl border border-white/5 
                  hover:border-brand-red/40 transition-colors duration-500 cursor-pointer 
                  flex flex-row items-center lg:flex-col lg:items-start lg:justify-between h-full
                  shadow-xl hover:shadow-brand-red/10 active:scale-[0.98]
                  ${item.gridClass} ${item.bgClass}
                `}
              >
                {/* ... (Conteúdo interno do card permanece idêntico) */}
                <ArrowUpRight className="hidden md:block absolute top-6 right-6 lg:top-8 lg:right-8 text-neutral-600 group-hover:text-brand-red group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 w-5 h-5 lg:w-6 lg:h-6" />

                <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mr-5 lg:mr-0 lg:mb-8 group-hover:bg-brand-red/10 group-hover:border-brand-red/30 group-hover:scale-110 transition-all duration-500">
                  <Icon className="text-neutral-400 group-hover:text-brand-red w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-500" />
                </div>
                
                <div className="flex-1 lg:mt-auto flex flex-col justify-center">
                  <h3 className="text-lg lg:text-2xl font-bold text-white mb-1 lg:mb-2 relative z-10 leading-tight tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-neutral-500 text-sm font-light group-hover:text-neutral-300 transition-colors duration-300 relative z-10 line-clamp-2 lg:line-clamp-none">
                    {item.desc}
                  </p>
                </div>

              </motion.div>
            )
          })}

        </motion.div>
      </div>
    </section>
  );
}