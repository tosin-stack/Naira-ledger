# Naira Ledger

An expense tracker built with React, Tailwind CSS v4 and Recharts.

## Run on your laptop
1. Install Node.js (version 18 or newer) from https://nodejs.org
2. Open this folder in VS Code, then open the terminal (Ctrl + `)
3. Run: `npm install`
4. Run: `npm run dev`
5. Open the link shown in the terminal (usually http://localhost:5173)

## Build for deployment
`npm run build` creates a `dist` folder you can host on Vercel or Netlify.

## Features
Add/edit/delete transactions, search and filters, month selector, monthly budgets,
pie and bar charts, 6-month trend chart, sidebar navigation with 7 pages, login screen, dark mode, CSV export, JSON backup/restore.
Data is saved in the browser (localStorage).

## Folder guide
- `src/App.jsx`: main state and layout
- `src/components/`: SummaryCards, TransactionForm, TransactionList, CategoryChart, TrendChart, BudgetPanel, DataTools
- `src/hooks/useLocalStorage.js`: saves state in the browser
- `src/utils.js`: categories, ₦ formatting, date helpers
- `DEFENSE-QUESTIONS.md`: practice questions and answers for your defense
