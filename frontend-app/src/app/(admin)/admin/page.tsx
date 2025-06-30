export default function AdminDashboardPage() {
  return (
    <div className="wrapper py-12">
      <h1 className="h1-bold">Admin Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="h3-bold">Total Orders</h3>
          <p className="text-2xl font-bold text-primary">1,234</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="h3-bold">Revenue</h3>
          <p className="text-2xl font-bold text-primary">$45,678</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="h3-bold">Products</h3>
          <p className="text-2xl font-bold text-primary">567</p>
        </div>
      </div>
    </div>
  );
}
