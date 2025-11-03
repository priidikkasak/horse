"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Horse } from "@/types";

interface CustomField {
  id: string;
  label: string;
  key: string;
  fieldType: string;
  displayOrder: number;
}

export default function HorseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [horse, setHorse] = useState<Horse | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [customData, setCustomData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetchHorse(p.id);
      fetchCustomFields();
    });
  }, [params]);

  const fetchHorse = async (horseId: string) => {
    try {
      const response = await fetch(`/api/horses/${horseId}`);
      if (response.ok) {
        const data = await response.json();
        setHorse(data);

        // Parse customData
        try {
          const parsed = typeof data.customData === 'string'
            ? JSON.parse(data.customData)
            : data.customData || {};
          setCustomData(parsed);
        } catch {
          setCustomData({});
        }
      }
    } catch (error) {
      console.error("Error fetching horse:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomFields = async () => {
    try {
      const response = await fetch("/api/horse-custom-fields");
      if (response.ok) {
        const data = await response.json();
        setCustomFields(data);
      }
    } catch (error) {
      console.error("Error fetching custom fields:", error);
    }
  };

  const formatCustomValue = (value: any, fieldType: string) => {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    switch (fieldType) {
      case 'DATE':
        try {
          return new Date(value).toLocaleDateString();
        } catch {
          return value;
        }
      case 'CHECKBOX':
        return value === true || value === 'true' ? 'Jah' : 'Ei';
      default:
        return String(value);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
          <p className="text-center text-gray-500">Laen...</p>
        </main>
      </div>
    );
  }

  if (!horse) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
          <Link
            href="/horses"
            className="text-gray-500 hover:text-gray-900 text-base font-medium transition-colors mb-6 inline-block"
          >
            ← Tagasi
          </Link>
          <p className="text-center text-gray-500">Hobust ei leitud</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link
            href="/horses"
            className="text-gray-500 hover:text-gray-900 text-base font-medium transition-colors"
          >
            ← Tagasi
          </Link>
        </div>

        {/* Horse Profile */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                {horse.name}
              </h1>
              <p className="text-lg text-gray-600">{horse.breed}</p>
            </div>
            <span
              className={`px-3 py-1.5 text-sm rounded-full font-medium ${
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Vanus</p>
              <p className="text-xl font-semibold text-gray-900">{horse.age} aastat</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Värv</p>
              <p className="text-xl font-semibold text-gray-900">{horse.color}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Omanik</p>
              <p className="text-xl font-semibold text-gray-900">{horse.owner}</p>
            </div>
          </div>

          {/* Custom Fields Section */}
          {customFields.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lisainfo</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {customFields.map((field) => {
                  const value = customData[field.key];

                  return (
                    <div key={field.id}>
                      <p className="text-sm font-medium text-gray-500 mb-1">{field.label}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCustomValue(value, field.fieldType)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medical Records */}
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Tervislikud Andmed</h2>
            </div>
            {horse.medicalRecords && horse.medicalRecords.length > 0 ? (
              <div className="space-y-4">
                {horse.medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-gray-900">{record.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Dr. {record.veterinarian}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tervislikke andmeid pole</p>
            )}
          </div>

          {/* Vaccinations */}
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Vaktsineerimised</h2>
            </div>
            {horse.vaccinations && horse.vaccinations.length > 0 ? (
              <div className="space-y-4">
                {horse.vaccinations.map((vac) => (
                  <div
                    key={vac.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4"
                  >
                    <p className="font-semibold text-gray-900">{vac.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Manustatud: {new Date(vac.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Järgmine: {new Date(vac.nextDue).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Dr. {vac.veterinarian}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Vaktsineerimisandmeid pole</p>
            )}
          </div>

          {/* Training Notes */}
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Treeningmärkmed</h2>
            </div>
            {horse.trainingNotes && horse.trainingNotes.length > 0 ? (
              <div className="space-y-4">
                {horse.trainingNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-gray-900">{note.trainer}</p>
                        <p className="text-sm text-gray-600 mt-1">{note.notes}</p>
                        <p className="text-sm text-gray-500 mt-2">{note.duration} minutit</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Treeningmärkeid pole</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
