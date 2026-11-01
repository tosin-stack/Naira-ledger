import { CircleMinus, CirclePlus, House, LayoutGrid, List, LogOut, Settings, Target, TrendingUp, Wallet } from "lucide-react";

const NAV = [
  ["dashboard", "Dashboard", House],
  ["add-expense", "Add Expense", CircleMinus],
  ["add-income", "Add Income", CirclePlus],
  ["transactions", "Transactions", List],
  ["categories", "Categories", LayoutGrid],
  ["budget", "Budget", Target],
  ["settings", "Settings", Settings],
];

export default function Sidebar({ page, onNavigate, onLogout }) {
  const item = "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";
  return (
    <aside className="relative overflow-hidden bg-side text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-64">
      <div className="relative z-10 flex flex-col gap-4 p-4 lg:h-full lg:gap-6 lg:p-5 lg:pb-20">
        <div className="flex items-center gap-3 px-1">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand"><Wallet size={22} /></div>
          <p className="text-lg font-bold leading-tight">Naira<br />Ledger</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Main">
          {NAV.map(([id, label, Icon]) => (
            <button key={id} onClick={() => onNavigate(id)} aria-current={page === id ? "page" : undefined}
              className={`${item} ${page === id ? "bg-brand text-white" : "text-white/75 hover:bg-white/10"}`}>
              <Icon size={20} />{label}
            </button>
          ))}
          <button onClick={onLogout} className={`${item} text-white/75 hover:bg-white/10`}><LogOut size={20} />Logout</button>
        </nav>
        <div className="mt-auto hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center lg:block">
          <TrendingUp className="mx-auto mb-2 text-green-400" size={28} />
          <p className="font-semibold leading-snug">Track Smart.<br />Spend Better!</p>
        </div>
      </div>
      <svg className="pointer-events-none absolute bottom-0 left-0 hidden w-full lg:block" viewBox="0 0 256 70" aria-hidden="true">
        <path d="M0 40C50 5 110 60 256 8V70H0Z" fill="#4f46e5" opacity=".55" />
      </svg>
    </aside>
  );
}
