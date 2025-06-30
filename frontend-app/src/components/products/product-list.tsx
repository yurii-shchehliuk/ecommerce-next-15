'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye, Package } from 'lucide-react';
import { sampleData, Product } from '@/lib/data';

interface ProductListProps {
  products?: Product[];
  showFilters?: boolean;
}

export function ProductList({
  products = sampleData.products,
  showFilters = true,
}: ProductListProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-400/50 text-yellow-400/50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="h1-bold">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover our amazing collection of products
          </p>
        </div>

        {showFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              All Products
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Featured
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              In Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.slug}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <CardHeader className="p-0 relative">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Image failed to load:', product.images[0]);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />

                {/* Image Fallback */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Package className="w-12 h-12 text-muted-foreground" />
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stock Badge */}
                {product.stock === 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-3 left-3"
                  >
                    Out of Stock
                  </Badge>
                )}

                {/* Featured Badge */}
                {product.isFeatured && (
                  <Badge className="absolute top-3 left-3 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
            </CardHeader>

            {/* Product Info */}
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Brand */}
                <p className="text-sm text-muted-foreground font-medium">
                  {product.brand}
                </p>

                {/* Product Name */}
                <Link
                  href={`/products/${product.slug}`}
                  className="block group-hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-sm line-clamp-2 hover:underline">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.numReviews})
                  </span>
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" disabled={product.stock === 0}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for new products.
          </p>
        </div>
      )}
    </div>
  );
}
