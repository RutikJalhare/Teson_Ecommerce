"use client"

import useSWR from "swr"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

const CART_KEY = "cart:v1"
const MAX_QTY = 10
const MIN_QTY = 1

function readCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function useCart() {
  const { data, mutate, isLoading } = useSWR<CartItem[]>(CART_KEY, () => readCart(), { fallbackData: [] })

  const items = data ?? []

  const setItems = (next: CartItem[]) => {
    writeCart(next)
    mutate(next, false)
  }

  const addItem = (item: Omit<CartItem, "quantity">, qty = 1) => {
    let quantityLimitReached = false
    
    const nextItems = (() => {
      const existing = items.find((i) => i.id === item.id)
      if (existing) {
        const nextQty = Math.min(MAX_QTY, existing.quantity + qty)
        if (existing.quantity + qty > MAX_QTY) {
          quantityLimitReached = true
        }
        return items.map((i) => (i.id === item.id ? { ...i, quantity: nextQty } : i))
      }
      const clampedQty = Math.max(MIN_QTY, Math.min(MAX_QTY, qty))
      if (qty > MAX_QTY) {
        quantityLimitReached = true
      }
      return [...items, { ...item, quantity: clampedQty }]
    })()
    
    setItems(nextItems)
    return { quantityLimitReached }
  }

  const updateQuantity = (id: string, qty: number) => {
    const clamped = Math.max(MIN_QTY, Math.min(MAX_QTY, Math.floor(qty || 0)))
    setItems(items.map((i) => (i.id === id ? { ...i, quantity: clamped } : i)))
  }

  const increment = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + 1) } : i)))
  }

  const decrement = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, quantity: Math.max(MIN_QTY, i.quantity - 1) } : i)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const clear = () => setItems([])

  const count = items.reduce((acc, i) => acc + i.quantity, 0)
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return {
    items,
    isLoading,
    addItem,
    updateQuantity,
    increment,
    decrement,
    removeItem,
    clear,
    count,
    subtotal,
    MAX_QTY,
    MIN_QTY,
  }
}

export function formatCurrency(value: number, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value)
}
