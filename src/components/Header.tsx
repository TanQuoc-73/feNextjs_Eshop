export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white z-50">
      <div className="text-2xl font-bold">EShop</div>
      <nav className="space-x-4">
        <a href="/" className="hover:text-gray-400">Home</a>
        <a href="/products" className="hover:text-gray-400">Products</a>
        <a href="/cart" className="hover:text-gray-400">Cart</a>
        <a href="/about" className="hover:text-gray-400">About</a>
      </nav>
    </div>
  );
}