import { useState } from "react";
import api from "../services/api";
import { apenasNumeros, ehSequenciaComum } from "../helpers/senha";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [carregando, setCarregando] = useState(false);

  function validar() {
    if (!email.includes("@")) return "E-mail inválido.";
    if (usuario.trim().length < 3) return "Usuário precisa de 3+ caracteres.";
    if (!apenasNumeros(senha)) return "A senha deve conter apenas números.";
    if (senha.length < 6) return "A senha deve ter pelo menos 6 dígitos.";
    if (ehSequenciaComum(senha)) return "Evite sequência óbvia (ex: 123456).";
    return "";
  }

  async function aoEnviar(e) {
    e.preventDefault();
    setErro(""); setOk("");
    const msg = validar();
    if (msg) return setErro(msg);

    try {
      setCarregando(true);
      await api.post("/auth/signup", {
        email, username: usuario, password: senha, role: "patient",
      });
      setOk("Conta criada. Você já pode entrar.");
      setEmail(""); setUsuario(""); setSenha("");
    } catch (err) {
      setErro(err?.response?.data?.error || "Erro ao cadastrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-6 bg-surface rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-1">Criar conta</h2>
      <p className="text-sm text-muted mb-4">Leva menos de 1 minuto.</p>

      {erro && <div className="text-sm text-danger mb-3">{erro}</div>}
      {ok && <div className="text-sm text-accent mb-3">{ok}</div>}

      <form onSubmit={aoEnviar} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com" />
        </div>

        <div>
          <label className="block text-sm mb-1">Usuário</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={usuario} onChange={e=>setUsuario(e.target.value)} placeholder="seu usuário" />
        </div>

        <div>
          <label className="block text-sm mb-1">Senha (apenas números)</label>
          <input className="w-full rounded-xl border px-3 py-2 bg-white"
                 value={senha} onChange={e=>setSenha(e.target.value)} placeholder="ex: 290781" />
        </div>

        <button disabled={carregando}
                className="w-full bg-brand text-white py-2 rounded-xl hover:opacity-90 disabled:opacity-60">
          {carregando ? "Enviando..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
