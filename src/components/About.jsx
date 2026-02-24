import { Header } from '../components/Header';
import { Footer } from '../components/Footer'; // Importando o Footer oficial que acabamos de criar!
import { Plane, ShieldCheck, Globe } from 'lucide-react';

export function About() {
  return (
    // Fundo unificado com o resto do site (#050505)
    <div className="bg-[#050505] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />
      
      {/* === HERO SECTION === */}
      <div className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo (NYC) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')" }} 
        />
        
        {/* Máscara Degradê: Começa translúcida e termina na cor exata do fundo para não ter linha de corte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#050505] z-10" />

        <div className="relative z-20 text-center container px-6 lg:px-12 mt-10">
          <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-4 block">
            A Nossa Essência
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            De <span className="text-brand-red">NYC</span><br className="md:hidden" /> para o <span className="text-white">Brasil</span>.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light">
            A ponte direta entre você e a tecnologia mais desejada do mundo. Sem fronteiras, sem complicações.
          </p>
        </div>
      </div>

      {/* === CONTEÚDO PRINCIPAL === */}
      {/* O pb-24 dá o respiro antes do Footer */}
      <main className="container mx-auto px-6 lg:px-12 pb-24 flex-grow">
        
        {/* Grid de Valores (Sobreposto à imagem) */}
        {/* No mobile, o -mt-16 evita cobrir o texto do Hero. No PC, -mt-32 fica perfeito. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 -mt-16 md:-mt-32 relative z-30">
          <Card 
            icon={Plane} 
            title="Importação Ágil" 
            text="Logística otimizada para que seu produto saia dos EUA e chegue em suas mãos no menor tempo possível." 
          />
          <Card 
            icon={ShieldCheck} 
            title="Garantia & Confiança" 
            text="Todos os produtos originais, lacrados e com garantia. Transparência total em cada etapa da viagem." 
          />
          <Card 
            icon={Globe} 
            title="Curadoria Premium" 
            text="Selecionamos apenas o que há de melhor no mercado global. Se é tendência lá fora, nós temos aqui." 
          />
        </div>

        {/* Nossa História */}
        <div className="flex flex-col lg:flex-row gap-16 items-center relative">
          
          {/* Brilho de fundo no texto */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Textos */}
          <div className="flex-1 space-y-8 relative z-10">
            <div>
              <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-3 block">
                Nossa Missão
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                O futuro não precisa demorar.
              </h2>
            </div>
            
            <div className="space-y-6 text-neutral-400 leading-relaxed text-base lg:text-lg">
              <p>
                A <strong className="text-white font-semibold">TM NYC Export</strong> nasceu da paixão por tecnologia e da necessidade de facilitar o acesso dos brasileiros aos lançamentos mundiais com segurança.
              </p>
              <p>
                Sabemos o quanto é difícil (e caro) conseguir os gadgets mais novos. Por isso, criamos uma operação logística premium que conecta Nova York diretamente à sua casa. Não vendemos apenas eletrônicos; entregamos a experiência de ter a inovação nas mãos antes de todo mundo.
              </p>
            </div>
          </div>
          
          {/* Imagem Ilustrativa (Com overlay premium) */}
          <div className="flex-1 w-full lg:h-[500px] rounded-2xl overflow-hidden border border-white/5 relative group shadow-2xl z-10">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" 
              alt="Equipe trabalhando" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
            />
          </div>
        </div>

      </main>

      {/* FOOTER GLOBAL */}
      <Footer />
    </div>
  );
}

// Componente Auxiliar Refinado
function Card({ icon: Icon, title, text }) {
  return (
    <div className="group bg-[#0a0a0a] p-8 lg:p-10 rounded-2xl border border-white/5 hover:border-brand-red/30 transition-all duration-500 shadow-xl hover:shadow-brand-red/5 flex flex-col hover:-translate-y-2 relative overflow-hidden">
      
      {/* Efeito Gradiente no Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Ícone com caixinha glass */}
      <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-red/10 group-hover:border-brand-red/30 group-hover:scale-110 transition-all duration-500 relative z-10">
        <Icon className="w-6 h-6 text-neutral-400 group-hover:text-brand-red transition-colors duration-500" />
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
          {text}
        </p>
      </div>
    </div>
  )
}