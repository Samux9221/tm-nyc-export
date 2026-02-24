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
    <section className="relative bg-[#050505] min-h-[100vh] lg:min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-28 overflow-hidden">
      
      {/* Grid com gap menor no celular (gap-8) e maior no PC (gap-16) */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

        {/* === COLUNA DE TEXTO === 
            O Segredo Mobile: Adicionei 'order-2 lg:order-1'. 
            No celular ela desce, no PC ela volta para a esquerda. */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-start z-20">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 mb-6 lg:mb-8 backdrop-blur-sm">
            <TrendingUp className="text-brand-red w-4 h-4" />
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Dólar Comercial:</span>
            <span className="text-white text-sm font-bold">
              {dollar ? `R$ ${dollar.toFixed(2).replace('.', ',')}` : 'Atualizando...'}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
            De Nova York <br />
            para o <span className="text-brand-red">Brasil.</span>
          </h1>

          <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-md">
            Acesso exclusivo a produtos de alta performance e encomendas personalizadas. Logística segura, ágil e 100% transparente até a sua porta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8 lg:mb-10">
            <button className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group">
              Fazer Cotação
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link to="/catalogo" className="w-full sm:w-auto text-white px-8 py-4 rounded-lg font-bold transition-colors flex items-center justify-center border border-neutral-700 hover:bg-neutral-800">
              Ver Catálogo
            </Link>
          </div>

          <ul className="flex flex-col gap-3 opacity-80">
            <li className="flex items-center gap-2 text-neutral-300 text-sm">
              <CheckCircle2 className="text-brand-red w-4 h-4" /> Envio assegurado contra extravios
            </li>
            <li className="flex items-center gap-2 text-neutral-300 text-sm">
              <CheckCircle2 className="text-brand-red w-4 h-4" /> Processo de compra assistida
            </li>
          </ul>

        </div>

        {/* === COLUNA DA IMAGEM === 
            O Segredo Mobile: Adicionei 'order-1 lg:order-2'.
            No celular ela sobe para o topo, no PC ela vai para a direita. */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative w-full flex justify-end">
           
           <div className="hidden lg:block absolute top-8 right-8 w-[95%] h-[600px] border-2 border-neutral-800 rounded-3xl -z-10 transition-transform duration-700 hover:translate-x-3 hover:-translate-y-3"></div>
           
           {/* Altura ajustada: h-[280px] no celular para não empurrar os botões para fora da tela, e volta para h-[600px] no PC */}
           <img 
             src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop" 
             alt="Logística Premium" 
             className="w-full lg:w-[95%] h-[280px] sm:h-[350px] lg:h-[600px] object-cover rounded-2xl lg:rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer shadow-2xl"
           />

        </div>

      </div>
    </section>
  );
}