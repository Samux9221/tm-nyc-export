import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function Header() {
  const { setIsCartOpen, cartCount } = useCart(); 
  const navigate = useNavigate();
  
  // === ESTADOS DO HEADER INTELIGENTE ===
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (latest <= 50) {
      setHidden(false);
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  // === ESTADO PARA O EASTER EGG DO ADMIN ===
  const [clickCount, setClickCount] = useState(0);

  const handleSecretAdminLogin = (e) => {
    if (clickCount >= 4) {
      e.preventDefault(); 
      setClickCount(0);
      navigate('/login');
    } else {
      setClickCount(prev => prev + 1);
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
        isScrolled 
          ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        
        {/* === LOGO === */}
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

        {/* === MENU DESKTOP === */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-neutral-300 hover:text-white font-medium transition-colors uppercase text-xs tracking-widest">
            Início
          </Link>
          <Link to="/catalogo" className="text-neutral-300 hover:text-white font-medium transition-colors uppercase text-xs tracking-widest">
            Catálogo
          </Link>
          <Link to='/sobre' className="text-neutral-300 hover:text-white font-medium transition-colors uppercase text-xs tracking-widest">
            Sobre Nós
          </Link>
          <Link to="/duvidas" className="text-neutral-300 hover:text-white font-medium transition-colors uppercase text-xs tracking-widest">
            Dúvidas
          </Link>
        </nav>

        {/* === ÁREA DE AÇÕES === */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* BOTÃO DO CARRINHO */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative text-neutral-300 hover:text-white transition-colors p-2 md:p-0 active:scale-95"
          >
            <ShoppingBag size={24} className="md:w-5 md:h-5 w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-brand-red text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-5 md:h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                {cartCount}
              </span>
            )}
          </button>

          {/* BOTÃO CTA WHATSAPP (Agora Verde e Otimizado para Conversão) */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/18627869891?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20um%20consultor." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all shadow-[0_0_15px_rgba(37,211,102,0.25)] hover:shadow-[0_0_25px_rgba(37,211,102,0.45)] active:scale-95"
            >
              Falar com atendimento
            </a>
          </div>

        </div>
      </div>
    </motion.header>
  );
}