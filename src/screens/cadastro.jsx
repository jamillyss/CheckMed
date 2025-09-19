import { useState } from "react";

const apenasNumeros = (s) => /^\d+$/.test(s);
const ehSequenciaComum = (s) => (
  ["123456","234567","345678","456789","987654","876543","000000","111111"].some(x => s.includes(x))
);

export default function Cadastro(){
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  function validar(){
    if(!email.includes("@")) return "E-mail inválido.";
    if(usuario.trim().length < 3) return "Usuário precisa de 3+ caracteres.";
    if(!apenasNumeros(senha)) return "A senha deve conter apenas números.";
    if(senha.length < 6) return "A senha deve ter 6+ dígitos.";
    if(ehSequenciaComum(senha)) return "Evite sequência óbvia (ex: 123456).";
    return "";
  }

  function aoEnviar(e){
    e.preventDefault();
    const erro = validar();
    if(erro) return setMsg(erro);
    setMsg("Cadastro OK (mock). Depois ligamos na API.");
    setEmail(""); setUsuario(""); setSenha("");
  }

  return (
    <div className="max-w-sm mx-auto mt-6 bg-surface rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-1">Criar conta</h2>
      <p className="text-sm text-muted mb-4">Leva menos de 1 minuto.</p>

      {msg && <div className="text-sm mb-3">{msg}</div>}

      <form onSubmit={aoEnviar} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Usuário</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={usuario} onChange={e=>setUsuario(e.target.value)} placeholder="seu usuário"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Senha (apenas números)</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={senha} onChange={e=>setSenha(e.target.value)} placeholder="ex: 290781"/>
        </div>
        <button className="w-full bg-brand text-white py-2 rounded-xl hover:opacity-90">
          Criar conta
        </button>
      </form>
    </div>
  );
}
