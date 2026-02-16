// Simple navbar component - lucide-react removed to avoid dependency
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-green-700">
            🌱 PlantBook
          </a>
          <div className="flex gap-6">
            <a href="/plants" className="text-gray-700 hover:text-green-700 font-medium">
              Browse
            </a>
            <a href="/identify" className="text-gray-700 hover:text-green-700 font-medium">
              Identify
            </a>
            <a href="/my-garden" className="text-gray-700 hover:text-green-700 font-medium">
              My Garden
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
