import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold gradient-text">Portfolio</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-aqua-600 transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-aqua-600 transition-colors">About</a>
            <a href="#skills" className="text-gray-700 hover:text-aqua-600 transition-colors">Skills</a>
            <a href="#projects" className="text-gray-700 hover:text-aqua-600 transition-colors">Projects</a>
            <a href="#contact" className="text-gray-700 hover:text-aqua-600 transition-colors">Contact</a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-aqua-100 hover:bg-aqua-200 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} className="text-aqua-600" /> : <Moon size={20} className="text-aqua-600" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-aqua-100 hover:bg-aqua-200 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} className="text-aqua-600" /> : <Moon size={20} className="text-aqua-600" />}
            </button>
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-aqua-600">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-aqua-600">About</a>
              <a href="#skills" className="block px-3 py-2 text-gray-700 hover:text-aqua-600">Skills</a>
              <a href="#projects" className="block px-3 py-2 text-gray-700 hover:text-aqua-600">Projects</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-aqua-600">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;