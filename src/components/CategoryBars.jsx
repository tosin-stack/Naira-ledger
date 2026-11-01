import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Tag } from "lucide-react";
import { meta, naira } from "../utils";

export default function CategoryBars({ data }) {
  const rows = data.map(([name, value]) => ({ name, value }));
  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><Tag size={20} className="text-brand" />Expense Categories</h2>
      {rows.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">Add an expense to see your categories.</p>
      ) : (
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 22 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9ca3c7" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3c7" }} axisLine={false} tickLine={false} width={44} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
              <Tooltip formatter={(v) => naira(v)} cursor={{ fill: "#9ca3c722" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={70}>
                <LabelList dataKey="value" position="top" formatter={(v) => naira(v)} style={{ fontSize: 11, fill: "#9ca3c7" }} />
                {rows.map((r) => <Cell key={r.name} fill={meta(r.name).color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
