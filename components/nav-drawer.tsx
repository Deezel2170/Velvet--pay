"use client"

import { useEffect } from "react"
import {
  Home,
  Activity,
  CreditCard,
  Landmark,
  Bitcoin,
  Gift,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
}

const primaryItems: NavItem[] = [
  { label: "Home", icon: Home, active: true },
  { label: "Activity", icon: Activity },
  { label: "Card", icon: CreditCard },
  { label: "Banking", icon: Landmark },
  { label: "Bitcoin", icon: Bitcoin },
  { label: "Rewards", icon: Gift },
]

const secondaryItems: NavItem[] = [
  { label: "Settings", icon: Settings },
  { label: "Support", icon: HelpCircle },
]

export function NavDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col bg-neutral-950 text-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header / profile */}
        <div className="flex items-center justify-between px-5 pb-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              VP
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold">Velvet Pay</p>
              <p className="text-sm text-neutral-400">$velvetuser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Balance card */}
        <div className="mx-5 mb-4 rounded-2xl bg-neutral-900 p-4">
          <p className="text-sm text-neutral-400">Balance</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">$1,248.30</p>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {primaryItems.map((item) => (
              <li key={item.label}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          <div className="my-3 border-t border-neutral-800" />

          <ul className="flex flex-col gap-1">
            {secondaryItems.map((item) => (
              <li key={item.label}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

  function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon
  const classes = cn(
    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
    item.active
      ? "bg-primary/15 text-primary"
      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
  )

  if (item.href) {
    return (
      <Link href={item.href} className={classes}>
        <Icon className="size-5" />
        {item.label}
      </Link>
    )
  }

  return (
    <button className={classes}>
      <Icon className="size-5" />
      {item.label}
    </button>
  )
}      {/* Footer */}
        <div className="border-t border-neutral-800 p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white">
            <LogOut className="size-5" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}

