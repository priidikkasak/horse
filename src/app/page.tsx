import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-semibold">Horse Stable</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Dashboard
              </Link>
              <Link href="/horses" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Horses
              </Link>
              <Link href="/trainers" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Trainers
              </Link>
              <Link href="/schedule" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                Schedule
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Horse Stable Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your stable operations with ease
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Horse Registry</h3>
              <p className="text-gray-600 mb-4">
                Manage horse profiles, medical records, vaccinations, and training notes
              </p>
              <Link
                href="/horses"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                View Horses
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Trainer Schedules</h3>
              <p className="text-gray-600 mb-4">
                Manage trainer availability and view real-time open slots
              </p>
              <Link
                href="/schedule"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                View Schedule
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Track occupancy, revenue, lessons, and horse utilization
              </p>
              <Link
                href="/dashboard"
                className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
