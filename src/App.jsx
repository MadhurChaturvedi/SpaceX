import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import MoonSection from './components/Moon/MoonSection'
import Launches from './components/Launches/Launches'
import Rockets from './components/Rockets/Rockets'
import StarshipSection from './components/Starship/StarshipSection'
import MarsSection from './components/Mars/MarsSection'
import Missions from './components/Missions/Missions'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/Contact/Footer'
import LoadingScreen from './components/common/LoadingScreen'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      {/* SpaceX Mission Control Telemetry Loading Screen */}
      <LoadingScreen />

      {/* Sticky Blurred Glass Navigation Bar */}
      <Navbar />

      <main id="main-content">
        {/* 1. Hero: Full-Screen 3D Space Scene with Starfield & Mouse Parallax */}
        <Hero />

        {/* 2. Moon: Enterprise 3D Moon Simulation from Earth */}
        <MoonSection />

        {/* 3. Launches: Real-Time Manifests, Live Countdown & Mission Briefs */}
        <Launches />

        {/* 4. Rockets: 3D Interactive Model Viewer & Engineering Specs */}
        <Rockets />

        {/* 5. Starship: Interactive Flight Profile & Subsystem Architecture */}
        <StarshipSection />

        {/* 6. Mars: 3D Interactive Rotating Mars Globe & Settlement Timeline */}
        <MarsSection />

        {/* 7. Missions: Dragon, Starlink, Rideshare & NASA Artemis Contracts */}
        <Missions />

        {/* 8. Contact: Real-Time Validated Communications Transmission */}
        <ContactSection />
      </main>

      {/* Official SpaceX Footer */}
      <Footer />
    </div>
  )
}

export default App
