import { ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const [dollar, setDollar] = useState(null);

  // Array das marcas (Mantive o mesmo)
  const marcas = [
    { 
      id: 1, 
      name: "Apple", 
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop", 
      tag: "Tecnologia"
    },
    { 
      id: 2, 
      name: "Nike & Jordan", 
      image: "https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=800&auto=format&fit=crop", 
      tag: "Sneakers Premium"
    },
    { 
      id: 3, 
      name: "PlayStation & Xbox", 
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop", 
      tag: "Gaming"
    },
    { 
      id: 4, 
      name: "Grifes Exclusivas", 
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop", 
      tag: "Vestuário"
    }
  ];

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
          
          {/* Badge de Dólar (Pequeno ajuste de espaçamento: mb-8 ao invés de mb-6 para mais respiro) */}
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

          {/* --- NOVOS BOTÕES "APPLE STYLE" --- */}
          {/* No mobile (flex-col) eles empilham. No desktop (md:flex-row) ficam lado a lado. */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-12 lg:mb-10">
            
            {/* Botão Primário: Formato Pílula, sem sombra pesada, visual limpo */}
            <a 
              href="https://wa.me/18627869891" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full md:w-auto bg-brand-red hover:bg-red-600 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
              text=""
            >
              Fazer Cotação
            </a>
            
            {/* Botão Secundário: Formato Pílula, Efeito "Vidro" (Glassmorphism) super elegante */}
            <Link to="/catalogo" className="w-full md:w-auto text-neutral-200 px-8 py-4 rounded-full text-base font-medium transition-all duration-300 active:scale-[0.98] flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10">
              Ver Catálogo
            </Link>
          </div>
          {/* ---------------------------------- */}

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
             {/* Adicionei um "glow" vermelho sutil atrás da imagem para destacar o premium */}
             <div className="absolute top-1/2 right-12 w-[60%] h-[60%] bg-brand-red/20 blur-[120px] -translate-y-1/2 rounded-full -z-10"></div>
             
             <div className="absolute top-8 right-8 w-[90%] h-[580px] border border-neutral-800/60 rounded-[32px] -z-10 transition-transform duration-700 hover:translate-x-3 hover:-translate-y-3"></div>
             {/* Nova Imagem do Unsplash inserida aqui */}
             <img 
               src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1200&auto=format&fit=crop" 
               alt="Ecossistema Apple e Logística Premium" 
               className="w-[90%] h-[580px] object-cover object-center rounded-[32px] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out shadow-2xl shadow-black/80 ml-auto"
             />
           </div>

           {/* --- NOVO CARROSSEL MOBILE "BENTO BOX STYLE" --- */}
           <div className="block lg:hidden w-full mt-4">
             <div className="flex items-center justify-between mb-5 px-1">
               <span className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">
                 Marcas Disponíveis
               </span>
             </div>
             
             <div className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
               {marcas.map((marca) => (
                 <Link 
                   to={'/catalogo?category=${marca.tag}'}
                   key={marca.id} 
                   // Card agora é flex-col, com altura automática e borda mais sutil.
                   // w-[65vw] deixa o próximo card mais visível, convidando ao scroll.
                   className="relative shrink-0 w-[65vw] sm:w-[45vw] h-auto rounded-[24px] overflow-hidden snap-center group bg-[#0a0a0a] border border-neutral-800/60 active:scale-[0.98] transition-all flex flex-col"
                 >
                   {/* A Imagem agora fica no topo, separada do texto (estilo Bento) */}
                   <div className="h-40 w-full overflow-hidden relative">
                      <img 
                        src={marca.image} 
                        alt={marca.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Uma camada muito sutil para uniformizar as fotos */}
                      <div className="absolute inset-0 bg-black/20"></div>
                   </div>
                   
                   {/* Área de Texto Limpa (Sem badges, sem degradê pesado) */}
                   <div className="p-5 flex flex-col justify-center bg-[#0f0f0f]">
                     {/* Adicionei o "tag" aqui como um subtítulo discreto */}
                     <span className="text-neutral-500 text-[10px] font-medium uppercase tracking-wider mb-1">{marca.tag}</span>
                     <h3 className="text-white font-semibold text-lg tracking-tight leading-none group-hover:text-brand-red transition-colors">
                       {marca.name}
                     </h3>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
           {/* ---------------------------------- */}

        </div>

      </div>
    </section>
  );
}