/**
 * Main Dashboard page
 * Manages all projects with CRUD operations
 * Includes dark/light mode support
 */

import { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import StatsCards from '../components/dashboard/StatsCards';
import ProjectTable from '../components/dashboard/ProjectTable';
import ProjectModal from '../components/dashboard/ProjectModal';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  initializeSeedData,
} from '../utils/localStorage';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Initialize seed data on first load
  useEffect(() => {
    initializeSeedData();
    setProjects(getProjects());
  }, []);
  
  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.companyName.toLowerCase().includes(query) ||
        project.coupleName.toLowerCase().includes(query) ||
        project.modelName.toLowerCase().includes(query) ||
        project.projectType.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);
  
  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: projects.length,
      processing: projects.filter((p) => p.status === 'processing').length,
      completed: projects.filter((p) => p.status === 'completed').length,
      pendingPayments: projects.filter((p) => !p.paymentDone).length,
    };
  }, [projects]);
  
  // Handle project creation
  const handleCreateProject = (projectData) => {
    const newProject = createProject(projectData);
    setProjects(getProjects());
  };
  
  // Handle project update
  const handleUpdateProject = (id, updates) => {
    updateProject(id, updates);
    setProjects(getProjects());
  };
  
  // Handle project deletion
  const handleDeleteProject = (id) => {
    deleteProject(id);
    setProjects(getProjects());
  };
  
  // Handle file upload (mock)
  const handleUploadFiles = (projectId, fileNames) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const updatedFiles = [...(project.uploadedFiles || []), ...fileNames];
      handleUpdateProject(projectId, { uploadedFiles: updatedFiles });
    }
  };
  
  // Handle modal save
  const handleModalSave = (projectData) => {
    if (editingProject) {
      handleUpdateProject(editingProject.id, projectData);
      setEditingProject(null);
    } else {
      handleCreateProject(projectData);
    }
  };
  
  // Open modal for editing
  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };
  
  // Open modal for creating
  const handleAddNew = () => {
    setEditingProject(null);
    setModalOpen(true);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content area */}
      <div className="lg:pl-64">
        <TopBar
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <main className="p-4 lg:p-6">
          {/* Dark mode toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Stats Cards */}
          <StatsCards stats={stats} />
          
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Projects ({filteredProjects.length})
            </h2>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <span>➕</span>
              <span>Add New Project</span>
            </button>
          </div>
          
          {/* Projects Table */}
          <ProjectTable
            projects={filteredProjects}
            onUpdate={handleUpdateProject}
            onDelete={handleDeleteProject}
            onUpload={handleUploadFiles}
            onEdit={handleEdit}
          />
        </main>
      </div>
      
      {/* Project Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        project={editingProject}
        onSave={handleModalSave}
      />
    </div>
  );
}

