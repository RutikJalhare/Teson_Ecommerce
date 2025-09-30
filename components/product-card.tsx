"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem, MAX_QTY } = useCart()
  const { toast } = useToast()

  const handleAdd = () => {
    const result = addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)
    
    if (result.quantityLimitReached) {
      toast({ 
        variant: "warning" as any,
        title: "⚠️ Quantity limit reached", 
        description: `Maximum quantity for any product is ${MAX_QTY}. Item added with maximum quantity.`,
        duration: 4000
      })
    } else {
      toast({ 
        variant: "success" as any,
        title: "✅ Added to cart!", 
        description: `${product.name} has been added to your cart.`,
        duration: 3000
      })
    }
  }

  // Truncate description for better UI
  const truncatedDescription = product.description.length > 100 
    ? product.description.substring(0, 100) + "..." 
    : product.description

  return (
    <div className="group flex flex-col">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="secondary" className="absolute top-2 left-2 capitalize">
          {product.category}
        </Badge>
      </div>
      <div className="mt-4 flex flex-grow flex-col">
        <h3 className="text-sm font-medium line-clamp-2" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-3" title={product.description}>
          {truncatedDescription}
        </p>
        
        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating?.rate || 0}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.rating?.count || 0})</span>
        </div>
        
        <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
      </div>
      <Button className="mt-4 bg-primary text-primary-foreground hover:opacity-90" onClick={handleAdd}>
        Add to Cart
      </Button>
    </div>
  )
}
