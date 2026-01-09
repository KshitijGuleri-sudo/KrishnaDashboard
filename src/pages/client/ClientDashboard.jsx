/**
 * Client Dashboard
 * Read-only view of project progress
 * Royal Wedding Theme
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectAPI } from '../../services/api';
import { Crown, Calendar, Package } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-green to-royal-brown shadow-royal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-royal-gold flex items-center justify-center shadow-gold">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-elegant text-3xl font-bold text-white">
                Client Portal
              </h1>
              <p className="text-royal-cream/80 text-sm">
                Welcome, {user?.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-royal-gold/20">
          <div className="p-6 border-b border-royal-gold/20">
            <h3 className="font-elegant text-xl font-semibold text-royal-green">
              Your Projects
            </h3>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-royal-gold border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No projects found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gradient-to-br from-white to-royal-cream/20 rounded-xl shadow-md border border-royal-gold/20 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-royal-gold/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-royal-gold" />
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  
                  <h4 className="font-semibold text-lg text-royal-green mb-2">
                    {project.client_name}
                  </h4>
                  <p className="text-sm text-gray-600 capitalize mb-4">
                    {project.project_type}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-royal-gold" />
                      <span>Shoot: {new Date(project.shoot_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-royal-green" />
                      <span>Delivery: {new Date(project.delivery_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {project.notes && (
                    <p className="mt-4 text-xs text-gray-500 bg-royal-cream/30 rounded-lg p-3">
                      {project.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
