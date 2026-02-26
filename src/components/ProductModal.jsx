import { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductModal({ isOpen, onClose, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  // Reseta a quantidade sempre que o modal abrir com um novo produto
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = 'hidden';
      // Injeta uma classe no body avisando que o modal abriu
      document.body.classList.add('modal-open'); 
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }
    return () => { 
      document.body.style.overflow = 'auto'; 
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!product) return null;

  function handleAdd() {
    onAddToCart(product, quantity);
  }

  // --- ANIMAÇÕES (Premium e Suaves) ---
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0.5, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 200 }
    },
    exit: { 
      y: "100%", 
      opacity: 0, 
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-12">
          
          {/* OVERLAY: Fundo escuro com Blur (Estilo iOS) */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* O MODAL: Gaveta no celular, Painel no PC */}
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full sm:w-auto sm:max-w-4xl lg:max-w-5xl bg-[#0a0a0a] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col sm:flex-row max-h-[90vh] sm:max-h-[85vh] z-10 border border-white/5"
          >
            
            {/* --- INDICADOR DE GAVETA (Apenas Mobile) --- */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full sm:hidden z-20 pointer-events-none" />

            {/* BOTÃO DE FECHAR FLUTUANTE */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-black/40 hover:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all z-20 border border-white/10"
            >
              <X size={20} />
            </button>

            {/* --- ZONA DA IMAGEM (O Altar do Produto) --- */}
            <div className="w-full sm:w-1/2 bg-[#111] relative flex items-center justify-center p-8 sm:p-12 min-h-[40vh] sm:min-h-0">
              {/* Círculo de luz no fundo para dar destaque */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
              
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain drop-shadow-2xl relative z-10 max-h-[350px] sm:max-h-[500px]"
              />
              
              {product.category && (
                <span className="absolute top-6 left-6 bg-[#050505]/80 backdrop-blur-md border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full z-10 hidden sm:block">
                  {product.category}
                </span>
              )}
            </div>

            {/* --- ZONA DE INFORMAÇÃO --- */}
            {/* Adicionado pb-32 no mobile para o conteúdo não ficar escondido atrás da barra fixa */}
            <div className="w-full sm:w-1/2 flex flex-col bg-[#0a0a0a] overflow-y-auto custom-scrollbar-hide pb-28 sm:pb-0 relative">
              
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col flex-1">
                
                {product.category && (
                  <span className="text-neutral-500 text-[10px] uppercase tracking-widest mb-3 block sm:hidden">
                    {product.category}
                  </span>
                )}

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                  {product.name}
                </h2>
                
                {/* Preço de Tabela de Luxo */}
                <div className="mb-8">
                  <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                  <span className="text-neutral-500 text-sm ml-2 font-light">
                    à vista no PIX
                  </span>
                </div>

                <div className="w-full h-px bg-white/5 mb-8" />

                <div className="mb-8">
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3">
                    Sobre o Produto
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    {product.description || "Este é um produto de importação premium, garantido com autenticidade, seguro total no envio e isenção de taxas surpresas. Uma escolha definitiva em tecnologia."}
                  </p>
                </div>

                {/* --- SELEÇÃO DE QUANTIDADE (Estilo Apple Store) --- */}
                <div className="mt-auto hidden sm:flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-sm">Quantidade</span>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-white font-medium text-sm">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* CTA Desktop */}
                  <button 
                    onClick={handleAdd}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-colors duration-300"
                  >
                    <ShoppingBag size={18} />
                    Adicionar à Sacola
                  </button>
                </div>
              </div>

              {/* === BARRA FIXA INFERIOR (APENAS MOBILE) === */}
              {/* Usando "fixed" e amarrando na base da tela para criar a ergonomia do polegar */}
              <div className="fixed sm:hidden bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 p-5 z-30 flex items-center gap-4">
                
                {/* Quantidade Mobile Minimalista */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-neutral-400 active:text-white">
                    <Minus size={16} />
                  </button>
                  <span className="text-white font-medium min-w-[12px] text-center">
                    {quantity}
                  </span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-neutral-400 active:text-white">
                    <Plus size={16} />
                  </button>
                </div>

                {/* CTA Mobile Alto Contraste */}
                <button 
                  onClick={handleAdd}
                  className="flex-1 bg-white active:scale-95 text-black font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag size={18} />
                  <span className="text-sm">Adicionar</span>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}