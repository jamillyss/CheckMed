import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setMensagem("");

    if (!usuario.trim() || !senha.trim()) {
      return setMensagem("Preencha usuário e senha.");
    }

    // MOCK por enquanto. Depois ligamos na API.
    setCarregando(true);
    setTimeout(() => {
      const ok = usuario.length >= 3 && senha.length >= 4;
      setMensagem(ok ? "Login ok (mock)." : "Usuário ou senha inválidos.");
      setCarregando(false);
    }, 500);
  }

  return (
    <div className="max-w-sm mx-auto mt-10 bg-surface rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-1">Entrar</h2>
      <p className="text-sm text-muted mb-4">Use seu usuário e senha.</p>

      {mensagem && <div className="text-sm mb-3">{mensagem}</div>}

      <form onSubmit={aoEnviar} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Usuário</label>
          <input
            className="w-full rounded-xl border px-3 py-2 bg-white"
            placeholder="seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Senha</label>
          <input
            type="password"
            className="w-full rounded-xl border px-3 py-2 bg-white"
            placeholder="••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button
          disabled={carregando}
          className="w-full bg-brand text-white py-2 rounded-xl hover:opacity-90 disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
