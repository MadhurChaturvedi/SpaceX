import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Launches from './components/Launches/Launches'
import Rockets from './components/Rockets/Rockets'
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

      <section id="starship" className="section-container">
        <div className="section-backdrop" style={{ backgroundImage: `url(${launchImg})` }}>
          <div className="backdrop-gradient" />
        </div>
        <div className="section-content">
          <p className="section-eyebrow">NEXT GENERATION</p>
          <h2 className="section-title">STARSHIP</h2>
          <p className="section-lead">Complete reusability for interplanetary transport.</p>
        </div>
      </section>

      <section id="mars" className="section-container">
        <div className="section-backdrop" style={{ backgroundImage: `url(${marsImg})` }}>
          <div className="backdrop-gradient" />
        </div>
        <div className="section-content">
          <p className="section-eyebrow">THE DESTINATION</p>
          <h2 className="section-title">ROAD TO MARS</h2>
          <p className="section-lead">Establishing a permanent, self-sustaining human presence.</p>
        </div>
      </section>

      <section id="missions" className="section-container">
        <div className="section-content">
          <p className="section-eyebrow">HUMAN SPACEFLIGHT</p>
          <h2 className="section-title">MISSIONS</h2>
          <p className="section-lead">Commercial crew, lunar lander contracts, and deep space exploration.</p>
        </div>
      </section>

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
