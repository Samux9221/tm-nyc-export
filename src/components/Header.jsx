import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-brand-gray border-b border-brand-red shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
          <div className="bg-brand-red p-1.5 rounded">
             <ShoppingBag className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider uppercase">
            TM NYC <span className="text-brand-red">Export</span>
          </h1>
        </Link>

        {/* === MENU DESKTOP === */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Início
          </Link>
          <Link to="/catalogo" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Catálogo
          </Link>
          
          <a href="#" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">Sobre Nós</a>
          
          {/* AJUSTE 1: Mudei /FAQ para /duvidas (para bater com o App.jsx) */}
          <Link to="/duvidas" className="text-gray-300 hover:text-brand-red font-medium transition-colors uppercase text-sm tracking-wide">
            Dúvidas
          </Link>
        </nav>

        {/* BOTÃO CTA */}
        <div className="hidden md:block">
          <button className="bg-brand-green hover:bg-green-500 text-white px-6 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_20px_rgba(22,163,74,0.6)] transform hover:-translate-y-0.5">
            Falar no WhatsApp
          </button>
        </div>

        {/* BOTÃO HAMBURGUER */}
        <button onClick={toggleMenu} className="md:hidden text-white hover:text-brand-red transition-colors p-1">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* === MENU MOBILE === */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-gray border-t border-neutral-800 absolute w-full left-0 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col p-6 gap-4 text-center">
            
            <Link to="/" onClick={closeMenu} className="text-white hover:text-brand-red py-2 border-b border-neutral-800 transition-colors uppercase font-medium">
              Início
            </Link>
            
            <Link to="/catalogo" onClick={closeMenu} className="text-white hover:text-brand-red py-2 border-b border-neutral-800 transition-colors uppercase font-medium">
              Catálogo
            </Link>

            {/* AJUSTE 2: Adicionei o link de Dúvidas aqui no Mobile também */}
            <Link to="/duvidas" onClick={closeMenu} className="text-white hover:text-brand-red py-2 border-b border-neutral-800 transition-colors uppercase font-medium">
              Dúvidas
            </Link>
            
            <a href="#" className="text-white hover:text-brand-red py-2 border-b border-neutral-800 transition-colors uppercase font-medium">Sobre Nós</a>
            
            <button className="bg-brand-green text-white py-4 rounded font-bold uppercase mt-4 shadow-lg w-full">
              Falar no Zap
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}