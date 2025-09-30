"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchCategories } from "@/lib/api"

interface HeaderProps {
  onCategoryChange?: (category: string) => void
  currentCategory?: string
  onSearchChange?: (query: string) => void
  searchQuery?: string
}

export function Header({ onCategoryChange, currentCategory = "all", onSearchChange, searchQuery = "" }: HeaderProps) {
  const { count } = useCart()
  const [categories, setCategories] = useState<string[]>([])
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      // Update URL params if no callback provided
      const params = new URLSearchParams(searchParams.toString())
      if (category === 'all') {
        params.delete('category')
      } else {
        params.set('category', category)
      }
      params.delete('page') // Reset to first page when changing category
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearchChange) {
      onSearchChange(localSearchQuery)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearchQuery(value)
    
    // Debounced search - trigger search after user stops typing
    if (onSearchChange) {
      const timeoutId = setTimeout(() => {
        onSearchChange(value)
      }, 300)
      
      return () => clearTimeout(timeoutId)
    }
  }

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Products'
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 4H15V10H9V16H3V22H21V4Z" />
            </svg>
            <span className="text-foreground">StyleHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`hover:text-primary transition-colors ${
                  currentCategory === category 
                    ? 'text-primary font-medium' 
                    : 'text-foreground'
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-64">
            <form onSubmit={handleSearchSubmit} className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <Input 
                aria-label="Search" 
                placeholder="Search products..." 
                className="pl-9 bg-muted"
                value={localSearchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          <Button asChild variant="ghost" className="relative">
            <Link href="/cart" aria-label="Cart">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Open cart</span>
              {count > 0 && (
                <span
                  aria-live="polite"
                  className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] leading-none h-5 min-w-5 px-1.5 grid place-items-center"
                >
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
