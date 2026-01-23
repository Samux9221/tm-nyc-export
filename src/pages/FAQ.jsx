import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function FAQ() {
  // Estado para controlar qual pergunta está aberta
  // null = nenhuma aberta
  // 0, 1, 2... = índice da pergunta aberta
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Os produtos são originais e lacrados?",
      answer: "Sim! Todos os produtos são comprados diretamente nas lojas oficiais (Apple, BestBuy, Amazon USA) ou distribuidores autorizados. Você recebe o produto na caixa original, lacrado, com todos os acessórios e nota fiscal americana (Invoice)."
    },
    {
      question: "Qual o prazo médio de entrega?",
      answer: "Nosso prazo médio é de 15 a 25 dias corridos após a confirmação do pagamento. Esse prazo pode variar levemente dependendo da liberação da alfândega brasileira, mas monitoramos tudo para você."
    },
    {
      question: "Como funciona a garantia?",
      answer: "Produtos Apple possuem garantia mundial de 1 ano, válida no Brasil. Para outras marcas, oferecemos garantia de 3 meses diretamente conosco para defeitos de fabricação."
    },
    {
      question: "Corro risco de ser taxado?",
      answer: "Não! No nosso sistema de 'Preço Final', nós cuidamos de toda a burocracia aduaneira. O valor que você paga no site ou no orçamento já inclui frete e possíveis taxas. Você não paga nem um centavo a mais na chegada."
    },
    {
      question: "Quais as formas de pagamento?",
      answer: "Aceitamos PIX com 5% de desconto, transferência bancária e parcelamento no cartão de crédito em até 12x (com acréscimo da operadora)."
    },
    {
      question: "Vocês trazem produtos que não estão no site?",
      answer: "Com certeza! Temos o serviço de Compra Assistida. Basta enviar o link do produto que você quer (de qualquer site dos EUA) que fazemos a cotação completa para entregar na sua porta."
    }
  ];

  // Função para abrir/fechar
  const toggleFAQ = (index) => {
    // Se clicar no que já está aberto, fecha ele (null). Senão, abre o novo (index).
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
        
        {/* Cabeçalho da Página */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-neutral-900 rounded-full mb-6 border border-neutral-800">
            <HelpCircle className="text-brand-red w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Dúvidas Frequentes</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Entenda como funciona nosso processo de importação, prazos e garantias.
            Se não achar sua resposta, chame no WhatsApp!
          </p>
        </div>

        {/* Lista de Perguntas (Accordion) */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-neutral-900 border-brand-red shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
                  : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                  {item.question}
                </span>
                {/* Ícone muda dependendo se está aberto ou fechado */}
                {openIndex === index ? (
                  <Minus className="text-brand-red shrink-0" />
                ) : (
                  <Plus className="text-gray-500 shrink-0" />
                )}
              </button>

              {/* Área da Resposta (Renderização Condicional) */}
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-400 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}