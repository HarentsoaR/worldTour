'use client'

import React, { useState } from 'react';
import Link from "next/link";
import { GlobeIcon, Menu, X } from 'lucide-react';
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <GlobeIcon className="h-8 w-8 text-blue-600 mr-2" />
              <span className="font-bold text-xl text-blue-600">World Tour</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/destinations" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Destinations
            </Link>
            <Link href="/attractions" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Attractions
            </Link>
            <Link href="/hotels" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Hotels
            </Link>
            {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/destinations" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
            Destinations
          </Link>
          <Link href="/attractions" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
            Attractions
          </Link>
          <Link href="/hotels" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
            Hotels
          </Link>
          {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
        </div>
      </div>
    </nav>
  );
}

