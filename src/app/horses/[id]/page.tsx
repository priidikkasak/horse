import Link from "next/link";
import Navigation from "@/components/Navigation";
import {
  getHorseById,
  getMedicalRecordsByHorseId,
  getVaccinationsByHorseId,
  getTrainingNotesByHorseId,
} from "@/lib/data";

export default async function HorseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const horse = getHorseById(id);
  const medicalRecords = getMedicalRecordsByHorseId(id);
  const vaccinations = getVaccinationsByHorseId(id);
  const trainingNotes = getTrainingNotesByHorseId(id);

  if (!horse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <p className="text-center text-gray-500">Horse not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/horses" className="text-gray-600 hover:text-gray-900">
            ← Back to Horses
          </Link>
        </div>

        {/* Horse Profile */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{horse.name}</h1>
              <p className="text-gray-600">{horse.breed}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-lg font-medium">{horse.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Color</p>
              <p className="text-lg font-medium">{horse.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Owner</p>
              <p className="text-lg font-medium">{horse.owner}</p>
            </div>
            {horse.stallNumber && (
              <div>
                <p className="text-sm text-gray-500">Stall Number</p>
                <p className="text-lg font-medium">{horse.stallNumber}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical Records */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Medical Records</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">+ Add</button>
            </div>
            {medicalRecords.length > 0 ? (
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="font-medium">{record.diagnosis}</p>
                    <p className="text-sm text-gray-600">{record.treatment}</p>
                    <p className="text-sm text-gray-500 mt-1">Dr. {record.veterinarian}</p>
                    {record.notes && <p className="text-sm text-gray-600 mt-1">{record.notes}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No medical records</p>
            )}
          </div>

          {/* Vaccinations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Vaccinations</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">+ Add</button>
            </div>
            {vaccinations.length > 0 ? (
              <div className="space-y-4">
                {vaccinations.map((vac) => (
                  <div key={vac.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="font-medium">{vac.vaccineName}</p>
                    <p className="text-sm text-gray-600">
                      Administered: {new Date(vac.dateAdministered).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Next Due: {new Date(vac.nextDueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Dr. {vac.veterinarian}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No vaccination records</p>
            )}
          </div>

          {/* Training Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Training Notes</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900">+ Add</button>
            </div>
            {trainingNotes.length > 0 ? (
              <div className="space-y-4">
                {trainingNotes.map((note) => (
                  <div key={note.id} className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                        <p className="font-medium">{note.activity}</p>
                        <p className="text-sm text-gray-600">{note.notes}</p>
                        <p className="text-sm text-gray-500 mt-1">{note.duration} minutes</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          note.performance === "excellent"
                            ? "bg-green-100 text-green-800"
                            : note.performance === "good"
                            ? "bg-blue-100 text-blue-800"
                            : note.performance === "average"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {note.performance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No training notes</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
