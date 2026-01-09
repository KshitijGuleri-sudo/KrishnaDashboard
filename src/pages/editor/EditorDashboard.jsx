/**
 * Editor Dashboard
 * View and update assigned projects only
 * Royal Wedding Theme
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectAPI } from '../../services/api';
import { Crown, Clock, CheckCircle, Upload, FileText } from 'lucide-react';

export default function EditorDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      await projectAPI.update(projectId, { status: newStatus });
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const myStats = {
    total: projects.length,
    pending: projects.filter(p => p.status === 'pending').length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-green to-royal-brown shadow-royal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-royal-gold flex items-center justify-center shadow-gold">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-elegant text-3xl font-bold text-white">
                Editor Dashboard
              </h1>
              <p className="text-royal-cream/80 text-sm">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Assigned" value={myStats.total} icon={<FileText />} color="from-royal-gold to-royal-gold-light" />
          <StatCard title="Pending" value={myStats.pending} icon={<Clock />} color="from-yellow-500 to-orange-500" />
          <StatCard title="In Progress" value={myStats.inProgress} icon={<Upload />} color="from-blue-500 to-blue-600" />
          <StatCard title="Completed" value={myStats.completed} icon={<CheckCircle />} color="from-royal-green to-royal-green-dark" />
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-gold/20">
          <div className="p-6 border-b border-royal-gold/20">
            <h3 className="font-elegant text-xl font-semibold text-royal-green">
              My Assigned Projects
            </h3>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-royal-gold border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No projects assigned yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-royal-cream/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Shoot Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Delivery</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-royal-gold/10">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-royal-cream/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {project.client_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                        {project.project_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(project.shoot_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(project.delivery_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={project.status}
                          onChange={(e) => handleStatusUpdate(project.id, e.target.value)}
                          className="text-sm border border-royal-gold/30 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-royal-gold"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-royal-gold/10 text-royal-brown border border-royal-gold/30 rounded-lg hover:bg-royal-gold/20 transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
}
