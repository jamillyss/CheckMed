import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const DADOS = [
  { id: "h1", nome: "Hospital Central", cidade: "Anápolis" },
  { id: "h2", nome: "Santa Clara", cidade: "Goiânia" },
  { id: "h3", nome: "Clínica Vida", cidade: "Brasília" },
  { id: "h4", nome: "São Lucas", cidade: "Anápolis" },
];

export default function Hospitais() {
  const [busca, setBusca] = useState("");

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return DADOS;
    return DADOS.filter(
      (h) =>
        h.nome.toLowerCase().includes(q) ||
        h.cidade.toLowerCase().includes(q)
    );
  }, [busca]);

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Hospitais</h2>
        <p className="text-sm text-muted">Escolha onde quer se consultar.</p>
      </div>

      <input
        className="w-full rounded-xl border px-3 py-2 bg-white"
        placeholder="Buscar por nome ou cidade…"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="grid gap-3">
        {lista.map((h) => (
          <div key={h.id} className="bg-surface rounded-2xl shadow p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{h.nome}</div>
              <div className="text-sm text-muted">{h.cidade}</div>
            </div>
            {/* Próximo passo: /medicos/:hospitalId */}
            <Link
              to={`/medicos/${h.id}`}
              className="bg-brand text-white px-3 py-2 rounded-xl hover:opacity-90 text-sm"
            >
              Selecionar
            </Link>
          </div>
        ))}
        {lista.length === 0 && (
          <div className="text-sm text-muted">Nenhum hospital encontrado.</div>
        )}
      </div>
    </div>
  );
}
