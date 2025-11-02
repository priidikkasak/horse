import Link from "next/link";
import Navigation from "@/components/Navigation";
import { mockHorses } from "@/lib/data";

export default function HorsesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Horse Registry</h1>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Add New Horse
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHorses.map((horse) => (
            <Link
              key={horse.id}
              href={`/horses/${horse.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{horse.name}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    horse.status === "active"
                      ? "bg-green-100 text-green-800"
                      : horse.status === "injured"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {horse.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Breed:</span>
                  <span>{horse.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Age:</span>
                  <span>{horse.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Color:</span>
                  <span>{horse.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Owner:</span>
                  <span>{horse.owner}</span>
                </div>
                {horse.stallNumber && (
                  <div className="flex justify-between">
                    <span className="font-medium">Stall:</span>
                    <span>{horse.stallNumber}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {mockHorses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No horses registered yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
