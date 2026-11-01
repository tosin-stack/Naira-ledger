import { useEffect, useState } from "react";
import { EXPENSE_CATS, INCOME_CATS, field, today } from "../utils";

const catsFor = (type) => (type === "income" ? INCOME_CATS : EXPENSE_CATS);

const empty = (type = "expense") => ({ title: "", amount: "", type, category: catsFor(type)[0], date: today() });

export default function TransactionForm({ editing, onSave, onCancel, defaultType = "expense" }) {
  const [form, setForm] = useState(() => empty(defaultType));
  const [error, setError] = useState("");

  // When the user clicks Edit, fill the form with that transaction
  useEffect(() => {
    setForm(editing ? { ...editing, amount: String(editing.amount) } : empty(defaultType));
    setError("");
  }, [editing, defaultType]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.title.trim()) return setError("Enter a title, for example “Lunch at the cafeteria”.");
    if (!amount || amount <= 0) return setError("Enter an amount greater than zero.");
    if (!form.date) return setError("Pick a date.");
    onSave({ ...form, title: form.title.trim(), amount });
    if (!editing) setForm(empty(defaultType));
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3 rounded-2xl border border-line bg-card p-5 shadow-sm">
      <h2 className="font-semibold">{editing ? "Edit transaction" : "Add a transaction"}</h2>
      <div className="grid grid-cols-2 gap-2">
        {["expense", "income"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setForm({ ...form, type: t, category: catsFor(t)[0] })}
            className={`rounded-md py-2 text-sm font-medium capitalize ${
              form.type === t ? (t === "expense" ? "bg-red-600 text-white" : "bg-emerald-700 text-white") : "bg-page text-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <input className={field} placeholder="Title" value={form.title} onChange={update("title")} aria-label="Title" />
      <input className={field} type="number" min="0" placeholder="Amount (₦)" value={form.amount} onChange={update("amount")} aria-label="Amount" />
      <select className={field} value={form.category} onChange={update("category")} aria-label="Category">
        {catsFor(form.type).map((c) => <option key={c}>{c}</option>)}
      </select>
      <input className={field} type="date" value={form.date} onChange={update("date")} aria-label="Date" />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <div className="flex gap-2">
        <button className="flex-1 rounded-md bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          {editing ? "Save changes" : "Add transaction"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="rounded-md bg-line px-4 text-sm font-medium">Cancel</button>
        )}
      </div>
    </form>
  );
}
