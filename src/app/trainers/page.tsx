"use client";

import { useState } from "react";
import Link from "next/link";
import { mockTrainers } from "@/lib/data";
import { Trainer } from "@/types";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: ""
  });

  const handleAdd = () => {
    setEditingTrainer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialties: ""
    });
    setIsFormOpen(true);
  };

  const handleEdit = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setFormData({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      specialties: trainer.specialties.join(", ")
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Kas oled kindel, et soovid selle treeneri kustutada?")) {
      setTrainers(trainers.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specialtiesArray = formData.specialties.split(",").map(s => s.trim()).filter(s => s);

    if (editingTrainer) {
      setTrainers(trainers.map(t => t.id === editingTrainer.id ? {
        ...t,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialties: specialtiesArray
      } : t));
    } else {
      const newTrainer: Trainer = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialties: specialtiesArray,
        availability: [],
        createdAt: new Date()
      };
      setTrainers([...trainers, newTrainer]);
    }
    setIsFormOpen(false);
    setEditingTrainer(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-900 text-base font-medium transition-colors">
            ← Tagasi avalehele
          </Link>
        </div>

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">Treenerid</h1>
          <button
            onClick={handleAdd}
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium"
          >
            Lisa Uus Treener
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{trainer.name}</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(trainer)}
                    className="text-gray-700 hover:text-gray-900 text-sm font-medium px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                    title="Muuda"
                  >
                    Muuda
                  </button>
                  <button
                    onClick={() => handleDelete(trainer.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-2 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
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

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                {editingTrainer ? "Muuda Treenerit" : "Lisa Uus Treener"}
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
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Erialad *
                </label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  required
                  placeholder="Nt: Dresuur, Takistussõit, Võistlusratsutamine"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
                <p className="text-sm text-gray-500 mt-2">Eralda komaga</p>
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
                  {editingTrainer ? "Uuenda" : "Lisa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
