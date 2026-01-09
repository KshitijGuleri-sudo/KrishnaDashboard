/**
 * Royal TopBar Component
 * Elegant top navigation with Royal Wedding theme
 */

import { Menu, Search, Bell, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function RoyalTopBar({ title, onMenuClick }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-royal-gold/20 shadow-sm">
      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left: Menu & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-royal-green hover:text-royal-gold transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-elegant text-2xl font-bold text-royal-green">{title}</h1>
          </div>
          
          {/* Right: Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-5 h-5 text-royal-gold/60" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-royal-gold/30 rounded-lg bg-royal-cream/20 text-royal-green placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-royal-green hover:text-royal-gold transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-royal-green hover:text-royal-gold transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
