import React, { useState, useEffect } from 'react';
import { ExternalLink, GitBranch, Star, GitFork, Activity } from 'lucide-react';

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface RepoData {
  stargazers_count: number;
  forks_count: number;
}

const GitHubStats: React.FC = () => {
  const username = "Satya8463";
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        setGithubData(userData);

        // Fetch repos to calculate total stars and forks
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData: RepoData[] = await reposResponse.json();
        
        const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const forks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
        
        setTotalStars(stars);
        setTotalForks(forks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const stats = [
    { 
      icon: <GitBranch className="w-6 h-6" />, 
      label: "Public Repos", 
      value: loading ? "..." : githubData?.public_repos || "0", 
      color: "from-aqua-500 to-cyan-600" 
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      label: "Total Stars", 
      value: loading ? "..." : totalStars, 
      color: "from-yellow-500 to-orange-600" 
    },
    { 
      icon: <GitFork className="w-6 h-6" />, 
      label: "Forks", 
      value: loading ? "..." : totalForks, 
      color: "from-purple-500 to-pink-600" 
    },
    { 
      icon: <Activity className="w-6 h-6" />, 
      label: "Followers", 
      value: loading ? "..." : githubData?.followers || "0", 
      color: "from-green-500 to-teal-600" 
    }
  ];

  const languages = [
    { name: "JavaScript", percentage: 40, color: "bg-yellow-400" },
    { name: "TypeScript", percentage: 25, color: "bg-blue-500" },
    { name: "HTML/CSS", percentage: 20, color: "bg-orange-500" },
    { name: "Python", percentage: 10, color: "bg-green-500" },
    { name: "Others", percentage: 5, color: "bg-gray-400" }
  ];

  const calculateDaysActive = () => {
    if (!githubData) return 0;
    const created = new Date(githubData.created_at);
    const now = new Date();
    const diff = now.getTime() - created.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My open-source contributions and coding activity
          </p>
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center mb-8">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <ExternalLink size={20} />
            Visit My GitHub Profile
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 opacity-90">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Most Used Languages
          </h3>
          <div className="space-y-4">
            {languages.map((lang, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{lang.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{lang.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`${lang.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Contributions */}
        <div className="bg-gradient-to-br from-aqua-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Contribution Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-aqua-600 mb-2">
                {loading ? "..." : calculateDaysActive()}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Days Active</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-aqua-600 mb-2">
                {loading ? "..." : githubData?.public_repos || "0"}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-aqua-600 mb-2">
                {loading ? "..." : githubData?.following || "0"}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Following</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;