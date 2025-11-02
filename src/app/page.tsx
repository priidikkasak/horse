"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pariisi Tall
          </h1>
          <p className="text-xl text-gray-600">
            Talli Haldussüsteem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Hobused Card */}
          <Link
            href="/horses"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hobuste Register</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Halda hobuste profiile, meditsiiniandmeid, vaktsineerimisi ja treeningmärkmed
            </p>
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              Vaata Hobuseid
            </button>
          </Link>

          {/* Treenerid Card */}
          <Link
            href="/trainers"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Treenerid</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Halda treenerite profiile ja nende erialasid
            </p>
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              Vaata Treenereid
            </button>
          </Link>

          {/* Graafik Card */}
          <Link
            href="/schedule"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Treeninggraafikud</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Vaata treeninggraafikuid päevade ja aegade kaupa koos treeneritega
            </p>
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              Vaata Graafikut
            </button>
          </Link>

          {/* Ülevaade Card */}
          <Link
            href="/dashboard"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ülevaade</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Jälgi täituvust, tulu, treeninguid ja hobuste kasutust
            </p>
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
              Vaata Ülevaadet
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
