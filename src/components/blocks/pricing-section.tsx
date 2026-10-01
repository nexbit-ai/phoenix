"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"

interface PricingSectionProps {
  tiers: PricingTier[]
  frequencies: string[]
}

export function PricingSection({
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies.includes("annually") ? "annually" : frequencies[0])

  return (
    <section className="flex flex-col items-center gap-10 py-10 w-full" style={{ fontFamily: "var(--text)" }}>
      <div className="space-y-7 text-center">
        <div className="mx-auto flex w-fit rounded-full bg-zinc-100 p-1">
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={setSelectedFrequency}
              discount={freq === "annually"}
            />
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
          />
        ))}
      </div>
    </section>
  )
}
