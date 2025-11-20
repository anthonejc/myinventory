'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">InventoryPro</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#technology" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Technology</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</Link>
            <Link href="#blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Login</Link>
            <Link href="/signup" className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105">View Demo</Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}