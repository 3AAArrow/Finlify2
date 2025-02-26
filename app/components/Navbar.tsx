"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      const data = await response.json();
      setIsAuthenticated(data.authenticated);

      // If not authenticated and trying to access protected routes, redirect to login
      if (!data.authenticated && 
          !pathname?.includes('/auth/') && 
          pathname !== '/') {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    }
  };

  // Check auth on mount and pathname change
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        await checkAuth(); // Recheck auth status after logout
        router.push("/auth/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  const NavLinks = () => (
    <>
      {isAuthenticated ? (
        <>
          <Link
            href="/profile"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/profile')
                ? 'text-emerald-200 bg-emerald-800/50'
                : 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/quiz"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname.startsWith('/quiz')
                ? 'text-emerald-200 bg-emerald-800/50'
                : 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Quiz
          </Link>
          <Link
            href="/leaderboard"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/leaderboard')
                ? 'text-emerald-200 bg-emerald-800/50'
                : 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Leaderboard
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            disabled={isLoggingOut}
            className="px-3 py-2 rounded-md text-sm font-medium text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30 disabled:opacity-50"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/auth/login')
                ? 'text-emerald-200 bg-emerald-800/50'
                : 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/auth/register')
                ? 'text-emerald-200 bg-emerald-800/50'
                : 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-800/30'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-900/95 to-teal-900/95 backdrop-blur-sm border-b border-emerald-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center px-2 font-bold text-xl bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent"
            >
              Finlify
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-emerald-300 hover:text-emerald-200 p-2"
            >
              <span className="sr-only">Open menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-emerald-900/95 to-teal-900/95">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
}

