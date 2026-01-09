/**
 * Royal Sidebar Component
 * Elegant navigation with Royal Wedding theme
 */

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Crown, LayoutDashboard, Folder, Upload, CreditCard, 
  Settings, LogOut, X 
} from 'lucide-react';

export default function RoyalSidebar({ isOpen, onClose }) {
  const { user, logout, isAdmin, isEditor } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'editor', 'client'] },
    { path: '/admin', label: 'Admin Panel', icon: Crown, roles: ['admin'] },
    { path: '/projects', label: 'Projects', icon: Folder, roles: ['admin', 'editor'] },
    { path: '/uploads', label: 'Uploads', icon: Upload, roles: ['admin', 'editor'] },
    { path: '/payments', label: 'Payments', icon: CreditCard, roles: ['admin'] },
    { path: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'editor', 'client'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-royal-gold text-white shadow-md'
        : 'text-royal-cream/80 hover:bg-white/10 hover:text-royal-gold'
    }`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-royal-green to-royal-green-dark border-r border-royal-gold/20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-royal-gold/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-royal-gold flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-elegant text-lg font-bold text-royal-gold">
                  Royal Studio
                </h1>
                <p className="text-xs text-royal-cream/60">
                  {user?.role?.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-royal-cream/60 hover:text-royal-gold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredMenu.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={linkClass}
                  onClick={() => onClose()}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          
          {/* User Profile & Logout */}
          <div className="p-4 border-t border-royal-gold/20">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-10 h-10 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold font-semibold">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-royal-cream/60 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
