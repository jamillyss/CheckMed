import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// mock: começa com 5 pessoas e vai diminuindo a cada 5s
export default function Fila() {
  const [faltam, setFaltam] = useState(5);
  const [estimativaMin, setEstimativaMin] = useState(25); // 5 pessoas x 5min

  useEffect(() => {
    const t = setInterval(() => {
      setFaltam((n) => {
        const prox = Math.max(0, n - 1);
        setEstimativaMin(prox * 5);
        return prox;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const status =
    faltam === 0 ? "Você é o próximo(a)!" :
    `Faltam ${faltam} ${faltam === 1 ? "pessoa" : "pessoas"}`;

  return (
    <div className="max-w-sm mx-auto mt-8 bg-surface rounded-2xl shadow p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Sua posição na fila</h2>
      <p className="text-sm text-muted mb-6">
        Atualização automática a cada 5 segundos.
      </p>

      <div className="mb-6">
        <div className="text-3xl font-bold mb-1">{status}</div>
        <div className="text-sm text-muted">
          Estimativa: ~{estimativaMin} min
        </div>
      </div>

      <div className="w-full bg-white rounded-xl border overflow-hidden mb-6">
        {/* barra de “progresso ao contrário”: quanto menos falta, mais cheia */}
        <div
          className="h-3 bg-brand transition-all"
          style={{ width: `${((5 - faltam) / 5) * 100}%` }}
        />
      </div>

      <div className="space-y-2">
        <Link to="/hospitais" className="block text-accent underline text-sm">
          ← Voltar para hospitais
        </Link>
        <button
          className="w-full bg-brand text-white py-2 rounded-xl hover:opacity-90"
          onClick={() => { setFaltam(5); setEstimativaMin(25); }}
        >
          Atualizar / Reiniciar mock
        </button>
      </div>
    </div>
  );
}
