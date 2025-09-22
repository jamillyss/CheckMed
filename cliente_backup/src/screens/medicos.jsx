import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

const DADOS = [
  { id: "m1", nome: "Dra. Ana Lima",   especialidade: "Clínico Geral",  hospitalId: "h1" },
  { id: "m2", nome: "Dr. Paulo Reis",  especialidade: "Dermatologia",    hospitalId: "h1" },
  { id: "m3", nome: "Dra. Carla Neri", especialidade: "Pediatria",       hospitalId: "h2" },
  { id: "m4", nome: "Dr. Hugo Moraes", especialidade: "Ortopedia",       hospitalId: "h2" },
  { id: "m5", nome: "Dra. Keila Dias", especialidade: "Ginecologia",     hospitalId: "h3" },
  { id: "m6", nome: "Dr. Bruno Paz",   especialidade: "Cardiologia",     hospitalId: "h4" },
];

export default function Medicos(){
  const { hospitalId } = useParams();

  const medicos = useMemo(
    () => DADOS.filter(m => m.hospitalId === hospitalId),
    [hospitalId]
  );

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Médicos</h2>
        <p className="text-sm text-muted">Selecione um médico para agendar.</p>
      </div>

      <div className="grid gap-3">
        {medicos.map((m) => (
          <div key={m.id} className="bg-surface rounded-2xl shadow p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{m.nome}</div>
              <div className="text-sm text-muted">{m.especialidade}</div>
            </div>
            {/* próxima tela: /agendar/:medicoId */}
            <Link
              to={`/agendar/${m.id}`}
              className="bg-brand text-white px-3 py-2 rounded-xl hover:opacity-90 text-sm"
            >
              Agendar
            </Link>
          </div>
        ))}

        {medicos.length === 0 && (
          <div className="text-sm text-muted">Nenhum médico encontrado neste hospital.</div>
        )}
      </div>

      <div>
        <Link to="/hospitais" className="text-accent underline text-sm">← Voltar para hospitais</Link>
      </div>
    </div>
  );
}
