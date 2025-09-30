"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart"
import { CartItemRow } from "@/components/cart/cart-item"
import { OrderSummary } from "@/components/cart/order-summary"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items } = useCart()

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <nav className="text-sm text-muted-foreground">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Shopping Cart</span>
            </nav>
            <h1 className="text-3xl font-bold mt-2">Shopping Cart</h1>
          </div>

          <div className="bg-card rounded-lg shadow">
            {items.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Your cart is empty.</p>
                <Button asChild className="mt-4">
                  <Link href="/">Browse products</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((i) => (
                  <CartItemRow key={i.id} {...i} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
