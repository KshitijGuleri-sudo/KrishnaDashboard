/**
 * Admin Dashboard - Clean & Working
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject } from '../utils/localStorage';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login', { replace: true });
      return;
    }
    try {
      const userData = JSON.parse(savedUser);
      if (userData.role !== 'admin') {
        navigate('/login', { replace: true });
        return;
      }
      setUser(userData);
      loadProjects();
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, []);

  const loadProjects = () => {
    setProjects(getProjects());
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this project?')) {
      deleteProject(id);
      loadProjects();
    }
  };

  const handleSave = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      createProject(projectData);
    }
    setShowModal(false);
    loadProjects();
  };

  const stats = {
    total: projects.length,
    processing: projects.filter(p => p.status === 'processing').length,
    completed: projects.filter(p => p.status === 'completed').length,
    pending: projects.filter(p => !p.paymentDone).length
  };

  if (!user) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Processing</p>
            <p className="text-3xl font-bold text-gray-800">{stats.processing}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Completed</p>
            <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Payments Pending</p>
            <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Projects</h2>
          <button
            onClick={handleAddProject}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-bold shadow-lg transform hover:scale-105 transition-all"
          >
            + Add New Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Company</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Couple</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Model</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{project.companyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{project.coupleName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{project.modelName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{project.projectDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      {project.projectType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={project.paymentDone}
                      onChange={() => {
                        updateProject(project.id, { paymentDone: !project.paymentDone });
                        loadProjects();
                      }}
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal */}
      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ProjectModal({ project, onClose, onSave }) {
  const [formData, setFormData] = useState({
    companyName: project?.companyName || '',
    coupleName: project?.coupleName || '',
    modelName: project?.modelName || '',
    projectDate: project?.projectDate || '',
    projectType: project?.projectType || 'Video',
    status: project?.status || 'processing',
    paymentDone: project?.paymentDone || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Couple Name</label>
            <input
              type="text"
              required
              value={formData.coupleName}
              onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Camera Model</label>
            <input
              type="text"
              required
              value={formData.modelName}
              onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Project Date</label>
            <input
              type="date"
              required
              value={formData.projectDate}
              onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Project Type</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="Video">Video</option>
              <option value="Photo">Photo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.paymentDone}
              onChange={(e) => setFormData({ ...formData, paymentDone: e.target.checked })}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label className="text-sm font-bold text-gray-700">Payment Done</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-bold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
