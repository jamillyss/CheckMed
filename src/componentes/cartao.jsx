import { Link } from "react-router-dom";
export default function Card({ to="#", title, desc, icon="🏥" }){
  return (
    <Link to={to} className="block bg-surface rounded-2xl shadow p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-lg">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted">{desc}</p>
        </div>
      </div>
    </Link>
  );
}
