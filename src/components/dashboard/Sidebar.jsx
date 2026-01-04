/**
 * Sidebar navigation component
 * Displays navigation menu items
 */

import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/projects', label: 'Projects', icon: '📁' },
    { path: '/dashboard/uploads', label: 'Uploads', icon: '📤' },
    { path: '/dashboard/payments', label: 'Payments', icon: '💳' },
    { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];
  
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              TheWeddingMasters 
            </h1>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={linkClass}
                onClick={() => onClose()}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Video & Photo Editing Co.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

