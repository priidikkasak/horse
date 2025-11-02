"use client";

import { useState } from "react";
import Link from "next/link";

interface Stall {
  id: string;
  stallNumber: string;
  horseName: string;
  price: number;
  comments: string;
}

const initialStalls: Stall[] = [
  { id: "1", stallNumber: "1", horseName: "Thunder", price: 350, comments: "Vajab igapäevast liikumist" },
  { id: "2", stallNumber: "2", horseName: "Luna", price: 350, comments: "Tundlik kõrini" },
  { id: "3", stallNumber: "3", horseName: "", price: 0, comments: "Tühi boks" },
  { id: "4", stallNumber: "4", horseName: "Storm", price: 350, comments: "" },
  { id: "5", stallNumber: "5", horseName: "", price: 0, comments: "Remondi all" },
];

export default function DashboardPage() {
  const [stalls, setStalls] = useState<Stall[]>(initialStalls);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStall, setEditingStall] = useState<Stall | null>(null);
  const [formData, setFormData] = useState({ stallNumber: "", horseName: "", price: 350, comments: "" });

  // Calculate stats
  const totalStalls = stalls.length;
  const occupiedStalls = stalls.filter(s => s.horseName.trim() !== "").length;
  const occupancyRate = totalStalls > 0 ? Math.round((occupiedStalls / totalStalls) * 100) : 0;
  const totalHorses = occupiedStalls;
  const monthlyRevenue = stalls.reduce((sum, stall) => sum + (stall.horseName.trim() !== "" ? stall.price : 0), 0);
  const totalRevenue = monthlyRevenue * 12;

  const handleAdd = () => {
    if (stalls.length >= 30) {
      alert("Maksimaalne arv bokse (30) on juba saavutatud");
      return;
    }
    setEditingStall(null);
    setFormData({ stallNumber: "", horseName: "", price: 350, comments: "" });
    setIsFormOpen(true);
  };

  const handleEdit = (stall: Stall) => {
    setEditingStall(stall);
    setFormData({ stallNumber: stall.stallNumber, horseName: stall.horseName, price: stall.price, comments: stall.comments });
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
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-900 text-base font-medium transition-colors">
            ← Tagasi avalehele
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-12 tracking-tight">Ülevaade</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8">
            <p className="text-base text-gray-500 mb-2">Hobused Kokku</p>
            <p className="text-4xl font-semibold text-gray-900">{totalHorses}</p>
            <p className="text-sm text-green-600 mt-2">{occupiedStalls} boksiga</p>
          </div>

          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8">
            <p className="text-base text-gray-500 mb-2">Täituvus</p>
            <p className="text-4xl font-semibold text-gray-900">{occupancyRate}%</p>
            <p className="text-sm text-gray-600 mt-2">{occupiedStalls}/{totalStalls} boksidest täidetud</p>
          </div>

          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8">
            <p className="text-base text-gray-500 mb-2">Kuu Tulu</p>
            <p className="text-4xl font-semibold text-gray-900">€{monthlyRevenue}</p>
            <p className="text-sm text-gray-600 mt-2">€{totalRevenue} kokku</p>
          </div>
        </div>

        {/* Stall Occupancy */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Bokside Kasutus</h2>
            <button
              onClick={handleAdd}
              className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
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
                    Hind (€/kuu)
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
                    <td className="py-3 px-4">€{stall.price}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{stall.comments || "-"}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(stall)}
                          className="text-gray-700 hover:text-gray-900 text-sm font-medium px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                        >
                          Muuda
                        </button>
                        <button
                          onClick={() => handleDelete(stall.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-2 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                {editingStall ? "Muuda Boksi" : "Lisa Uus Boks"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Boksi Number *
                </label>
                <input
                  type="text"
                  value={formData.stallNumber}
                  onChange={(e) => setFormData({ ...formData, stallNumber: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Hobuse Nimi
                </label>
                <input
                  type="text"
                  value={formData.horseName}
                  onChange={(e) => setFormData({ ...formData, horseName: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Hind (€/kuu) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                  min="0"
                  step="10"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Kommentaarid
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Tühista
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium"
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
