import { ArrowRight, Box, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {

  const [dollar, setDollar] = useState(null);

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
      .then(response => response.json())
      .then(data => {
        setDollar(parseFloat(data.USDBRL.bid));
      })
      .catch(error => console.error("Erro ao buscar dólar:", error));
  }, []);

  return (
    <section className="relative bg-brand-dark min-h-[90vh] flex items-center pt-20 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/20 to-brand-dark z-0" />

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        <div className="max-w-2xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Logística Internacional Especializada
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            De Nova York <br />
            para o <span className="text-brand-red">Brasil.</span>
          </h1>

          <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-8 max-w-lg">
            Acesso exclusivo a produtos Apple, eletrônicos de alta performance e encomendas personalizadas. 
            Segurança total do envio até sua porta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <button className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded font-bold transition-all flex items-center justify-center gap-2 group">
              Fazer Cotação
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Botão Secundário (Ação de Curiosidade) */}
            <Link to="/catalogo" className="border border-neutral-700 hover:border-white text-white px-8 py-4 rounded font-bold transition-colors flex items-center justify-center gap-2">
              Ver Catálogo
            </Link>
          </div>

          {/* ÍCONES DE CONFIANÇA (Social Proof) - Isso aumenta a percepção profissional */}
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Box className="text-brand-red w-6 h-6" />
              <span className="text-sm text-gray-400 font-medium">Envio Assegurado</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-red w-6 h-6" />
              <span className="text-sm text-gray-400 font-medium">Compra Assistida</span>
            </div>
          </div>
        </div>

        {/* === COLUNA DIREITA: Imagem Institucional ===*/}
        <div className="relative hidden lg:block h-full min-h-[500px]">
           <div className="absolute top-10 right-10 w-full h-full border-2 border-neutral-800 rounded-3xl -z-10"></div>
           
           {/* Imagem Principal - Usei uma foto de produtos Apple/Tech com fundo escuro para combinar */}
           <img 
             src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop" 
             alt="Produtos High Tech" 
             className="w-full h-[600px] object-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
           />
           
           {/* Card Flutuante (Efeito vidro) */}
           <div className="absolute bottom-10 left-[-20px] bg-neutral-900/90 backdrop-blur-md p-6 rounded-xl border border-neutral-800 shadow-xl max-w-xs">
              <p className="text-gray-400 text-sm mb-1">Cotação Dólar Hoje</p>
              <div className="flex items-end gap-2">
                <span className="text-white text-2xl font-bold">{dollar ? `R$ ${dollar.toFixed(2).replace('.', ',')}` : '...'}</span>
                <span className="text-brand-green text-sm font-medium mb-1"> Comercial</span>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}