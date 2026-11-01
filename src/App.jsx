import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { thisMonth } from "./utils";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoriesPage from "./components/CategoriesPage";
import MonthlyBudget from "./components/MonthlyBudget";
import BudgetPanel from "./components/BudgetPanel";
import SettingsPage from "./components/SettingsPage";

const TITLES = {
  "add-expense": ["Add Expense", "Record money you spent."],
  "add-income": ["Add Income", "Record money you received."],
  transactions: ["Transactions", "Search, filter and manage every entry."],
  categories: ["Categories", "See where your money goes."],
  budget: ["Budget", "Set limits and stay on track."],
  settings: ["Settings", "Your profile, theme and data."],
};

export default function App() {
  const [items, setItems] = useLocalStorage("naira-ledger:items", []);
  const [budgets, setBudgets] = useLocalStorage("naira-ledger:budgets", {});
  const [monthly, setMonthly] = useLocalStorage("naira-ledger:monthly", 0);
  const [user, setUser] = useLocalStorage("naira-ledger:user", "");
  const [dark, setDark] = useLocalStorage("naira-ledger:dark", false);
  const [month, setMonth] = useState(thisMonth());
  const [page, setPage] = useState("dashboard");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const periodItems = useMemo(() => items.filter((i) => i.date.startsWith(month)), [items, month]);

  const totals = useMemo(() => {
    const sum = (type) => periodItems.filter((i) => i.type === type).reduce((s, i) => s + i.amount, 0);
    const income = sum("income"), expense = sum("expense");
    return { income, expense, balance: income - expense };
  }, [periodItems]);

  const spentByCategory = useMemo(() => {
    const map = {};
    periodItems.filter((i) => i.type === "expense").forEach((i) => (map[i.category] = (map[i.category] || 0) + i.amount));
    return map;
  }, [periodItems]);
  const chartData = useMemo(() => Object.entries(spentByCategory).sort((a, b) => b[1] - a[1]), [spentByCategory]);

  if (!user) return <Login onLogin={setUser} />;

  const navigate = (p) => { setEditing(null); setPage(p); };

  function handleSave(entry) {
    if (editing) setItems(items.map((i) => (i.id === editing.id ? { ...entry, id: editing.id } : i)));
    else setItems([{ ...entry, id: Date.now() }, ...items]);
    setMonth(entry.date.slice(0, 7)); // jump to the month of the saved entry
    navigate("dashboard");
  }

  function handleDelete(id) {
    if (window.confirm("Delete this transaction?")) setItems(items.filter((i) => i.id !== id));
  }

  function handleEdit(item) {
    setEditing(item);
    setPage(item.type === "income" ? "add-income" : "add-expense");
  }

  const [title, subtitle] = TITLES[page] || [`Hello, ${user}! 👋`, "Here's your financial overview"];
  const formType = page === "add-income" ? "income" : "expense";

  return (
    <div className="min-h-screen bg-page text-ink">
      <Sidebar page={page} onNavigate={navigate} onLogout={() => { setUser(""); setPage("dashboard"); }} />
      <main className="p-4 lg:ml-64 lg:p-8">
        <Topbar title={editing ? "Edit Transaction" : title} subtitle={subtitle} month={month} setMonth={setMonth} dark={dark} setDark={setDark} user={user} onProfile={() => navigate("settings")} />
        {page === "dashboard" && (
          <Dashboard totals={totals} items={periodItems} allItems={items} chartData={chartData} monthly={monthly} setMonthly={setMonthly} onViewAll={() => navigate("transactions")} />
        )}
        {(page === "add-expense" || page === "add-income") && (
          <div className="max-w-xl">
            <TransactionForm editing={editing} defaultType={formType} onSave={handleSave} onCancel={() => navigate(editing ? "transactions" : "dashboard")} />
          </div>
        )}
        {page === "transactions" && <TransactionList items={items} onEdit={handleEdit} onDelete={handleDelete} />}
        {page === "categories" && <CategoriesPage items={periodItems} allItems={items} />}
        {page === "budget" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <MonthlyBudget monthly={monthly} setMonthly={setMonthly} spent={totals.expense} />
            <BudgetPanel budgets={budgets} setBudgets={setBudgets} spent={spentByCategory} />
          </div>
        )}
        {page === "settings" && (
          <SettingsPage user={user} setUser={setUser} dark={dark} setDark={setDark}
            data={{ items, budgets, onImport: (i, b) => { setItems(i); setBudgets(b); }, onClear: () => { if (window.confirm("Delete all transactions and budgets? This cannot be undone.")) { setItems([]); setBudgets({}); setMonthly(0); } } }} />
        )}
      </main>
    </div>
  );
}
