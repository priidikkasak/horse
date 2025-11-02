import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-semibold">Pariisi Tall</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Ülevaade
              </Link>
              <Link href="/horses" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Hobused
              </Link>
              <Link href="/trainers" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Treenerid
              </Link>
              <Link href="/schedule" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Graafik
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pariisi Talli Haldussüsteem
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Muuda oma talli tegevused lihtsamaks ja tõhusamaks
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Hobuste Register</h3>
              <p className="text-gray-600 mb-4">
                Halda hobuste profiile, meditsiiniandmeid, vaktsineerimisi ja treeningmärkmed
              </p>
              <Link
                href="/horses"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Vaata Hobuseid
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Treeninggraafikud</h3>
              <p className="text-gray-600 mb-4">
                Vaata treeninggraafikuid päevade ja aegade kaupa koos treeneritega
              </p>
              <Link
                href="/schedule"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Vaata Graafikut
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Ülevaade</h3>
              <p className="text-gray-600 mb-4">
                Jälgi täituvust, tulu, treeninguid ja hobuste kasutust
              </p>
              <Link
                href="/dashboard"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Vaata Ülevaadet
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
