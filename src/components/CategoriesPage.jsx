import { EXPENSE_CATS, meta, naira } from "../utils";
import TrendChart from "./TrendChart";

export default function CategoriesPage({ items, allItems }) {
  const spent = {}, count = {};
  items.filter((i) => i.type === "expense").forEach((i) => {
    spent[i.category] = (spent[i.category] || 0) + i.amount;
    count[i.category] = (count[i.category] || 0) + 1;
  });
  const total = Object.values(spent).reduce((a, b) => a + b, 0);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {EXPENSE_CATS.map((c) => {
          const { Icon, color } = meta(c);
          const share = total ? ((spent[c] || 0) / total) * 100 : 0;
          return (
            <div key={c} className="rounded-2xl border border-line bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: color + "22", color }}><Icon size={20} /></span>
                <div className="flex-1">
                  <p className="font-semibold">{c}</p>
                  <p className="text-xs text-muted">{count[c] || 0} transactions</p>
                </div>
                <p className="font-bold">{naira(spent[c] || 0)}</p>
              </div>
              <div className="h-2 rounded-full bg-page"><div className="h-2 rounded-full" style={{ width: `${share}%`, background: color }} /></div>
              <p className="mt-1 text-xs text-muted">{Math.round(share)}% of this month's spending</p>
            </div>
          );
        })}
      </div>
      <TrendChart items={allItems} />
    </div>
  );
}
