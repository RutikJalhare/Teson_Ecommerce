"use client"

import { useCart, formatCurrency } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function CartItemRow({
  id,
  name,
  price,
  image,
  quantity,
}: {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}) {
  const { increment, decrement, updateQuantity, removeItem, MIN_QTY, MAX_QTY } = useCart()
  const { toast } = useToast()

  const handleChange = (v: string) => {
    const n = Number(v)
    const clampedValue = isNaN(n) ? MIN_QTY : Math.max(MIN_QTY, Math.min(MAX_QTY, n))
    
    if (n > MAX_QTY) {
      toast({ 
        variant: "warning" as any,
        title: "⚠️ Quantity limit reached", 
        description: `Maximum quantity for any product is ${MAX_QTY}.`,
        duration: 3000
      })
    }
    
    updateQuantity(id, clampedValue)
  }

  const overMax = quantity >= MAX_QTY
  const underMin = quantity <= MIN_QTY

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-20 h-20 object-cover rounded-lg" />
        <div>
          <h3 className="text-base font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{formatCurrency(price)}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
            disabled={underMin}
            onClick={() => decrement(id)}
            className="rounded-full"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M20 12H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Input
            inputMode="numeric"
            aria-label="Quantity"
            className="w-14 text-center border-0 focus-visible:ring-0"
            value={String(quantity)}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
            disabled={overMax}
            onClick={() => {
              if (overMax) {
                toast({ 
                  variant: "warning" as any,
                  title: "⚠️ Quantity limit reached", 
                  description: `Maximum quantity for any product is ${MAX_QTY}.`,
                  duration: 3000
                })
              } else {
                increment(id)
              }
            }}
            className="rounded-full"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M12 4v16M20 12H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label={`Remove ${name}`}
          onClick={() => {
            removeItem(id)
            toast({ 
              variant: "error" as any,
              title: "🗑️ Removed from cart", 
              description: `${name} has been removed from your cart.`,
              duration: 3000
            })
          }}
          className="rounded-full text-muted-foreground hover:text-destructive"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
