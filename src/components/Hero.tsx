import React from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero: React.FC = () => {
  // Fixed deployment
  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-aqua-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="text-aqua-200">Satyam Prajapati</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mb-8 text-aqua-100">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'AI Prompt Engineer',
                2000,
                'React Developer',
                2000,
                'Node.js Developer',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200">
            Passionate developer combining full-stack expertise with AI prompt engineering. I build scalable applications and leverage cutting-edge AI technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="#projects" 
              className="bg-aqua-500 hover:bg-aqua-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="border-2 border-aqua-300 hover:bg-aqua-300 hover:text-gray-900 text-aqua-100 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Get In Touch
            </a>
            <a 
              href="/resume.pdf" 
              download
              className="border-2 border-aqua-300 hover:bg-aqua-300 hover:text-gray-900 text-aqua-100 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Download size={20} />
              Resume
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-aqua-200" />
      </div>
    </section>
  );
};

export default Hero;