// API service for fetching e-commerce data
export interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface Product {
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

export interface PaginatedResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const API_BASE_URL = 'https://fakestoreapi.com'
const PRODUCTS_PER_PAGE = 8

// Cache for all products to avoid repeated API calls
let allProductsCache: Product[] | null = null

export async function fetchAllProducts(): Promise<Product[]> {
  if (allProductsCache) {
    return allProductsCache
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const apiProducts: ApiProduct[] = await response.json()
    
    // Transform API data to match our Product interface
    allProductsCache = apiProducts.map(product => ({
      id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating
    }))
    
    return allProductsCache
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return fallback data if API fails
    allProductsCache = getFallbackProducts()
    return allProductsCache
  }
}

export async function fetchProducts(page: number = 1, category?: string, searchQuery?: string): Promise<PaginatedResponse> {
  try {
    const allProducts = await fetchAllProducts()
    
    // Filter by category if specified
    let filteredProducts = allProducts
    if (category && category !== 'all') {
      filteredProducts = allProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Filter by search query if specified
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }
    
    // Calculate pagination
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE)
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    return {
      products: paginatedProducts,
      total,
      page,
      limit: PRODUCTS_PER_PAGE,
      totalPages
    }
  } catch (error) {
    console.error('Error fetching paginated products:', error)
    const fallbackProducts = getFallbackProducts()
    return {
      products: fallbackProducts.slice(0, PRODUCTS_PER_PAGE),
      total: fallbackProducts.length,
      page: 1,
      limit: PRODUCTS_PER_PAGE,
      totalPages: Math.ceil(fallbackProducts.length / PRODUCTS_PER_PAGE)
    }
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const allProducts = await fetchAllProducts()
    return allProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const categories = await response.json()
    return ['all', ...categories] // Add 'all' option at the beginning
  } catch (error) {
    console.error('Error fetching categories:', error)
    return ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"]
  }
}

// Fallback products in case API is unavailable
function getFallbackProducts(): Product[] {
  return [
    {
      id: "1",
      name: "Eco-Friendly Water Bottle",
      description: "Stay hydrated with our stylish and sustainable water bottle.",
      price: 19.99,
      image: "/eco-friendly-water-bottle.jpg",
      category: "lifestyle",
      rating: { rate: 4.5, count: 120 }
    },
    {
      id: "2",
      name: "Wireless Headphones",
      description: "Premium noise-canceling wireless headphones.",
      price: 149.99,
      image: "/wireless-headphones.png",
      category: "electronics",
      rating: { rate: 4.8, count: 89 }
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and breathable 100% organic cotton.",
      price: 24.99,
      image: "/organic-cotton-t-shirt.jpg",
      category: "clothing",
      rating: { rate: 4.3, count: 156 }
    },
    {
      id: "4",
      name: "Smart Security Camera",
      description: "Keep your home safe with advanced monitoring.",
      price: 89.99,
      image: "/smart-security-camera.jpg",
      category: "electronics",
      rating: { rate: 4.6, count: 203 }
    },
    {
      id: "5",
      name: "Bluetooth Speaker",
      description: "Compact speaker for tunes on the go.",
      price: 49.99,
      image: "/bluetooth-speaker.jpg",
      category: "electronics",
      rating: { rate: 4.4, count: 167 }
    },
    {
      id: "6",
      name: "Leather Messenger Bag",
      description: "Carry your essentials in durable style.",
      price: 99.99,
      image: "/leather-messenger-bag.jpg",
      category: "accessories",
      rating: { rate: 4.7, count: 98 }
    }
  ]
}