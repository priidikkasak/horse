import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-900">
              Pariisi Tall
            </Link>
          </div>
          <div className="flex space-x-1">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
            >
              Ülevaade
            </Link>
            <Link
              href="/horses"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
            >
              Hobused
            </Link>
            <Link
              href="/trainers"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
            >
              Treenerid
            </Link>
            <Link
              href="/schedule"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
            >
              Graafik
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
