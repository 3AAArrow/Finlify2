"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/check", {
        method: "GET",
        headers: { 
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache'
        },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.authenticated) {
        router.replace('/profile');
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    console.log("Login submission started");
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      console.log("Authenticating with Supabase...");
      // First authenticate with Supabase
      const { data: supabaseData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (signInError) {
        console.error("Supabase auth error:", signInError);
        setError(signInError.message);
        setIsLoading(false);
        return;
      }
  
      console.log("Supabase auth successful, calling API...");
      // Then get the session token from our API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
  
      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API response data:", data);
  
      if (response.ok && data.success) {
        console.log("Login successful, redirecting to profile");
        // Use window.location for a full page reload to ensure cookies are applied
        window.location.href = '/profile';
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-800/30 placeholder-gray-500 text-white bg-emerald-900/50 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-800/30 placeholder-gray-500 text-white bg-emerald-900/50 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            href="/auth/register"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}