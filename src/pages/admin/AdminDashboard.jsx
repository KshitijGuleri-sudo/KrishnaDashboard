/**
 * Admin Dashboard
 * Full project management with charts, stats, and reports
 * Royal Wedding Theme
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectAPI, companyAPI, userAPI } from '../../services/api';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Crown, TrendingUp, Clock, CheckCircle, DollarSign,
  Calendar, Filter, Download, Plus, Users
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    paymentsPending: 0,
    revenue: 0
  });
  
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: '',
    company: '',
    editor: '',
    status: '',
    payment: ''
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, projectsRes, companiesRes, editorsRes] = await Promise.all([
        projectAPI.getStats(),
        projectAPI.getAll(filters),
        companyAPI.getAll(),
        userAPI.getEditors()
      ]);
      
      setStats(statsRes.data);
      setProjects(projectsRes.data);
      setCompanies(companiesRes.data);
      setEditors(editorsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const statusData = [
    { name: 'Pending', value: stats.pending, color: '#C9A24D' },
    { name: 'In Progress', value: stats.inProgress, color: '#D4B76A' },
    { name: 'Completed', value: stats.completed, color: '#0F3D2E' }
  ];

  const paymentData = [
    { name: 'Paid', value: stats.total - stats.paymentsPending, color: '#0F3D2E' },
    { name: 'Pending', value: stats.paymentsPending, color: '#C9A24D' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      {/* Royal Header */}
      <div className="bg-gradient-to-r from-royal-green to-royal-brown shadow-royal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-royal-gold flex items-center justify-center shadow-gold">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-elegant text-3xl font-bold text-white">
                  Royal Admin Dashboard
                </h1>
                <p className="text-royal-cream/80 text-sm">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-royal-gold text-royal-green-dark rounded-lg hover:shadow-gold transition-all">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Total Projects"
            value={stats.total}
            gradient="from-royal-gold to-royal-gold-light"
          />
          <StatsCard
            icon={<Clock className="w-8 h-8" />}
            title="In Progress"
            value={stats.inProgress}
            gradient="from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Completed"
            value={stats.completed}
            gradient="from-royal-green to-royal-green-dark"
          />
          <StatsCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Revenue"
            value={`₹${(stats.revenue || 0).toLocaleString()}`}
            gradient="from-royal-brown to-royal-green"
          />
          <StatsCard
            icon={<Calendar className="w-8 h-8" />}
            title="Pending"
            value={stats.pending}
            gradient="from-yellow-500 to-orange-500"
          />
          <StatsCard
            icon={<Users className="w-8 h-8" />}
            title="Payments Due"
            value={stats.paymentsPending}
            gradient="from-red-500 to-red-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-royal-gold/20 p-6">
            <h3 className="font-elegant text-xl font-semibold text-royal-green mb-4">
              Project Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-royal-gold/20 p-6">
            <h3 className="font-elegant text-xl font-semibold text-royal-green mb-4">
              Payment Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-gold/20 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-royal-gold" />
            <h3 className="font-semibold text-royal-green">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              className="px-4 py-2 border border-royal-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="">All Months</option>
              <option value="2024-12">December 2024</option>
              <option value="2025-01">January 2025</option>
            </select>
            
            <select
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              className="px-4 py-2 border border-royal-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>{company.company_name}</option>
              ))}
            </select>
            
            <select
              value={filters.editor}
              onChange={(e) => setFilters({ ...filters, editor: e.target.value })}
              className="px-4 py-2 border border-royal-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="">All Editors</option>
              {editors.map((editor) => (
                <option key={editor.id} value={editor.id}>{editor.name}</option>
              ))}
            </select>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-royal-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filters.payment}
              onChange={(e) => setFilters({ ...filters, payment: e.target.value })}
              className="px-4 py-2 border border-royal-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold"
            >
              <option value="">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-gold/20 overflow-hidden">
          <div className="p-6 border-b border-royal-gold/20">
            <div className="flex items-center justify-between">
              <h3 className="font-elegant text-xl font-semibold text-royal-green">
                Recent Projects
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 text-royal-gold border border-royal-gold/30 rounded-lg hover:bg-royal-gold/10 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-royal-gold border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-royal-cream/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Editor</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-royal-green uppercase">Amount</th>
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
                        {project.editor?.name || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PaymentBadge status={project.payment_status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-royal-green">
                        ₹{project.amount?.toLocaleString()}
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

function StatsCard({ icon, title, value, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-lg p-6 text-white`}>
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

function PaymentBadge({ status }) {
  const styles = {
    paid: 'bg-royal-green/20 text-royal-green border-royal-green/30',
    pending: 'bg-royal-gold/20 text-royal-brown border-royal-gold/30'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}
