export { default as sampleData } from './sample-data';

// You can also export specific data types if needed
export type Product = {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner: string | null;
};

export type SampleData = {
  products: Product[];
};
