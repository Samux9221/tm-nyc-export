import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; // Para avisar que está abrindo o Zap

export function CartSidebar() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  // 🔴 CONFIGURE SEU NÚMERO AQUI (formato internacional sem +)
  const WHATSAPP_NUMBER = "5511999999999"; 

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // 1. Cria o aviso e GUARDA O ID dele
    const toastId = toast.loading("Gerando pedido...");

    // 2. Monta a lista
    const itemsList = cartItems.map(item => 
      `▪️ *${item.quantity}x* ${item.name} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}`
    ).join('\n');

    const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal);
    const message = `👋 Olá! Vim do site TM NYC Export e gostaria de finalizar meu pedido:\n\n📦 *RESUMO DO PEDIDO:*\n${itemsList}\n\n💰 *TOTAL: ${totalFormatted}*\n\nAguardo instruções de pagamento e envio!`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 3. Abre o link
    window.open(url, '_blank');

    // 4. FIX: Remove o aviso de carregando após 1 segundo (tempo de abrir a aba)
    setTimeout(() => {
      toast.dismiss(toastId); // Remove o loading
      toast.success("Redirecionado para o WhatsApp!", { duration: 3000 }); // Confirmação visual
    }, 1000);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      {/* Fundo Escuro */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900 z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-brand-red" /> Seu Carrinho
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Seu carrinho está vazio.</p>
              <button onClick={() => setIsCartOpen(false)} className="text-brand-red hover:underline text-sm">
                Voltar às compras
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-black/20 p-4 rounded-xl border border-neutral-800">
                <div className="w-20 h-20 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-brand-green font-bold text-sm">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-neutral-800 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-2 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-l-lg"><Minus size={14} /></button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-2 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-r-lg"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer com Botão Whatsapp */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-neutral-900 border-t border-neutral-800 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-white">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-green hover:bg-green-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-95"
            >
              FINALIZAR NO WHATSAPP <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}