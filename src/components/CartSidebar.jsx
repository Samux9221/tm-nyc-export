import { useEffect, useState } from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export function CartSidebar() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  const [isRendered, setIsRendered] = useState(false);
  const WHATSAPP_NUMBER = "5511999999999"; 

  useEffect(() => {
    if (isCartOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsRendered(false), 400); // Aumentei um pouco o tempo para suavizar a saída
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const toastId = toast.loading("Preparando atendimento VIP...");
    // ... (Lógica do WhatsApp permanece a mesma)
    const itemsList = cartItems.map(item => 
      `▪️ *${item.quantity}x* ${item.name} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}`
    ).join('\n');
    const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal);
    const message = `👋 Olá! Vim do site TM NYC Export e gostaria de finalizar meu pedido com segurança:\n\n📦 *RESUMO DO PEDIDO:*\n${itemsList}\n\n💰 *TOTAL: ${totalFormatted}*\n\nAguardo as instruções para pagamento!`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
    setTimeout(() => {
      toast.dismiss(toastId);
      toast.success("Redirecionando para o nosso time!", { duration: 3000 });
      setIsCartOpen(false);
    }, 1000);
  };

  if (!isRendered && !isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      
      {/* Overlay mais escuro e dramático */}
      <div 
        className={`absolute inset-0 bg-[#050505]/80 backdrop-blur-sm transition-opacity duration-400 ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar com Gradiente e Borda Iluminada */}
      <div 
        className={`relative w-full max-w-[450px] bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.8)] flex flex-col h-full transform transition-transform duration-400 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Efeito de luz sutil na borda esquerda */}
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-red/20 to-transparent opacity-50 pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0 relative overflow-hidden">
           {/* Brilho de fundo no header */}
           <div className="absolute top-0 left-0 w-full h-full bg-brand-red/5 blur-3xl pointer-events-none opacity-50" />
           
          <h2 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
            <span className="text-brand-red drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">Sua Sacola</span>
            {cartItems.length > 0 && (
              <span className="bg-white/5 border border-white/10 text-neutral-300 text-xs py-1 px-2.5 rounded-full font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
              </span>
            )}
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors relative z-10 group"
          >
            <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-6">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 relative">
                 <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full animate-pulse"></div>
                 <ShoppingBag size={40} className="text-neutral-400 relative z-10" />
              </div>
              <p className="text-xl font-medium text-white/80">Sua sacola está vazia.</p>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-brand-red hover:text-red-400 transition-colors text-sm font-bold tracking-wide uppercase border-b-2 border-brand-red/30 hover:border-brand-red pb-1"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-5 group relative pb-6 border-b border-white/5 last:border-0 last:pb-0">
                
                {/* Imagem do Produto com Moldura Premium */}
                <div className="w-24 h-24 bg-[#050505] rounded-xl border border-white/10 overflow-hidden flex-shrink-0 relative group-hover:border-brand-red/30 transition-colors duration-500 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-lighten group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                {/* Detalhes */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 pr-2">{item.name}</h3>
                    
                    {/* Lixeira */}
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-neutral-600 hover:text-red-500 p-1 transition-colors shrink-0 lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-end justify-between mt-2">
                     {/* Preço com destaque */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Valor Unitário</span>
                        <p className="text-white font-bold text-lg tracking-tight">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                        </p>
                    </div>

                    {/* Controle de Quantidade Elegante */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg h-9 group-hover:border-white/20 transition-colors">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-9 h-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors hover:bg-white/5 rounded-l-lg"><Minus size={14} /></button>
                      <span className="text-white text-sm font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-9 h-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors hover:bg-white/5 rounded-r-lg"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Rodapé do Carrinho (Resumo e Botão) */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-gradient-to-t from-[#050505] to-[#0a0a0a] border-t border-white/10 shrink-0 relative">
            
            {/* Bloco de Resumo Estilizado */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-400 items-center">
                <span className="flex items-center gap-1.5"><Globe size={14} className="text-brand-red" />Frete Internacional</span>
                <span className="text-white text-xs bg-brand-red/10 px-2 py-0.5 rounded-md border border-brand-red/20">Calculado no checkout</span>
              </div>
              <div className="flex justify-between text-lg pt-4 border-t border-white/5 mt-4">
                <span className="font-bold text-white">Total Estimado</span>
                <span className="font-extrabold text-brand-red text-xl tracking-tight drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                </span>
              </div>
            </div>

            {/* Botão de Ação Principal - VERMELHO PREMIUM */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.3)] hover:shadow-[0_0_35px_rgba(239,68,68,0.5)] active:scale-[0.98] group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide text-sm">
                Finalizar Pedido <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            {/* Selo de Segurança */}
            <div className="flex items-center justify-center gap-2 mt-4 text-neutral-500 text-[11px] uppercase tracking-widest opacity-70">
                <ShieldCheck size={14} /> Check-out Seguro via WhatsApp
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Importei o Globe que esqueci lá em cima
import { Globe } from 'lucide-react';