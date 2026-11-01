import SummaryCards from "./SummaryCards";
import ExpenseOverview from "./ExpenseOverview";
import MonthlyBudget from "./MonthlyBudget";
import RecentTransactions from "./RecentTransactions";
import CategoryBars from "./CategoryBars";

export default function Dashboard({ totals, items, allItems, chartData, monthly, setMonthly, onViewAll }) {
  return (
    <div className="space-y-6">
      <SummaryCards totals={totals} />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3"><ExpenseOverview items={allItems} /></div>
        <div className="lg:col-span-2"><MonthlyBudget monthly={monthly} setMonthly={setMonthly} spent={totals.expense} /></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentTransactions items={items} onViewAll={onViewAll} />
        <CategoryBars data={chartData} />
      </div>
    </div>
  );
}
