import { useState } from 'react'
import launchImg from './assets/launch.jpg'
import marsImg from './assets/mars.jpg'
import falconImg from './assets/falcon.jpg'
import './App.css'

const missions = [
  {
    eyebrow: 'RECENT LAUNCH',
    title: 'STARSHIP’S\nTENTH FLIGHT TEST',
    action: 'REWATCH',
    image: launchImg,
  },
  {
    eyebrow: 'UPCOMING LAUNCH',
    title: 'NROL-77 MISSION',
    action: 'WATCH',
    image: falconImg,
  },
  {
    eyebrow: 'ADVANCING HUMANITY',
    title: 'MAKING LIFE\nMULTIPLANETARY',
    action: 'EXPLORE',
    image: marsImg,
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      <header className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#" aria-label="SpaceX home">
          <span>SPACEX</span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          <a href="#vehicles" onClick={() => setMenuOpen(false)}>FALCON 9</a>
          <a href="#vehicles" onClick={() => setMenuOpen(false)}>FALCON HEAVY</a>
          <a href="#vehicles" onClick={() => setMenuOpen(false)}>DRAGON</a>
          <a href="#starship" onClick={() => setMenuOpen(false)}>STARSHIP</a>
          <a href="#human" onClick={() => setMenuOpen(false)}>HUMAN SPACEFLIGHT</a>
          <a href="#rideshare" onClick={() => setMenuOpen(false)}>RIDESHARE</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>SHOP</a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {missions.map((mission, index) => (
        <section
          className="mission-band"
          id={index === 0 ? 'starship' : index === 1 ? 'vehicles' : 'human'}
          key={mission.title}
          style={{ '--band-image': `url(${mission.image})` }}
        >
          <div className="band-content">
            <p className="eyebrow">{mission.eyebrow}</p>
            <h1>{mission.title}</h1>
            <a className="ghost-button" href="#watch">{mission.action}</a>
          </div>
        </section>
      ))}

      <footer className="footer">
        <div className="footer-links">
          <a href="#contact">CONTACT</a>
          <a href="#careers">CAREERS</a>
          <a href="#updates">UPDATES</a>
          <a href="#privacy">PRIVACY POLICY</a>
        </div>
        <p>SPACEX © 2026</p>
      </footer>
    </main>
  )
}

export default App
