import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="wrapper flex-between h-16">
        {/* Admin Logo */}
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="h2-bold text-primary">Admin Panel</span>
        </Link>

        {/* Admin Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Orders
          </Link>
          <Link
            href="/admin/customers"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Customers
          </Link>
          <Link
            href="/admin/analytics"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Analytics
          </Link>
        </nav>

        {/* Admin Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            View Store
          </Button>
          <Button size="sm">Logout</Button>
        </div>
      </div>
    </header>
  );
}
