"use client";

import { useState } from "react";
import Link from "next/link";

interface Stall {
  id: string;
  stallNumber: string;
  horseName: string;
  comments: string;
}

const initialStalls: Stall[] = [
  { id: "1", stallNumber: "1", horseName: "Thunder", comments: "Vajab igapäevast liikumist" },
  { id: "2", stallNumber: "2", horseName: "Luna", comments: "Tundlik kõrini" },
  { id: "3", stallNumber: "3", horseName: "", comments: "Tühi boks" },
  { id: "4", stallNumber: "4", horseName: "Storm", comments: "" },
  { id: "5", stallNumber: "5", horseName: "", comments: "Remondi all" },
];

export default function DashboardPage() {
  const [stalls, setStalls] = useState<Stall[]>(initialStalls);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStall, setEditingStall] = useState<Stall | null>(null);
  const [formData, setFormData] = useState({ stallNumber: "", horseName: "", comments: "" });

  // Calculate stats
  const totalStalls = stalls.length;
  const occupiedStalls = stalls.filter(s => s.horseName.trim() !== "").length;
  const occupancyRate = totalStalls > 0 ? Math.round((occupiedStalls / totalStalls) * 100) : 0;
  const totalHorses = occupiedStalls;
  const monthlyRevenue = occupiedStalls * 350; // Example calculation
  const totalRevenue = monthlyRevenue * 12;

  const handleAdd = () => {
    if (stalls.length >= 30) {
      alert("Maksimaalne arv bokse (30) on juba saavutatud");
      return;
    }
    setEditingStall(null);
    setFormData({ stallNumber: "", horseName: "", comments: "" });
    setIsFormOpen(true);
  };

  const handleEdit = (stall: Stall) => {
    setEditingStall(stall);
    setFormData({ stallNumber: stall.stallNumber, horseName: stall.horseName, comments: stall.comments });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Kas oled kindel, et soovid selle boksi kustutada?")) {
      setStalls(stalls.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStall) {
      setStalls(stalls.map(s => s.id === editingStall.id ? { ...s, ...formData } : s));
    } else {
      const newStall: Stall = {
        id: Date.now().toString(),
        ...formData
      };
      setStalls([...stalls, newStall]);
    }
    setIsFormOpen(false);
    setEditingStall(null);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Hobused Kokku</p>
            <p className="text-3xl font-bold text-gray-900">{totalHorses}</p>
            <p className="text-sm text-green-600 mt-1">{occupiedStalls} boksiga</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Täituvus</p>
            <p className="text-3xl font-bold text-gray-900">{occupancyRate}%</p>
            <p className="text-sm text-gray-600 mt-1">{occupiedStalls}/{totalStalls} boksidest täidetud</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Kuu Tulu</p>
            <p className="text-3xl font-bold text-gray-900">€{monthlyRevenue}</p>
            <p className="text-sm text-gray-600 mt-1">€{totalRevenue} kokku</p>
          </div>
        </div>

        {/* Stall Occupancy */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Bokside Kasutus</h2>
            <button
              onClick={handleAdd}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
              disabled={stalls.length >= 30}
            >
              Lisa Boks
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Boksi Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Hobuse Nimi
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Kommentaarid
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Tegevused
                  </th>
                </tr>
              </thead>
              <tbody>
                {stalls.map((stall) => (
                  <tr key={stall.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{stall.stallNumber}</td>
                    <td className="py-3 px-4">{stall.horseName || "-"}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{stall.comments || "-"}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(stall)}
                          className="text-gray-600 hover:text-gray-900 text-sm"
                        >
                          Muuda
                        </button>
                        <button
                          onClick={() => handleDelete(stall.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Kustuta
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {stalls.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Bokse pole veel lisatud</p>
            </div>
          )}

          {stalls.length > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              {stalls.length} / 30 boksi kasutuses
            </p>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingStall ? "Muuda Boksi" : "Lisa Uus Boks"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boksi Number *
                </label>
                <input
                  type="text"
                  value={formData.stallNumber}
                  onChange={(e) => setFormData({ ...formData, stallNumber: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hobuse Nimi
                </label>
                <input
                  type="text"
                  value={formData.horseName}
                  onChange={(e) => setFormData({ ...formData, horseName: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kommentaarid
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Tühista
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  {editingStall ? "Uuenda" : "Lisa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
