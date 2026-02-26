import { Link, useLocation } from 'react-router-dom';
import { Home, Info, ShoppingBag, MessageCircle, ShoppingCart } from 'lucide-react'; 
import { useCart } from '../context/CartContext'; 

export function MobileNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // 1. IMPORTANDO O CARRINHO: 
  // (Ajuste 'setIsCartOpen' ou 'toggleCart' para o nome exato que você usa no seu contexto para abrir a sacola)
  const { cart, setIsCartOpen } = useCart(); 
  
  // 2. CONTADOR DA SACOLA: Soma a quantidade de todos os itens
  const cartItemsCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // 3. VERIFICAÇÃO DE ROTA
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  if (isAdminRoute) {
    return null;
  }

  return (
    // IMPORTANTE: A classe 'mobile-nav' foi adicionada aqui para o CSS global encontrá-la.
    // O z-index foi ajustado para z-[40], para ficar abaixo do Modal (que é z-50 ou maior).
    <nav className="mobile-nav fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl z-[40] md:hidden px-2 transition-all duration-300">
      
      <div className="grid grid-cols-5 h-full items-center">
        
        {/* 1. Início */}
        <Link to="/" className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive('/') ? 'text-white' : 'text-neutral-500 hover:text-white transition-colors'}`}>
          <Home size={22} strokeWidth={isActive('/') ? 2.5 : 1.5} />
          <span className="text-[9px] font-medium tracking-wide">Início</span>
        </Link>

        {/* 2. Sobre */}
        <Link to="/sobre" className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive('/sobre') ? 'text-white' : 'text-neutral-500 hover:text-white transition-colors'}`}>
          <Info size={22} strokeWidth={isActive('/sobre') ? 2.5 : 1.5} />
          <span className="text-[9px] font-medium tracking-wide">Sobre</span>
        </Link>

        {/* 3. Botão Central (Catálogo) - Estética Matte Premium */}
        <div className="relative flex justify-center w-full h-full">
          <Link 
            to="/catalogo" 
            className="absolute -top-6 bg-white w-14 h-14 rounded-full border-[4px] border-[#050505] flex items-center justify-center text-black hover:scale-105 transition-transform active:scale-95 shadow-lg"
          >
            <ShoppingBag size={24} strokeWidth={2} />
          </Link>
        </div>

        {/* 4. Dúvidas */}
        <Link to="/duvidas" className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive('/duvidas') ? 'text-white' : 'text-neutral-500 hover:text-white transition-colors'}`}>
          <MessageCircle size={22} strokeWidth={isActive('/duvidas') ? 2.5 : 1.5} />
          <span className="text-[9px] font-medium tracking-wide">Ajuda</span>
        </Link>

        {/* 5. Carrinho / Sacola */}
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="relative flex flex-col items-center justify-center w-full h-full gap-1 text-neutral-500 hover:text-white transition-colors"
        >
          <div className="relative">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {/* O Badge Notificador (Bolinha Vermelha) */}
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0a0a0a]">
                {cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium tracking-wide">Sacola</span>
        </button>

      </div>
    </nav>
  );
}