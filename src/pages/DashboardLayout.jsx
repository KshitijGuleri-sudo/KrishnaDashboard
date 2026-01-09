/**
 * Dashboard Layout Wrapper
 * Uses Royal Sidebar and TopBar
 */

import { useState } from 'react';
import RoyalSidebar from '../components/common/RoyalSidebar';
import RoyalTopBar from '../components/common/RoyalTopBar';

export default function DashboardLayout({ children, title = "Dashboard" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-cream via-white to-royal-cream/50">
      <RoyalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <RoyalTopBar 
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
