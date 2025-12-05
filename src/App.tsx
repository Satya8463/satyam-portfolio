import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import AIShowcase from './components/AIShowcase';
import CodeShowcase from './components/CodeShowcase';
import GitHubStats from './components/GitHubStats';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import VisitorCounter from './components/VisitorCounter';
import FormAnalytics from './components/FormAnalytics';
import ExperienceManager from './components/ExperienceManager';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(loggedIn);
  }, []);

  return (
    <div className="App">
      <ScrollProgress />
      <VisitorCounter />
      <AdminLogin 
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        isLoggedIn={isAdminLoggedIn}
        onLogout={() => setIsAdminLoggedIn(false)}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Achievements />
      <AIShowcase />
      <CodeShowcase />
      <GitHubStats />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
      <FormAnalytics />
      {isAdminLoggedIn && <ExperienceManager />}
    </div>
  );
}

export default App;