"use client"

import { useState } from "react"
import { Menu, Plus, ArrowUpRight, QrCode } from "lucide-react"
import { NavDrawer } from "@/components/nav-drawer"
import SendMoneyModal from "@/components/send-money-modal"

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sendOpen, setSendOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-900 bg-black/80 px-4 py-4 backdrop-blur">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex size-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
        >
          <Menu className="size-6" />
        </button>

        <span className="text-base font-semibold tracking-tight">Velvet Pay</span>

        <button
          aria-label="Scan QR code"
          className="flex size-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
        >
          <QrCode className="size-6" />
        </button>
      </header>

      {/* Content */}
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-8">
        <section className="flex flex-col items-center gap-1 py-6 text-center">
          <p className="text-sm text-neutral-400">Available balance</p>
          <p className="text-5xl font-bold tracking-tight text-balance">$1,248.30</p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="size-5" />
            Add money
          </button>
          <button
            onClick={() => setSendOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <ArrowUpRight className="size-5" />
            Send
          </button>
        </div>

        {sendOpen && (
          <SendMoneyModal
            recipient={{ name: "Someone", stripeAccountId: null }}
            onClose={() => setSendOpen(false)}
          />
        )}

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-neutral-400">Recent activity</h2>
          <ul className="flex flex-col gap-2">
            {[
              { name: "Coffee Shop", time: "Today", amount: "-$4.50" },
              { name: "Alex Rivera", time: "Yesterday", amount: "+$25.00" },
              { name: "Grocery Mart", time: "Mon", amount: "-$62.18" },
            ].map((tx) => (
              <li
                key={tx.name}
                className="flex items-center justify-between rounded-2xl bg-neutral-950 px-4 py-3"
              >
                <div className="leading-tight">
                  <p className="text-sm font-medium">{tx.name}</p>
                  <p className="text-xs text-neutral-500">{tx.time}</p>
                </div>
                <span
                  className={
                    tx.amount.startsWith("+")
                      ? "text-sm font-semibold text-primary"
                      : "text-sm font-semibold text-white"
                  }
                >
                  {tx.amount}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
