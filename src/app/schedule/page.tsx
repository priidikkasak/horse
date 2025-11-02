"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import TrainingForm from "@/components/TrainingForm";
import { mockLessons, mockTrainers, mockHorses } from "@/lib/data";
import { Lesson } from "@/types";

export default function SchedulePage() {
  const [view, setView] = useState<"weekly" | "daily">("weekly");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [trainings, setTrainings] = useState<Lesson[]>(mockLessons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Lesson | null>(null);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
    if (confirm("Are you sure you want to delete this training?")) {
      setTrainings(trainings.filter((t) => t.id !== id));
    }
  };

  const lessonsByDay = getLessonsByDayOfWeek();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Training Schedules</h1>
          <button
            onClick={handleAddTraining}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Book New Training
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
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setView("weekly")}
            className={`px-4 py-2 rounded-md transition-colors ${
              view === "weekly"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Weekly View
          </button>
          <button
            onClick={() => setView("daily")}
            className={`px-4 py-2 rounded-md transition-colors ${
              view === "daily"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Daily View
          </button>
        </div>

        {/* Weekly View */}
        {view === "weekly" && (
          <div className="space-y-6">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{day}</h2>

                {lessonsByDay[index] && lessonsByDay[index].length > 0 ? (
                  <div className="space-y-3">
                    {lessonsByDay[index].map((lesson) => (
                      <div
                        key={lesson.id}
                        className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-semibold text-gray-900">
                                {lesson.startTime} - {lesson.endTime}
                              </span>
                              <span className="text-sm text-gray-600">
                                ({lesson.duration} min)
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div>
                                <span className="text-sm text-gray-500">Trainer: </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {getTrainerName(lesson.trainerId)}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Horse: </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {getHorseName(lesson.horseId)}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Client: </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {lesson.clientName}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 text-xs rounded-full ${
                                lesson.type === "private"
                                  ? "bg-purple-100 text-purple-800"
                                  : lesson.type === "group"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {lesson.type}
                            </span>
                            <button
                              onClick={() => handleEditTraining(lesson)}
                              className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm"
                              title="Edit training"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTraining(lesson.id)}
                              className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                              title="Delete training"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No trainings scheduled</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Daily View */}
        {view === "daily" && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">
                Trainings for {new Date(selectedDate).toLocaleDateString()}
              </h2>

              {filteredLessons.length > 0 ? (
                <div className="space-y-3">
                  {filteredLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-semibold text-gray-900">
                              {lesson.startTime} - {lesson.endTime}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({lesson.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div>
                              <span className="text-sm text-gray-500">Trainer: </span>
                              <span className="text-sm font-medium text-gray-900">
                                {getTrainerName(lesson.trainerId)}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Horse: </span>
                              <span className="text-sm font-medium text-gray-900">
                                {getHorseName(lesson.horseId)}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Client: </span>
                              <span className="text-sm font-medium text-gray-900">
                                {lesson.clientName}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              lesson.type === "private"
                                ? "bg-purple-100 text-purple-800"
                                : lesson.type === "group"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {lesson.type}
                          </span>
                          <button
                            onClick={() => handleEditTraining(lesson)}
                            className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm"
                            title="Edit training"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTraining(lesson.id)}
                            className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                            title="Delete training"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No trainings scheduled for this date</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
