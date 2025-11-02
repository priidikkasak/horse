import Navigation from "@/components/Navigation";
import { mockTrainers } from "@/lib/data";

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trainers</h1>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Add New Trainer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{trainer.name}</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  <a href={`mailto:${trainer.email}`} className="hover:text-gray-900">
                    {trainer.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Phone:</span>
                  <a href={`tel:${trainer.phone}`} className="hover:text-gray-900">
                    {trainer.phone}
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm">
                View Schedule
              </button>
            </div>
          ))}
        </div>

        {mockTrainers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No trainers registered yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
