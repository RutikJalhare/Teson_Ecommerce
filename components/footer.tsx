import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21 4H15V10H9V16H3V22H21V4Z" />
              </svg>
              <span className="text-foreground">StyleHub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover premium quality products for your lifestyle. Shop with confidence and style.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.253 14.794 3.762 13.643 3.762 12.346s.491-2.448 1.364-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.873.875 1.364 2.026 1.364 3.323s-.491 2.448-1.364 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-9.608c-.613 0-1.108-.496-1.108-1.108 0-.613.496-1.108 1.108-1.108.613 0 1.108.496 1.108 1.108 0 .613-.496 1.108-1.108 1.108z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Shop</h3>
            <nav className="space-y-2 text-sm">
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                New Arrivals
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Men's Collection
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Women's Collection
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Accessories
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Sale
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 StyleHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}