import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  id?: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'freelance' | 'internship';
}

const Experience: React.FC = () => {
  const defaultExperiences: ExperienceItem[] = [
    {
      title: "Associate Software Engineer",
      company: "EVERVENT",
      location: "India",
      period: "Nov 2023 - Present",
      type: "work",
      description: [
        "Engineered an Insurance Management System for multiple brokers (JIO, Muthoot, Policy Parivaar, Unison), ensuring seamless integration, scalability, and robust performance across platforms",
        "Developed and optimized Node.js applications for a fintech platform, enhancing user experience and operational efficiency for insurance providers, with solutions aligned to capital market regulations",
        "Designed and optimized MySQL databases to efficiently handle and process large datasets from multiple brokers, ensuring high availability and fast data retrieval",
        "Automated key insurance processes (policy updates, renewals, reporting), significantly reducing manual intervention and improving system reliability and speed",
        "Integrated with third-party brokers and platforms, ensuring seamless data synchronization and enhancing platform interoperability"
      ],
      technologies: ["Node.js", "MySQL", "Insurance Systems", "API Integration", "Fintech"]
    }
  ];

  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('workExperiences');
    if (stored) {
      setExperiences(JSON.parse(stored));
    }

    // Listen for updates
    const handleUpdate = () => {
      const updated = localStorage.getItem('workExperiences');
      if (updated) {
        setExperiences(JSON.parse(updated));
      }
    };

    window.addEventListener('experiencesUpdated', handleUpdate);
    return () => window.removeEventListener('experiencesUpdated', handleUpdate);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-green-500';
      case 'freelance': return 'bg-purple-500';
      case 'internship': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'work': return 'Full-time';
      case 'freelance': return 'Freelance';
      case 'internship': return 'Internship';
      default: return type;
    }
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and contributions to various organizations
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-aqua-500 via-cyan-500 to-aqua-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-aqua-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 items-center justify-center">
                  <Briefcase size={16} className="text-white" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-gradient-to-br from-white to-aqua-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Type Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 ${getTypeColor(exp.type)} text-white text-xs font-semibold rounded-full`}>
                        {getTypeLabel(exp.type)}
                      </span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                    <p className="text-aqua-600 dark:text-aqua-400 font-semibold mb-1">{exp.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{exp.location}</p>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                          <span className="text-aqua-500 mr-2 mt-1">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-aqua-200 dark:border-aqua-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Resume CTA */}
        <div className="text-center mt-16">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-gradient-to-r from-aqua-500 to-cyan-500 text-white px-8 py-4 rounded-lg hover:from-aqua-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
          >
            <Briefcase size={20} />
            Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
