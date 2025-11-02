"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { mockLessons, mockTrainers, mockHorses } from "@/lib/data";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Filter lessons by selected date
  const filteredLessons = mockLessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date).toISOString().split("T")[0];
    return lessonDate === selectedDate;
  });

  // Get trainer and horse names
  const getTrainerName = (id: string) => {
    return mockTrainers.find((t) => t.id === id)?.name || "Unknown";
  };

  const getHorseName = (id: string) => {
    return mockHorses.find((h) => h.id === id)?.name || "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Training Schedule</h1>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Book New Lesson
          </button>
        </div>

        {/* Date Selector */}
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

        {/* Schedule View */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Lessons for {new Date(selectedDate).toLocaleDateString()}
          </h2>

          {filteredLessons.length > 0 ? (
            <div className="space-y-4">
              {filteredLessons
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((lesson) => (
                  <div
                    key={lesson.id}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-lg">
                            {lesson.startTime} - {lesson.endTime}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              lesson.status === "scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : lesson.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {lesson.status}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            {lesson.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <span className="text-gray-500">Client:</span>{" "}
                            <span className="font-medium">{lesson.clientName}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Trainer:</span>{" "}
                            <span className="font-medium">{getTrainerName(lesson.trainerId)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Horse:</span>{" "}
                            <span className="font-medium">{getHorseName(lesson.horseId)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>{" "}
                            <span className="font-medium">{lesson.duration} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${lesson.price}</p>
                      </div>
                    </div>
                    {lesson.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">{lesson.notes}</p>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No lessons scheduled for this date</p>
            </div>
          )}
        </div>

        {/* Trainer Availability */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTrainers.map((trainer) => (
              <div key={trainer.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">{trainer.name}</h3>
                <p className="text-sm text-gray-600">
                  View trainer&apos;s availability and book a lesson
                </p>
                <button className="mt-3 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
                  View Availability
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
