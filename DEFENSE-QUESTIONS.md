# Defense Q&A: Naira Ledger (React + Tailwind)

## About the project
**1. What problem does your app solve?**
Many students and young workers do not know where their money goes. The app lets them record income and expenses, see spending by category, and set monthly budgets.

**2. Why React and Tailwind CSS?**
React splits the UI into reusable components and updates only what changed. Tailwind lets me style directly in JSX without writing separate CSS files, which kept the design consistent and fast to build.

**3. What did you learn at SIWES that you used here?**
Component-based structure, state management with hooks, form handling, responsive layouts, and using Git/npm in a real workflow. (Add your own specific SIWES experience here.)

## Code and concepts
**4. Explain your component structure.**
`App` holds the main state and passes data and functions down as props to `SummaryCards`, `TransactionForm`, `TransactionList`, `CategoryChart` and `BudgetPanel`. Each component has one job.

**5. Where do you use state, and why?**
`items` and `budgets` (saved data), `month` (selected period), `editing` (which transaction is being edited), plus local state inside the form and list for inputs and filters. State is placed in the lowest component that needs it.

**6. What is `useEffect` doing in your app?**
In `useLocalStorage` it saves data whenever it changes. In `TransactionForm` it fills the form when you click Edit.

**7. Why `useMemo`?**
Totals, the category breakdown and the filtered list are calculated from `items`. `useMemo` recalculates them only when their inputs change, not on every render.

**8. How do you add, edit and delete without a database?**
Each transaction is an object with a unique `id`. Add puts a new object at the start of the array. Edit maps over the array and replaces the matching `id`. Delete uses `filter` to drop it. React re-renders because I create a new array instead of mutating the old one.

**9. How is data kept after refresh?**
A custom hook, `useLocalStorage`, reads from the browser's `localStorage` on load and writes to it on every change, using `JSON.stringify` and `JSON.parse`.

**10. How do you validate input?**
The form checks for an empty title, an amount that is zero or negative, and a missing date. It shows a clear error message and does not save until the input is valid.

**11. How are budgets calculated?**
For the selected month, I add up expenses per category and compare each total with its limit. The bar turns amber above 80% and red when the limit is exceeded.

**12. How is the app responsive?**
Tailwind's breakpoint prefixes such as `sm:` and `lg:` change grid layouts. On phones everything stacks in one column; on large screens the list sits beside the form.

**13. What accessibility steps did you take?**
`aria-label` on inputs, `role="alert"` on errors, visible focus rings, and buttons and links that use real HTML elements.

## Limitations and next steps
**14. What are the limitations?**
Data lives only in one browser and one device. There is no login, and clearing browser data deletes records.

**15. How would you improve it?**
Add a Node/Express (or Firebase) backend with a database and authentication, so data syncs across devices. Also add charts, recurring transactions and automated tests.

**16. How would you test it?**
Unit tests for calculation logic with Vitest, component tests with React Testing Library, and manual testing of add/edit/delete/filter flows.

**17. How did you deploy or plan to deploy it?**
Run `npm run build` and host the `dist` folder on Vercel or Netlify.

## Tricky questions
**18. Is this a full-stack project?**
No. It is a complete frontend. The backend is the planned next phase, and the data layer is isolated in one hook, so swapping `localStorage` for API calls would only affect that area.

**19. Did you write all the code yourself?**
Be honest. Say what you built, what tools or references helped you, and show that you understand every part by walking through the code.

**20. What was the hardest part?**
Pick something real, such as getting the edit flow right or calculating budgets per month. Explain the bug and how you fixed it.

## New features (charts, dark mode, backup)
**21. How does dark mode work?**
Colours are defined once as CSS variables in `index.css`. Toggling dark mode adds a `dark` class to `<html>`, which swaps the variable values, so every component changes without separate dark styles. The choice is saved with `useLocalStorage`.

**22. How are the charts built?**
With Recharts. The pie chart uses the month's expense totals per category. The bar chart loops over the last six months and sums income and expenses for each.

**23. How does backup and restore work?**
Backup turns the data into a JSON file and downloads it with a `Blob`. Restore reads the chosen file with `FileReader`, checks that it contains an `items` array, and replaces the app state.
