import { useState } from "react";
import api from "../api/axios";

export default function Integrations() {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const syncEmails = async () => {
    try {
      setLoading(true);
      await api.post("/emails/sync", { days });
      alert("Emails synced successfully!");
    } catch (error) {
      console.error(error);
      alert("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  const connectGmail = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      {/* 1. Top Header */}
      <header className="bg-[#1a1d21] border-b border-gray-800 px-8 py-4 w-full">
        <h1 className="text-xl font-bold text-white tracking-tight">
          BeyondChats Dashboard
        </h1>
      </header>

      {/* 2. Centered Content Wrapper */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-xl w-full">
          
          {/* Section Title - Centered above card */}
          <h2 className="text-lg font-semibold mb-6 text-gray-800 text-center">
            Gmail Integration
          </h2>

          {/* Integration Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-8">

            {/* Gmail Connection Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="font-bold text-gray-900">Connect Gmail Account</p>
                <p className="text-sm text-gray-500">
                  Authorize your Gmail account to sync emails
                </p>
              </div>

              <button
                onClick={connectGmail}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors active:scale-95"
              >
                Connect Gmail
              </button>
            </div>

            <hr className="border-gray-100" />

            {/* Sync Settings */}
            <div className="space-y-3">
              <p className="font-bold text-gray-700 text-center">
                Sync emails from the last
              </p>

              <select
                className="w-full border-2 border-gray-100 rounded-lg p-3 text-center bg-gray-50 focus:border-blue-500 outline-none transition-all font-medium"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
              </select>
            </div>

            {/* Main Action Button */}
            <button
              onClick={syncEmails}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold tracking-wide shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Syncing Emails..." : "Sync Emails"}
            </button>

          </div>
          
          <p className="mt-6 text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
            Secure OAuth 2.0 Integration
          </p>
        </div>
      </main>
    </div>
  );
}