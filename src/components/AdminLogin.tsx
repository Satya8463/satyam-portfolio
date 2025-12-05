import React, { useState } from 'react';
import { Lock, X, LogOut } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Your admin password - Change this to whatever you want!
  const ADMIN_PASSWORD = 'admin@123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      onLoginSuccess();
      setIsOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    onLogout();
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="fixed top-20 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 transition-all"
        title="Logout"
      >
        <LogOut size={18} />
        <span className="text-sm">Admin Logout</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg z-50 transition-all"
        title="Admin Login"
      >
        <Lock size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock size={24} className="text-aqua-500" />
                Admin Login
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setError('');
                  setPassword('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-aqua-500 hover:bg-aqua-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Login
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Default password: admin@123<br />
                (Change it in AdminLogin.tsx)
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
