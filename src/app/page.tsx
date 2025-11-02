"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
            Pariisi Tall
          </h1>
          <p className="text-2xl text-gray-500 font-light">
            Talli Haldussüsteem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hobused Card */}
          <Link
            href="/horses"
            className="group bg-gray-50 p-8 rounded-3xl hover:bg-gray-100 transition-all duration-200 flex flex-col border border-gray-200/50"
          >
            <div className="mb-8">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">🐴</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Hobuste Register</h3>
              <p className="text-gray-500 text-base leading-relaxed flex-grow">
                Halda hobuste profiile, meditsiiniandmeid ja treeningmärkmed
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-blue-500 font-medium group-hover:text-blue-600">Vaata →</span>
            </div>
          </Link>

          {/* Treenerid Card */}
          <Link
            href="/trainers"
            className="group bg-gray-50 p-8 rounded-3xl hover:bg-gray-100 transition-all duration-200 flex flex-col border border-gray-200/50"
          >
            <div className="mb-8">
              <div className="w-14 h-14 bg-green-500 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Treenerid</h3>
              <p className="text-gray-500 text-base leading-relaxed flex-grow">
                Halda treenerite profiile ja nende erialasid
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-green-500 font-medium group-hover:text-green-600">Vaata →</span>
            </div>
          </Link>

          {/* Treeningud Card */}
          <Link
            href="/schedule"
            className="group bg-gray-50 p-8 rounded-3xl hover:bg-gray-100 transition-all duration-200 flex flex-col border border-gray-200/50"
          >
            <div className="mb-8">
              <div className="w-14 h-14 bg-purple-500 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Treeningud</h3>
              <p className="text-gray-500 text-base leading-relaxed flex-grow">
                Vaata treeninguid päevade ja aegade kaupa
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-purple-500 font-medium group-hover:text-purple-600">Vaata →</span>
            </div>
          </Link>

          {/* Ülevaade Card */}
          <Link
            href="/dashboard"
            className="group bg-gray-50 p-8 rounded-3xl hover:bg-gray-100 transition-all duration-200 flex flex-col border border-gray-200/50"
          >
            <div className="mb-8">
              <div className="w-14 h-14 bg-orange-500 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Ülevaade</h3>
              <p className="text-gray-500 text-base leading-relaxed flex-grow">
                Jälgi täituvust, tulu ja hobuste kasutust
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-orange-500 font-medium group-hover:text-orange-600">Vaata →</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
