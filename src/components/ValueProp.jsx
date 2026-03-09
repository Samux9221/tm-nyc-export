import { ShieldCheck, Calculator, Plane } from 'lucide-react';

export function ValueProp() {
  return (
    // Fundo levemente mais claro que o Hero (#0a0a0a) para criar uma divisão visual suave
    <section className="py-16 lg:py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      
      {/* Efeitos de iluminação premium da marca */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Lado Esquerdo: Texto de Impacto */}
        <div className="flex-1 text-center lg:text-left">
          <span className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Descomplicado e Acessível
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Importação premium <br className="hidden lg:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">
              que cabe no seu bolso.
            </span>
          </h2>
          <p className="text-neutral-400 text-base font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
            Esqueça as taxas surpresas e a dor de cabeça com a alfândega. Nós simplificamos o acesso ao mercado americano para você focar apenas em escolher o seu próximo desejo.
          </p>
        </div>

        {/* Lado Direito: Cards de Benefícios (Efeito de Vidro) */}
        <div className="flex-1 w-full grid gap-4">
           
           {/* Benefício 1 */}
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 lg:p-6 rounded-[24px] flex items-center gap-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                <Calculator className="text-brand-red w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base lg:text-lg tracking-tight">Cotação com Preço Final</h4>
                <p className="text-neutral-400 text-sm font-light mt-1">Impostos, taxas e frete já inclusos. O valor que você vê é o que você paga.</p>
              </div>
           </div>
           
           {/* Benefício 2 */}
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 lg:p-6 rounded-[24px] flex items-center gap-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                <Plane className="text-brand-red w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base lg:text-lg tracking-tight">Logística VIP</h4>
                <p className="text-neutral-400 text-sm font-light mt-1">Cuidamos do desembaraço aduaneiro. Da loja nos EUA direto para sua porta.</p>
              </div>
           </div>

           {/* Benefício 3 */}
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 lg:p-6 rounded-[24px] flex items-center gap-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-brand-red w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base lg:text-lg tracking-tight">Garantia Global Original</h4>
                <p className="text-neutral-400 text-sm font-light mt-1">Produtos lacrados com Invoice oficial e garantia válida nas autorizadas no Brasil.</p>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
}