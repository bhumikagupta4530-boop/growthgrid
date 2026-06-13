import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function GrowthGridLogoSymbol({ className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GrowthGrid"
    >
      {/* subtle grid blocks */}
      <path d="M4 6.2H7.2" stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 10.2H7.2" stroke="#7c3aed" strokeOpacity="0.28" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 14.2H7.2" stroke="#7c3aed" strokeOpacity="0.22" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.8 18H18" stroke="#7c3aed" strokeOpacity="0.18" strokeWidth="1.2" strokeLinecap="round" />

      {/* upward trending analytics graph */}
      <path
        d="M6.2 14.8L10.0 11.0L12.2 12.8L15.7 8.2"
        stroke="#7c3aed"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 4 connected points (learning → progress → milestones) */}
      <circle cx="6.2" cy="14.8" r="1.35" fill="#0b0b0f" stroke="#7c3aed" strokeWidth="1.2" />
      <circle cx="10.0" cy="11.0" r="1.35" fill="#0b0b0f" stroke="#7c3aed" strokeWidth="1.2" />
      <circle cx="12.2" cy="12.8" r="1.15" fill="#0b0b0f" stroke="#7c3aed" strokeWidth="1.2" />
      <circle cx="15.7" cy="8.2" r="1.35" fill="#0b0b0f" stroke="#7c3aed" strokeWidth="1.2" />

      {/* micro block at top-right (consistency / milestones) */}
      <path d="M16.2 14.6H19.2" stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16.2 16.8H18.4" stroke="#7c3aed" strokeOpacity="0.22" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const profileWrapRef = useRef(null);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Goals', path: '/goals' },
    { label: 'Analytics', path: '/analytics' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (!avatarOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setAvatarOpen(false);
    };

    const onPointerDown = (e) => {
      const el = profileWrapRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setAvatarOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [avatarOpen]);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand" aria-label="GrowthGrid home">
          <GrowthGridLogoSymbol className="brand-logo" />
          <span className="brand-text">GrowthGrid</span>
          <span className="brand-tagline">Learn Consistently. Grow Visibly.</span>
        </Link>

        <div className="navbar-links" role="navigation" aria-label="Sections">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-profile" ref={profileWrapRef}>
          <button
            type="button"
            className="profile-avatar"
            onClick={() => setAvatarOpen((v) => !v)}
            aria-label="Profile menu"
            aria-haspopup="menu"
            aria-expanded={avatarOpen}
          >
            <span className="avatar-initial">U</span>
          </button>

          {avatarOpen && (
            <div className="profile-menu" role="menu" aria-label="Profile">
              <button className="profile-menu-item" role="menuitem" type="button">
                Settings
              </button>
              <button className="profile-menu-item" role="menuitem" type="button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

