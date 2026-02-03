// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 SupplyChain Management. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;