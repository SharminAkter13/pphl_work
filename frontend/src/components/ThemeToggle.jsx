import React from 'react';
import { useTheme } from './Theme';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="secondary">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
};

export default ThemeToggle;