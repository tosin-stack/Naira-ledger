import { Database, ShoppingCart, Wallet } from "lucide-react";
import { naira } from "../utils";

export default function SummaryCards({ totals }) {
  const cards = [
    ["Total Income", totals.income, Wallet, "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"],
    ["Total Expenses", totals.expense, ShoppingCart, "border-red-500/20 bg-red-500/10 text-red-600"],
    ["Current Balance", totals.balance, Database, totals.balance < 0 ? "border-red-500/20 bg-red-500/10 text-red-600" : "border-blue-500/20 bg-blue-500/10 text-blue-600"],
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(([label, value, Icon, tone]) => (
        <div key={label} className={`flex items-center gap-4 rounded-2xl border p-5 ${tone}`}>
          <Icon size={44} strokeWidth={1.75} />
          <div>
            <p className="text-sm font-medium text-ink">{label}</p>
            <p className="text-3xl font-bold">{naira(value)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
