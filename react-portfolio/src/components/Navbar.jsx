import FlameText from './FlameText';

const Navbar = ({ toggleTheme, isLightMode }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img
            src="./images/Logo.png"
            alt="Logo"
            style={{ height: '60px', width: 'auto', filter: 'drop-shadow(0 0 10px var(--primary))' }}
          />
          <FlameText text="Anthony's Personal Website" />
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#skills" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a>
          <a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
          <a href="#contact-info" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact-info'); }}>Contact</a>
          <button
            className="theme-toggle"
            id="themeToggle"
            title="Toggle Dark/Light Mode"
            onClick={toggleTheme}
          >
            {isLightMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
