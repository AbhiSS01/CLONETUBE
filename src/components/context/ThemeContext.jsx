import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || 
          (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      });
      useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
      }, [darkMode]);
    
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
    
    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}