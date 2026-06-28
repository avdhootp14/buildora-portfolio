"use client";
import { API_URL } from "../../../../utils/api";

import { useState, use } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function SetupAccount({ params }: { params: Promise<{ token: string }> }) {
  const unwrappedParams = use(params);
  const token = unwrappedParams.token;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/setup-account/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess('Account setup successfully! You can now log in.');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Failed to setup account. The link might be expired.');
      }
    } catch (err) {
      console.error('Setup error:', err);
      setError('An error occurred. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 absolute inset-0 z-50">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        
        {success ? (
          <div className="text-center py-4">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mb-6 mx-auto" />
            <h1 className="text-3xl font-bold text-white mb-4">You're All Set!</h1>
            <p className="text-gray-400 mb-8">{success}</p>
            <Link href="/admin/login" className="inline-block w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-accent/20">
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Setup Account</h1>
              <p className="text-gray-400">Create a secure password to activate your admin account.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSetup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                <div className="relative">
                  <input 
                    required
                    type={showPassword ? "text" : "password"} 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 rounded-lg transition-colors mt-4 disabled:opacity-70 shadow-lg shadow-accent/20"
              >
                {loading ? "Activating..." : "Activate Account"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
