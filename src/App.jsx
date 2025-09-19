import { Link } from "react-router-dom"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
      <h1 className="text-2xl font-bold mb-6">MedCheck</h1>

      <div className="space-y-3 w-64">
        <Link to="/cadastro" className="block text-center bg-brand text-white py-2 rounded-xl hover:opacity-90">
          Criar Conta
        </Link>
        <Link to="/login" className="block text-center bg-accent text-white py-2 rounded-xl hover:opacity-90">
          Entrar
        </Link>
        <Link to="/hospitais" className="block text-center border py-2 rounded-xl hover:bg-white">
          Ver Hospitais
        </Link>
        <Link to="/fila" className="block text-center border py-2 rounded-xl hover:bg-white">
          Ver minha fila (mock)
        </Link>
      </div>
    </div>
  )
}
