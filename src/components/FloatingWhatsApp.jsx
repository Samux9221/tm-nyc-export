import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/5511999999999?text=Olá! Vim pelo site e gostaria de uma cotação."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2 overflow-hidden hover:pr-6"
    >
      {/* Ícone */}
      <MessageCircle size={28} fill="white" className="text-white" />
      
      {/* Texto que aparece ao passar o mouse (Efeito Premium) */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
        Falar Agora
      </span>
      
      {/* Bolinha de notificação (simula mensagem não lida) */}
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-brand-dark animate-pulse"></span>
    </a>
  );
}