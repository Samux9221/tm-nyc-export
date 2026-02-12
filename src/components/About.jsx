import { Header } from '../components/Header';
import { Plane, Award, ShieldCheck, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header />
      
      {/* HERO SECTION */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo (NYC) */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')" }} 
        ></div>
        <div className="absolute inset-0 bg-black/70 z-10"></div> {/* Máscara escura */}

        <div className="relative z-20 text-center container px-4 animate-in slide-in-from-bottom-10 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            De <span className="text-brand-red">NYC</span> Para o <span className="text-brand-green">Brasil</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A ponte direta entre você e a tecnologia mais desejada do mundo. Sem fronteiras, sem complicações.
          </p>
        </div>
      </div>

      {/* CONTEÚDO */}
      <main className="container mx-auto px-4 py-20">
        
        {/* Grid de Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 -mt-32 relative z-30">
            <Card icon={<Plane size={40} />} title="Importação Ágil" text="Logística otimizada para que seu produto saia dos EUA e chegue em suas mãos no menor tempo possível." />
            <Card icon={<ShieldCheck size={40} />} title="Garantia & Confiança" text="Todos os produtos são originais, lacrados e com garantia. Transparência total em cada etapa." />
            <Card icon={<Globe size={40} />} title="Curadoria Premium" text="Selecionamos apenas o que há de melhor no mercado global. Se é tendência lá fora, nós temos aqui." />
        </div>

        {/* Nossa História */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-white">Nossa Missão</h2>
                <div className="w-20 h-1 bg-brand-red rounded-full"></div>
                <p className="text-gray-400 leading-relaxed text-lg">
                    A <strong className="text-white">TM NYC Export</strong> nasceu da paixão por tecnologia e da necessidade de facilitar o acesso dos brasileiros aos lançamentos mundiais.
                </p>
                <p className="text-gray-400 leading-relaxed text-lg">
                    Sabemos o quanto é difícil (e caro) conseguir os gadgets mais novos. Por isso, criamos uma operação logística robusta que conecta Nova York diretamente à sua casa. Não vendemos apenas eletrônicos; vendemos a experiência de ter o futuro nas mãos antes de todo mundo.
                </p>
            </div>
            
            {/* Imagem Ilustrativa */}
            <div className="flex-1 h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 relative group">
                <img 
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team working" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
            </div>
        </div>

      </main>

      {/* Footer Simples */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-8 text-center text-gray-500">
        <p>© 2026 TM NYC Export. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

// Componente auxiliar só pra essa página
function Card({ icon, title, text }) {
    return (
        <div className="bg-brand-gray p-8 rounded-2xl shadow-xl border border-neutral-800 hover:border-brand-red/50 transition-all hover:-translate-y-2">
            <div className="text-brand-red mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400">{text}</p>
        </div>
    )
}