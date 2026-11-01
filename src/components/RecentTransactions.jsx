import { ArrowRight, FileText } from "lucide-react";
import { meta, naira } from "../utils";

export default function RecentTransactions({ items, onViewAll }) {
  const recent = [...items].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 5);
  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold"><FileText size={20} className="text-brand" />Recent Transactions</h2>
        <button onClick={onViewAll} className="flex items-center gap-1 text-sm font-medium text-brand">View All <ArrowRight size={16} /></button>
      </div>
      {recent.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">No transactions this month yet.</p>
      ) : (
        <ul className="divide-y divide-line">
          {recent.map((i) => {
            const { Icon, color } = meta(i.category);
            return (
              <li key={i.id} className="flex items-center gap-4 py-3">
                <Icon size={20} style={{ color }} />
                <span className="flex-1 truncate font-medium">{i.title}</span>
                <span className="text-sm text-muted">{new Date(i.date + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className={`w-28 text-right font-semibold ${i.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                  {i.type === "income" ? "+" : "-"}{naira(i.amount)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
