/**
 * Client Dashboard - Clean & Working
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../utils/localStorage';

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(savedUser);
    if (userData.role !== 'client') {
      navigate('/login');
      return;
    }
    setUser(userData);
    setProjects(getProjects());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Client Portal</h1>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{project.coupleName}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status === 'completed' ? 'Ready' : 'In Progress'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-bold">Company:</span> {project.companyName}</p>
                <p><span className="font-bold">Type:</span> {project.projectType}</p>
                <p><span className="font-bold">Date:</span> {project.projectDate}</p>
                <p><span className="font-bold">Model:</span> {project.modelName}</p>
              </div>

              {project.status === 'completed' && (
                <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                  <p className="text-green-800 font-bold text-sm">✓ Project Complete!</p>
                  <p className="text-green-600 text-xs mt-1">Ready for delivery</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
