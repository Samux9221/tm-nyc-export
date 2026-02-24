import { Instagram, Facebook, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Fundo unificado e borda sutil no topo
    <footer className="bg-[#050505] text-neutral-400 pt-20 pb-28 lg:pb-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Brilho de fundo super discreto no canto inferior direito para dar profundidade */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* === GRID PRINCIPAL === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Coluna 1: Sobre a Marca */}
          <div className="lg:pr-8">
            <div className="inline-block mb-6">
              <h2 className="text-2xl font-extrabold text-white tracking-wider flex items-center">
                <Link to="/">TM NYC</Link>
                {/* O LINK SECRETO: Apenas o ponto vermelho leva ao admin. O cursor-default esconde a mãozinha do mouse */}
                <Link to="/admin" className="text-brand-red cursor-default">.</Link>
              </h2>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-neutral-500">
              Especialistas em trazer tecnologia e exclusividade dos EUA para o Brasil. 
              Segurança, transparência e agilidade na sua importação.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/tmnycexport" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center hover:bg-brand-red/10 hover:border-brand-red/30 hover:text-brand-red transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-brand-red transition-colors" />
              </a>
              <a 
                href="https://facebook.com/tmnycexport" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center hover:bg-brand-red/10 hover:border-brand-red/30 hover:text-brand-red transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 text-neutral-400 group-hover:text-brand-red transition-colors" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navegação</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Início</Link></li>
              <li><Link to="/catalogo" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Catálogo Completo</Link></li>
              <li><a href="#como-funciona" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Como Funciona</a></li>
              <li><a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-300 group">Rastrear Pedido <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Populares</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/catalogo?category=apple" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">iPhones & Apple</Link></li>
              <li><Link to="/catalogo?category=notebooks" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">MacBooks M1/M2/M3</Link></li>
              <li><Link to="/catalogo?category=smartwatch" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Relógios Premium</Link></li>
              <li><Link to="/catalogo?category=custom" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Encomendas Especiais</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Atendimento</h3>
            <ul className="space-y-5 text-sm">
              <li>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-green-500/30 group-hover:bg-green-500/10 transition-colors">
                    <MessageCircle className="w-4 h-4 text-neutral-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium group-hover:text-green-500 transition-colors">(11) 99999-9999</span>
                    <span className="text-xs text-neutral-600 mt-1">Seg a Sex: 9h às 18h</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:contato@tmnycexport.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-red/30 group-hover:bg-brand-red/10 transition-colors">
                    <Mail className="w-4 h-4 text-neutral-400 group-hover:text-brand-red transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">contato@tmnycexport.com</span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                </div>
                <span>São Paulo, SP / NYC, USA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* === BARRA INFERIOR (Copyright) === */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <p>&copy; {currentYear} TM NYC Export. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
}