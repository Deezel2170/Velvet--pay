// File location: components/send-money-modal.tsx
"use client"

import { useState } from "react"

interface Recipient {
  name: string
  stripeAccountId: string | null
}

interface SendMoneyModalProps {
  recipient: Recipient
  onClose: () => void
}

export default function SendMoneyModal({ recipient, onClose }: SendMoneyModalProps) {
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSend() {
    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/.netlify/functions/create-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(parseFloat(amount) * 100),
          recipientAccountId: recipient.stripeAccountId,
          description: `Send to ${recipient.name}`,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMsg(data.error || "Transfer failed")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Network error")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
      <div className="w-full max-w-md rounded-t-2xl bg-neutral-900 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Send to {recipient.name}</h2>

        {status === "success" ? (
          <p className="text-primary">Sent ${amount} to {recipient.name}!</p>
        ) : (
          <>
            <input
              type="number"
              inputMode="decimal"
              placeholder="$0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mb-4 w-full rounded-lg bg-neutral-800 p-4 text-2xl text-white"
            />

            {errorMsg && <p className="mb-2 text-sm text-red-400">{errorMsg}</p>}

            <button
              onClick={handleSend}
              disabled={!amount || status === "sending"}
              className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
          </>
        )}

        <button onClick={onClose} className="mt-3 w-full text-neutral-400">
          Cancel
        </button>
      </div>
    </div>
  )
}
