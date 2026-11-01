import { useState } from "react";
import { CircleCheck, TriangleAlert, Target } from "lucide-react";
import { field, naira } from "../utils";

export default function MonthlyBudget({ monthly, setMonthly, spent }) {
  const [input, setInput] = useState(monthly ? String(monthly) : "");
  const pct = monthly ? Math.round((spent / monthly) * 100) : 0;
  const state = !monthly ? "none" : pct > 100 ? "over" : pct >= 80 ? "close" : "ok";
  const bar = { over: "bg-red-500", close: "bg-amber-500", ok: "bg-green-500", none: "bg-green-500" }[state];

  function submit(e) {
    e.preventDefault();
    const value = Number(input);
    if (value > 0) setMonthly(value);
  }

  return (
    <section className="h-full rounded-2xl border border-line bg-card p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><Target size={20} className="text-brand" />Monthly Budget</h2>
      <p className="mb-2 text-sm">Set Your Monthly Budget</p>
      <form onSubmit={submit} className="mb-5 flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">₦</span>
          <input className={`${field} pl-7`} type="number" min="0" value={input} onChange={(e) => setInput(e.target.value)} aria-label="Monthly budget" />
        </div>
        <button className="rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark">Set Budget</button>
      </form>
      <p className="mb-2 font-bold">Spent: {naira(spent)} / {naira(monthly)}</p>
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 rounded-full bg-page"><div className={`h-3 rounded-full ${bar}`} style={{ width: `${Math.min(pct, 100)}%` }} /></div>
        <span className="text-sm font-semibold">{pct}%</span>
      </div>
      <div className={`mt-4 flex items-center gap-2 rounded-xl p-3 text-sm ${state === "over" ? "bg-red-500/10 text-red-600" : state === "close" ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}>
        {state === "over" || state === "close" ? <TriangleAlert size={18} /> : <CircleCheck size={18} />}
        {state === "none" && "Set a budget to start tracking your spending."}
        {state === "ok" && "Great! You're on track this month!"}
        {state === "close" && "Careful, you're close to your limit."}
        {state === "over" && `You're over budget by ${naira(spent - monthly)}.`}
      </div>
    </section>
  );
}
