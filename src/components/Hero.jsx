import { ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const [dollar, setDollar] = useState(null);

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
      .then(response => response.json())
      .then(data => setDollar(parseFloat(data.USDBRL.bid)))
      .catch(error => console.error("Erro ao buscar dólar:", error));
  }, []);

  return (
    <section className="relative bg-[#050505] min-h-[100dvh] lg:min-h-[90vh] flex items-center pt-28 pb-10 lg:pt-32 overflow-hidden">
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* === COLUNA ESQUERDA: TEXTO E BOTÕES === */}
        <div className="order-1 lg:col-span-5 flex flex-col items-start z-20 w-full">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/40 mb-8 backdrop-blur-md">
            <TrendingUp className="text-brand-red w-4 h-4" />
            <span className="text-neutral-400 text-[10px] sm:text-xs font-medium uppercase tracking-widest">Dólar Hoje:</span>
            <span className="text-white text-xs sm:text-sm font-semibold">
              {dollar ? `R$ ${dollar.toFixed(2).replace('.', ',')}` : '...'}
            </span>
          </div>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[5rem] font-extrabold text-white leading-[1.1] lg:leading-[1.05] mb-6 tracking-tight">
            De NovaYork
            <br />para o <span className="text-brand-red">Brasil.</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-10 max-w-md font-light lg:pr-4">
            Acesso exclusivo a produtos de alta performance e encomendas personalizadas. Logística premium 100% transparente.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-12 lg:mb-10">
            
            <a 
              href="https://wa.me/18627869891" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full md:w-auto bg-brand-red hover:bg-red-600 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Fazer Cotação
            </a>
            
            <Link to="/catalogo" className="w-full md:w-auto text-neutral-200 px-8 py-4 rounded-full text-base font-medium transition-all duration-300 active:scale-[0.98] flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10">
              Ver Catálogo
            </Link>
          </div>

          <ul className="hidden lg:flex flex-col gap-3 pl-1">
            <li className="flex items-center gap-3 text-neutral-400 text-sm font-light">
              <CheckCircle2 className="text-brand-red w-4 h-4 opacity-80" /> Envio assegurado contra extravios
            </li>
            <li className="flex items-center gap-3 text-neutral-400 text-sm font-light">
              <CheckCircle2 className="text-brand-red w-4 h-4 opacity-80" /> Processo de compra assistida
            </li>
          </ul>

        </div>

        {/* === COLUNA DIREITA === */}
        <div className="order-2 lg:col-span-7 relative w-full flex flex-col justify-center lg:justify-end">
           
           {/* DESKTOP: Nova Imagem Apple */}
           <div className="hidden lg:flex relative w-full justify-end items-center h-[600px]">
             <div className="absolute top-1/2 right-12 w-[60%] h-[60%] bg-brand-red/20 blur-[120px] -translate-y-1/2 rounded-full -z-10"></div>
             
             <div className="absolute top-8 right-8 w-[90%] h-[580px] border border-neutral-800/60 rounded-[32px] -z-10 transition-transform duration-700 hover:translate-x-3 hover:-translate-y-3"></div>
             <img 
               src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1200&auto=format&fit=crop" 
               alt="Ecossistema Apple e Logística Premium" 
               className="w-[90%] h-[580px] object-cover object-center rounded-[32px] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out shadow-2xl shadow-black/80 ml-auto"
             />
           </div>

        </div>

      </div>
    </section>
  );
}