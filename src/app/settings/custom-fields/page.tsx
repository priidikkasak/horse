"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CustomField {
  id: string;
  label: string;
  key: string;
  fieldType: string;
  options: string[] | null;
  required: boolean;
  placeholder: string | null;
  helpText: string | null;
  displayOrder: number;
}

const FIELD_TYPES = [
  { value: "TEXT", label: "Tekst" },
  { value: "NUMBER", label: "Number" },
  { value: "DATE", label: "Kuupäev" },
  { value: "TEXTAREA", label: "Pikk tekst" },
  { value: "SELECT", label: "Valik" },
  { value: "CHECKBOX", label: "Märkeruut" },
];

export default function CustomFieldsPage() {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    key: "",
    fieldType: "TEXT",
    options: "",
    required: false,
    placeholder: "",
    helpText: "",
  });

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await fetch("/api/horse-custom-fields");
      if (response.ok) {
        const data = await response.json();
        setFields(data);
      }
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const handleAdd = () => {
    setEditingField(null);
    setFormData({
      label: "",
      key: "",
      fieldType: "TEXT",
      options: "",
      required: false,
      placeholder: "",
      helpText: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (field: CustomField) => {
    setEditingField(field);
    setFormData({
      label: field.label,
      key: field.key,
      fieldType: field.fieldType,
      options: field.options ? field.options.join(", ") : "",
      required: field.required,
      placeholder: field.placeholder || "",
      helpText: field.helpText || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Kas oled kindel, et soovid selle välja kustutada?")) {
      return;
    }

    try {
      const response = await fetch(`/api/horse-custom-fields/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFields(fields.filter((f) => f.id !== id));
      }
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate key from label if not provided
    const key = formData.key || formData.label.toLowerCase().replace(/\s+/g, "_");

    // Parse options if SELECT type
    const options = formData.fieldType === "SELECT" && formData.options
      ? formData.options.split(",").map((o) => o.trim()).filter((o) => o)
      : null;

    const payload = {
      label: formData.label,
      key,
      fieldType: formData.fieldType,
      options,
      required: formData.required,
      placeholder: formData.placeholder || null,
      helpText: formData.helpText || null,
      displayOrder: editingField ? editingField.displayOrder : fields.length,
    };

    try {
      if (editingField) {
        const response = await fetch(`/api/horse-custom-fields/${editingField.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          fetchFields();
        }
      } else {
        const response = await fetch("/api/horse-custom-fields", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          fetchFields();
        }
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving field:", error);
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
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">
              Kohandatud Väljad
            </h1>
            <p className="text-gray-500 mt-2">Halda hobuste kohta lisatavaid andmevälju</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium whitespace-nowrap"
          >
            Lisa Uus Väli
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-200/50">
            <p className="text-gray-500">Kohandatud välju pole veel lisatud.</p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-6 sm:p-8">
            <div className="space-y-4">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">{field.label}</h2>
                        {field.required && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            Kohustuslik
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-900">
                        <div>
                          <span className="font-medium">Tüüp:</span>{" "}
                          {FIELD_TYPES.find((t) => t.value === field.fieldType)?.label}
                        </div>
                        <div>
                          <span className="font-medium">Key:</span> {field.key}
                        </div>
                        {field.helpText && (
                          <div className="col-span-2 sm:col-span-3">
                            <span className="font-medium">Abitext:</span> {field.helpText}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <button
                        onClick={() => handleEdit(field)}
                        className="flex-1 sm:flex-none text-gray-700 hover:text-gray-900 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-all duration-200"
                      >
                        Muuda
                      </button>
                      <button
                        onClick={() => handleDelete(field.id)}
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
      </main>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                {editingField ? "Muuda Välja" : "Lisa Uus Väli"}
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
                  Välja nimi *
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                  placeholder="nt. Mikrokiibi number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Välja tüüp *
                </label>
                <select
                  value={formData.fieldType}
                  onChange={(e) => setFormData({ ...formData, fieldType: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  {FIELD_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.fieldType === "SELECT" && (
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Valikud *
                  </label>
                  <input
                    type="text"
                    value={formData.options}
                    onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                    required
                    placeholder="Valik 1, Valik 2, Valik 3"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-2">Eralda komaga</p>
                </div>
              )}

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Placeholder tekst
                </label>
                <input
                  type="text"
                  value={formData.placeholder}
                  onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                  placeholder="nt. Sisesta mikrokiibi number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Abitext
                </label>
                <input
                  type="text"
                  value={formData.helpText}
                  onChange={(e) => setFormData({ ...formData, helpText: e.target.value })}
                  placeholder="nt. 15-kohaline number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="required"
                  checked={formData.required}
                  onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
                />
                <label htmlFor="required" className="text-base font-medium text-gray-700">
                  Kohustuslik väli
                </label>
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
                  {editingField ? "Uuenda" : "Lisa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
