"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/types";
import { mockTrainers, mockHorses } from "@/lib/data";

interface TrainingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (training: Partial<Lesson>) => void;
  training?: Lesson | null;
}

export default function TrainingForm({ isOpen, onClose, onSave, training }: TrainingFormProps) {
  const [formData, setFormData] = useState({
    trainerId: "",
    horseId: "",
    clientName: "",
    clientEmail: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    type: "private" as "private" | "group" | "training",
    status: "scheduled" as "scheduled" | "completed" | "cancelled",
    price: 75,
    notes: "",
  });

  useEffect(() => {
    if (training) {
      setFormData({
        trainerId: training.trainerId,
        horseId: training.horseId,
        clientName: training.clientName,
        clientEmail: training.clientEmail,
        date: new Date(training.date).toISOString().split("T")[0],
        startTime: training.startTime,
        endTime: training.endTime,
        duration: training.duration,
        type: training.type,
        status: training.status,
        price: training.price,
        notes: training.notes || "",
      });
    } else {
      // Reset form when adding new
      setFormData({
        trainerId: "",
        horseId: "",
        clientName: "",
        clientEmail: "",
        date: new Date().toISOString().split("T")[0],
        startTime: "10:00",
        endTime: "11:00",
        duration: 60,
        type: "private",
        status: "scheduled",
        price: 75,
        notes: "",
      });
    }
  }, [training]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For group trainings, set default values for fields that aren't needed
    const dataToSave = formData.type === "group" ? {
      ...formData,
      horseId: formData.horseId || "none",
      clientName: formData.clientName || "Group Session",
      clientEmail: formData.clientEmail || "group@stable.com",
      price: 0,
      id: training?.id || Date.now().toString(),
      date: new Date(formData.date),
    } : {
      ...formData,
      id: training?.id || Date.now().toString(),
      date: new Date(formData.date),
    };

    onSave(dataToSave);
    onClose();
  };

  const isGroupTraining = formData.type === "group";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "price" ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">
              {training ? "Muuda Treeningut" : "Lisa Uus Treening"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl transition-colors"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type field first */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Tüüp *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              >
                <option value="private">Privaatne</option>
                <option value="group">Grupp</option>
                <option value="training">Treening</option>
              </select>
              {isGroupTraining && (
                <p className="text-sm text-gray-500 mt-1">
                  Grupitreeningud ei vaja hobuse, kliendi ega hinna infot
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Treener *
                </label>
                <select
                  name="trainerId"
                  value={formData.trainerId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Vali treener</option>
                  {mockTrainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              {!isGroupTraining && (
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Hobune *
                  </label>
                  <select
                    name="horseId"
                    value={formData.horseId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  >
                    <option value="">Vali hobune</option>
                    {mockHorses.map((horse) => (
                      <option key={horse.id} value={horse.id}>
                        {horse.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!isGroupTraining && (
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Kliendi Nimi *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              )}

              {!isGroupTraining && (
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Kliendi Email *
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Kuupäev *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Kestus (minutit) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="15"
                  step="15"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Algusaeg *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Lõpuaeg *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Staatus *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="scheduled">Planeeritud</option>
                  <option value="completed">Lõpetatud</option>
                  <option value="cancelled">Tühistatud</option>
                </select>
              </div>

              {!isGroupTraining && (
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Hind (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="5"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Märkmed
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Tühista
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                {training ? "Uuenda Treeningut" : "Lisa Treening"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
