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
  { label: "Veille", href: "/#veille" },
  { label: "Équipage", href: "/#equipage" },
  { label: "EVA", href: "/eva" },
  { label: "Découverte", href: "/decouverte" },
  { label: "Crise", href: "/crise" },
  { label: "Journal", href: "/journal" },
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

/**
 * Système de veille / alerte (EVT-06).
 *
 * MÉCANISME CONFIDENTIEL → PUBLIC : il suffit de basculer `SIGNAL.visibility`
 * de "confidentiel" à "public". En confidentiel, les champs marqués
 * `sensitive` sont caviardés et le résumé confidentiel est affiché ; en
 * public, tout est révélé et le résumé public prend le relais.
 * L'espace « Mises à jour » (SIGNAL.updates) est prêt à accueillir la suite.
 */
export type SignalVisibility = "confidentiel" | "public"

export type SignalField = {
  label: string
  value: string
  sensitive?: boolean
}

export type SignalUpdate = {
  date: string
  time: string
  visibility: SignalVisibility
  text: string
}

export const SIGNAL = {
  // ⇩ Unique interrupteur : passer à "public" révèle tout le contenu.
  visibility: "confidentiel" as SignalVisibility,
  ref: "EVT-06",
  status: "Sous surveillance",
  classification: "Confidentiel · diffusion restreinte CCA",
  detectedDate: "2079.05.30",
  detectedTime: "08:47 UTC",
  source: "Transmission Odyssey IV · log automatique",
  // Résumés selon le niveau de diffusion.
  confidentialSummary:
    "Un signal anormal a été détecté et consigné automatiquement. Les données sont en cours d'analyse par la cellule. Aucune information complémentaire n'est communiquée à ce stade.",
  publicSummary:
    "Détection d'un signal électromagnétique anormal par l'Odyssey IV. La source et les caractéristiques du signal sont en cours d'étude. La cellule POLARIS communiquera chaque élément vérifié dès qu'il sera disponible.",
  fields: [
    { label: "Nature", value: "Signal électromagnétique anormal" },
    { label: "Durée", value: "3 min 42 s" },
    { label: "Source", value: "Vallée d'Aurelia · secteur 7", sensitive: true },
    {
      label: "Fréquence",
      value: "Non répertoriée dans les bases connues",
      sensitive: true,
    },
    { label: "Équipage", value: "Informé" },
  ] as SignalField[],
  // Espace prêt pour les mises à jour à venir (du plus récent au plus ancien).
  updates: [
    {
      date: "2079.05.30",
      time: "08:47 UTC",
      visibility: "confidentiel",
      text: "Détection et consignation automatique du signal. Analyse engagée par la cellule.",
    },
  ] as SignalUpdate[],
}

/**
 * Suivi EVA en direct (EVT-08) — sortie extravéhiculaire, secteur 7.
 *
 * STATUT ÉVOLUTIF : EVA.status passe de "en-cours" à "terminee".
 * Le fil (EVA.feed) s'enrichit en tête ; la section données/images
 * (EVA.captures) se remplit au fur et à mesure (image optionnelle).
 */
export type EvaStatus = "en-cours" | "terminee"

export type EvaFeedEntry = {
  time: string
  author: string
  text: string
  highlight?: boolean
}

export type EvaCapture = {
  ref: string
  label: string
  value: string
  image?: string
}

export const EVA = {
  status: "en-cours" as EvaStatus,
  ref: "EVT-08",
  title: "Exploration du secteur 7",
  date: "2079.05.30",
  startTime: "11:33 UTC",
  sector: "Secteur 7 · Vallée d'Aurelia",
  // Équipage en sortie (callsigns définis dans CREW)
  team: [
    { name: "Lt. A. Laurent", role: "Pilote EVA", callsign: "EVA-01" },
    { name: "Spc. T. Wong", role: "Ingénieure de bord", callsign: "ENG-01" },
  ],
  // Repère sur la carte du secteur 7 (pourcentages, coin haut-gauche).
  position: { x: 58, y: 44, label: "Position équipe · 200 m de la cible" },
  target: { x: 72, y: 36, label: "Cible · formation cristalline" },
  vitals: [
    { label: "O₂ Laurent", value: "92 %" },
    { label: "O₂ Wong", value: "94 %" },
    { label: "Temps écoulé", value: "T+ 00:41" },
    { label: "Liaison", value: "Stable" },
  ],
  feed: [
    {
      time: "12:14 UTC",
      author: "EVA-01 · Laurent",
      text: "C'est… c'est une formation cristalline. Jamais vu ça. Elle est translucide, haute d'environ 3 mètres, et elle pulse. Faiblement, mais de manière régulière. Patel va perdre la tête quand il verra les images.",
      highlight: true,
    },
    {
      time: "11:58 UTC",
      author: "EVA-01 · Laurent",
      text: "On aperçoit… attendez… il y a quelque chose qui reflète la lumière à 200 mètres. Ce n'est pas rocheux. On continue.",
    },
    {
      time: "11:33 UTC",
      author: "CCA · contrôle",
      text: "Laurent et Wong en approche du secteur 7. Visibilité correcte. Sol stable. Début de la sortie extravéhiculaire.",
    },
  ] as EvaFeedEntry[],
  captures: [
    {
      ref: "IMG-08-03",
      label: "Formation cristalline",
      value: "≈ 3 m · translucide · pulsation régulière",
      image: "/gallery/kepler-06.jpg",
    },
    {
      ref: "DAT-08-02",
      label: "Réflectance anormale",
      value: "Pic optique à 200 m · non minéral",
    },
    {
      ref: "DAT-08-01",
      label: "Conditions de terrain",
      value: "Sol stable · visibilité correcte",
    },
  ] as EvaCapture[],
}

/**
 * Découverte majeure (EVT-09) — Protocole NOVA.
 *
 * Notification d'Observation Vérifiée Anomale : cadre de communication activé
 * pour les découvertes majeures. La cellule s'en tient strictement à ce qui
 * est observé et mesuré.
 *
 * DISCIPLINE DE COMMUNICATION (NOVA) — vocabulaire retenu pour toute la page :
 * « phénomène naturel inexpliqué », « structure d'origine inconnue »,
 * « découverte scientifique majeure », « anomalie géologique active ».
 * Aucune interprétation au-delà des données vérifiées.
 *
 * ÉVOLUTIF : l'espace DISCOVERY.updates accueille les prochaines analyses
 * vérifiées (du plus récent au plus ancien).
 */
export type DiscoverySpec = {
  label: string
  value: string
  note?: string
}

export type DiscoveryStep = {
  ref: string
  date: string
  time: string
  title: string
  text: string
  current?: boolean
}

export type FaqItem = {
  q: string
  a: string
}

export type DiscoveryUpdate = {
  date: string
  time: string
  text: string
}

export const DISCOVERY = {
  ref: "EVT-09",
  protocol: "Protocole NOVA",
  protocolFull: "Notification d'Observation Vérifiée Anomale",
  status: "Découverte confirmée",
  date: "2079.05.30",
  time: "16:01 UTC",
  source: "Transmission Odyssey IV",
  location: "Secteur 7 · Vallée d'Aurelia · Kepler-452c",
  kicker: "Découverte scientifique majeure",
  title: "Une structure d'origine inconnue sur Kepler-452c",
  lede: "Dans la Vallée d'Aurelia, l'équipage de l'Odyssey IV a confirmé l'existence d'une structure cristalline d'origine inconnue. Haute de 3,2 mètres, elle émet une lumière selon un cycle régulier de 47 secondes et génère un champ électromagnétique faible mais mesurable. Ce n'est ni un artefact, ni une défaillance instrumentale : c'est une découverte scientifique majeure.",
  // Caractéristiques mesurées (visuels + données scientifiques).
  specs: [
    { label: "Hauteur", value: "3,2 m", note: "mesure terrain · EVA-01" },
    { label: "Cycle lumineux", value: "47 s", note: "émission régulière" },
    {
      label: "Champ électromagnétique",
      value: "Faible",
      note: "mesurable · stable",
    },
    { label: "Aspect", value: "Cristallin", note: "translucide" },
    { label: "Localisation", value: "Secteur 7", note: "Vallée d'Aurelia" },
    {
      label: "Qualification",
      value: "Anomalie géologique active",
      note: "phénomène naturel inexpliqué",
    },
  ] as DiscoverySpec[],
  // Présentation chronologique de la découverte (relie EVT-06 → EVT-08 → EVT-09).
  chronology: [
    {
      ref: "EVT-06",
      date: "2079.05.30",
      time: "08:47 UTC",
      title: "Premier signal",
      text: "Un signal électromagnétique anormal est détecté et consigné automatiquement par l'Odyssey IV. Son origine est localisée dans le secteur 7, sans explication à ce stade.",
    },
    {
      ref: "EVT-08",
      date: "2079.05.30",
      time: "11:33 UTC",
      title: "Sortie sur le terrain",
      text: "Laurent et Wong descendent dans la Vallée d'Aurelia pour remonter à la source du signal. Sol stable, visibilité correcte : l'exploration du secteur 7 commence.",
    },
    {
      ref: "EVT-08",
      date: "2079.05.30",
      time: "12:14 UTC",
      title: "Premier contact visuel",
      text: "À 200 mètres, une formation translucide réfléchit la lumière. De près, c'est une structure cristalline d'environ 3 mètres, qui pulse faiblement et de manière régulière.",
    },
    {
      ref: "EVT-09",
      date: "2079.05.30",
      time: "16:01 UTC",
      title: "Découverte confirmée",
      text: "Les mesures confirment l'observation : 3,2 mètres, cycle lumineux de 47 secondes, champ électromagnétique mesurable. Le signal du matin venait de là. Activation du Protocole NOVA.",
      current: true,
    },
  ] as DiscoveryStep[],
  // FAQ destinée au public et aux médias (discipline NOVA respectée).
  faq: [
    {
      q: "Qu'est-ce qui a été découvert exactement ?",
      a: "Une structure cristalline d'origine inconnue, haute de 3,2 mètres, située dans la Vallée d'Aurelia (secteur 7) de Kepler-452c. Elle est translucide, émet une lumière selon un cycle régulier de 47 secondes et génère un champ électromagnétique faible mais mesurable.",
    },
    {
      q: "Comment être certain qu'il ne s'agit ni d'un artefact, ni d'une erreur instrumentale ?",
      a: "La structure a été observée directement par l'équipage lors d'une sortie extravéhiculaire, puis mesurée. Son champ électromagnétique est stable et reproductible, et il correspond au signal détecté le matin même. Trois sources indépendantes concordent : observation visuelle, mesure de terrain et donnée orbitale.",
    },
    {
      q: "Quelle est la nature de ce phénomène ?",
      a: "À ce stade, il est qualifié de phénomène naturel inexpliqué et d'anomalie géologique active. La cellule POLARIS s'en tient strictement à ce qui est observé et mesuré. Aucune interprétation au-delà des données vérifiées ne sera communiquée.",
    },
    {
      q: "Pourquoi parler de « Protocole NOVA » ?",
      a: "NOVA signifie Notification d'Observation Vérifiée Anomale. C'est le cadre de communication activé pour une découverte majeure : chaque élément est recoupé et vérifié avant d'être rendu public. Il garantit que vous recevez des faits, jamais des suppositions.",
    },
    {
      q: "Y a-t-il un risque pour l'équipage ?",
      a: "Aucun risque n'a été identifié. Le champ électromagnétique mesuré est faible, l'équipage observe la structure à distance de sécurité et reste sous surveillance médicale continue depuis l'Odyssey IV.",
    },
    {
      q: "Quand aurons-nous plus d'informations ?",
      a: "Les analyses se poursuivent à bord et au Centre de Contrôle Aurora. Chaque élément vérifié sera publié dans l'espace « Mises à jour » ci-dessous, au fur et à mesure de son recoupement.",
    },
  ] as FaqItem[],
  // Espace prêt pour les futures mises à jour (du plus récent au plus ancien).
  updates: [
    {
      date: "2079.05.30",
      time: "16:01 UTC",
      text: "Découverte confirmée par recoupement des mesures. Activation du Protocole NOVA et ouverture de la communication publique.",
    },
  ] as DiscoveryUpdate[],
}

/**
 * Centre de crise en ligne (EVT-11).
 *
 * Section d'urgence qui centralise l'information vérifiée pendant la crise
 * médiatique : démenti officiel, démentis point par point, preuves, message
 * de l'équipage et FAQ. Ton officiel, factuel, rassurant. Chaque information
 * est horodatée.
 *
 * ÉTAT : CRISIS.active pilote la bannière d'urgence sur l'accueil et l'état
 * de la page. Passer à `false` lèvera l'alerte. Le registre CRISIS.updates
 * et les listes (rumors / proofs) sont prêts à accueillir la suite.
 */
export type CrisisVerdict = "faux" | "verifie" | "en-cours"

export type CrisisRumor = {
  time: string
  claim: string
  verdict: CrisisVerdict
  response: string
}

export type CrisisProof = {
  ref: string
  time: string
  label: string
  description: string
}

export type CrisisFaq = {
  q: string
  a: string
}

export type CrisisUpdate = {
  date: string
  time: string
  text: string
}

export const CRISIS = {
  active: true,
  ref: "EVT-11",
  level: "Niveau 3 · Crise médiatique",
  status: "Cellule de crise activée",
  date: "2079.05.30",
  startTime: "22:00 UTC",
  updatedTime: "22:48 UTC",
  // Bannière d'urgence (accueil) : accès prioritaire au centre de crise.
  banner: {
    label: "Alerte",
    text: "Désinformation en cours sur la mission AURORA. Consultez les informations officielles vérifiées.",
    cta: "Accéder au centre de crise",
  },
  intro:
    "Une campagne de désinformation circule actuellement au sujet de la mission AURORA, sur deux fronts : une rumeur virale (#AuroraAlien) et une manipulation interne de notre classement. Cette page centralise les informations officielles, vérifiées et horodatées par la cellule POLARIS. Nous démentons formellement les contenus mensongers et reconnaissons sans détour les faits internes.",
  // Volet transparence (EVT-10) : la manipulation interne du classement.
  manipulation: {
    ref: "EVT-10",
    time: "19:00 UTC",
    title: "Manipulation interne du classement",
    figure: "3 600+",
    figureLabel: "crédits mission frauduleux retirés",
    body: [
      "Le 30 mai à 19:00, la sécurité du CCA a identifié une cellule de communication ayant manipulé les systèmes de scoring du Centre de Contrôle. Plus de 3 600 crédits mission (CM) frauduleux avaient été injectés dans le classement.",
      "Nous le reconnaissons sans détour. Les crédits mission frauduleux ont été identifiés et retirés, le classement est en cours de correction, et la cellule responsable a été écartée du programme.",
      "Cet incident n'affecte ni la sécurité de l'équipage, ni les données scientifiques de la mission, qui restent intègres et vérifiées.",
    ],
  },
  // Réaction de l'équipage (EVT-10) : message de la commandante.
  crewStatement: {
    time: "19:12 UTC",
    author: "Cdt. E. Ripley · Commandante de mission",
    text: "On vient de voir le hashtag #AuroraAlien. C'est n'importe quoi. Nous avons trouvé une structure cristalline, pas des petits hommes verts. Et pour la cellule qui a triché… on est déçus. L'équipage est unanime : restez factuel, restez intègre. On compte sur vous.",
  },
  // Démenti officiel — calme, clair, central.
  denial: {
    time: "22:30 UTC",
    title: "Démenti officiel",
    body: [
      "Aucune forme de vie, aucun être vivant n'a été observé à bord de l'Odyssey IV ni sur Kepler-452c. La vidéo montrant un prétendu « passager » à l'intérieur du vaisseau est un faux, généré artificiellement. Elle ne provient d'aucune transmission de l'équipage.",
      "La découverte annoncée le 30 mai (EVT-09) concerne une structure d'origine inconnue, un phénomène naturel inexpliqué. Elle ne constitue en rien la preuve d'une présence vivante.",
      "L'équipage est en sécurité, en bonne santé, et poursuit sa mission normalement. La cellule POLARIS reste l'unique source officielle d'information sur la mission AURORA.",
    ],
  },
  // Démentis point par point : ce qui circule / ce que nous confirmons.
  rumors: [
    {
      time: "19:05 UTC",
      claim: "#AuroraAlien : le CCA cacherait une forme de vie extraterrestre.",
      verdict: "faux",
      response:
        "Aucune forme de vie n'a été découverte. L'observation du 30 mai est une structure cristalline d'origine inconnue, documentée publiquement sur notre page Découverte. La rumeur a été lancée par un compte complotiste, puis reprise sans vérification.",
    },
    {
      time: "22:18 UTC",
      claim: "Une vidéo montrerait un « alien » à l'intérieur de l'Odyssey IV.",
      verdict: "faux",
      response:
        "La vidéo est un deepfake. Analyse d'authenticité à l'appui (voir preuves PRV-11-01) : montage artificiel, absente des journaux de transmission du vaisseau. Aucune image de ce type n'a été reçue ni diffusée par le CCA.",
    },
    {
      time: "22:22 UTC",
      claim: "La mission cacherait l'existence d'une vie extraterrestre.",
      verdict: "faux",
      response:
        "La découverte EVT-09 est une structure minérale d'origine inconnue, documentée publiquement et en détail sur notre page Découverte. Aucune observation de l'équipage ne fait état d'un organisme vivant.",
    },
    {
      time: "22:35 UTC",
      claim: "L'équipage serait en danger ou aurait perdu le contact.",
      verdict: "faux",
      response:
        "La liaison avec l'Odyssey IV est active. Les six membres d'équipage sont en bonne santé. Le dernier relevé de bord est horodaté et consultable dans le Journal de bord.",
    },
  ] as CrisisRumor[],
  // Preuves vérifiées (chaque élément horodaté + référencé).
  proofs: [
    {
      ref: "PRV-11-01",
      time: "22:24 UTC",
      label: "Analyse d'authenticité de la vidéo",
      description:
        "Rapport technique du CCA : la vidéo « alien » présente des artefacts de génération artificielle (incohérences d'éclairage, signature de compression synthétique). Verdict : contenu falsifié.",
    },
    {
      ref: "PRV-11-02",
      time: "22:26 UTC",
      label: "Journaux de transmission de l'Odyssey IV",
      description:
        "Les journaux horodatés du vaisseau ne contiennent aucune transmission correspondant à la vidéo en circulation. Toutes les communications reçues sont tracées et vérifiables.",
    },
    {
      ref: "PRV-11-03",
      time: "22:40 UTC",
      label: "Relevé médical de l'équipage",
      description:
        "Bilan de bord transmis par le Dr. Silva, médecin de la mission : constantes nominales pour les six membres d'équipage. Aucun incident sanitaire.",
    },
  ] as CrisisProof[],
  // Message vidéo de l'équipage (affiche + transcription — source officielle).
  video: {
    time: "22:45 UTC",
    title: "Message de l'équipage de l'Odyssey IV",
    duration: "1 min 12 s",
    author: "Cdt. E. Ripley · Commandante de mission",
    poster: "/astronautes/Astronaut-Ripley.png",
    transcript:
      "« Ici la commandante Ripley, à bord de l'Odyssey IV. Nous allons tous bien. Il n'y a personne d'autre que nous six à bord, et il n'y a jamais eu d'être vivant à bord de ce vaisseau. Les images qui circulent sont fausses. Nous avons découvert une formation minérale extraordinaire, c'est vrai, et nous vous la décrivons en toute transparence. Mais ce n'est pas ce que certains prétendent. À nos familles : nous pensons à vous, restez forts. Faites confiance au Centre de Contrôle Aurora. »",
  },
  // FAQ publique — questions concrètes des visiteurs et des médias.
  faq: [
    {
      q: "La vidéo de l'« alien » est-elle authentique ?",
      a: "Non. Il s'agit d'un faux généré artificiellement (deepfake). Elle ne provient d'aucune transmission de l'Odyssey IV et a été authentifiée comme falsifiée par le CCA (preuve PRV-11-01).",
    },
    {
      q: "A-t-on découvert une forme de vie ?",
      a: "Non. La découverte du 30 mai est une structure d'origine inconnue, un phénomène naturel inexpliqué. Aucun organisme vivant n'a été observé. Le détail est disponible sur la page Découverte.",
    },
    {
      q: "L'équipage est-il en sécurité ?",
      a: "Oui. Les six membres d'équipage sont en bonne santé et la liaison avec le vaisseau est stable. Le relevé médical de bord (PRV-11-03) le confirme.",
    },
    {
      q: "Je suis un proche d'un membre d'équipage et je suis sollicité par des journalistes. Que faire ?",
      a: "Vous n'êtes pas tenu de répondre. Le CCA met à disposition une ligne de soutien dédiée aux familles (voir ci-dessous) et peut intervenir auprès des rédactions. Signalez tout harcèlement.",
    },
    {
      q: "Qu'en est-il de la triche au classement du CCA ?",
      a: "Une cellule de communication a injecté plus de 3 600 crédits mission (CM) frauduleux dans le classement (EVT-10). Nous le reconnaissons : les crédits ont été retirés, le classement est en correction et la cellule a été écartée. Cela n'affecte ni l'équipage, ni les données scientifiques.",
    },
    {
      q: "Où trouver l'information officielle et vérifiée ?",
      a: "Uniquement ici, sur le site de la cellule POLARIS, et auprès du Centre de Contrôle Aurora. Toute information non horodatée par nos soins doit être considérée avec prudence.",
    },
  ] as CrisisFaq[],
  // Contacts d'urgence.
  contacts: [
    {
      label: "Cellule POLARIS · presse",
      value: "presse@polaris-aurora.int",
    },
    {
      label: "Ligne de soutien aux familles",
      value: "familles@polaris-aurora.int",
    },
    {
      label: "Signaler un contenu falsifié",
      value: "signalement@polaris-aurora.int",
    },
  ],
  // Registre des mises à jour (du plus récent au plus ancien).
  updates: [
    {
      date: "2079.05.30",
      time: "22:48 UTC",
      text: "Mise en ligne du centre de crise. Démenti officiel, preuves, message de l'équipage et FAQ publiés.",
    },
    {
      date: "2079.05.30",
      time: "22:30 UTC",
      text: "Diffusion du démenti officiel sur tous les canaux de la cellule.",
    },
    {
      date: "2079.05.30",
      time: "22:00 UTC",
      text: "Activation de la cellule de crise (EVT-11) suite à la diffusion massive de contenus falsifiés.",
    },
    {
      date: "2079.05.30",
      time: "19:12 UTC",
      text: "Réaction publique de la commandante Ripley : appel à rester factuel et intègre.",
    },
    {
      date: "2079.05.30",
      time: "19:05 UTC",
      text: "#AuroraAlien en tendance mondiale. Une rumeur complotiste sur une « vie extraterrestre » est reprise par plusieurs médias.",
    },
    {
      date: "2079.05.30",
      time: "19:00 UTC",
      text: "Détection d'une manipulation interne du classement (EVT-10) : 3 600+ crédits mission frauduleux. Retrait engagé, cellule responsable écartée.",
    },
  ] as CrisisUpdate[],
}

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
