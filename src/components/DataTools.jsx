import { useRef, useState } from "react";

export default function DataTools({ items, budgets, onImport, onClear }) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");

  function backup() {
    const blob = new Blob([JSON.stringify({ items, budgets }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "naira-ledger-backup.json";
    a.click();
  }

  function restore(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.items)) throw new Error("bad file");
        onImport(data.items, data.budgets || {});
        setMessage(`Restored ${data.items.length} transactions.`);
      } catch {
        setMessage("That file is not a valid Naira Ledger backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <section className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-card p-5 text-sm shadow-sm">
      <span className="mr-auto text-muted">{message || "Your data is stored only in this browser. Back it up to keep it safe."}</span>
      <button onClick={backup} className="rounded-md bg-line px-3 py-1.5 font-medium">Download backup</button>
      <button onClick={() => fileRef.current.click()} className="rounded-md bg-line px-3 py-1.5 font-medium">Restore backup</button>
      <input ref={fileRef} type="file" accept="application/json" onChange={restore} className="hidden" aria-label="Choose backup file" />
      <button onClick={onClear} className="rounded-md px-3 py-1.5 font-medium text-red-600">Clear all data</button>
    </section>
  );
}
