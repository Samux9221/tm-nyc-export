import { useNavigate } from 'react-router-dom';
import { Smartphone, Laptop, Watch, Package, ArrowUpRight } from 'lucide-react';

export function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryFilter) => {
    if (categoryFilter === 'custom') {
      window.open('https://wa.me/5511999999999?text=Olá! Gostaria de cotar a encomenda de um produto dos EUA.', '_blank');
      return;
    }
    navigate(`/catalogo?category=${categoryFilter}`);
    window.scrollTo(0, 0); 
  };

  const categories = [
    { 
      name: "Apple iPhone", 
      desc: "Do 13 ao 16 Pro Max", 
      icon: Smartphone,
      filter: "apple" 
    },
    { 
      name: "MacBooks & iPads", 
      desc: "Linhas M1, M2 e M3", 
      icon: Laptop,
      filter: "notebooks" 
    },
    { 
      name: "Smartwatches", 
      desc: "Apple Watch e Garmin", 
      icon: Watch,
      filter: "smartwatch" 
    },
    { 
      name: "Encomendas", 
      desc: "Traga seu produto dos EUA", 
      icon: Package,
      filter: "custom" 
    },
  ];

  return (
    <section className="bg-[#050505] py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="mb-12 lg:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-3 block">
              Catálogo de Elite
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              O melhor da tecnologia global.
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm md:text-right border-l-2 md:border-l-0 md:border-r-2 border-brand-red/30 pl-4 md:pl-0 md:pr-4">
            Produtos originais, lacrados e com garantia internacional. Selecione uma categoria para explorar.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          
          {categories.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleCategoryClick(item.filter)}
              className="group relative overflow-hidden bg-[#0a0a0a] p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-white/5 hover:border-brand-red/30 transition-all duration-500 cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-brand-red/5 flex flex-col justify-between min-h-[160px] sm:min-h-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <ArrowUpRight className="absolute top-4 right-4 lg:top-6 lg:right-6 text-neutral-600 group-hover:text-brand-red group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 w-4 h-4 lg:w-5 lg:h-5" />

              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-4 lg:mb-8 group-hover:bg-brand-red/10 group-hover:border-brand-red/30 group-hover:scale-110 transition-all duration-500">
                <item.icon className="text-neutral-300 group-hover:text-brand-red w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-500" />
              </div>
              
              <div>
                {/* MICROAJUSTE: text-base no mobile (antes era text-sm) */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2 relative z-10 leading-tight">
                  {item.name}
                </h3>
                {/* MICROAJUSTE: text-xs no mobile (antes era text-[10px]) */}
                <p className="text-neutral-500 text-xs sm:text-sm group-hover:text-neutral-300 transition-colors duration-300 relative z-10 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}