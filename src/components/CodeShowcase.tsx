import React, { useState } from 'react';
import { Play, Code2, Copy, Check } from 'lucide-react';

interface CodeExample {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
}

const CodeShowcase: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeExamples: CodeExample[] = [
    {
      id: 1,
      title: "Custom React Hook - useLocalStorage",
      description: "A reusable hook to sync state with localStorage",
      language: "javascript",
      code: `// Custom Hook for localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue];
}

// Usage Example
const [name, setName] = useLocalStorage('username', 'Guest');
console.log('Current user:', name);
setName('Satyam Prajapati');
console.log('Updated user:', name);`
    },
    {
      id: 2,
      title: "Debounce Function",
      description: "Optimize performance by limiting function calls",
      language: "javascript",
      code: `// Debounce utility function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example: Search with debounce
const search = debounce((query) => {
  console.log('Searching for:', query);
}, 500);

// Simulating user typing
search('R');
search('Re');
search('Rea');
search('React'); // Only this will execute after 500ms

console.log('Debounce function created!');
console.log('Type "React" - only last search executes');`
    },
    {
      id: 3,
      title: "Array Methods - Data Transformation",
      description: "Powerful array operations for data processing",
      language: "javascript",
      code: `// Sample data
const developers = [
  { name: 'Satyam', skills: ['React', 'Node'], experience: 2 },
  { name: 'Rahul', skills: ['Python', 'Django'], experience: 3 },
  { name: 'Priya', skills: ['React', 'TypeScript'], experience: 1 }
];

// Filter developers with React skill
const reactDevs = developers
  .filter(dev => dev.skills.includes('React'))
  .map(dev => dev.name);

console.log('React Developers:', reactDevs);

// Calculate total experience
const totalExp = developers
  .reduce((sum, dev) => sum + dev.experience, 0);

console.log('Total Experience:', totalExp, 'years');

// Find senior developer
const senior = developers
  .find(dev => dev.experience > 2);

console.log('Senior Dev:', senior.name);`
    },
    {
      id: 4,
      title: "Promise & Async/Await",
      description: "Modern asynchronous JavaScript patterns",
      language: "javascript",
      code: `// Simulating API call
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        id: userId, 
        name: 'Satyam Prajapati',
        role: 'Full Stack Developer' 
      });
    }, 1000);
  });
}

// Using async/await
async function getUserProfile(userId) {
  console.log('Fetching user data...');
  try {
    const user = await fetchUserData(userId);
    console.log('User:', user.name);
    console.log('Role:', user.role);
    return user;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute
getUserProfile(123);
console.log('Request initiated!');`
    },
    {
      id: 5,
      title: "ES6+ Features Showcase",
      description: "Modern JavaScript syntax and features",
      language: "javascript",
      code: `// Destructuring
const user = { 
  name: 'Satyam', 
  age: 25, 
  city: 'India',
  skills: ['React', 'Node.js']
};
const { name, skills } = user;
console.log(name, 'knows', skills.join(', '));

// Spread operator
const moreSkills = [...skills, 'TypeScript', 'MongoDB'];
console.log('All skills:', moreSkills);

// Template literals
const greeting = \`Hello, I'm \${name}!\`;
console.log(greeting);

// Arrow functions & Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Optional chaining
const profile = { user: { address: { city: 'Mumbai' } } };
console.log('City:', profile?.user?.address?.city);`
    }
  ];

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Capture console.log output
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
      originalLog.apply(console, args);
    };

    try {
      // Execute the code
      eval(codeExamples[selectedExample].code);
      
      // Restore console.log
      setTimeout(() => {
        console.log = originalLog;
        setOutput(logs.join('\n') || 'Code executed successfully! ✓');
        setIsRunning(false);
      }, 100);
    } catch (error) {
      console.log = originalLog;
      setOutput(`Error: ${(error as Error).message}`);
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[selectedExample].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-showcase" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Live <span className="gradient-text">Code Playground</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive code examples showcasing my problem-solving skills. Click "Run Code" to see it in action!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Examples List */}
          <div className="lg:col-span-1 space-y-3">
            {codeExamples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => {
                  setSelectedExample(index);
                  setOutput('');
                }}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedExample === index
                    ? 'bg-aqua-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-aqua-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Code2 size={20} className="mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{example.title}</h3>
                    <p className={`text-xs ${
                      selectedExample === index ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {example.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code Editor & Output */}
          <div className="lg:col-span-2 space-y-4">
            {/* Code Editor */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-gray-800 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-sm text-gray-400">
                    {codeExamples[selectedExample].title}
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm text-gray-100 font-mono">
                  {codeExamples[selectedExample].code}
                </code>
              </pre>
            </div>

            {/* Run Button */}
            <button
              onClick={runCode}
              disabled={isRunning}
              className="w-full bg-gradient-to-r from-aqua-500 to-cyan-500 hover:from-aqua-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Run Code</span>
                </>
              )}
            </button>

            {/* Output Console */}
            {output && (
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-gray-400">Console Output</span>
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {output}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💡 <strong>Try it yourself!</strong> All code examples are fully functional and can be executed in real-time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;
