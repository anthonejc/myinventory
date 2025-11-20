'use client';

import { useState } from 'react';

export default function AutomatedSection() {
  const [activeTab, setActiveTab] = useState('invoicing');

  const features = [
    {
      id: 'invoicing',
      title: 'Tailored invoicing for aviation',
      subtitle: 'API integration',
      description: 'Seamless integration with your aviation ERP and accounting systems.',
      icon: '✓'
    },
    {
      id: 'payment',
      title: 'Client payment portal', 
      subtitle: 'Hosted Invoice Page',
      description: 'A secure portal for your clients to view and pay.',
      icon: '✓'
    },
    {
      id: 'global',
      title: 'Secure global payments',
      subtitle: 'Bank transfers', 
      description: 'Swift and secure global payment settlements platform.',
      icon: '✓'
    },
    {
      id: 'management',
      title: 'Quick receivable management',
      subtitle: 'Smart retries',
      description: 'Intelligent retry system for any failed transactions.',
      icon: '✓'
    },
    {
      id: 'reporting',
      title: 'Reconciliation & reporting',
      subtitle: 'Custom reports',
      description: 'Detailed reporting tailored for aviation business insights.',
      icon: '✓'
    }
  ];

  const tags = [
    { name: 'Efficiency', color: 'bg-pink-100 text-pink-600' },
    { name: 'Streamline', color: 'bg-purple-100 text-purple-600' },
    { name: 'Automation', color: 'bg-green-100 text-green-600' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Automated <span className="text-gray-400">invoicing for</span>
            <br />
            <span className="text-gray-400">the</span> inventory <span className="font-bold">industry</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {tags.map((tag) => (
              <span key={tag.name} className={`px-4 py-2 rounded-full text-sm font-medium ${tag.color}`}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                activeTab === feature.id ? 'bg-gray-200 text-gray-500' : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(feature.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeTab === feature.id ? 'bg-white text-black' : 'bg-white text-black'
                }`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className={`font-medium ${activeTab === feature.id ? 'text-gray-600' : 'text-gray-600'}`}>
                    {feature.subtitle}
                  </div>
                  <div className={`text-sm ${activeTab === feature.id ? 'text-gray-500' : 'text-gray-500'}`}>
                    {feature.description}
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeTab === feature.id ? 'bg-white text-black' : 'bg-gray-200'
                }`}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 overflow-hidden">
          <div className="absolute top-10 right-20 w-4 h-4 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-gray-400 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold">I</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Upload <span className="text-gray-500">requirements,</span>
              <br />
              <span className="text-gray-500">receive</span> global quotes.
            </h3>
            
            <button onClick={() => window.location.href = "/signup"} className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors mt-6 cursor-pointer">
              View Demo →
            </button>
          </div>

          <div className="absolute bottom-0 right-0 opacity-20">
            <svg width="200" height="100" viewBox="0 0 200 100" className="text-gray-400">
              <path d="M20 50 L180 30 L170 40 L180 50 L170 60 L180 70 L20 50 Z" fill="currentColor" />
              <circle cx="60" cy="50" r="3" fill="currentColor" />
              <circle cx="120" cy="45" r="3" fill="currentColor" />
              <circle cx="140" cy="55" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}