import { Calendar, Moon, Sun } from "lucide-react";

export default function Topbar({ title, subtitle, month, setMonth, dark, setDark, user, onProfile }) {
  const initials = user.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 text-sm shadow-sm">
          <Calendar size={18} className="text-muted" />
          <input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} aria-label="Choose month" className="bg-transparent outline-none" />
        </label>
        <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-card shadow-sm">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={onProfile} aria-label="Open settings" className="grid h-11 w-11 place-items-center rounded-full bg-brand text-sm font-bold text-white">{initials}</button>
      </div>
    </header>
  );
}
