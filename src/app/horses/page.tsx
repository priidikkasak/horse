"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Horse } from "@/types";

export default function HorsesPage() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  // Load horses from API on mount
  useEffect(() => {
    fetchHorses();
  }, []);

  const fetchHorses = async () => {
    try {
      const response = await fetch("/api/horses");
      if (response.ok) {
        const data = await response.json();
        setHorses(data);
      }
    } catch (error) {
      console.error("Error fetching horses:", error);
    }
  };
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHorse, setEditingHorse] = useState<Horse | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: 0,
    color: "",
    owner: "",
    status: "active" as "active" | "injured" | "retired",
    stallNumber: ""
  });

  const handleAdd = () => {
    setEditingHorse(null);
    setFormData({
      name: "",
      breed: "",
      age: 0,
      color: "",
      owner: "",
      status: "active",
      stallNumber: ""
    });
    setIsFormOpen(true);
  };

  const handleEdit = (horse: Horse) => {
    setEditingHorse(horse);
    setFormData({
      name: horse.name,
      breed: horse.breed,
      age: horse.age,
      color: horse.color,
      owner: horse.owner,
      status: horse.status,
      stallNumber: horse.stallNumber || ""
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Kas oled kindel, et soovid selle hobuse kustutada?")) {
      try {
        const response = await fetch(`/api/horses/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setHorses(horses.filter((h) => h.id !== id));
        }
      } catch (error) {
        console.error("Error deleting horse:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHorse) {
        const response = await fetch(`/api/horses/${editingHorse.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setHorses(horses.map(h => h.id === editingHorse.id ? { ...h, ...formData } : h));
        }
      } else {
        const response = await fetch("/api/horses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const newHorse = await response.json();
          setHorses([...horses, newHorse]);
        }
      }
      setIsFormOpen(false);
      setEditingHorse(null);
    } catch (error) {
      console.error("Error saving horse:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-900 text-base font-medium transition-colors">
            ← Tagasi avalehele
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">Hobused</h1>
          <button
            onClick={handleAdd}
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium whitespace-nowrap"
          >
            Lisa Uus Hobune
          </button>
        </div>

        {/* View Toggle */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setView("grid")}
            className={`px-6 py-3 rounded-2xl transition-all duration-200 font-medium ${
              view === "grid"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Kaartide Vaade
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-6 py-3 rounded-2xl transition-all duration-200 font-medium ${
              view === "list"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Loendi Vaade
          </button>
        </div>

        {/* Grid View */}
        {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {horses.map((horse) => (
            <div
              key={horse.id}
              className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-6">
                <Link href={`/horses/${horse.id}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
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

              <div className="space-y-2 text-sm text-gray-900 mb-4">
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
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Link
                  href={`/horses/${horse.id}`}
                  className="flex-1 text-center bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-200"
                >
                  Vaata
                </Link>
                <button
                  onClick={() => handleEdit(horse)}
                  className="flex-1 text-gray-700 hover:text-gray-900 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-all duration-200"
                  title="Muuda"
                >
                  Muuda
                </button>
                <button
                  onClick={() => handleDelete(horse.id)}
                  className="flex-1 text-red-600 hover:text-red-700 px-4 py-2.5 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-medium transition-all duration-200"
                  title="Kustuta"
                >
                  Kustuta
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8">
            <div className="space-y-4">
              {horses.map((horse) => (
                <div
                  key={horse.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Link href={`/horses/${horse.id}`}>
                          <h2 className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
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
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-900">
                        <div>
                          <span className="font-medium">Tõug:</span> {horse.breed}
                        </div>
                        <div>
                          <span className="font-medium">Vanus:</span> {horse.age} aastat
                        </div>
                        <div>
                          <span className="font-medium">Värv:</span> {horse.color}
                        </div>
                        <div>
                          <span className="font-medium">Omanik:</span> {horse.owner}
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <Link
                        href={`/horses/${horse.id}`}
                        className="flex-1 sm:flex-none text-center bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-200"
                      >
                        Vaata
                      </Link>
                      <button
                        onClick={() => handleEdit(horse)}
                        className="flex-1 sm:flex-none text-gray-700 hover:text-gray-900 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-all duration-200"
                      >
                        Muuda
                      </button>
                      <button
                        onClick={() => handleDelete(horse.id)}
                        className="flex-1 sm:flex-none text-red-600 hover:text-red-700 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-medium transition-all duration-200"
                      >
                        Kustuta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {horses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hobuseid pole veel registreeritud.</p>
          </div>
        )}
      </main>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                {editingHorse ? "Muuda Hobust" : "Lisa Uus Hobune"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Nimi *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Tõug *
                  </label>
                  <input
                    type="text"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Vanus *
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Värv *
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Omanik *
                  </label>
                  <input
                    type="text"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Boksi Number
                  </label>
                  <input
                    type="text"
                    value={formData.stallNumber}
                    onChange={(e) => setFormData({ ...formData, stallNumber: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Staatus *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "injured" | "retired" })}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  >
                    <option value="active">Aktiivne</option>
                    <option value="injured">Vigastatud</option>
                    <option value="retired">Pensionil</option>
                  </select>
                </div>
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
                  {editingHorse ? "Uuenda" : "Lisa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
