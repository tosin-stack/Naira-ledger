import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { naira } from "../utils";

export default function TrendChart({ items }) {
  // Build the last 6 months, then total income and expenses for each
  const data = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.push({ key, label: d.toLocaleDateString("en-NG", { month: "short" }), Income: 0, Expenses: 0 });
    }
    items.forEach((t) => {
      const m = months.find((x) => t.date.startsWith(x.key));
      if (m) m[t.type === "income" ? "Income" : "Expenses"] += t.amount;
    });
    return months;
  }, [items]);

  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <h2 className="mb-3 font-semibold">Last 6 months</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b855" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
            <Tooltip formatter={(v) => naira(v)} cursor={{ fill: "#94a3b822" }} />
            <Legend />
            <Bar dataKey="Income" fill="#047857" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Expenses" fill="#dc2626" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
