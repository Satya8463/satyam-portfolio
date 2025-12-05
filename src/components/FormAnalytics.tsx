import React, { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

interface FormSubmission {
  timestamp: string;
  name: string;
  email: string;
  status: 'success' | 'error';
}

const FormAnalytics: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load form submissions from localStorage
    const stored = localStorage.getItem('formSubmissions');
    if (stored) {
      setSubmissions(JSON.parse(stored));
    }

    // Listen for new form submissions
    const handleFormSubmit = (event: CustomEvent) => {
      const newSubmission: FormSubmission = {
        timestamp: new Date().toLocaleString(),
        name: event.detail.name,
        email: event.detail.email,
        status: event.detail.status
      };
      
      const updated = [newSubmission, ...submissions].slice(0, 10); // Keep last 10
      setSubmissions(updated);
      localStorage.setItem('formSubmissions', JSON.stringify(updated));
    };

    window.addEventListener('formSubmitted' as any, handleFormSubmit);
    return () => window.removeEventListener('formSubmitted' as any, handleFormSubmit);
  }, [submissions]);

  const successCount = submissions.filter(s => s.status === 'success').length;
  const totalCount = submissions.length;
  const successRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;

  return (
    <>
      {/* Analytics Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-50 bg-aqua-500 hover:bg-aqua-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Form Analytics"
      >
        <BarChart3 size={24} />
      </button>

      {/* Analytics Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-8 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare size={20} className="text-aqua-500" />
              Form Analytics
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-aqua-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-300">Total Submissions</div>
              <div className="text-2xl font-bold text-aqua-600">{totalCount}</div>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-300">Success Rate</div>
              <div className="text-2xl font-bold text-green-600">{successRate}%</div>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Recent Submissions</h4>
            {submissions.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No submissions yet</p>
            ) : (
              submissions.map((sub, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{sub.name}</span>
                    {sub.status === 'success' ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    )}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 truncate">{sub.email}</div>
                  <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">{sub.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FormAnalytics;