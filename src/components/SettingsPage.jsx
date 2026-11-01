import { useState } from "react";
import { field } from "../utils";
import DataTools from "./DataTools";

export default function SettingsPage({ user, setUser, dark, setDark, data }) {
  const [name, setName] = useState(user);
  const [saved, setSaved] = useState(false);
  const box = "rounded-2xl border border-line bg-card p-5 shadow-sm";

  function save(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setUser(name.trim());
    setSaved(true);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <form onSubmit={save} className={box}>
        <h2 className="mb-3 font-semibold">Profile</h2>
        <div className="flex gap-2">
          <input className={field} value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} aria-label="Your name" />
          <button className="rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark">Save</button>
        </div>
        {saved && <p className="mt-2 text-sm text-emerald-600">Name updated.</p>}
      </form>
      <section className={`${box} flex items-center justify-between`}>
        <div>
          <h2 className="font-semibold">Dark mode</h2>
          <p className="text-sm text-muted">Currency is fixed to Nigerian naira (₦).</p>
        </div>
        <button role="switch" aria-checked={dark} aria-label="Dark mode" onClick={() => setDark(!dark)} className={`relative h-6 w-11 rounded-full ${dark ? "bg-brand" : "bg-line"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${dark ? "left-5" : "left-0.5"}`} />
        </button>
      </section>
      <DataTools {...data} />
    </div>
  );
}
