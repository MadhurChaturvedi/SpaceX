export const MARS_TIMELINE = [
  {
    phase: 'PHASE 01',
    year: '2026 - 2027',
    title: 'PROPELLANT TRANSFER & ORBITAL REFUELING',
    subtitle: 'ENABLING DEEP SPACE TRAVEL',
    description:
      'Demonstrating ship-to-ship cryogenic liquid methane and liquid oxygen propellant transfer in low Earth orbit. A single Starship requires multiple tanker flights to fully refuel its 1,200 metric ton propellant capacity for trans-Mars injection.',
    keyStats: [
      { label: 'ORBITAL TANKERS', value: '4 - 8 FLIGHTS' },
      { label: 'CRYOGENIC FLUIDS', value: 'CH4 + LOX' },
      { label: 'TRANSFER METHOD', value: 'ULLAGE ACCELERATION' },
    ],
  },
  {
    phase: 'PHASE 02',
    year: '2027 - 2028',
    title: 'ARTEMIS LUNAR LANDING (HLS)',
    subtitle: 'TESTBED ON THE MOON',
    description:
      'Under NASA’s Artemis program, Starship HLS will land the first astronauts, including the first woman and person of color, near the lunar South Pole. Validates precision vertical landing on unprepared extraterrestrial terrain.',
    keyStats: [
      { label: 'CREW CAPACITY', value: 'UP TO 100 ASTRONAUTS' },
      { label: 'SURFACE DURATION', value: '14+ DAYS LUNAR' },
      { label: 'LANDING THRUST', value: 'MID-BODY DEPOSITION ENGINES' },
    ],
  },
  {
    phase: 'PHASE 03',
    year: '2028 - 2029',
    title: 'FIRST UNCREWED MARS FLEET',
    subtitle: 'SCOUTING & SURFACE ROBOTICS',
    description:
      'Launching an initial fleet of uncrewed Starships during the biennial Earth-Mars orbital transfer window. Testing trans-Mars entry at 7.5 km/s without a runway and deploying autonomous rovers to locate accessible subsurface water ice.',
    keyStats: [
      { label: 'TRANSIT TIME', value: '80 - 150 DAYS' },
      { label: 'ENTRY VELOCITY', value: '7.5 KM/S (27,000 KM/H)' },
      { label: 'PRIMARY TARGET', value: 'ARCADIA PLANITIA (40°N)' },
    ],
  },
  {
    phase: 'PHASE 04',
    year: '2031 - 2033',
    title: 'FIRST CREWED MARS LANDING & BASE ALPHA',
    subtitle: 'THE BEGINNING OF HUMAN OCCUPATION',
    description:
      'The first human astronauts land on Mars to build "Mars Base Alpha". Immediate tasks include erecting solar power arrays, deploying nuclear micro-reactors, and setting up pressurized geodesic habitats for permanent living.',
    keyStats: [
      { label: 'INITIAL CREW', value: '12 - 24 PIONEERS' },
      { label: 'SURFACE POWER', value: '1.2 MEGAWATTS (SOLAR + KILOPOWER)' },
      { label: 'HABITAT AREA', value: '1,000 M² PRESSURIZED' },
    ],
  },
  {
    phase: 'PHASE 05',
    year: '2034+',
    title: 'ISRU PROPELLANT PRODUCTION & EXPANSION',
    subtitle: 'SELF-SUSTAINING RETURN ARCHITECTURE',
    description:
      'Utilizing the Sabatier reaction to combine Martian atmospheric carbon dioxide (CO2) with mined subsurface water ice (H2O) to synthesize liquid methane and oxygen. This powers return trips to Earth and establishes economic trade.',
    keyStats: [
      { label: 'SABATIER REACTION', value: 'CO2 + 4H2 -> CH4 + 2H2O' },
      { label: 'PROPELLANT HARVEST', value: '1,200 TONS PER LAUNCH' },
      { label: 'LONG-TERM VISION', value: '1,000,000 CITIZENS' },
    ],
  },
]

export const PLANETARY_COMPARISON = [
  { metric: 'SURFACE GRAVITY', earth: '9.81 m/s² (1.0g)', mars: '3.72 m/s² (0.38g)', note: 'Allows humans to lift 2.6x heavier gear' },
  { metric: 'DAY LENGTH (SOL)', earth: '24 hours 00 mins', mars: '24 hours 39 mins', note: 'Closest match to human circadian rhythm' },
  { metric: 'ATMOSPHERE', earth: '78% N2, 21% O2 (101 kPa)', mars: '95% CO2, 2.6% N2 (0.6 kPa)', note: 'Abundant carbon source for synthetic fuel' },
  { metric: 'DISTANCE FROM SUN', earth: '149.6 Million km', mars: '227.9 Million km', note: 'Solar intensity is ~43% of Earth levels' },
  { metric: 'AVERAGE TEMPERATURE', earth: '+14°C (+57°F)', mars: '-63°C (-81°F)', note: 'Starship hulls provide heavy thermal insulation' },
]
