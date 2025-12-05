import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [onlineCount, setOnlineCount] = useState<number>(1);

  useEffect(() => {
    // Get or initialize visitor count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    const storedDate = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();

    if (storedDate !== today) {
      // New day, increment visitor count
      const newCount = storedCount ? parseInt(storedCount) + 1 : 1;
      setVisitorCount(newCount);
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisitDate', today);
    } else {
      // Same day, use stored count
      setVisitorCount(storedCount ? parseInt(storedCount) : 1);
    }

    // Simulate online users (random between 1-5)
    const randomOnline = Math.floor(Math.random() * 4) + 1;
    setOnlineCount(randomOnline);

    // Update online count every 30 seconds
    const interval = setInterval(() => {
      const newOnline = Math.floor(Math.random() * 4) + 1;
      setOnlineCount(newOnline);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 space-y-2 hidden md:block">
      <div className="flex items-center space-x-2 text-sm">
        <Users size={16} className="text-aqua-500" />
        <span className="text-gray-600 dark:text-gray-300">Online:</span>
        <span className="font-bold text-aqua-600">{onlineCount}</span>
      </div>
      <div className="flex items-center space-x-2 text-sm">
        <TrendingUp size={16} className="text-aqua-500" />
        <span className="text-gray-600 dark:text-gray-300">Visits:</span>
        <span className="font-bold text-aqua-600">{visitorCount}</span>
      </div>
    </div>
  );
};

export default VisitorCounter;