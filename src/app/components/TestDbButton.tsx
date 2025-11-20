'use client';

import { useState } from 'react';

export default function TestDbButton() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testDb = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setResult(data.connected ? '✅ Connected!' : '❌ Failed: ' + data.error);
    } catch (error) {
      setResult('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown'));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <button 
        onClick={testDb}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test DB Connection'}
      </button>
      {result && <p className="text-sm">{result}</p>}
    </div>
  );
}