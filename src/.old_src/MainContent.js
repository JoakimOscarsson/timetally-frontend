import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import './styles.css';

// Import components (to be created)
import AboutMe from './components/AboutMe';
import LeadershipPhilosophy from './components/LeadershipPhilosophy';
import Projects from './components/Projects';
import Background from './components/Background';
import ReachOut from './components/ReachOut';
import Footer from './components/Footer';

const App = () => {
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'leadership', 'projects', 'background', 'reachout'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className="menu">
        <ul>
          {['About Me', 'Leadership Philosophy', 'Projects', 'Background', 'Reach Out!'].map((item, index) => (
            <li key={index}>
              <Link
                to={item.toLowerCase().replace(' ', '')}
                smooth={true}
                duration={500}
                className={activeSection === item.toLowerCase().replace(' ', '') ? 'active' : ''}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="parallax-bg"
        style={{ y: backgroundY }}
      >
        <img src="/images/bg.jpg" alt="Background" />
      </motion.div>

      <main>
        <section id="about"><AboutMe /></section>
        <section id="leadership"><LeadershipPhilosophy /></section>
        <section id="projects"><Projects /></section>
        <section id="background"><Background /></section>
        <section id="reachout"><ReachOut /></section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
