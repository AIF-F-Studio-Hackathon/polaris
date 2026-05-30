/**
 * Contenu de la page d'accueil POLARIS — Programme AURORA.
 * Ton : sobre, factuel, immersif (charte SOC-01).
 * Privilégier : mission, découverte, exploration, équipage, transmission,
 * données, observation, historique, humanité, trajectoire.
 */

export const NAV_LINKS = [
  { label: "Mission", href: "/#mission" },
  { label: "Objectifs", href: "/#objectifs" },
  { label: "Chronologie", href: "/#chronologie" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Équipage", href: "/#equipage" },
  { label: "Journal", href: "/journal" },
  { label: "À propos", href: "/#apropos" },
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
  photo: string
}

export const CREW: CrewMember[] = [
  {
    initials: "ER",
    name: "Cdt. E. Ripley",
    role: "Commandante de mission",
    callsign: "CMD-01",
    bio: "Vingt ans d'expérience, trois missions orbitales dirigées avant AURORA.",
    photo: "/astronautes/Astronaut-Ripley.png",
  },
  {
    initials: "SP",
    name: "Dr. S. Patel",
    role: "Chef scientifique",
    callsign: "SCI-01",
    bio: "Astrophysicien, spécialiste des exoplanètes et des atmosphères rocheuses.",
    photo: "/astronautes/Astronaut-Patel.png",
  },
  {
    initials: "AL",
    name: "Lt. A. Laurent",
    role: "Pilote EVA",
    callsign: "EVA-01",
    bio: "Expert des sorties extravéhiculaires et de l'exploration de terrain.",
    photo: "/astronautes/Astronaut-Laurent.png",
  },
  {
    initials: "TW",
    name: "Spc. T. Wong",
    role: "Ingénieure de bord",
    callsign: "ENG-01",
    bio: "Responsable des systèmes du vaisseau et des réparations en vol.",
    photo: "/astronautes/Astronaut-Wong.png",
  },
  {
    initials: "ES",
    name: "Dr. E. Silva",
    role: "Médecin de bord",
    callsign: "MED-01",
    bio: "Spécialiste de la médecine spatiale en mission longue durée.",
    photo: "/astronautes/Astronaut-Silva.png",
  },
  {
    initials: "ND",
    name: "Spc. N. Davis",
    role: "Officier communications",
    callsign: "COM-01",
    bio: "Assure la liaison permanente entre l'Odyssey IV et la Terre.",
    photo: "/astronautes/Astronaut-Davis.png",
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

/**
 * Galerie « premières images » de Kepler-452c.
 * Visuels d'illustration (placeholders) en attendant les rendus de l'équipe.
 * L'ordre correspond aux fichiers /public/gallery/kepler-01..06.jpg.
 * Légende imposée par le brief : lieu, date, astronaute.
 */
export type GalleryShot = {
  id: string
  title: string
  location: string
  date: string
  author: string
  alt: string
}

export const GALLERY: GalleryShot[] = [
  {
    id: "kepler-01",
    title: "Kepler-452c, premier hémisphère",
    location: "Orbite haute · insertion",
    date: "2079.05.28",
    author: "Cdt. E. Ripley",
    alt: "Hémisphère de Kepler-452c, vaste système nuageux en spirale visible au pôle.",
  },
  {
    id: "kepler-02",
    title: "Sonde d'observation en approche",
    location: "Orbite d'insertion · 42 000 km",
    date: "2079.05.28",
    author: "Lt. A. Laurent",
    alt: "Sonde d'observation survolant la surface rougeâtre et cratérisée de Kepler-452c.",
  },
  {
    id: "kepler-03",
    title: "Largage de la sonde atmosphérique",
    location: "Couloir d'approche",
    date: "2079.05.29",
    author: "Spc. T. Wong",
    alt: "Sonde atmosphérique déployant son antenne au-dessus de la planète.",
  },
  {
    id: "kepler-04",
    title: "Reliefs du grand rift",
    location: "Survol basse altitude",
    date: "2079.05.29",
    author: "Dr. S. Patel",
    alt: "Chaînes de reliefs et vallées d'un grand rift à la surface de Kepler-452c.",
  },
  {
    id: "kepler-05",
    title: "Canyon, ligne du terminateur",
    location: "Quart bâbord · orbite stable",
    date: "2079.05.30",
    author: "Spc. N. Davis",
    alt: "Surface de Kepler-452c le long du terminateur, sonde visible en orbite.",
  },
  {
    id: "kepler-06",
    title: "Calotte glaciaire, cratère polaire",
    location: "Pôle nord · Kepler-452c",
    date: "2079.05.30",
    author: "Dr. E. Silva",
    alt: "Grand cratère polaire au dépôt de glace clair en son centre.",
  },
]

/**
 * Journal de bord technique — registre des incidents de la mission.
 * Ton : technique, transparent, rassurant.
 * Statut évolutif : "en-cours" → "resolu". Le tableau accueille de futurs
 * incidents : il suffit d'ajouter une entrée en tête de liste.
 */
export type IncidentSeverity = "faible" | "moyenne" | "haute"
export type IncidentStatus = "en-cours" | "resolu"

export type Incident = {
  ref: string
  date: string
  time: string
  title: string
  system: string
  severity: IncidentSeverity
  status: IncidentStatus
  description: string
  resolution: string
}

export const SEVERITY_LABEL: Record<IncidentSeverity, string> = {
  faible: "Faible",
  moyenne: "Moyenne",
  haute: "Haute",
}

export const STATUS_LABEL: Record<IncidentStatus, string> = {
  "en-cours": "En cours",
  resolu: "Résolu",
}

export const INCIDENTS: Incident[] = [
  {
    ref: "EVT-04",
    date: "2079.05.30",
    time: "03:00 UTC",
    title: "Tempête solaire, classe M4",
    system: "Communications · liaison haut débit",
    severity: "haute",
    status: "en-cours",
    description:
      "Tempête solaire de classe M4 détectée le 30/05/2079. Impact sur les communications attendu sous 45 minutes, durée estimée de 6 à 8 heures. Débit de liaison réduit à 10 %. Le protocole COM-DEGRAD est activé : le site bascule en mode de communication dégradé pour la durée de l'événement.",
    resolution:
      "Protocole COM-DEGRAD en vigueur. L'équipage passe en mode économie de bande passante : transmissions courtes et espacées jusqu'à la fin de la tempête. Note de l'équipage : « On a vu l'alerte. On passe en mode économie de bande passante. Les prochains messages seront courts. Ne vous inquiétez pas si on est silencieux. »",
  },
  {
    ref: "EVT-02",
    date: "2079.05.29",
    time: "22:00 UTC",
    title: "Défaillance capteur thermique, module 3",
    system: "Thermique · capteur module 3 (redondant)",
    severity: "moyenne",
    status: "en-cours",
    description:
      "Défaillance d'un capteur thermique sur le module 3, détectée le 29/05/2079 lors d'une transmission de l'Odyssey IV. Diagnostic en cours. Impact sur la mission : négligeable. Réparation estimée à 4 heures.",
    resolution:
      "Le capteur est redondant : aucune perte de couverture thermique, aucun effet sur la sécurité de l'équipage. Intervention prise en charge par l'ingénierie de bord (Spc. Wong, Spc. Davis), réparation estimée à 4 heures. Note de l'équipage : « Rien de grave, c'est un capteur redondant. Davis et moi on s'en occupe. Mais bon, 18 mois de voyage, fallait bien qu'un truc lâche un jour. »",
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
