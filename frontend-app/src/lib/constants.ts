// App-wide constants
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'E-Commerce Store',
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'A modern ecommerce store built with Next.js, Tailwind CSS, and TypeScript.',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retries: 3,
} as const;

// Feature flags
export const FEATURES = {
  enableSearch: true,
  enableReviews: true,
  enableWishlist: true,
  enableSocialLogin: false,
} as const;

// UI constants
export const UI_CONFIG = {
  maxProductsPerPage: 12,
  maxSearchResults: 50,
  defaultCurrency: 'USD',
  supportedCurrencies: ['USD', 'EUR', 'GBP'] as const,
} as const;

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/yourstore',
  twitter: 'https://twitter.com/yourstore',
  instagram: 'https://instagram.com/yourstore',
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'support@yourstore.com',
  phone: '+1 (555) 123-4567',
  address: '123 Store Street, City, State 12345',
} as const;
