"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserClient from "./UserClient";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    console.log("Token:", token);
    console.log("User data:", userData);
    
    if (!token) {
      router.push("/login");
      return;
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log("Parsed user:", parsedUser);
      console.log("User role:", parsedUser.role);
      
      if (parsedUser.role !== "USER") {
        setError(`User with ${parsedUser.role} role does not have access to USER dashboard`);
        return;
      }
      setUser(parsedUser);
    } else {
      router.push("/login");
      return;
    }

  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <UserClient user={user} />;
}

