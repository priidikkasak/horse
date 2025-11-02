"use client";

import { useState } from "react";
import Link from "next/link";
import { mockTrainers } from "@/lib/data";
import { Trainer } from "@/types";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers);

  const handleDelete = (id: string) => {
    if (confirm("Kas oled kindel, et soovid selle treeneri kustutada?")) {
      setTrainers(trainers.filter((t) => t.id !== id));
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
          <h1 className="text-3xl font-bold text-gray-900">Treenerid</h1>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Lisa Uus Treener
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-900">{trainer.name}</h2>
                <div className="flex gap-2">
                  <button
                    className="text-gray-600 hover:text-gray-900 text-sm"
                    title="Muuda"
                  >
                    Muuda
                  </button>
                  <button
                    onClick={() => handleDelete(trainer.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                    title="Kustuta"
                  >
                    Kustuta
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  <a href={`mailto:${trainer.email}`} className="hover:text-gray-900">
                    {trainer.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Telefon:</span>
                  <a href={`tel:${trainer.phone}`} className="hover:text-gray-900">
                    {trainer.phone}
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Erialad:</p>
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
            </div>
          ))}
        </div>

        {trainers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Treenereid pole veel lisatud.</p>
          </div>
        )}
      </main>
    </div>
  );
}
