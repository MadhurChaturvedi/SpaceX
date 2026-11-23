import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Launches from './components/Launches/Launches'
import Rockets from './components/Rockets/Rockets'
import StarshipSection from './components/Starship/StarshipSection'
import MarsSection from './components/Mars/MarsSection'
import Missions from './components/Missions/Missions'
import launchImg from './assets/launch.jpg'
import marsImg from './assets/mars.jpg'
import falconImg from './assets/falcon.jpg'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      {/* Hero: Full-screen 3D Space Scene & Telemetry */}
      <Hero />

      {/* Launches: Real-Time Manifests, Countdown Timer & Milestone Missions */}
      <Launches />

      {/* Rockets: 3D Interactive Model Viewer & Engineering Specs */}
      <Rockets />

      {/* Starship: Scroll-driven Flight Stages & Subsystems */}
      <StarshipSection />

      {/* Mars: 3D Interactive Mars Globe & Road to Mars Timeline */}
      <MarsSection />

      {/* Missions: Dragon, Starlink, Rideshare & Deep Space Missions */}
      <Missions />

      <section id="contact" className="section-container contact-section">
        <div className="section-content">
          <p className="section-eyebrow">COMMUNICATION</p>
          <h2 className="section-title">CONTACT & INQUIRIES</h2>
          <p className="section-lead">Media requests, payload ride-share, and commercial launch opportunities.</p>
        </div>
      </section>
    </div>
  )
}

export default App
