/**
 * LocalStorage utility functions for managing projects
 * Handles all CRUD operations for project data
 */

const STORAGE_KEY = 'editing_projects';

/**
 * Get all projects from localStorage
 * @returns {Array} Array of project objects
 */
export const getProjects = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading projects from localStorage:', error);
    return [];
  }
};

/**
 * Save projects to localStorage
 * @param {Array} projects - Array of project objects
 */
export const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

/**
 * Get a single project by ID
 * @param {string} id - Project ID
 * @returns {Object|null} Project object or null
 */
export const getProjectById = (id) => {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
};

/**
 * Create a new project
 * @param {Object} projectData - Project data (without id)
 * @returns {Object} Created project with generated ID
 */
export const createProject = (projectData) => {
  const projects = getProjects();
  const newProject = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    ...projectData,
    uploadedFiles: projectData.uploadedFiles || [],
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated project or null if not found
 */
export const updateProject = (id, updates) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = { ...projects[index], ...updates };
  saveProjects(projects);
  return projects[index];
};

/**
 * Delete a project
 * @param {string} id - Project ID
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteProject = (id) => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  
  saveProjects(filtered);
  return true;
};

/**
 * Initialize with dummy seed data if localStorage is empty
 */
export const initializeSeedData = () => {
  const projects = getProjects();
  if (projects.length > 0) return; // Already has data
  
  const seedProjects = [
    {
      id: '1',
      companyName: 'Wedding Dreams Inc.',
      coupleName: 'John & Sarah',
      modelName: 'Canon EOS R5',
      projectDate: '2024-01-15',
      projectType: 'Video',
      status: 'processing',
      paymentDone: false,
      uploadedFiles: ['wedding_ceremony.mp4', 'reception_highlights.mp4'],
      createdAt: new Date('2024-01-10').toISOString(),
    },
    {
      id: '2',
      companyName: 'Luxury Events Co.',
      coupleName: 'Michael & Emma',
      modelName: 'Sony A7III',
      projectDate: '2024-01-20',
      projectType: 'Photo',
      status: 'completed',
      paymentDone: true,
      uploadedFiles: ['ceremony_photos.zip', 'portraits.zip'],
      createdAt: new Date('2024-01-12').toISOString(),
    },
    {
      id: '3',
      companyName: 'Elegant Moments',
      coupleName: 'David & Lisa',
      modelName: 'Nikon Z6',
      projectDate: '2024-01-25',
      projectType: 'Video',
      status: 'processing',
      paymentDone: true,
      uploadedFiles: [],
      createdAt: new Date('2024-01-18').toISOString(),
    },
    {
      id: '4',
      companyName: 'Perfect Day Studios',
      coupleName: 'Robert & Maria',
      modelName: 'Canon EOS R6',
      projectDate: '2024-02-01',
      projectType: 'Photo',
      status: 'completed',
      paymentDone: false,
      uploadedFiles: ['full_gallery.zip'],
      createdAt: new Date('2024-01-25').toISOString(),
    },
  ];
  
  saveProjects(seedProjects);
};

