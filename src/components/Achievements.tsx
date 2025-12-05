import React from 'react';
import { Award, Code, Zap, Brain } from 'lucide-react';

const Achievements: React.FC = () => {
  const achievements = [
    {
      icon: <Code className="w-8 h-8 text-aqua-500" />,
      title: "Full Stack Developer",
      description: "Expert in MERN Stack Development",
      stat: "3+ Years"
    },
    {
      icon: <Brain className="w-8 h-8 text-aqua-500" />,
      title: "AI Prompt Engineer",
      description: "Specialized in prompt optimization & AI workflows",
      stat: "50+ Prompts"
    },
    {
      icon: <Zap className="w-8 h-8 text-aqua-500" />,
      title: "Projects Completed",
      description: "Successfully delivered various web applications",
      stat: "50+"
    },
    {
      icon: <Award className="w-8 h-8 text-aqua-500" />,
      title: "Problem Solver",
      description: "Strong analytical and debugging skills",
      stat: "100%"
    }
  ];

  const certifications = [
    "React.js Developer",
    "Node.js Backend Developer",
    "MongoDB Certified",
    "AI & Machine Learning",
    "Prompt Engineering",
    "Full Stack Web Development"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements & <span className="gradient-text">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Combining full-stack development expertise with cutting-edge AI prompt engineering
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-aqua-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {achievement.description}
              </p>
              <div className="text-3xl font-bold gradient-text">
                {achievement.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="text-aqua-500" />
            Skills & Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-aqua-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center hover:scale-105 transition-transform"
              >
                <div className="text-aqua-600 dark:text-aqua-400 font-semibold">
                  ✓ {cert}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;