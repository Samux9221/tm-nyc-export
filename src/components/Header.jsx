import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import { useCart } from '../context/CartContext';

export function Header() {
  const { setIsCartOpen, cartCount } = useCart(); 
  const navigate = useNavigate();
  
  // Estado para o nosso "Easter Egg" do Admin
  const [clickCount, setClickCount] = useState(0);

  // Função Ninja: 5 cliques rápidos na Logo levam para o Login/Admin
  const handleSecretAdminLogin = (e) => {
    // Evita que o primeiro clique já navegue para a Home se a intenção for o admin
    if (clickCount >= 4) {
      e.preventDefault(); 
      setClickCount(0);
      navigate('/login');
    } else {
      setClickCount(prev => prev + 1);
      // Reseta o contador se a pessoa demorar mais de 2 segundos para clicar de novo
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    // 1. Efeito Premium: bg-opacity e backdrop-blur para dar efeito de vidro fosco
    <header className="fixed w-full top-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        
        {/* === LOGO (Com o Easter Egg) === */}
        <Link 
          to="/" 
          onClick={handleSecretAdminLogin}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="bg-brand-red p-1.5 md:p-2 rounded-lg shadow-[0_0_10px_rgba(239,68,68,0.3)]">
             <ShoppingBag className="text-white w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h1 className="text-lg md:text-2xl font-extrabold text-white tracking-wider uppercase">
            TM NYC <span className="text-brand-red">Export</span>
          </h1>
        </Link>

        {/* === MENU DESKTOP (Escondido no Mobile) === */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Início
          </Link>
          <Link to="/catalogo" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Catálogo
          </Link>
          <Link to='/sobre' className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Sobre Nós
          </Link>
          <Link to="/duvidas" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Dúvidas
          </Link>
        </nav>

        {/* === ÁREA DE AÇÕES === */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* BOTÃO DO CARRINHO (Visível em Mobile e Desktop) */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative text-gray-300 hover:text-white transition-colors p-2 md:p-0"
          >
            <ShoppingBag size={24} className="md:w-6 md:h-6 w-7 h-7" />
            
            {/* Badge Premium (Fiz um ajuste na sombra e tamanho) */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-brand-red text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* BOTÃO CTA WHATSAPP (Só Desktop - Mobile chama pelo FloatingWhatsApp) */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/18627869891" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_20px_rgba(22,163,74,0.6)] hover:-translate-y-0.5 inline-block"
            >
              Falar no WhatsApp
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}