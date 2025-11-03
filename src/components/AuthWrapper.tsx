"use client";

import { useState, useEffect } from "react";

const CORRECT_PASSWORD = "pariisitall100";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Vale parool");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Laadimine...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8 sm:p-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold text-gray-900 mb-3">Pariisi Tall</h1>
              <p className="text-gray-500 text-lg">Talli Haldussüsteem</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                  Sisesta parool
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Parool"
                  autoFocus
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                Sisene
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Logout button in top-right corner */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm"
        >
          Logi välja
        </button>
      </div>
      {children}
    </div>
  );
}
