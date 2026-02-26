import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Plane, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function About() {
  // Animações Padronizadas (Calmas e Elegantes)
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col font-sans overflow-hidden">
      <Header />
      
      {/* === HERO SECTION CINEMATOGRÁFICO === */}
      <div className="relative h-[80vh] flex items-center border-b border-white/5">
        {/* Imagem de Fundo (NYC) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')" }} 
        />
        
        {/* Máscara Degradê: Escura na esquerda para leitura, sumindo na direita. E escura embaixo para fundir com a página */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10" />

        <div className="relative z-20 container mx-auto px-6 lg:px-12 mt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <span className="text-brand-red text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
              A Nossa Essência
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1]">
              De <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">NYC</span><br /> 
              para o Brasil.
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-xl font-light leading-relaxed">
              A ponte direta entre você e a tecnologia mais desejada do mundo. Sem fronteiras, sem complicações.
            </p>
          </motion.div>
        </div>
      </div>

      {/* === CONTEÚDO PRINCIPAL === */}
      <main className="container mx-auto px-6 lg:px-12 flex-grow relative z-20">
        
        {/* === GRID DE VALORES (Agora com muito respiro e sem espremer o Hero) === */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 py-32"
        >
          <motion.div variants={fadeUp}>
            <Card 
              icon={Plane} 
              title="Importação Ágil" 
              text="Logística otimizada para que seu produto saia dos EUA e chegue em suas mãos no menor tempo possível, com rastreio em tempo real." 
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card 
              icon={ShieldCheck} 
              title="Garantia & Confiança" 
              text="Todos os produtos originais, lacrados e com garantia Apple. Transparência total em cada etapa da sua encomenda." 
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card 
              icon={Globe} 
              title="Curadoria Premium" 
              text="Selecionamos apenas o que há de melhor no mercado global. Se é tendência e padrão ouro lá fora, nós trazemos para você." 
            />
          </motion.div>
        </motion.div>

        {/* === NOSSA HISTÓRIA === */}
        <div className="py-20 lg:py-32 mb-20 border-t border-white/5">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center relative">
            
            {/* Brilho de fundo sutil */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[400px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />

            {/* Textos da História */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="flex-1 space-y-10 relative z-10"
            >
              <div>
                <span className="text-brand-red text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                  Nossa Missão
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                  O futuro não <br className="hidden lg:block"/> precisa demorar.
                </h2>
              </div>
              
              <div className="space-y-8 text-neutral-400 font-light leading-loose text-base lg:text-lg">
                <p>
                  A <strong className="text-white font-medium">TM NYC Export</strong> nasceu da paixão por tecnologia e da necessidade de facilitar o acesso dos brasileiros aos lançamentos mundiais com segurança e exclusividade.
                </p>
                <p>
                  Sabemos o quanto é difícil (e caro) conseguir os gadgets mais novos no dia do lançamento. Por isso, criamos uma operação logística premium que conecta Nova York diretamente à sua casa. Não vendemos apenas eletrônicos; entregamos a experiência de ter a inovação nas mãos antes de todo mundo.
                </p>
              </div>
            </motion.div>
            
            {/* Imagem Ilustrativa Animada */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="w-full aspect-[4/5] lg:aspect-square rounded-[2rem] overflow-hidden border border-white/10 relative group bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" 
                  alt="Operação TM NYC Export" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                />
              </div>
            </motion.div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

// Componente Auxiliar Refinado (Menos efeitos, mais elegância)
function Card({ icon: Icon, title, text }) {
  return (
    <div className="group bg-[#0a0a0a] p-8 lg:p-10 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all duration-700 h-full flex flex-col relative overflow-hidden hover:-translate-y-1">
      
      {/* Brilho muito suave no topo em vermelho */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red/50 transition-all duration-700 opacity-0 group-hover:opacity-100" />
      
      {/* Ícone Minimalista */}
      <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-red/5 group-hover:border-brand-red/20 transition-all duration-700">
        <Icon className="w-7 h-7 text-neutral-500 group-hover:text-brand-red transition-colors duration-700" strokeWidth={1.5} />
      </div>

      <div className="mt-auto">
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-neutral-200 transition-colors">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm leading-loose font-light group-hover:text-neutral-400 transition-colors">
          {text}
        </p>
      </div>
    </div>
  )
}