import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Mail, Key, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message === 'Invalid login credentials' 
        ? 'Acesso negado: Credenciais inválidas.' 
        : `Erro: ${error.message}`, 
      {
        style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
      setLoading(false);
    } else {
      toast.success('Bem-vindo ao centro de comando.', {
        style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
      navigate('/admin');
    }
  }

  // --- ANIMAÇÕES (Framer Motion) ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#050505] min-h-screen flex font-sans selection:bg-brand-red/20 overflow-hidden">
      
      {/* LADO ESQUERDO: Branding Cinematográfico (NYC Vibe) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden border-r border-white/5 bg-[#050505]">
        
        {/* 1. Imagem de Fundo (A mesma de 'Sobre Nós') */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')" }} 
        />
        
        {/* 2. Máscaras de Gradiente (Para escurecer e focar no texto, mantendo o calor) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
        
        {/* 3. O "Glow" da Marca (Sutil toque quente na base) */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-brand-red/20 to-transparent z-10 pointer-events-none mix-blend-soft-light" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          className="relative z-20 p-12 max-w-lg w-full"
        >
          {/* Ícone e Texto de Marca */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-xl">
               <ShieldCheck className="text-white" size={20} />
            </div>
            <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">
              TM NYC Export
            </span>
          </div>
          
          <h1 className="text-5xl font-black text-white tracking-tighter leading-[1.05] mb-6">
            Centro de <br /> Operações Global.
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed font-light">
            Portal administrativo para controlo de logística internacional, gestão de catálogo e monitorização de encomendas em tempo real.
          </p>
        </motion.div>
      </div>

      {/* LADO DIREITO: Formulário Minimalista */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative bg-[#050505]">
        
        {/* Brilho de fundo sutil (Mais quente agora) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm relative z-10"
        >
          
          <motion.div variants={fadeUp} className="text-center lg:text-left mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#111] border border-white/5 mb-6 lg:hidden">
              <ShieldCheck className="text-white" size={24} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Bem-vindo de volta</h2>
            <p className="text-neutral-500 text-sm font-light">Insira as suas credenciais de acesso.</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* E-mail */}
            <motion.div variants={fadeUp} className="space-y-2">
              <label className="text-neutral-400 text-xs font-medium ml-1">
                E-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-neutral-600 group-focus-within:text-white transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@tmnyc.com"
                  className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-white/30 focus:bg-[#111] focus:outline-none transition-all placeholder:text-neutral-700 text-sm font-light"
                  required
                />
              </div>
            </motion.div>

            {/* Senha */}
            <motion.div variants={fadeUp} className="space-y-2">
              <label className="text-neutral-400 text-xs font-medium ml-1">
                Palavra-passe
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Key size={18} className="text-neutral-600 group-focus-within:text-white transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-white/30 focus:bg-[#111] focus:outline-none transition-all placeholder:text-neutral-700 text-sm font-light"
                  required
                />
              </div>
            </motion.div>

            {/* Botão Entrar (Branco Sólido - Padrão Alto Contraste) */}
            <motion.div variants={fadeUp} className="pt-4">
              <button 
                disabled={loading}
                className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span className="text-sm">A autenticar...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Aceder ao Painel</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </motion.div>

          </form>

          <motion.div variants={fadeUp}>
            <p className="text-center mt-10 text-neutral-600 text-xs font-light">
              &copy; 2026 TM NYC Export. Acesso restrito a pessoal autorizado.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}