import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Header } from '../components/Header';
import { Lock, Mail, Key, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(255,0,0,0.2)',
        }
      });
      setLoading(false);
    } else {
      toast.success('Bem-vindo ao centro de comando!', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(0,255,0,0.2)',
        }
      });
      navigate('/admin');
    }
  }

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col font-sans selection:bg-brand-red/30">
      <Header />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Lado Esquerdo: Branding (Escondido no mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#080808] relative items-center justify-center overflow-hidden border-r border-white/5">
          {/* Círculos de brilho sutil ao fundo */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-red/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 p-12 max-w-lg">
            <span className="text-brand-red text-xs font-black tracking-[0.3em] uppercase mb-4 block">
              TM NYC Management
            </span>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-6">
              ACESSO AO <br /> SISTEMA.
            </h1>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Área restrita para gestão de estoque, ordens de importação e monitoramento logístico internacional.
            </p>
          </div>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
          {/* Brilho de fundo para mobile */}
          <div className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-red/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="w-full max-w-md relative z-10">
            
            <div className="text-center lg:text-left mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 lg:hidden">
                <Lock className="text-brand-red" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Login Administrativo</h2>
              <p className="text-neutral-500 text-sm">Insira suas credenciais para continuar.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-neutral-400 text-xs font-bold uppercase tracking-widest ml-1">
                  E-mail Institucional
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-neutral-600 group-focus-within:text-brand-red transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="exemplo@tmnyc.com"
                    className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-4 rounded-xl border border-white/5 focus:border-brand-red/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-neutral-800 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase tracking-widest">
                    Chave de Acesso
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Key size={18} className="text-neutral-600 group-focus-within:text-brand-red transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0a0a] text-white pl-12 pr-4 py-4 rounded-xl border border-white/5 focus:border-brand-red/50 focus:bg-white/5 focus:outline-none transition-all placeholder:text-neutral-800 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Botão Entrar */}
              <button 
                disabled={loading}
                className="w-full bg-brand-red hover:bg-red-700 disabled:bg-neutral-800 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-8 shadow-lg shadow-brand-red/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>AUTENTICANDO...</span>
                  </>
                ) : (
                  <>
                    <span>ENTRAR NO SISTEMA</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>

            {/* Footer do Login */}
            <p className="text-center mt-10 text-neutral-600 text-xs">
              &copy; 2026 TM NYC Export. Acesso monitorado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}