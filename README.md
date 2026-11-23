# SpaceX — Multiplanetary Exploration & Launch Architecture

A cutting-edge, high-performance web experience inspired by SpaceX’s engineering philosophy and design language. Built with React 19, Vite, Three.js, and modern CSS variables, this application delivers interactive 3D space environments, real-time launch countdowns, interactive rocket models, and deep architectural breakdowns.

---

## Key Features

### 1. Advanced Sticky Navigation
- **Fixed & Glassmorphic**: Sticky header with smooth transition from transparent to blurred glass on scroll (`backdrop-filter: blur(20px)`).
- **Active Section Highlighting**: Uses `IntersectionObserver` to highlight the current section (`#home`, `#launches`, `#rockets`, `#starship`, `#mars`, `#missions`, `#contact`) as the user navigates.
- **Accessible Mobile Drawer**: Smooth slide-in navigation drawer for mobile devices with body scroll-locking and focus trapping.
- **Keyboard Accessible**: Full support for `:focus-visible`, ARIA labels, and `Escape` key menu dismissal.

### 2. Full-Screen 3D Hero Scene
- **Interactive Space Scene**: Procedural 3D Earth horizon and Starship upper stage model built with Three.js.
- **Multi-Layered Starfield**: Over 3,200 stars with dynamic twinkling and spectral color variations.
- **Smooth Mouse Parallax**: Camera position smoothly lerps in response to cursor position.
- **Live Mission Telemetry**: Real-time UTC clock and live launch telemetry badges.

### 3. Launches & Live Countdown
- **Real-Time Countdown**: Live ticking timer (days, hours, minutes, seconds) targeting upcoming launches.
- **Flight Manifests**: Comprehensive list of upcoming flights and historic milestones (e.g. Mechazilla tower catch, Polaris Dawn).
- **Mission Brief Modal**: Detailed flight trajectories, booster serial histories (e.g. B1077, B1083), and landing zones (ASOG, JRTI, LZ-1).

### 4. 3D Rocket Models & Technical Specifications
- **Interactive 3D Viewer**: Custom 3D procedural models of **Falcon 9**, **Falcon Heavy**, and **Starship & Super Heavy**.
- **360° Drag & Auto-Spin**: Smooth pointer drag rotation and auto-spin toggle with physics damping.
- **Metric / Imperial Unit Switcher**: Instant switching between metric and imperial engineering units.
- **Subsystem Breakdown**: Highlights for stage separation, titanium grid fins, and Merlin / Raptor engine clusters.

### 5. Starship Architecture & Flight Profile
- **Stage-by-Stage Flight Simulation**: Interactive scrub controls detailing:
  1. Liftoff & Raptor 3 power (33 engines, 16.7M lbf thrust)
  2. Hot-staging ring separation
  3. Mechazilla launch tower chopsticks mid-air catch
  4. Hexagonal ceramic thermal protection shield (Mach 25 entry)
  5. Aerodynamic bellyflop and vertical landing flip
- **Dynamic 3D Camera Angles**: The 3D view rotates and adapts to focus on relevant components for each stage.

### 6. Mars 3D Globe & "Road to Mars" Timeline
- **Rotating Mars Globe**: Procedural Martian surface with Olympus Mons, Valles Marineris, and polar ice caps.
- **Interactive Exploration Timeline**: Chronological roadmap from orbital propellant transfer to Mars Base Alpha and in-situ resource utilization (ISRU).
- **Planetary Physics Comparison**: Direct comparison between Earth and Mars gravity, atmosphere, sol length, and distance.

### 7. Space Missions Card Grid
- Comprehensive program showcase for:
  - **Dragon & Crew Dragon**: Commercial crew rotations and cargo resupply to the ISS.
  - **Starlink**: Global satellite broadband with laser space crosslinks.
  - **Transporter SmallSat Rideshare**: Regular rideshare flights to Sun-Synchronous Orbit.
  - **Artemis Human Landing System (HLS)**: Starship lunar lander contract with NASA.
  - **Polaris Program & Deep Space**: Commercial spacewalks and planetary science payloads (Europa Clipper).

### 8. Validated Contact & Global Facilities
- **Client-Side Form Validation**: Real-time validation for name, email, classification, subject, and message.
- **Transmission State**: Realistic mission reference ticket generation upon submission.
- **Facility Directory**: Starbase (Boca Chica), Cape Canaveral, Vandenberg SFB, and Hawthorne HQ.
- **SpaceX Dark Footer**: Official links, social media handles, and back-to-top action.

### 9. Performance & Accessibility
- **Target 60 FPS**: Device pixel ratio capped at `Math.min(window.devicePixelRatio, 2)`.
- **Prefeers-Reduced-Motion**: Automatically disables heavy 3D camera animations and auto-spin when reduced motion is detected.
- **WebGL Fallback**: Graceful fallback to high-resolution imagery when WebGL is unavailable.
- **Telemetry Loading Screen**: SpaceX radar initialization screen while Three.js assets and canvas initialize.

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/MadhurChaturvedi/SpaceX.git
cd SpaceX
npm install
```

### Development Server
Run the local Vite development server with hot module replacement:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
Compile and bundle the project for production:
```bash
npm run build
```

### Preview Production Build
Locally preview the production build:
```bash
npm run preview
```

### Linting
Run ESLint to check for code quality and consistency:
```bash
npm run lint
```

---

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 8
- **3D Graphics**: Three.js
- **Animation & Transitions**: GSAP + ScrollTrigger
- **Typography & Design System**: D-DIN & Space Grotesk, SpaceX Pure Black Canvas (`#000000`)
