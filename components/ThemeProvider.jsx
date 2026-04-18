'use client';
import { useEffect } from 'react';

export default function ThemeProvider({ darkMode }) {
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme', darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  return null;
}