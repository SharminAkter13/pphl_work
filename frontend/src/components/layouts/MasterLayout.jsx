// src/components/MasterLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MasterLayout = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">
          <button
            onClick={toggleSidebar}
            className="md:hidden mb-4 p-2 bg-blue-600 text-white rounded"
          >
            ☰ Menu
          </button>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayout;