import { Instagram, Facebook, MessageCircle, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-neutral-900">
      <div className="container mx-auto px-4">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Sobre a Marca */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
              TM NYC <span className="text-brand-red">Export</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              Especialistas em trazer tecnologia e exclusividade dos EUA para o Brasil. 
              Segurança, transparência e agilidade na sua importação.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded bg-neutral-900 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-neutral-900 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-6">Navegação</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-red transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Catálogo Completo</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Rastrear Pedido</a></li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div>
            <h3 className="text-white font-bold mb-6">Populares</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-red transition-colors">iPhones & Apple</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">MacBooks M1/M2</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Relógios Garmin</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Peças de PC</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-bold mb-6">Fale Conosco</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MessageCircle className="text-brand-green shrink-0" size={20} />
                <span>(11) 99999-9999 <br/> <span className="text-xs text-gray-600">Seg a Sex: 9h às 18h</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-red shrink-0" size={20} />
                <span>contato@tmnycexport.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-brand-red shrink-0" size={20} />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferior (Copyright) */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>&copy; 2024 TM NYC Export. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Termos de Uso</a>
            <a href="#" className="hover:text-gray-400">Política de Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
}