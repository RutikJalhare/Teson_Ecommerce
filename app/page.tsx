"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard, type Product } from "@/components/product-card"
import { Pagination } from "@/components/pagination"
import { fetchProducts, type PaginatedResponse } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

// Loading skeleton component
function ProductSkeleton() {
  return (
    <div className="group flex flex-col">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="mt-4 flex flex-grow flex-col space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-4 w-1/3 mt-2" />
        <Skeleton className="h-6 w-1/4 mt-2" />
      </div>
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  )
}

export default function Page() {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse>({
    products: [],
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const currentPage = parseInt(searchParams.get('page') || '1')
  const categoryFromUrl = searchParams.get('category') || 'all'
  const searchFromUrl = searchParams.get('search') || ''

  useEffect(() => {
    setCurrentCategory(categoryFromUrl)
    setSearchQuery(searchFromUrl)
  }, [categoryFromUrl, searchFromUrl])

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await fetchProducts(currentPage, currentCategory, searchQuery)
        setPaginatedData(data)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [currentPage, currentCategory, searchQuery])

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category)
    const params = new URLSearchParams()
    if (category !== 'all') {
      params.set('category', category)
    }
    if (searchQuery) {
      params.set('search', searchQuery)
    }
    params.set('page', '1') // Reset to first page
    router.push(`?${params.toString()}`)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    const params = new URLSearchParams()
    if (currentCategory !== 'all') {
      params.set('category', currentCategory)
    }
    if (query.trim()) {
      params.set('search', query)
    }
    params.set('page', '1') // Reset to first page
    router.push(`?${params.toString()}`)
  }

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Products'
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <>
      <Header 
        onCategoryChange={handleCategoryChange} 
        currentCategory={currentCategory}
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <main className="px-4 sm:px-6 lg:px-24 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {searchQuery 
                ? `Search results for "${searchQuery}"` 
                : formatCategoryName(currentCategory)
              }
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {searchQuery 
                ? `Products matching your search in ${formatCategoryName(currentCategory).toLowerCase()}`
                : currentCategory === 'all' 
                  ? 'Discover our curated collection of premium products'
                  : `Explore our ${formatCategoryName(currentCategory).toLowerCase()} collection`
              }
            </p>
          </div>
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
              >
                Retry
              </button>
            </div>
          )}
          
          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : paginatedData.products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {searchQuery 
                  ? `No products found for "${searchQuery}" in ${formatCategoryName(currentCategory).toLowerCase()}.`
                  : `No products found in this category.`
                }
              </p>
              <div className="mt-4 space-x-2">
                {searchQuery && (
                  <button 
                    onClick={() => handleSearchChange('')}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
                  >
                    Clear Search
                  </button>
                )}
                <button 
                  onClick={() => handleCategoryChange('all')}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:opacity-90"
                >
                  View All Products
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {paginatedData.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <Pagination
                currentPage={paginatedData.page}
                totalPages={paginatedData.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
