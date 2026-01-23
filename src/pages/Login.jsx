import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Header } from '../components/Header';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleLogin(e) {
    e.preventDefault();
    
    // Tenta fazer login no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Erro: ' + error.message);
    } else {
      // Se deu certo, o Supabase guarda um "crachá" no navegador
      // E a gente manda o usuário pra área VIP
      navigate('/admin');
    }
  }

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Área Restrita 🔒</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black text-white p-3 rounded border border-neutral-700 mt-1"
                required
              />
            </div>
            
            <div>
              <label className="text-gray-400 text-sm">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black text-white p-3 rounded border border-neutral-700 mt-1"
                required
              />
            </div>

            <button className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 rounded transition-colors">
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}