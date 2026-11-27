export const LUNAR_PHASES = [
  { name: 'NEW MOON', angle: 0, illumination: 0, day: 'Day 0.0', desc: 'Moon is between Earth and Sun; the near side is in shadow with faint Earthshine.' },
  { name: 'WAXING CRESCENT', angle: 45, illumination: 25, day: 'Day 3.7', desc: 'A sliver of sunlight illuminates the western lunar limb as seen from Earth.' },
  { name: 'FIRST QUARTER', angle: 90, illumination: 50, day: 'Day 7.4', desc: 'Half the near side is illuminated; terminator line reveals extreme crater shadows.' },
  { name: 'WAXING GIBBOUS', angle: 135, illumination: 75, day: 'Day 11.1', desc: 'Most of the lunar surface is bathed in sunlight, approaching full phase.' },
  { name: 'FULL MOON', angle: 180, illumination: 100, day: 'Day 14.8', desc: 'Near side directly faces the Sun; mare basalt plains appear in high contrast.' },
  { name: 'WANING GIBBOUS', angle: 225, illumination: 75, day: 'Day 18.5', desc: 'Sunlight begins receding westward; eastern craters cast long morning shadows.' },
  { name: 'THIRD QUARTER', angle: 270, illumination: 50, day: 'Day 22.1', desc: 'Half illuminated on the eastern hemisphere, visible in early morning Earth skies.' },
  { name: 'WANING CRESCENT', angle: 315, illumination: 25, day: 'Day 25.8', desc: 'Final crescent before completing the 29.53-day synodic lunar cycle.' },
]

export const LUNAR_LANDMARKS = [
  {
    id: 'apollo11',
    name: 'APOLLO 11 / TRANQUILITY BASE',
    coords: { lat: 0.67, lon: 23.47 },
    feature: 'Mare Tranquillitatis',
    historicDate: 'JULY 20, 1969',
    details: 'First crewed lunar landing site. Neil Armstrong and Buzz Aldrin spent 21.6 hours on the surface, deploying seismometers and collecting 21.5 kg of lunar regolith samples.',
    spaceXRelevance: 'Historic precedent for crewed extraterrestrial landings; verified regolith mechanical bearing capacity.',
  },
  {
    id: 'artemis3',
    name: 'ARTEMIS III LUNAR SOUTH POLE',
    coords: { lat: -89.9, lon: 0.0 },
    feature: 'Shackleton Crater Rim',
    historicDate: 'TARGET 2027/2028',
    details: 'NASA Artemis human return zone utilizing SpaceX Starship Human Landing System (HLS). Permanently shadowed regions harbor billion-ton water ice deposits vital for rocket propellant.',
    spaceXRelevance: 'SpaceX Starship HLS landing site. Starship will descend using mid-body deposition thrusters to avoid crater erosion.',
  },
  {
    id: 'tycho',
    name: 'TYCHO CRATER',
    coords: { lat: -43.3, lon: -11.2 },
    feature: 'Impact Crater (85 km dia)',
    historicDate: '108 MILLION YEARS OLD',
    details: 'One of the most prominent impact craters visible from Earth with a naked eye or telescope, featuring a bright ray system spanning over 1,500 kilometers across the southern highlands.',
    spaceXRelevance: 'Key optical navigation beacon for trans-lunar autonomous navigation sensors.',
  },
  {
    id: 'oceanus',
    name: 'OCEANUS PROCELLARUM',
    coords: { lat: 18.4, lon: -57.4 },
    feature: 'Ocean of Storms',
    historicDate: 'VAST BASALTIC PLAIN',
    details: 'Largest lunar mare, covering over 4 million square kilometers. Landing site of Apollo 12 and numerous robotic survey missions.',
    spaceXRelevance: 'Primary proposed site for high-capacity Starship lunar cargo depots and solar arrays.',
  },
]

export const LUNAR_TELEMETRY = {
  meanDistanceKm: '384,400 km',
  perigeeKm: '363,300 km',
  apogeeKm: '405,500 km',
  orbitalPeriodDays: '27.32 days (Sidereal)',
  synodicCycleDays: '29.53 days (Phase Cycle)',
  orbitalSpeed: '1.022 km/s (3,679 km/h)',
  surfaceGravity: '1.62 m/s² (0.166g)',
  diameterKm: '3,474.8 km (0.27 Earths)',
  massKg: '7.342 × 10²² kg (0.0123 Earths)',
  starshipTransitTime: '72 to 84 Hours (Starship TLI)',
}
