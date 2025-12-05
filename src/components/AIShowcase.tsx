import React from 'react';
import { Bot, Sparkles, Code2, Layers } from 'lucide-react';

const AIShowcase: React.FC = () => {
  const aiProjects = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Chatbot Development",
      description: "Built intelligent chatbots using GPT-4 and Claude with custom prompt engineering for specific use cases.",
      skills: ["GPT-4", "Claude", "Prompt Design", "API Integration"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Prompt Engineering",
      description: "Developed optimized prompts for content generation, code assistance, and data analysis with 95% accuracy.",
      skills: ["Prompt Optimization", "Chain-of-Thought", "Few-Shot Learning"]
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "AI Code Assistant",
      description: "Created AI-powered tools for code generation, debugging, and documentation using advanced LLM techniques.",
      skills: ["Code Generation", "Auto-completion", "Refactoring"]
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Automation Workflows",
      description: "Designed AI automation workflows for content creation, data processing, and business operations.",
      skills: ["Workflow Design", "API Orchestration", "Task Automation"]
    }
  ];

  const promptExamples = [
    {
      category: "Code Generation",
      prompt: "Generate a React component with TypeScript...",
      useCase: "Rapid prototyping and development"
    },
    {
      category: "Data Analysis",
      prompt: "Analyze this dataset and provide insights...",
      useCase: "Business intelligence and reporting"
    },
    {
      category: "Content Creation",
      prompt: "Create engaging technical blog content...",
      useCase: "Documentation and marketing"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-aqua-500 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-aqua-500/20 rounded-full px-6 py-2 mb-4">
            <span className="text-aqua-400 font-semibold">🤖 AI & Prompt Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leveraging cutting-edge AI technologies and prompt engineering to build intelligent applications
          </p>
        </div>

        {/* AI Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {aiProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-aqua-500/20 hover:border-aqua-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-aqua-500/20"
            >
              <div className="bg-aqua-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 text-aqua-400">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-aqua-500/10 text-aqua-400 text-sm rounded-full border border-aqua-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Examples */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-aqua-500/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="text-aqua-400" />
            Prompt Engineering Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promptExamples.map((example, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="text-aqua-400 font-semibold mb-2">{example.category}</div>
                <div className="text-sm text-gray-300 font-mono bg-gray-950 rounded p-3 mb-3">
                  "{example.prompt}"
                </div>
                <div className="text-xs text-gray-500">Use Case: {example.useCase}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tools & Technologies */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-gray-400 mb-6">AI Tools & Technologies</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {['ChatGPT', 'GPT-4', 'Claude', 'Gemini', 'OpenAI API', 'LangChain', 'Vector DBs', 'RAG'].map((tool, idx) => (
              <div
                key={idx}
                className="px-6 py-3 bg-gray-800 rounded-full border border-aqua-500/30 hover:border-aqua-500/60 transition-colors"
              >
                <span className="text-aqua-400 font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;