export const MISSIONS_LIST = [
  {
    id: 'mission-dragon',
    category: 'human',
    title: 'DRAGON & CREW DRAGON',
    tagline: 'RETURNING ASTRONAUT LAUNCH CAPABILITY',
    specs: '7 CREW CAPACITY • 16 PRESSURIZED FLIGHTS • FREE-FLIGHT DURATION 7 DAYS',
    description:
      'Dragon is capable of carrying up to 7 passengers to and from Earth orbit, and beyond. It is the only spacecraft currently flying capable of returning significant amounts of cargo to Earth, and is the first private spacecraft to take humans to the space station.',
    stats: [
      { label: 'TOTAL VISITS TO ISS', value: '45+ DOCKINGS' },
      { label: 'ORBITAL TIME', value: '1,500+ DAYS IN SPACE' },
      { label: 'PARACHUTE SYSTEM', value: '4 MAIN CHUTES' },
    ],
  },
  {
    id: 'mission-starlink',
    category: 'constellation',
    title: 'STARLINK CONSTELLATION',
    tagline: 'HIGH-SPEED GLOBAL SATELLITE INTERNET',
    specs: 'LOW EARTH ORBIT • 550 KM ALTITUDE • SPACE LASER CROSSLINKS',
    description:
      'Starlink is the world’s first and largest satellite constellation using a low Earth orbit to deliver broadband internet capable of supporting streaming, online gaming, and video calls. Directly serves remote maritime, defense, and polar regions.',
    stats: [
      { label: 'ACTIVE SATELLITES', value: '6,500+ IN ORBIT' },
      { label: 'GLOBAL USERS', value: '4.5+ MILLION' },
      { label: 'LATENCY', value: '20 - 35 MS' },
    ],
  },
  {
    id: 'mission-rideshare',
    category: 'commercial',
    title: 'TRANSPORTER RIDESHARE',
    tagline: 'DEDICATED SMALLSAT ACCESS TO ORBIT',
    specs: 'SSO ORBITS • STARTING AT $300,000 • REGULAR SCHEDULED SLOTS',
    description:
      'SpaceX’s SmallSat Rideshare Program provides small satellite operators regularly scheduled, dedicated Falcon 9 launches to SSO for as low as $300,000 for 50 kg, with custom separation rings and dispenser interfaces.',
    stats: [
      { label: 'SATELLITES DEPLOYED', value: '1,000+ SMALLSATS' },
      { label: 'ORBIT ACCURACY', value: '± 5 KM INSERTION' },
      { label: 'FREQUENCY', value: 'EVERY 4 MONTHS' },
    ],
  },
  {
    id: 'mission-artemis-hls',
    category: 'deep-space',
    title: 'NASA ARTEMIS HUMAN LUNAR LANDER',
    tagline: 'LANDING HUMANS BACK ON THE MOON',
    specs: 'NASA CONTRACT • ARTEMIS III & IV • LUNAR SOUTH POLE LANDING',
    description:
      'NASA selected Starship to serve as the Human Landing System (HLS) for Artemis III and IV. Starship will dock with Orion or Gateway in lunar orbit, descend to the lunar surface with crew, and lift off back to lunar rendezvous.',
    stats: [
      { label: 'LUNAR CREW CABIN', value: 'SPACIOUS HABITAT' },
      { label: 'AIRLOCK & ELEVATOR', value: 'SURFACE ROVER ACCESS' },
      { label: 'CARGO TO MOON', value: '100+ METRIC TONS' },
    ],
  },
  {
    id: 'mission-polaris',
    category: 'human',
    title: 'POLARIS PROGRAM',
    tagline: 'FIRST COMMERCIAL EXTRAVEHICULAR ACTIVITY',
    specs: 'POLARIS DAWN • 1,400 KM APOGEE • ADVANCED EVA MOBILITY SUITS',
    description:
      'An initiative led by Jared Isaacman to rapidly advance human spaceflight capabilities. Polaris Dawn tested SpaceX’s newly designed extravehicular activity spacesuits in the vacuum of space, validating life support for future lunar and Mars missions.',
    stats: [
      { label: 'APOGEE ALTITUDE', value: '1,400.7 KM' },
      { label: 'SPACELINK TESTING', value: 'STARLINK LASER COMM' },
      { label: 'RADIATION STUDY', value: 'VAN ALLEN BELT DATA' },
    ],
  },
  {
    id: 'mission-deepspace',
    category: 'deep-space',
    title: 'PLANETARY DEFENSE & DEEP SPACE',
    tagline: 'INTERPLANETARY SCIENTIFIC PROBES',
    specs: 'DART • PSYCHE • EUROPA CLIPPER • INTERPLANETARY VELOCITY',
    description:
      'Falcon 9 and Falcon Heavy launch NASA’s most ambitious deep-space science probes. From launching NASA’s DART asteroid deflection mission to launching the flagship Europa Clipper spacecraft to Jupiter’s icy moon.',
    stats: [
      { label: 'EUROPA CLIPPER MASS', value: '6,000 KG SPACECRAFT' },
      { label: 'ESCAPE VELOCITY', value: '11.2 KM/S C3 ENERGY' },
      { label: 'DESTINATION', value: 'JOVIAN SYSTEM' },
    ],
  },
]
