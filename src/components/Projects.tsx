import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Search } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const Projects: React.FC = () => {
  const username = "Satya8463";
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const data = await response.json();
        
        // Filter out forks and sort by stars
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.name.includes('fork'))
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  // Get unique technologies from all repos
  const allTechnologies = ['All', ...new Set(repos.flatMap(repo => repo.topics))];

  // Filter projects based on search and selected technology
  const filteredProjects = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTech === 'All' || repo.topics.includes(selectedTech.toLowerCase());
    return matchesSearch && matchesTech;
  });

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-purple-500',
      Java: 'bg-red-500',
      'C++': 'bg-pink-500',
    };
    return colors[language] || 'bg-gray-400';
  };

  const getProjectIcon = (name: string) => {
    if (name.toLowerCase().includes('weather')) return '🌤️';
    if (name.toLowerCase().includes('chat')) return '💬';
    if (name.toLowerCase().includes('ecommerce') || name.toLowerCase().includes('shop')) return '🛒';
    if (name.toLowerCase().includes('blog')) return '📝';
    if (name.toLowerCase().includes('portfolio')) return '💼';
    if (name.toLowerCase().includes('game')) return '🎮';
    if (name.toLowerCase().includes('api')) return '🔌';
    return '📦';
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Auto-synced from my GitHub repositories - {repos.length} projects and counting!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500"
            />
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTechnologies.slice(0, 10).map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTech === tech
                    ? 'bg-aqua-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-aqua-100 dark:hover:bg-gray-600'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects from GitHub...</p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((repo) => (
            <div key={repo.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-aqua-400 to-cyan-500 flex items-center justify-center">
                <div className="text-6xl">{getProjectIcon(repo.name)}</div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 capitalize">
                  {repo.name.replace(/-/g, ' ')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {repo.description || 'No description available'}
                </p>
                
                {/* Language & Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
                      {repo.language}
                    </span>
                  )}
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🔱 {repo.forks_count}</span>
                </div>

                {/* Topics/Tags */}
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-aqua-100 dark:bg-aqua-900 text-aqua-700 dark:text-aqua-300 text-sm rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Links */}
                <div className="flex justify-between items-center">
                  {repo.homepage ? (
                    <a 
                      href={repo.homepage} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-aqua-600 dark:text-aqua-400 hover:text-aqua-700 dark:hover:text-aqua-300 font-medium transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No demo available</span>
                  )}
                  <a 
                    href={repo.html_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white font-medium transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">No projects found matching your criteria.</p>
          </div>
        )}

        {/* GitHub Link */}
        <div className="text-center mt-12">
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <Github size={20} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;