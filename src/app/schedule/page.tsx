"use client";

import { useState } from "react";
import Link from "next/link";
import TrainingForm from "@/components/TrainingForm";
import { mockLessons, mockTrainers, mockHorses } from "@/lib/data";
import { Lesson } from "@/types";

export default function SchedulePage() {
  const [view, setView] = useState<"weekly" | "daily">("weekly");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [trainings, setTrainings] = useState<Lesson[]>(mockLessons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Lesson | null>(null);

  const daysOfWeek = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];

  // Group lessons by day of week
  const getLessonsByDayOfWeek = () => {
    const lessonsByDay: { [key: number]: Lesson[] } = {};

    trainings.forEach((lesson) => {
      const dayOfWeek = new Date(lesson.date).getDay();
      if (!lessonsByDay[dayOfWeek]) {
        lessonsByDay[dayOfWeek] = [];
      }
      lessonsByDay[dayOfWeek].push(lesson);
    });

    // Sort lessons within each day by time
    Object.keys(lessonsByDay).forEach((day) => {
      lessonsByDay[Number(day)].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return lessonsByDay;
  };

  // Filter lessons by selected date
  const filteredLessons = trainings.filter((lesson) => {
    const lessonDate = new Date(lesson.date).toISOString().split("T")[0];
    return lessonDate === selectedDate;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Get trainer and horse names
  const getTrainerName = (id: string) => {
    return mockTrainers.find((t) => t.id === id)?.name || "Unknown";
  };

  const getHorseName = (id: string) => {
    return mockHorses.find((h) => h.id === id)?.name || "Unknown";
  };

  // Handlers
  const handleAddTraining = () => {
    setEditingTraining(null);
    setIsFormOpen(true);
  };

  const handleEditTraining = (training: Lesson) => {
    setEditingTraining(training);
    setIsFormOpen(true);
  };

  const handleSaveTraining = (trainingData: Partial<Lesson>) => {
    if (editingTraining) {
      // Update existing training
      setTrainings(trainings.map((t) =>
        t.id === editingTraining.id ? { ...t, ...trainingData } as Lesson : t
      ));
    } else {
      // Add new training
      setTrainings([...trainings, trainingData as Lesson]);
    }
    setIsFormOpen(false);
    setEditingTraining(null);
  };

  const handleDeleteTraining = (id: string) => {
    if (confirm("Kas oled kindel, et soovid selle treeningu kustutada?")) {
      setTrainings(trainings.filter((t) => t.id !== id));
    }
  };

  const lessonsByDay = getLessonsByDayOfWeek();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-900 text-base font-medium transition-colors">
            ← Tagasi avalehele
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">Treeningud</h1>
          <button
            onClick={handleAddTraining}
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 whitespace-nowrap font-medium"
          >
            Lisa Treening
          </button>
        </div>

        <TrainingForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTraining(null);
          }}
          onSave={handleSaveTraining}
          training={editingTraining}
        />

        {/* View Toggle */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setView("weekly")}
            className={`px-6 py-3 rounded-2xl transition-all duration-200 font-medium ${
              view === "weekly"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Nädala Vaade
          </button>
          <button
            onClick={() => setView("daily")}
            className={`px-6 py-3 rounded-2xl transition-all duration-200 font-medium ${
              view === "daily"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Päeva Vaade
          </button>
        </div>

        {/* Weekly View */}
        {view === "weekly" && (
          <div className="space-y-6">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">{day}</h2>

                {lessonsByDay[index] && lessonsByDay[index].length > 0 ? (
                  <div className="space-y-4">
                    {lessonsByDay[index].map((lesson) => (
                      <div
                        key={lesson.id}
                        className="border-l-4 border-blue-500 bg-white p-4 sm:p-5 rounded-2xl"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base sm:text-lg font-semibold text-gray-900">
                                {lesson.startTime} - {lesson.endTime}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-600">
                                ({lesson.duration} min)
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  lesson.type === "private"
                                    ? "bg-purple-100 text-purple-800"
                                    : lesson.type === "group"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {lesson.type}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">Treener: </span>
                              <span className="font-medium text-gray-900">
                                {getTrainerName(lesson.trainerId)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Hobune: </span>
                              <span className="font-medium text-gray-900">
                                {getHorseName(lesson.horseId)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Klient: </span>
                              <span className="font-medium text-gray-900">
                                {lesson.clientName}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-3 pt-3 border-t border-gray-100">
                            <button
                              onClick={() => handleEditTraining(lesson)}
                              className="flex-1 text-gray-700 hover:text-gray-900 px-4 py-2.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                              title="Muuda treeningut"
                            >
                              Muuda
                            </button>
                            <button
                              onClick={() => handleDeleteTraining(lesson.id)}
                              className="flex-1 text-red-600 hover:text-red-700 px-4 py-2.5 text-sm font-medium bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
                              title="Kustuta treening"
                            >
                              Kustuta
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-base">Treeninguid pole planeeritud</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Daily View */}
        {view === "daily" && (
          <>
            <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8 mb-6">
              <label htmlFor="date" className="block text-base font-medium text-gray-700 mb-3">
                Vali Kuupäev
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Treeningud {new Date(selectedDate).toLocaleDateString()}
              </h2>

              {filteredLessons.length > 0 ? (
                <div className="space-y-4">
                  {filteredLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="border-l-4 border-blue-500 bg-white p-4 sm:p-5 rounded-2xl"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base sm:text-lg font-semibold text-gray-900">
                              {lesson.startTime} - {lesson.endTime}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600">
                              ({lesson.duration} min)
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                lesson.type === "private"
                                  ? "bg-purple-100 text-purple-800"
                                  : lesson.type === "group"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {lesson.type}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Treener: </span>
                            <span className="font-medium text-gray-900">
                              {getTrainerName(lesson.trainerId)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Hobune: </span>
                            <span className="font-medium text-gray-900">
                              {getHorseName(lesson.horseId)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Klient: </span>
                            <span className="font-medium text-gray-900">
                              {lesson.clientName}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleEditTraining(lesson)}
                            className="flex-1 text-gray-700 hover:text-gray-900 px-4 py-2.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                            title="Muuda treeningut"
                          >
                            Muuda
                          </button>
                          <button
                            onClick={() => handleDeleteTraining(lesson.id)}
                            className="flex-1 text-red-600 hover:text-red-700 px-4 py-2.5 text-sm font-medium bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
                            title="Kustuta treening"
                          >
                            Kustuta
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-base">Sel kuupäeval pole treeninguid planeeritud</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
