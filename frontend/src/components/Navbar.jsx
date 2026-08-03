import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left side: Logo */}
      <Link to="/" className="nav-brand">
        <span style={{ fontSize: '1.4rem' }}>💼</span> Job Tracker
      </Link>

      {/* Right side: Links & Avatar */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        {/* We successfully removed the duplicate 'Add New Job' link here! */}
        
        {/* Fake User Avatar to match the Figma SaaS design */}
        <div className="nav-avatar">TC</div>
      </div>
    </nav>
  );
}
