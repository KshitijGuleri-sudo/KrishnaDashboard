/**
 * Simple, Clean Login Page - No Bugs
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimpleLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Demo login (no backend needed)
    const users = {
      'admin@example.com': { role: 'admin', name: 'Admin User', password: 'admin123' },
      'editor@example.com': { role: 'editor', name: 'John Editor', password: 'editor123' },
      'client@example.com': { role: 'client', name: 'Client User', password: 'client123' }
    };

    const user = users[formData.email];

    if (!user || user.password !== formData.password) {
      setError('Invalid email or password');
      return;
    }

    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      name: user.name,
      role: user.role
    }));

    // Navigate to appropriate dashboard
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user.role === 'editor') {
      navigate('/editor-dashboard');
    } else {
      navigate('/client-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-4 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">EditPro Studio</h1>
          <p className="text-emerald-200">Wedding Video & Photo Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-4 bg-white border-3 border-amber-500 rounded-xl text-gray-900 text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-amber-600 shadow-md"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-4 bg-white border-3 border-amber-500 rounded-xl text-gray-900 text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-amber-600 shadow-md"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-xl text-lg"
            >
              Sign In →
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <p className="text-sm font-bold text-gray-700 mb-3">🔑 Demo Accounts:</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Admin:</span>
                <span className="text-gray-600">admin@example.com / admin123</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Editor:</span>
                <span className="text-gray-600">editor@example.com / editor123</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Client:</span>
                <span className="text-gray-600">client@example.com / client123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
