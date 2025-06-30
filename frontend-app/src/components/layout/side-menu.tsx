'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Home,
  Package,
  Info,
  ShoppingCart,
  User,
  Settings,
} from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              priority={true}
            />
            <SheetTitle className="text-xl font-bold">
              {APP_CONFIG.name}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 mt-6">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Package className="w-4 h-4" />
            <span>Products</span>
          </Link>

          <Link
            href="/about"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="mt-8 space-y-2">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Account
          </h3>

          <Link
            href="/cart"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
          </Link>

          <Link
            href="/sign-in"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="mt-8 pt-4 border-t">
          <div className="flex items-center justify-between px-3">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t">
          <div className="px-3 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} {APP_CONFIG.name}
            </p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
