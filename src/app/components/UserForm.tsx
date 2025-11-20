'use client';

import { useState } from 'react';

export default function UserForm() {
  const [result, setResult] = useState('');
  const [users, setUsers] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role')
    };

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + error);
    }
  };

  const viewUsers = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setUsers(JSON.stringify(data, null, 2));
    } catch (error) {
      setUsers('Error: ' + error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="name" placeholder="Name" required className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" />
        <select name="role" required className="w-full p-2 border rounded">
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USERS">USERS</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add User</button>
      </form>
      <button onClick={viewUsers} className="mt-4 w-full p-2 bg-green-500 text-white rounded">View All Users</button>
      {result && <pre className="mt-4 p-2 rounded text-sm">{result}</pre>}
      {users && <pre className="mt-4 p-2  rounded text-sm">{users}</pre>}
    </div>
  );
}