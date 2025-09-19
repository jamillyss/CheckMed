import { useState } from "react";
import api from "../services/api";

export default function Login(){
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e){
    e.preventDefault();
    setErro("");
    if(!usuario.trim() || !senha.trim()){
      return setErro("Preencha usuário e senha.");
    }
    try{
      setCarregando(true);
      const { data } = await api.post("/auth/login", {
        username: usuario, password: senha
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      // redirecionar depois que tiver rota de hospitais
      // por enquanto só feedback:
      setErro("Login ok.");
    }catch(err){
      setErro(err?.response?.data?.error || "Usuário ou senha inválidos.");
    }finally{
      setCarregando(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-6 bg-surface rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-1">Entrar</h2>
      <p className="text-sm text-muted mb-4">Use seu usuário e senha.</p>

      {erro && <div className="text-sm mb-3">{erro}</div>}

      <form onSubmit={aoEnviar} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Usuário</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={usuario} onChange={e=>setUsuario(e.target.value)} placeholder="seu usuário" />
        </div>
        <div>
          <label className="block text-sm mb-1">Senha</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white" type="password"
                 value={senha} onChange={e=>setSenha(e.target.value)} placeholder="••••" />
        </div>
        <button disabled={carregando}
                className="w-full bg-brand text-white py-2 rounded-xl hover:opacity-90 disabled:opacity-60">
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
