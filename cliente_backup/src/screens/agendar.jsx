import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// horários mock (de 08:00 às 17:00, de meia em meia hora)
function gerarHorarios() {
  const h = [];
  for (let hora = 8; hora <= 17; hora++) {
    for (let min of [0, 30]) {
      const hh = String(hora).padStart(2, "0");
      const mm = String(min).padStart(2, "0");
      h.push(`${hh}:${mm}`);
    }
  }
  return h;
}

const HORARIOS = gerarHorarios();

export default function Agendar() {
  const { medicoId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, "0");
    const dd = String(hoje.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [hora, setHora] = useState("");
  const [msg, setMsg] = useState("");

  // mock de nome do médico só para mostrar na tela
  const nomeMedico = useMemo(() => {
    const mapa = {
      m1: "Dra. Ana Lima",
      m2: "Dr. Paulo Reis",
      m3: "Dra. Carla Neri",
      m4: "Dr. Hugo Moraes",
      m5: "Dra. Keila Dias",
      m6: "Dr. Bruno Paz",
    };
    return mapa[medicoId] || "Médico";
  }, [medicoId]);

  function confirmar() {
    setMsg("");
    if (!data) return setMsg("Escolha uma data.");
    if (!hora) return setMsg("Escolha um horário.");

    // MOCK: aqui apenas confirma localmente.
    setMsg(`Agendado com ${nomeMedico} em ${data} às ${hora}.`);
    // depois podemos redirecionar para /fila:
    // navigate("/fila");
  }

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Agendar horário</h2>
        <p className="text-sm text-muted">Selecione data e horário livre.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow p-4">
        <div className="mb-3">
          <div className="text-sm text-muted">Médico</div>
          <div className="font-semibold">{nomeMedico}</div>
        </div>

        <div className="grid gap-3">
          <div>
            <label className="block text-sm mb-1">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="rounded-xl border px-3 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Horário</label>
            <div className="grid grid-cols-3 gap-2">
              {HORARIOS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHora(h)}
                  className={`px-3 py-2 rounded-xl border text-sm ${
                    hora === h ? "bg-brand text-white border-brand" : "bg-white"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {msg && <div className="text-sm mt-2">{msg}</div>}

          <button
            onClick={confirmar}
            className="bg-brand text-white px-4 py-2 rounded-xl hover:opacity-90"
          >
            Confirmar
          </button>
        </div>
      </div>

      <div>
        <Link to={-1} className="text-accent underline text-sm">← Voltar</Link>
      </div>
    </div>
  );
}
