import { useState } from "react";
import { Wallet } from "lucide-react";
import { field } from "../utils";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  return (
    <div className="grid min-h-screen place-items-center bg-page p-4">
      <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) onLogin(name.trim()); }} className="w-full max-w-sm space-y-4 rounded-2xl border border-line bg-card p-8 shadow-sm">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white"><Wallet size={24} /></div>
        <div>
          <h1 className="text-2xl font-bold">Welcome to Naira Ledger</h1>
          <p className="text-sm text-muted">Enter your name to continue. Your data stays in this browser.</p>
        </div>
        <input className={field} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" autoFocus />
        <button className="w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">Continue</button>
      </form>
    </div>
  );
}
