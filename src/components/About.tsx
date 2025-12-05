import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Full Stack Developer passionate about building scalable web applications
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              I'm a dedicated Full Stack Developer with strong expertise in React.js, Node.js, and modern web technologies. 
              I specialize in building responsive, user-friendly applications with clean, maintainable code. 
              My experience spans across frontend frameworks, backend development, and database management.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              I'm passionate about creating efficient solutions, learning new technologies, and staying updated 
              with the latest industry trends. I love tackling complex problems and turning ideas into reality.
            </p>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-aqua-600 mb-2">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-aqua-600 mb-2">3+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-aqua-600 mb-2">20+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-aqua-400 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                  <div className="text-6xl text-aqua-500">👨‍💻</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-aqua-200 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-200 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;