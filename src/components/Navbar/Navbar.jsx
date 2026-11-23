import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'launches', label: 'Launches' },
  { id: 'rockets', label: 'Rockets' },
  { id: 'starship', label: 'Starship' },
  { id: 'mars', label: 'Mars' },
  { id: 'missions', label: 'Missions' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const drawerRef = useRef(null)
  const menuButtonRef = useRef(null)

  // Track scroll position for navbar transparency transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.id)
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Handle ESC key to close mobile drawer & body scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.getElementById(id)
    if (target) {
      const navOffset = 76
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset
      window.scrollTo({
        top: id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth',
      })
      window.history.pushState(null, '', `#${id}`)
      setActiveSection(id)
    }
  }

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-container">
        {/* SpaceX Logo Wordmark */}
        <a
          href="#home"
          className="brand-logo"
          aria-label="SpaceX Home"
          onClick={(e) => scrollToSection(e, 'home')}
        >
          <span className="logo-text">SPACEX</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = activeSection === id
              return (
                <li key={id} className="nav-item">
                  <a
                    href={`#${id}`}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => scrollToSection(e, id)}
                  >
                    <span>{label.toUpperCase()}</span>
                    {isActive && <span className="active-pill" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA Launch Watch Button (Desktop) */}
        <div className="nav-actions">
          <a
            href="#launches"
            className="nav-cta-btn"
            onClick={(e) => scrollToSection(e, 'launches')}
          >
            NEXT LAUNCH
          </a>

          {/* Accessible Mobile Hamburger Toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            className={`hamburger-btn ${mobileOpen ? 'is-active' : ''}`}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`drawer-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* Animated Mobile Slide-in Drawer */}
      <aside
        id="mobile-nav-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="drawer-header">
          <span className="drawer-title">SPACEX NAVIGATION</span>
          <button
            type="button"
            className="drawer-close-btn"
            aria-label="Close menu"
            onClick={() => {
              setMobileOpen(false)
              menuButtonRef.current?.focus()
            }}
          >
            &times;
          </button>
        </div>

        <nav className="mobile-nav-links">
          <ul>
            {NAV_LINKS.map(({ id, label }, index) => {
              const isActive = activeSection === id
              return (
                <li
                  key={id}
                  style={{
                    animationDelay: `${0.06 * index}s`,
                  }}
                >
                  <a
                    href={`#${id}`}
                    className={`mobile-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => scrollToSection(e, id)}
                  >
                    <span className="link-number">0{index + 1}</span>
                    <span className="link-text">{label.toUpperCase()}</span>
                    {isActive && <span className="mobile-active-tag">ACTIVE</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="drawer-footer">
          <a
            href="#launches"
            className="drawer-cta-btn"
            onClick={(e) => scrollToSection(e, 'launches')}
          >
            UPCOMING LAUNCH SCHEDULE
          </a>
          <p className="drawer-meta">HUMAN EXPLORATION TO MARS</p>
        </div>
      </aside>
    </header>
  )
}
