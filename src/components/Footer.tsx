import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Thank you for visiting my portfolio. I'm always excited to work on new projects 
              and collaborate with amazing people. Let's create something awesome together!
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/satyam-prajapati-595455202" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-aqua-500 hover:bg-aqua-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-white font-bold text-sm">in</span>
              </a>
              <a href="https://github.com/Satya8463" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-aqua-500 hover:bg-aqua-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-white font-bold text-sm">gh</span>
              </a>
              <a href="#" className="w-10 h-10 bg-aqua-500 hover:bg-aqua-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-white font-bold text-sm">tw</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-aqua-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-aqua-400 transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-300 hover:text-aqua-400 transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-aqua-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-aqua-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>satyamprajapati8707@gmail.com</li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 Satyam Prajapati. All rights reserved. Built with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;