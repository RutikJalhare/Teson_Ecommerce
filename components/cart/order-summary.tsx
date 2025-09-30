"use client"

import { useCart, formatCurrency } from "@/lib/cart"
import { Button } from "@/components/ui/button"

const SHIPPING_FLAT = 5
const TAX_RATE = 0.082 // ~8.2%

export function OrderSummary() {
  const { subtotal } = useCart()
  const shipping = subtotal > 0 ? SHIPPING_FLAT : 0
  const taxes = subtotal * TAX_RATE
  const total = subtotal + shipping + taxes

  return (
    <div className="bg-card rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Taxes</span>
          <span>{formatCurrency(taxes)}</span>
        </div>
      </div>
      <div className="border-t my-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <Button className="w-full mt-6 bg-primary text-primary-foreground hover:opacity-90">Proceed to Checkout</Button>
    </div>
  )
}
