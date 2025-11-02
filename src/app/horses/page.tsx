"use client";

import { useState } from "react";
import Link from "next/link";
import { mockHorses } from "@/lib/data";
import { Horse } from "@/types";

export default function HorsesPage() {
  const [horses, setHorses] = useState<Horse[]>(mockHorses);

  const handleDelete = (id: string) => {
    if (confirm("Kas oled kindel, et soovid selle hobuse kustutada?")) {
      setHorses(horses.filter((h) => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Tagasi avalehele
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hobused</h1>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Lisa Uus Hobune
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horses.map((horse) => (
            <div
              key={horse.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <Link href={`/horses/${horse.id}`}>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                    {horse.name}
                  </h2>
                </Link>
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

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Tõug:</span>
                  <span>{horse.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vanus:</span>
                  <span>{horse.age} aastat</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Värv:</span>
                  <span>{horse.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Omanik:</span>
                  <span>{horse.owner}</span>
                </div>
                {horse.stallNumber && (
                  <div className="flex justify-between">
                    <span className="font-medium">Boks:</span>
                    <span>{horse.stallNumber}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <Link
                  href={`/horses/${horse.id}`}
                  className="flex-1 text-center bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-800"
                >
                  Vaata
                </Link>
                <button
                  className="flex-1 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded text-sm"
                  title="Muuda"
                >
                  Muuda
                </button>
                <button
                  onClick={() => handleDelete(horse.id)}
                  className="flex-1 text-red-600 hover:text-red-800 px-3 py-2 border border-red-300 rounded text-sm"
                  title="Kustuta"
                >
                  Kustuta
                </button>
              </div>
            </div>
          ))}
        </div>

        {horses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hobuseid pole veel registreeritud.</p>
          </div>
        )}
      </main>
    </div>
  );
}
