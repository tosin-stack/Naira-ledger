import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartColumn } from "lucide-react";
import { meta, monthsAgo, naira, thisMonth } from "../utils";

const TABS = ["This Month", "Last Month", "This Year"];
const RAD = Math.PI / 180;

// Draws the percentage inside each slice
function sliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.6;
  return (
    <text x={cx + r * Math.cos(-midAngle * RAD)} y={cy + r * Math.sin(-midAngle * RAD)} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700}>
      {Math.round(percent * 100)}%
    </text>
  );
}

export default function ExpenseOverview({ items }) {
  const [tab, setTab] = useState(0);
  const data = useMemo(() => {
    const key = [thisMonth(), monthsAgo(1), thisMonth().slice(0, 4)][tab];
    const map = {};
    items.filter((i) => i.type === "expense" && i.date.startsWith(key)).forEach((i) => (map[i.category] = (map[i.category] || 0) + i.amount));
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [items, tab]);

  return (
    <section className="h-full rounded-2xl border border-line bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold"><ChartColumn size={20} className="text-brand" />Expense Overview</h2>
        <div className="flex rounded-full bg-page p-1 text-xs font-medium">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={`rounded-full px-3 py-1.5 ${tab === i ? "bg-brand text-white" : "text-muted"}`}>{t}</button>
          ))}
        </div>
      </div>
      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">No expenses recorded for this period.</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="h-56 w-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={105} stroke="none" labelLine={false} label={sliceLabel}>
                  {data.map((d) => <Cell key={d.name} fill={meta(d.name).color} />)}
                </Pie>
                <Tooltip formatter={(v) => naira(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="min-w-52 space-y-3 text-sm">
            {data.map((d) => (
              <li key={d.name} className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: meta(d.name).color }} />
                <span className="flex-1">{d.name}</span>
                <span className="font-medium">{naira(d.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
