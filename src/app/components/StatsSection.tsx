'use client';

import { useEffect, useState } from 'react';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">Pratt & Whitney</div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2">Honeywell Aerospace</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Bulgaria</span>
                  <span className="text-2xl font-bold text-gray-900">+124k</span>
                </div>
              </div>

              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${isVisible ? 84 * 2.51 : 0} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-2000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">84%</span>
                </div>
                
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                  <span className="text-xs text-gray-500">24%</span>
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2">
                  <span className="text-xs text-gray-500">62%</span>
                </div>
                <div className="absolute bottom-0 right-1/4 transform translate-y-4">
                  <span className="text-xs text-gray-500">44%</span>
                </div>
                <div className="absolute bottom-0 left-1/4 transform translate-y-4">
                  <span className="text-xs text-gray-500">52%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="text-gray-600">The platform</span>
              <span className="font-semibold">emerged as a pivotal tool,</span>
              <span className="text-gray-600">optimizing logistics</span>
              <span className="font-semibold">in aviation.</span>
            </div>

            <div className="space-y-4">
              <div className="text-6xl font-bold text-gray-900">20%</div>
              <p className="text-gray-600">
                Platform cuts delays,<br />
                boosts efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}