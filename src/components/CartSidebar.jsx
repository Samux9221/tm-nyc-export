import { useEffect } from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
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

  const WHATSAPP_NUMBER = "18627869891"

  // Trava o scroll do fundo apenas quando a sacola está aberta
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const toastId = toast.loading("Preparando seu pedido...");
    
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

  // --- ANIMAÇÕES (Framer Motion) ---
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0.5 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 200 }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          
          {/* OVERLAY: Fundo escuro simples */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* SIDEBAR: O painel da sacola */}
          <motion.div 
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[420px] bg-[#0a0a0a] border-l border-white/5 flex flex-col h-full shadow-2xl z-10"
          >
            {/* --- HEADER --- */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0 bg-[#0a0a0a] z-20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                Sua Sacola
                {cartItems.length > 0 && (
                  <span className="bg-white text-black text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wide">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
                  </span>
                )}
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* --- LISTA DE ITENS --- */}
            <div className="flex-1 overflow-y-auto custom-scrollbar-hide p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-5">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                     <ShoppingBag size={32} strokeWidth={1.5} className="text-neutral-400" />
                  </div>
                  <p className="text-lg font-medium text-white/80">Sua sacola está vazia.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="text-white hover:text-neutral-300 transition-colors text-sm font-semibold tracking-wide border-b border-white/30 hover:border-white pb-0.5"
                  >
                    Explorar Coleção
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      
                      {/* IMAGEM DO PRODUTO (Estilo Apple Store) */}
                      <div className="w-20 h-20 bg-[#111] rounded-2xl p-2 flex items-center justify-center shrink-0 border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      
                      {/* DETALHES DO PRODUTO */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-white font-medium text-sm leading-snug line-clamp-2">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-neutral-500 hover:text-red-500 p-1 transition-colors shrink-0"
                            title="Remover item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                           {/* PREÇO */}
                           <p className="text-white font-semibold text-sm">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                           </p>

                           {/* CONTROLE DE QUANTIDADE EM PÍLULA */}
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"><Minus size={12} /></button>
                            <span className="text-white text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"><Plus size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* --- RODAPÉ BLINDADO E FIXO (Resumo + Checkout) --- */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-[#0a0a0a] border-t border-white/10 shrink-0 z-20">
                
                {/* Resumo Clean */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Subtotal</span>
                    <span className="text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-400 items-center">
                    <span className="flex items-center gap-1.5"><Globe size={14} />Frete Internacional</span>
                    <span className="text-white text-[10px] uppercase tracking-wide bg-white/10 px-2 py-1 rounded-md">Calcular</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/5 mt-4">
                    <span className="text-sm font-medium text-neutral-300">Total Estimado</span>
                    <span className="font-semibold text-white text-xl tracking-tight">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                    </span>
                  </div>
                </div>

                {/* BOTÃO DE CHECKOUT - Padrão Luxo (Branco Sólido) */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-full flex justify-center items-center gap-2 transition-all active:scale-[0.98] group"
                >
                  <span className="flex items-center gap-2 text-sm tracking-wide">
                    Finalizar Pedido <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                {/* Selo de Segurança */}
                <div className="flex items-center justify-center gap-1.5 mt-5 text-neutral-500 text-[10px] uppercase tracking-widest">
                    <ShieldCheck size={14} /> Atendimento Seguro via WhatsApp
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}