import { Link, useLocation } from 'react-router-dom';
import { Home, Info, ShoppingBag, MessageCircle, ShoppingCart } from 'lucide-react'; 

export function MobileNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // 1. VERIFICAÇÃO DE ROTA: Descobre se o usuário está no Admin ou no Login
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  // 2. REGRA DE BLOQUEIO: Se for rota de admin, não renderiza este menu público!
  if (isAdminRoute) {
    return null;
  }

  // 3. RENDERIZAÇÃO NORMAL: Para todas as outras páginas (Home, Catálogo, etc)
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] h-16 bg-neutral-900/95 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl z-50 md:hidden px-2">
      
      {/* GRID: Divide perfeitamente em 5 partes iguais */}
      <div className="grid grid-cols-5 h-full items-center">
        
        {/* 1. Início */}
        <Link to="/" className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive('/') ? 'text-brand-red' : 'text-gray-400 hover:text-white transition-colors'}`}>
          <Home size={22} />
          <span className="text-[10px] font-medium">Início</span>
        </Link>

        {/* 2. Sobre */}
        <Link to="/sobre" className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive('/sobre') ? 'text-brand-red' : 'text-gray-400 hover:text-white transition-colors'}`}>
          <Info size={22} />
          <span className="text-[10px] font-medium">Sobre</span>
        </Link>

        {/* 3. Botão Central (Catálogo) */}
        <div className="relative flex justify-center w-full h-full">
          <Link 
            to="/catalogo" 
            className="absolute -top-7 bg-brand-red w-14 h-14 rounded-full shadow-[0_8px_20px_rgba(239,68,68,0.4)] border-[5px] border-[#171717] flex items-center justify-center text-white hover:scale-105 transition-transform active:scale-95"
          >
            <ShoppingBag size={24} strokeWidth={2.5} />
          </Link>
        </div>

        {/* 4. Dúvidas */}
        <Link to="/duvidas" className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive('/duvidas') ? 'text-brand-red' : 'text-gray-400 hover:text-white transition-colors'}`}>
          <MessageCircle size={22} />
          <span className="text-[10px] font-medium">Ajuda</span>
        </Link>

        {/* 5. Carrinho */}
        <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400 hover:text-white transition-colors">
          <ShoppingCart size={22} />
          <span className="text-[10px] font-medium">Carrinho</span>
        </button>

      </div>
    </nav>
  );
}