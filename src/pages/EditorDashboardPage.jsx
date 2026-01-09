/**
 * Editor Dashboard - Clean & Working
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, updateProject, initializeSeedData } from '../utils/localStorage';

export default function EditorDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login', { replace: true });
      return;
    }
    try {
      const userData = JSON.parse(savedUser);
      if (userData.role !== 'editor') {
        navigate('/login', { replace: true });
        return;
      }
      setUser(userData);
      initializeSeedData(); // Ensure we have sample data
      setProjects(getProjects());
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleStatusChange = (e, id, newStatus) => {
    e.preventDefault();
    e.stopPropagation();
    updateProject(id, { status: newStatus });
    const updatedProjects = getProjects();
    setProjects(updatedProjects);
  };

  if (!user) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Editor Dashboard</h1>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{project.coupleName}</h3>
              <p className="text-sm text-gray-600 mb-1">Company: {project.companyName}</p>
              <p className="text-sm text-gray-600 mb-1">Model: {project.modelName}</p>
              <p className="text-sm text-gray-600 mb-1">Date: {project.projectDate}</p>
              <p className="text-sm text-gray-600 mb-4">Type: {project.projectType}</p>
              
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-2">Update Status:</label>
                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(e, project.id, e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                >
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className={`px-3 py-2 rounded-lg text-center font-bold text-sm ${
                project.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status === 'completed' ? '✓ Completed' : '⏳ Processing'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
