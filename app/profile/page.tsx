"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaTrophy, FaGraduationCap, FaChartLine, FaClock } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    avatarUrl: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();
      
      if (!data.authenticated) {
        router.push("/auth/login");
        return;
      }
      
      fetchProfile();
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/auth/login");
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setFormData({
          name: data.user.name || "",
          avatarUrl: data.user.avatarUrl || "",
        });
      } else {
        const data = await response.json();
        setError(data.error || "Error loading profile");
      }
    } catch (error) {
      setError("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setSuccess("Profile updated successfully!");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Error updating profile");
      }
    } catch (error) {
      setError("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-emerald-900/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-emerald-800/30">
          <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-emerald-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-emerald-900/50 border border-emerald-800/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium text-emerald-200">
                Avatar URL (optional)
              </label>
              <input
                type="url"
                id="avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-emerald-900/50 border border-emerald-800/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {success && (
              <div className="text-emerald-400 text-sm">{success}</div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-emerald-200">
                <p>Email: {user?.email}</p>
                <p>Total Score: {user?.totalScore || 0}</p>
                <p>Quizzes Taken: {user?.quizzesTaken || 0}</p>
                {user?.isAdmin && (
                  <p className="text-emerald-400">Admin User</p>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Avatar Preview */}
          {formData.avatarUrl && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-emerald-200 mb-2">Avatar Preview</h3>
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src={formData.avatarUrl} 
                  alt="Avatar preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/200x200?text=Avatar";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

