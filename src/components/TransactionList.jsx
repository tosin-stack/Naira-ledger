import { useMemo, useState } from "react";
import { CATEGORIES, field, naira } from "../utils";

export default function TransactionList({ items, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");

  const visible = useMemo(
    () =>
      items
        .filter((i) => type === "all" || i.type === type)
        .filter((i) => category === "all" || i.category === category)
        .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [items, search, type, category]
  );

  function exportCSV() {
    const rows = [["Date", "Title", "Type", "Category", "Amount"], ...visible.map((i) => [i.date, `"${i.title}"`, i.type, i.category, i.amount])];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.csv";
    a.click();
  }

  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="mr-auto font-semibold">Transactions</h2>
        <button onClick={exportCSV} disabled={!visible.length} className="rounded-md bg-slate-600 px-3 py-1.5 text-sm text-white disabled:opacity-40">
          Export CSV
        </button>
      </div>
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <input className={field} placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
        <select className={field} value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
        <select className={field} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">
          {items.length === 0 ? "No transactions for this period. Add one using the form." : "No transactions match your filters."}
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {visible.map((i) => (
            <li key={i.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{i.title}</p>
                <p className="text-xs text-muted">
                  {i.category}, {new Date(i.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <p className={`font-semibold ${i.type === "income" ? "text-emerald-700" : "text-red-600"}`}>
                {i.type === "income" ? "+" : "-"}{naira(i.amount)}
              </p>
              <button onClick={() => onEdit(i)} className="text-sm text-muted underline">Edit</button>
              <button onClick={() => onDelete(i.id)} className="text-sm text-red-600 underline">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
