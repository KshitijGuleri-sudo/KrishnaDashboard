/**
 * ProjectTable component displaying all projects in a table format
 * Includes status badges, payment checkboxes, upload buttons, and actions
 */

import { useState } from 'react';
import Badge from './Badge';
import Modal from './Modal';

export default function ProjectTable({ projects, onUpdate, onDelete, onUpload, onEdit }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [uploadModal, setUploadModal] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const handlePaymentToggle = (projectId, currentStatus) => {
    onUpdate(projectId, { paymentDone: !currentStatus });
  };
  
  const handleStatusChange = (projectId, newStatus) => {
    onUpdate(projectId, { status: newStatus });
  };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  
  const handleUploadSubmit = () => {
    if (selectedFiles.length === 0) return;
    
    const fileNames = selectedFiles.map(f => f.name);
    onUpload(uploadModal, fileNames);
    setUploadModal(null);
    setSelectedFiles([]);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found. Create your first project!</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Couple
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Upload
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.companyName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {project.coupleName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.modelName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(project.projectDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {project.projectType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.paymentDone}
                        onChange={() => handlePaymentToggle(project.id, project.paymentDone)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {project.paymentDone ? 'Paid' : 'Pending'}
                      </span>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setUploadModal(project.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      📤 Upload
                    </button>
                    {project.uploadedFiles && project.uploadedFiles.length > 0 && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        ({project.uploadedFiles.length})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          const rowId = expandedRow === project.id ? null : project.id;
                          setExpandedRow(rowId);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View files"
                      >
                        👁️
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(project)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          title="Edit"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this project?')) {
                            onDelete(project.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Upload Modal */}
      <Modal
        isOpen={uploadModal !== null}
        onClose={() => {
          setUploadModal(null);
          setSelectedFiles([]);
        }}
        title="Upload Files"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Files (Mock Upload)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
            />
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selected Files:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {selectedFiles.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                setUploadModal(null);
                setSelectedFiles([]);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadSubmit}
              disabled={selectedFiles.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Expanded Row for File List */}
      {expandedRow && (
        <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          {(() => {
            const project = projects.find(p => p.id === expandedRow);
            if (!project || !project.uploadedFiles || project.uploadedFiles.length === 0) {
              return <p className="text-sm text-gray-500 dark:text-gray-400">No files uploaded yet.</p>;
            }
            return (
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Uploaded Files:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {project.uploadedFiles.map((file, idx) => (
                    <li key={idx}>{file}</li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      )}
    </>
  );
}

