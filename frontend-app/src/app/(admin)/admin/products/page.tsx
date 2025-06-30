import { Button } from '@/components/ui/button';

export default function AdminProductsPage() {
  return (
    <div className="wrapper py-12">
      <div className="flex-between mb-8">
        <h1 className="h1-bold">Manage Products</h1>
        <Button>Add New Product</Button>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Product List</h3>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground">
            Product management interface will go here...
          </p>
        </div>
      </div>
    </div>
  );
}
