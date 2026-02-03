// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};

export const useTheme = () => useContext(Theme);