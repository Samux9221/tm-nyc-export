import { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductModal({ isOpen, onClose, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  
  // Estado para controlar a imagem atualmente em exibição
  const [activeImage, setActiveImage] = useState('');

  // Prepara o array com a imagem principal + as imagens da galeria
  const allImages = product ? [product.image, ...(product.gallery || [])] : [];

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setActiveImage(product.image); // Ao abrir, mostra sempre a principal
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen, product]);

  if (!product) return null;

  function handleAdd() {
    if (product.is_sold) return;
    onAddToCart(product, quantity);
  }

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  const modalVariants = {
    hidden: { y: "100%", opacity: 0.5, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 200 } },
    exit: { y: "100%", opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-12">
          <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="exit" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer" />

          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full sm:w-auto sm:max-w-4xl lg:max-w-5xl bg-[#0a0a0a] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col sm:flex-row max-h-[90vh] sm:max-h-[85vh] z-10 border border-white/5">
            
            <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-black/40 hover:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all z-20 border border-white/10">
              <X size={20} />
            </button>

            {/* ZONA DA IMAGEM E CARROSSEL */}
            <div className="w-full sm:w-1/2 bg-[#111] relative flex flex-col items-center justify-center p-6 sm:p-10 min-h-[40vh] sm:min-h-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Imagem Principal Dinâmica */}
              <div className="flex-1 w-full flex items-center justify-center mb-4 sm:mb-8 mt-8 sm:mt-0">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className={`w-full h-full object-contain drop-shadow-2xl relative z-10 max-h-[250px] sm:max-h-[350px] transition-all duration-300 ${product.is_sold ? 'opacity-60 grayscale-[0.2]' : ''}`}
                />
              </div>

              {/* Miniaturas da Galeria (Só aparecem se houver mais de 1 foto) */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 relative z-20 bg-black/30 backdrop-blur-md p-2 rounded-2xl border border-white/5">
                  {allImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                        activeImage === img 
                          ? 'border-2 border-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                          : 'border border-transparent opacity-50 hover:opacity-100 hover:scale-95'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-contain bg-[#050505] p-1" alt={`Thumb ${idx}`} />
                    </button>
                  ))}
                </div>
              )}
              
              {product.category && (
                <span className="absolute top-6 left-6 bg-[#050505]/80 backdrop-blur-md border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full z-10 hidden sm:block">
                  {product.category}
                </span>
              )}
            </div>

            {/* ZONA DE INFORMAÇÃO */}
            <div className="w-full sm:w-1/2 flex flex-col bg-[#0a0a0a] overflow-y-auto custom-scrollbar-hide pb-28 sm:pb-0 relative">
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col flex-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                  {product.name}
                </h2>
                
                <div className="mb-8">
                  <span className={`text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight ${product.is_sold ? 'text-neutral-500 line-through' : 'text-white'}`}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                  <span className="text-neutral-500 text-sm ml-2 font-light">à vista no PIX</span>
                  {product.is_sold && <div className="mt-3 block w-max border border-white/10 bg-white/5 text-neutral-400 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">Indisponível no Momento</div>}
                </div>

                <div className="w-full h-px bg-white/5 mb-8" />

                <div className="mb-8">
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3">Sobre o Produto</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    {product.description || "Este é um produto de importação premium, garantido com autenticidade, seguro total no envio e isenção de taxas surpresas."}
                  </p>
                </div>

                {/* Desktop Buttons */}
                <div className="mt-auto hidden sm:flex flex-col gap-6">
                  {!product.is_sold && (
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 text-sm">Quantidade</span>
                      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full text-white hover:bg-white/10"><Minus size={14}/></button>
                        <span className="w-4 text-center text-white font-medium text-sm">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20"><Plus size={14}/></button>
                      </div>
                    </div>
                  )}
                  <button onClick={handleAdd} disabled={product.is_sold} className={`w-full font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-colors ${product.is_sold ? 'bg-neutral-900/50 text-neutral-600 border border-white/5 cursor-not-allowed' : 'bg-white hover:bg-neutral-200 text-black'}`}>
                    <ShoppingBag size={18} /> {product.is_sold ? 'Esgotado' : 'Adicionar à Sacola'}
                  </button>
                </div>
              </div>

              {/* Mobile Buttons */}
              <div className="fixed sm:hidden bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 p-5 z-30 flex items-center gap-4">
                {!product.is_sold && (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-neutral-400"><Minus size={16}/></button>
                    <span className="text-white font-medium min-w-[12px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-neutral-400"><Plus size={16}/></button>
                  </div>
                )}
                <button onClick={handleAdd} disabled={product.is_sold} className={`flex-1 font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all ${product.is_sold ? 'bg-neutral-900/50 text-neutral-600 cursor-not-allowed border border-white/5' : 'bg-white active:scale-95 text-black'}`}>
                  <ShoppingBag size={18} /> <span className="text-sm">{product.is_sold ? 'Esgotado' : 'Adicionar'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}