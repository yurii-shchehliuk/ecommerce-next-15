import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, UserIcon } from 'lucide-react';
import Image from 'next/image';
import { APP_CONFIG } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { SideMenu } from './side-menu';

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="wrapper flex-between h-16">
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <SideMenu />
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            priority={true}
          />
          <span className="hidden lg:block text-2xl font-bold">
            {APP_CONFIG.name}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden md:flex">
            <Link href="/cart">
              <ShoppingCart className="w-4 h-4" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden md:flex">
            <Link href="/sign-in">
              <UserIcon className="w-4 h-4" />
              <span className="sr-only">Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
