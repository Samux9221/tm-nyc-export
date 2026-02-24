import { useState } from 'react';
import { Plus, HelpCircle, MessageCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // 🔴 COLOQUE SEU NÚMERO AQUI
  const WHATSAPP_NUMBER = "5511999999999"; 

  const faqs = [
    {
      icon: <ShieldCheck size={20} className="text-brand-red" />,
      question: "Os produtos são originais e lacrados?",
      answer: "Absolutamente. Todos os produtos são adquiridos diretamente nas lojas oficiais (Apple, BestBuy, Amazon USA) ou distribuidores autorizados americanos. Você recebe o produto na caixa original, selado pelo fabricante, com todos os acessórios de fábrica e a nota fiscal original (Invoice)."
    },
    {
      icon: <Truck size={20} className="text-brand-red" />,
      question: "Qual o prazo médio de entrega no Brasil?",
      answer: "Nosso prazo médio de entrega varia entre 15 a 25 dias corridos após a confirmação do pagamento. Cuidamos de toda a logística internacional e nacional. Embora o prazo possa sofrer leves variações devido à liberação alfandegária, nossa equipe monitora o rastreamento diariamente para você."
    },
    {
      icon: <ShieldCheck size={20} className="text-brand-red" />,
      question: "Como funciona a garantia dos produtos importados?",
      answer: "Produtos Apple (iPhone, Mac, iPad) possuem garantia global padrão de 1 ano, totalmente válida nas autorizadas no Brasil. Para equipamentos de outras marcas que não possuem garantia global, a TM NYC Export oferece uma garantia direta de 3 meses para defeitos de fabricação."
    },
    {
      icon: <HelpCircle size={20} className="text-brand-red" />,
      question: "Corro risco de ser taxado pela alfândega?",
      answer: "De forma alguma! Trabalhamos com um sistema de 'Preço Final'. Isso significa que nós assumimos 100% da responsabilidade burocrática e aduaneira. O valor que você paga no fechamento do pedido já contempla o frete internacional e todas as possíveis taxas. Sem surpresas na entrega."
    },
    {
      icon: <CreditCard size={20} className="text-brand-red" />,
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Buscamos facilitar sua aquisição. Aceitamos pagamentos à vista via PIX (com 5% de desconto especial) ou transferência bancária. Também oferecemos a conveniência do parcelamento no cartão de crédito em até 12x, sujeito a taxas da operadora."
    },
    {
      icon: <PackageSearch size={20} className="text-brand-red" />,
      question: "Vocês importam produtos que não estão no site?",
      answer: "Sim, através do nosso serviço VIP de Compra Assistida. Se você deseja um item específico de qualquer loja dos EUA, basta nos enviar o link pelo WhatsApp. Faremos uma cotação completa, incluindo frete e impostos, para entregar o item diretamente na sua porta no Brasil."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent("Olá! Estava na página de Dúvidas e gostaria de conversar com um especialista.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-32 pb-24 container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Coluna Esquerda: Título e Contato (Fixa no Desktop) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-4 block">
              Transparência Total
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Dúvidas <br/> Frequentes
            </h1>
            <p className="text-neutral-400 text-sm lg:text-base leading-relaxed mb-10 max-w-md">
              Compreender o processo de importação é o primeiro passo para uma experiência segura. Separamos as respostas para as principais perguntas dos nossos clientes.
            </p>

            {/* Card de Contato VIP */}
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden group">
              {/* Brilho de fundo sutil */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 blur-3xl rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150" />
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MessageCircle className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Ainda tem dúvidas?</h3>
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Atendimento Humano</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm mb-6 relative z-10">
                Nossos especialistas estão disponíveis no WhatsApp para tirar qualquer dúvida sobre pedidos ou cotações personalizadas.
              </p>
              <button 
                onClick={handleWhatsAppSupport}
                className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 text-sm relative z-10"
              >
                Falar com Especialista
              </button>
            </div>
          </div>

          {/* Coluna Direita: Lista de FAQs (Accordion Animado) */}
          <div className="w-full lg:w-2/3 space-y-4 lg:space-y-6">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={`bg-[#0a0a0a] border rounded-2xl transition-all duration-500 overflow-hidden relative ${
                    isOpen 
                      ? 'border-brand-red/50 shadow-[0_10px_30px_rgba(239,68,68,0.05)]' 
                      : 'border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Linha indicadora lateral vermelha (aparece só quando aberto) */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-brand-red transition-transform duration-500 origin-top ${isOpen ? 'scale-y-100' : 'scale-y-0'}`} />

                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center gap-4 lg:gap-6 p-6 lg:p-8 text-left focus:outline-none group cursor-pointer"
                  >
                    {/* Ícone customizado ou Círculo */}
                    <div className={`hidden sm:flex w-10 h-10 rounded-full items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-brand-red/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                        {item.icon}
                    </div>

                    <span className={`flex-1 font-bold text-base lg:text-lg tracking-tight transition-colors duration-300 pr-4 ${isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                      {item.question}
                    </span>

                    {/* Ícone de Plus animado para X */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500 ${isOpen ? 'bg-brand-red border-brand-red text-white rotate-45' : 'border-white/10 text-neutral-500 group-hover:text-white group-hover:border-white/30'}`}>
                        <Plus size={16} />
                    </div>
                  </button>

                  {/* Resposta com animação suave de Slide Down (usando Grid) */}
                  <div 
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 lg:p-8 pt-0 lg:pt-0 sm:pl-[5.5rem] text-neutral-400 text-sm lg:text-base leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Import necessário para o ícone extra que usei no array
import { PackageSearch } from 'lucide-react';