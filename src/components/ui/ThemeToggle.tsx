'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './Button';

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize dark mode from localStorage after mount
  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.getItem('darkMode') === 'true' ||
                   document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="p-2"
        aria-label="Toggle dark mode"
        disabled
      >
        <Moon className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="p-2"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
}