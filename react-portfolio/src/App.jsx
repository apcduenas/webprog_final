import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import ContactInfo from './components/ContactInfo';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import FireCursor from './components/FireCursor';
import IntroVideo from './components/IntroVideo';
import ThemeTransition from './components/ThemeTransition';
import AIAssistant from './components/AIAssistant';
import './index.css'; // Ensure global styles are applied

function App() {
  const [theme, setTheme] = useState('dark');
  const [showIntro, setShowIntro] = useState(true);
  const [transitionTheme, setTransitionTheme] = useState(null); // 'light' or 'dark' or null

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Initialize Theme from LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  // Update HTML class when theme changes
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light-mode');
    } else {
      html.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setTransitionTheme(nextTheme);
  };

  return (
    <div className="app-container">
      {/* Intro Video - Only shows on initial load if we want. 
           In the original code, it plays if the element exists. 
           We'll keep it as a one-time thing on mount. */}
      {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}

      {/* Theme Transition Video */}
      {transitionTheme && (
        <ThemeTransition
          targetTheme={transitionTheme}
          onComplete={() => setTransitionTheme(null)}
        />
      )}

      {/* Fire Cursor - Needs to know current theme for color */}
      <FireCursor isLightMode={theme === 'light'} />

      {/* SVG Filters (Hidden) - Optimized for Performance */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="charred-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="heat-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.08" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" values="0.02 0.08; 0.02 0.10; 0.02 0.08" dur="3s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </svg>

      <div id="app">
        <Navbar
          toggleTheme={toggleTheme}
          isLightMode={theme === 'light'}
          toggleAIChat={() => setIsAIChatOpen(prev => !prev)}
        />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <ContactInfo />
        <Guestbook />
        <Footer />
        <AIAssistant isOpen={isAIChatOpen} setIsOpen={setIsAIChatOpen} />
      </div>
    </div>
  );
}

export default App;
