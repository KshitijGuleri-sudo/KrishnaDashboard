/**
 * ProjectModal component for adding and editing projects
 * Form with all required fields
 */

import Modal from './Modal';

export default function ProjectModal({ isOpen, onClose, project, onSave }) {
  const isEditMode = !!project;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectData = {
      companyName: formData.get('companyName'),
      coupleName: formData.get('coupleName'),
      modelName: formData.get('modelName'),
      projectDate: formData.get('projectDate'),
      projectType: formData.get('projectType'),
      status: formData.get('status'),
      paymentDone: formData.get('paymentDone') === 'on',
    };
    
    onSave(projectData);
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Project' : 'Add New Project'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            name="companyName"
            required
            defaultValue={project?.companyName || ''}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Couple Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Couple Name *
          </label>
          <input
            type="text"
            name="coupleName"
            required
            defaultValue={project?.coupleName || ''}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Model Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Model Name (Camera) *
          </label>
          <input
            type="text"
            name="modelName"
            required
            defaultValue={project?.modelName || ''}
            placeholder="e.g., Canon EOS R5"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Project Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Date *
          </label>
          <input
            type="date"
            name="projectDate"
            required
            defaultValue={project?.projectDate || ''}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Type *
          </label>
          <select
            name="projectType"
            required
            defaultValue={project?.projectType || 'Video'}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Video">Video</option>
            <option value="Photo">Photo</option>
          </select>
        </div>
        
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status *
          </label>
          <select
            name="status"
            required
            defaultValue={project?.status || 'processing'}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Payment Done */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="paymentDone"
            defaultChecked={project?.paymentDone || false}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Payment Done
          </label>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditMode ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

