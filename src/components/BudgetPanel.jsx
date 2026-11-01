import { useState } from "react";
import { EXPENSE_CATS, field, naira } from "../utils";

export default function BudgetPanel({ budgets, setBudgets, spent }) {
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  function addBudget(e) {
    e.preventDefault();
    const value = Number(limit);
    if (!value || value <= 0) return;
    setBudgets({ ...budgets, [category]: value });
    setLimit("");
  }

  function removeBudget(cat) {
    const { [cat]: _removed, ...rest } = budgets;
    setBudgets(rest);
  }

  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <h2 className="mb-3 font-semibold">Monthly budgets</h2>
      <form onSubmit={addBudget} className="mb-4 flex gap-2">
        <select className={field} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Budget category">
          {EXPENSE_CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input className={field} type="number" min="0" placeholder="Limit (₦)" value={limit} onChange={(e) => setLimit(e.target.value)} aria-label="Budget limit" />
        <button className="rounded-md bg-brand px-3 text-sm font-semibold text-white">Set</button>
      </form>
      {Object.keys(budgets).length === 0 ? (
        <p className="text-sm text-muted">Set a limit for a category to get warned before you overspend.</p>
      ) : (
        <ul className="space-y-3">
          {Object.entries(budgets).map(([cat, max]) => {
            const used = spent[cat] || 0;
            const pct = Math.min((used / max) * 100, 100);
            const over = used > max;
            return (
              <li key={cat}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{cat}</span>
                  <span className={over ? "font-medium text-red-600" : ""}>
                    {naira(used)} of {naira(max)}
                  </span>
                </div>
                <div className="h-2 rounded bg-page">
                  <div className={`h-2 rounded ${over ? "bg-red-600" : pct > 80 ? "bg-amber-500" : "bg-emerald-700"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span className={over ? "text-red-600" : "text-muted"}>{over ? `Over by ${naira(used - max)}` : `${naira(max - used)} left`}</span>
                  <button onClick={() => removeBudget(cat)} className="text-muted underline">Remove</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
