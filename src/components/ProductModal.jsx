import { X, ShoppingCart, Check, Minus, Plus, ShieldCheck, Truck, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Fecha o modal se apertar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const imageUrl = product.image || product.image_url;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog" 
      aria-modal="true"
    >
      {/* 1. BACKDROP (Fundo Escuro para focar no modal) */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* 2. O MODAL EM SI (Com Scroll Interno) */}
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
        {/* Botão Fechar (Fixo no topo direito) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full transition-colors border border-white/10"
        >
          <X size={20} />
        </button>

        {/* === ÁREA ROLÁVEL (Para garantir que cabe em qualquer tela) === */}
        <div className="flex flex-col md:flex-row w-full overflow-y-auto custom-scrollbar">
          
          {/* === COLUNA ESQUERDA: IMAGEM (Limpa e Sóbria) === */}
          <div className="w-full md:w-1/2 bg-neutral-800/30 flex items-center justify-center p-8 min-h-[300px] relative">
            
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-full max-h-[400px] object-contain drop-shadow-lg"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-gray-600 border-2 border-dashed border-neutral-800 rounded-lg">
                Sem imagem
              </div>
            )}

            {/* Categoria Discreta */}
            {product.category && (
              <span className="absolute bottom-4 left-4 text-xs font-bold text-gray-400 bg-black/40 px-2 py-1 rounded border border-white/5 uppercase tracking-wide">
                {product.category}
              </span>
            )}
          </div>

          {/* === COLUNA DIREITA: DETALHES === */}
          <div className="w-full md:w-1/2 flex flex-col bg-neutral-900 p-6 md:p-8">
            
            {/* Header do Produto */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                 <span className="bg-green-500/10 text-green-500 text-xs font-bold px-2 py-0.5 rounded uppercase">Em Estoque</span>
                 <div className="flex text-yellow-500 gap-0.5">
                   {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                 </div>
                 <span className="text-gray-500 text-xs">(4.9)</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl font-bold text-brand-red">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </span>
                {/* Preço "De" (Apenas visual, calculado 20% a mais) */}
                <span className="text-gray-600 text-sm line-through decoration-gray-600">
                   {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * 1.2)}
                </span>
              </div>
            </div>

            {/* Descrição (Texto) */}
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap">
              <h3 className="text-white font-semibold text-base mb-2">Detalhes</h3>
              {product.description || "Descrição padrão: Este produto oferece alta qualidade, durabilidade e desempenho. Ideal para o dia a dia com acabamento premium."}
            </div>

            {/* Badges de Confiança (Simples) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-3 p-3 rounded bg-neutral-800/50 border border-neutral-800">
                <ShieldCheck className="text-brand-green shrink-0" size={20} />
                <div className="text-xs">
                  <p className="text-white font-bold">Garantia Ativa</p>
                  <p className="text-gray-500">3 Meses de suporte</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded bg-neutral-800/50 border border-neutral-800">
                <Truck className="text-blue-400 shrink-0" size={20} />
                <div className="text-xs">
                  <p className="text-white font-bold">Entrega Segura</p>
                  <p className="text-gray-500">Envio para todo Brasil</p>
                </div>
              </div>
            </div>

            {/* Botões de Ação (Sempre no final do conteúdo) */}
            <div className="mt-auto pt-6 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Quantidade */}
                <div className="flex items-center bg-neutral-800 rounded-lg border border-neutral-700 w-full sm:w-auto justify-between">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-l-lg transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center text-white font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-r-lg transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Botão Comprar */}
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg
                    ${isAdded 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-brand-red hover:bg-red-700 text-white'
                    }`}
                >
                  {isAdded ? (
                    <> <Check size={20} /> Adicionado </>
                  ) : (
                    <> <ShoppingCart size={20} /> Adicionar ao Carrinho </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}