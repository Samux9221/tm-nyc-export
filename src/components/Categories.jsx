import { useNavigate } from 'react-router-dom';
import { Smartphone, Laptop, Watch, Package } from 'lucide-react';

export function Categories() {
  const navigate = useNavigate();

  // Função para lidar com o clique
  const handleCategoryClick = (categoryFilter) => {
    // Se for "encomendas", mandamos pro WhatsApp
    if (categoryFilter === 'custom') {
      window.open('https://wa.me/5511999999999?text=Quero encomendar algo', '_blank');
      return;
    }

    // === A CORREÇÃO ESTÁ AQUI EMBAIXO ===
    // Mudamos de '/catalog' para '/catalogo' para bater com o App.jsx
    navigate(`/catalogo?category=${categoryFilter}`);
    
    window.scrollTo(0, 0); // Sobe a tela pro topo
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
      desc: "Linha M1, M2 e M3", 
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
    <section className="bg-brand-dark py-20 border-t border-neutral-900">
      <div className="container mx-auto px-4">
        
        {/* Título da Seção */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">O que importamos</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trabalhamos com produtos originais, lacrados e com garantia. 
            Selecione uma categoria para saber mais.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {categories.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleCategoryClick(item.filter)}
              className="group bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-brand-red/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* O ícone muda de cor */}
              <div className="bg-brand-gray w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors duration-300">
                <item.icon className="text-white w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}