import Link from "next/link";
import { calculateDashboardStats } from "@/lib/analytics";

export default function DashboardPage() {
  const stats = calculateDashboardStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Tagasi avalehele
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ülevaade</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Hobused Kokku</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalHorses}</p>
            <p className="text-sm text-green-600 mt-1">{stats.activeHorses} aktiivne</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Täituvus</p>
            <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</p>
            <p className="text-sm text-gray-600 mt-1">boksidest täidetud</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Kuu Tulu</p>
            <p className="text-3xl font-bold text-gray-900">€{stats.monthlyRevenue}</p>
            <p className="text-sm text-gray-600 mt-1">€{stats.totalRevenue} kokku</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Kuu Treeningud</p>
            <p className="text-3xl font-bold text-gray-900">{stats.monthlyLessons}</p>
            <p className="text-sm text-gray-600 mt-1">{stats.totalLessons} kokku</p>
          </div>
        </div>

        {/* Horse Utilization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Hobuste Kasutamine</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Hobuse Nimi
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Treeningud (See Kuu)
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Tunnid (See Kuu)
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Kasutamise Määr
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.horseUtilization.map((horse) => (
                  <tr key={horse.horseId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{horse.horseName}</td>
                    <td className="py-3 px-4">{horse.lessonsThisMonth}</td>
                    <td className="py-3 px-4">{horse.hoursThisMonth}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${
                              horse.utilizationRate >= 70
                                ? "bg-green-500"
                                : horse.utilizationRate >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${horse.utilizationRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{horse.utilizationRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {stats.horseUtilization.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Kasutusandmed puuduvad</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
