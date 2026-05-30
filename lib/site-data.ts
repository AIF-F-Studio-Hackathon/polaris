/**
 * Contenu de la page d'accueil POLARIS — Programme AURORA.
 * Ton : sobre, factuel, immersif (charte SOC-01).
 * Privilégier : mission, découverte, exploration, équipage, transmission,
 * données, observation, historique, humanité, trajectoire.
 */

export const NAV_LINKS = [
  { label: "Mission", href: "#mission" },
  { label: "Objectifs", href: "#objectifs" },
  { label: "Chronologie", href: "#chronologie" },
  { label: "Équipage", href: "#equipage" },
  { label: "À propos", href: "#apropos" },
] as const

/** Données « boarding-pass » du héro. */
export const FLIGHT = {
  code: "AURORA-01",
  vessel: "ODYSSEY IV",
  origin: { code: "TER", label: "Terre, orbite basse" },
  destination: { code: "KEP", label: "Kepler-452c" },
  gate: "04",
  status: "EN ORBITE",
  elapsed: "T+ 18M 04J",
  seat: "06 / 06",
}

export type Stat = {
  value: number
  decimals?: number
  unit: string
  label: string
}

export const STATS: Stat[] = [
  { value: 1400, unit: "al", label: "Jusqu'à Kepler-452c" },
  { value: 340, unit: "m", label: "Longueur de l'Odyssey IV" },
  { value: 6, unit: "", label: "Membres d'équipage" },
  { value: 18, unit: "mois", label: "De voyage à bord" },
  { value: 2000, unit: "Mds", label: "De crédits investis" },
  { value: 8, unit: "Mds", label: "De témoins au lancement" },
]

export type Objective = {
  index: string
  icon: "telescope" | "atom" | "globe" | "radio-tower"
  title: string
  description: string
}

export const OBJECTIVES: Objective[] = [
  {
    index: "01",
    icon: "telescope",
    title: "Atteindre Kepler-452c",
    description:
      "Établir la première présence humaine en orbite d'une exoplanète rocheuse située dans la zone habitable de son étoile.",
  },
  {
    index: "02",
    icon: "atom",
    title: "Analyser l'atmosphère",
    description:
      "Confirmer les signatures atmosphériques détectées en 2047 et rechercher des marqueurs compatibles avec la vie.",
  },
  {
    index: "03",
    icon: "globe",
    title: "Cartographier la surface",
    description:
      "Imager et modéliser la surface d'un monde rocheux jamais observé de près par l'humanité.",
  },
  {
    index: "04",
    icon: "radio-tower",
    title: "Transmettre en direct",
    description:
      "Relayer chaque découverte vers la Terre, puis vers le grand public, via le Centre de Contrôle Aurora.",
  },
]

export type TimelineEntry = {
  year: string
  title: string
  description: string
  current?: boolean
}

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2047",
    title: "Détection",
    description:
      "Les télescopes spatiaux de nouvelle génération révèlent des signatures atmosphériques inhabituelles sur Kepler-452c.",
  },
  {
    year: "2058",
    title: "Programme AURORA",
    description:
      "L'Agence Spatiale Internationale engage 2 000 milliards de crédits pour bâtir le premier vaisseau interstellaire habité.",
  },
  {
    year: "2071",
    title: "Odyssey IV",
    description:
      "Après treize ans de construction en orbite terrestre, le vaisseau de 340 mètres est achevé.",
  },
  {
    year: "2072",
    title: "Sélection de l'équipage",
    description:
      "Six astronautes sont retenus parmi 12 000 candidats, après cinq années d'entraînement intensif.",
  },
  {
    year: "2077",
    title: "Lancement",
    description:
      "L'Odyssey IV quitte l'orbite terrestre sous les yeux de huit milliards de témoins.",
  },
  {
    year: "2079",
    title: "Arrivée en orbite",
    description:
      "Après 18 mois de voyage, l'Odyssey IV entre en orbite de Kepler-452c. Les premières images de la surface sont imminentes.",
    current: true,
  },
]

export type CrewMember = {
  initials: string
  name: string
  role: string
  callsign: string
  bio: string
}

export const CREW: CrewMember[] = [
  {
    initials: "ER",
    name: "Cdt. E. Ripley",
    role: "Commandante de mission",
    callsign: "CMD-01",
    bio: "Vingt ans d'expérience, trois missions orbitales dirigées avant AURORA.",
  },
  {
    initials: "SP",
    name: "Dr. S. Patel",
    role: "Chef scientifique",
    callsign: "SCI-01",
    bio: "Astrophysicien, spécialiste des exoplanètes et des atmosphères rocheuses.",
  },
  {
    initials: "AL",
    name: "Lt. A. Laurent",
    role: "Pilote EVA",
    callsign: "EVA-01",
    bio: "Expert des sorties extravéhiculaires et de l'exploration de terrain.",
  },
  {
    initials: "TW",
    name: "Spc. T. Wong",
    role: "Ingénieure de bord",
    callsign: "ENG-01",
    bio: "Responsable des systèmes du vaisseau et des réparations en vol.",
  },
  {
    initials: "ES",
    name: "Dr. E. Silva",
    role: "Médecin de bord",
    callsign: "MED-01",
    bio: "Spécialiste de la médecine spatiale en mission longue durée.",
  },
  {
    initials: "ND",
    name: "Spc. N. Davis",
    role: "Officier communications",
    callsign: "COM-01",
    bio: "Assure la liaison permanente entre l'Odyssey IV et la Terre.",
  },
]

/** Messages défilants du bandeau « transmission » du héro. */
export const TICKER_ITEMS = [
  "2079.05.30 · 04:12 UTC · réception des premières images de surface",
  "Odyssey IV · orbite stable autour de Kepler-452c",
  "Équipage 6/6 · état nominal",
  "Signal de liaison à 98 % · latence compensée",
  "Distance Terre : 1 400 années-lumière",
] as const

/** Ce que fait la cellule POLARIS (section « À propos »). */
export const POLARIS_PILLARS = [
  {
    icon: "satellite-dish" as const,
    title: "Transmettre",
    description:
      "Recevoir les flux de l'Odyssey IV et les diffuser au monde, en direct.",
  },
  {
    icon: "scan-line" as const,
    title: "Vérifier",
    description:
      "Recouper chaque information avant publication. Aucune rumeur, des faits.",
  },
  {
    icon: "sparkles" as const,
    title: "Raconter",
    description:
      "Donner du sens à l'aventure : communiqués, visuels, vidéos, et ce site.",
  },
]

/** Champ lexical de la cellule (mots à privilégier). */
export const LEXICON = [
  "mission",
  "découverte",
  "exploration",
  "équipage",
  "transmission",
  "données",
  "observation",
  "historique",
  "humanité",
  "trajectoire",
]
