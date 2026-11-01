import { Briefcase, Car, Clapperboard, Gift, GraduationCap, HeartPulse, House, ShoppingCart, Smartphone, Tag, Utensils, Wallet } from "lucide-react";

export const EXPENSE_CATS = ["Food", "Transport", "Shopping", "Entertainment", "Data & Airtime", "School", "Rent", "Health", "Other"];
export const INCOME_CATS = ["Salary", "Allowance", "Business", "Gift", "Other"];
export const CATEGORIES = [...new Set([...EXPENSE_CATS, ...INCOME_CATS])];

// Colour and icon for each category
const CAT = {
  Food: { color: "#3b82f6", Icon: Utensils },
  Transport: { color: "#f97316", Icon: Car },
  Shopping: { color: "#22c55e", Icon: ShoppingCart },
  Entertainment: { color: "#8b5cf6", Icon: Clapperboard },
  "Data & Airtime": { color: "#06b6d4", Icon: Smartphone },
  School: { color: "#eab308", Icon: GraduationCap },
  Rent: { color: "#ec4899", Icon: House },
  Health: { color: "#ef4444", Icon: HeartPulse },
  Other: { color: "#64748b", Icon: Tag },
  Salary: { color: "#16a34a", Icon: Wallet },
  Allowance: { color: "#16a34a", Icon: Wallet },
  Business: { color: "#0d9488", Icon: Briefcase },
  Gift: { color: "#db2777", Icon: Gift },
};
export const meta = (category) => CAT[category] || CAT.Other;

export const naira = (n) => "₦" + Number(n).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const pad = (n) => String(n).padStart(2, "0");
export const monthKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
export const today = () => {
  const d = new Date();
  return `${monthKey(d)}-${pad(d.getDate())}`;
};
export const thisMonth = () => monthKey(new Date());
export const monthsAgo = (n) => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - n);
  return monthKey(d);
};

export const field =
  "w-full rounded-xl border border-line bg-card px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";
