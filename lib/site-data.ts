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
  { label: "Message", href: "/message.html" },
  { label: "Journal", href: "/journal" },
  { label: "Archives", href: "/archives" },
  { label: "Conclusion", href: "/#conclusion" },
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
  /** Visuel associé — /public/gallery/timeline/imageN.png (ordre = N). */
  image: string
  current?: boolean
}

/**
 * Chronologie narrative du programme AURORA (section #chronologie).
 * Sept jalons, du signal initial au présent. Chaque entrée est associée à un
 * visuel /gallery/timeline/imageN.png (N suit l'ordre de la liste) et défile
 * en scroll horizontal pinné.
 */
export const TIMELINE: TimelineEntry[] = [
  {
    year: "2047",
    title: "La découverte initiale",
    description:
      "Des télescopes de nouvelle génération détectent des signatures atmosphériques inhabituelles sur Kepler-452c, une exoplanète située à 1 400 années-lumière de la Terre. Cette découverte déclenche un intérêt scientifique mondial et marque le point de départ du programme AURORA.",
    image: "/gallery/timeline/image1.png",
  },
  {
    year: "2058",
    title: "Lancement du programme AURORA",
    description:
      "Face à l'importance des signaux détectés, l'Agence Spatiale Internationale lance le programme AURORA avec un objectif inédit : concevoir un vaisseau interstellaire habité capable de rejoindre Kepler-452c en moins de 20 ans.",
    image: "/gallery/timeline/image2.png",
  },
  {
    year: "2077–2079",
    title: "Le voyage interstellaire",
    description:
      "Le lancement du vaisseau marque un événement historique suivi par l'ensemble de la planète. L'humanité assiste à l'envoi du premier équipage interstellaire vers un autre monde. Durant 18 mois de trajet, l'équipage fait face à plusieurs incidents techniques mineurs et maintient un lien constant avec la Terre à travers des transmissions régulières, mêlant données scientifiques et moments d'émotion humaine.",
    image: "/gallery/timeline/image3.png",
  },
  {
    year: "2079",
    title: "Arrivée et premières observations",
    description:
      "L'Odyssey IV entre en orbite autour de Kepler-452c. Le survol de la vallée d'Aurelia révèle des formations rocheuses stratifiées et des paysages encore jamais observés par l'humanité. L'émerveillement scientifique est immédiat.",
    image: "/gallery/timeline/image4.png",
  },
  {
    year: "2079",
    title: "L'anomalie et la crise",
    description:
      "Un signal électromagnétique inconnu est détecté dans la vallée d'Aurelia. L'équipe découvre une structure cristalline active. Cette découverte provoque une crise médiatique mondiale, amplifiée par des rumeurs (#AuroraAlien) et une désinformation massive, incluant deepfakes et tensions internes.",
    image: "/gallery/timeline/image5.png",
  },
  {
    year: "2079",
    title: "Le basculement",
    description:
      "Le signal évolue et devient structuré, suggérant une forme d'intelligence ou de réponse. La crise laisse place à une interrogation majeure : face à l'inconnu, l'humanité doit désormais décider comment communiquer avec ce phénomène inédit.",
    image: "/gallery/timeline/image6.png",
  },
  {
    year: "2079",
    title: "Situation actuelle",
    description:
      "L'équipage confirme une activité évolutive de la structure cristalline et poursuit l'analyse scientifique. Le CCA coordonne la communication mondiale dans un contexte de forte pression médiatique et émotionnelle.",
    image: "/gallery/timeline/image7.png",
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
  // Crise close : la bannière d'urgence de l'accueil disparaît. La page
  // Centre de crise reste accessible via la nav (« Crise ») comme archive.
  active: false,
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

/**
 * Conclusion de la mission (EVT-15) — message final de l'équipage.
 *
 * Capsule « transmission Odyssey IV » : message intégral de l'équipage au
 * complet, horodaté, avec le bilan de la mission. Clôt le site comme archive.
 */
export const CONCLUSION = {
  ref: "EVT-15",
  status: "Transmission finale reçue",
  date: "2079.05.31",
  time: "13:00 UTC",
  source: "Transmission Odyssey IV · canal principal",
  duration: "1 min 04 s",
  // Capsule vidéo intégrée (livrable EVT-15). Chemin brut : encodé à l'affichage.
  video: "/videos/Séquence_émotion_pour_la_capsule _vidéo.mp4",
  poster: "/Landing_Diapo.png",
  author: "Équipage de l'Odyssey IV · au complet",
  kicker: "Message final de l'équipage",
  title: "À bientôt, la Terre",
  // Message intégral (EVT-15), découpé pour la lecture.
  message: [
    "Ici l'équipage de l'Odyssey IV, au complet. Dans quelques heures, vous allez présenter notre histoire au monde. On voulait vous dire… merci.",
    "Merci de raconter ce qu'on vit. Merci de nous défendre quand les rumeurs s'emballent. Merci de nous rappeler pourquoi on est ici quand le doute s'installe.",
    "Vous êtes notre voix, notre lien avec la Terre. Sans vous, cette mission ne serait que des données dans un serveur. Avec vous, c'est une histoire humaine.",
    "À bientôt, la Terre. On a une planète à explorer.",
  ],
  // Bilan chiffré de la mission (archive).
  ledger: [
    { value: "6 / 6", label: "Équipage sain et sauf" },
    { value: "18 mois", label: "De voyage accompli" },
    { value: "1", label: "Découverte majeure (EVT-09)" },
    { value: "0", label: "Rumeur restée sans réponse" },
  ],
  // Sous-titres défilants de la capsule (effet « lecture »).
  captions: [
    "Transmission entrante · Odyssey IV",
    "Liaison stable · signal 98 %",
    "Équipage au complet · 6 / 6",
    "Fin de mission · archives ouvertes",
  ],
}

/** Réseaux sociaux de la cellule POLARIS. */
export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@polaris.kepler",
    href: "https://www.instagram.com/polaris.kepler/",
    icon: "instagram" as const,
  },
  {
    label: "X",
    handle: "@PolarisKepler3",
    href: "https://x.com/PolarisKepler3",
    icon: "x" as const,
  },
]

/**
 * Archives de production (page /archives).
 *
 * Inventaire de tous les livrables réellement produits pour la mission AURORA
 * et stockés dans /public : communiqués, visuels, vidéos, premières images,
 * portraits d'équipage et ressources d'identité. L'arborescence est organisée
 * par type de support ; chaque fichier porte le tag de l'événement (EVT-xx)
 * qu'il a servi, lorsqu'il est identifiable.
 *
 * AJOUTER UN FICHIER : déposer l'asset dans /public puis ajouter une entrée
 * { name, path, type, evt?, note? } dans la bonne catégorie. `path` est l'URL
 * publique exacte (encodée à l'affichage). Les polices (/public/typo) ne sont
 * pas listées : ce sont des ressources techniques, pas des livrables.
 */
export type ArchiveFileType = "pdf" | "image" | "video" | "audio"

export type ArchiveFile = {
  /** Libellé lisible affiché dans l'arbre. */
  name: string
  /** URL publique exacte du fichier (sera encodée à l'affichage). */
  path: string
  type: ArchiveFileType
  /** Événement servi par le fichier (clé de ARCHIVE_EVENTS). */
  evt?: string
  /** Précision contextuelle, affichée en clair à droite du nom. */
  note?: string
}

export type ArchiveCategory = {
  id: string
  label: string
  /** Sous-titre de la catégorie (charte mono). */
  caption: string
  files: ArchiveFile[]
}

/** Libellés des événements pour les tags EVT-xx de l'archive. */
export const ARCHIVE_EVENTS: Record<string, string> = {
  "EVT-01": "Lancement",
  "EVT-02": "Incident capteur",
  "EVT-04": "Tempête solaire",
  "EVT-06": "Signal anormal",
  "EVT-08": "Sortie EVA",
  "EVT-09": "Découverte",
  "EVT-10": "Manipulation interne",
  "EVT-11": "Crise · désinformation",
  "EVT-15": "Conclusion",
}

export const ARCHIVE: ArchiveCategory[] = [
  {
    id: "communication",
    label: "Communication",
    caption: "Communiqués · notes · démentis",
    files: [
      { name: "Communiqué de lancement", path: "/Communication/Communiqué de lancement.pdf", type: "pdf", evt: "EVT-01" },
      { name: "Communiqué de lancement (version finale)", path: "/Communication/Communiqué de lancement (bonne version).pdf", type: "pdf", evt: "EVT-01" },
      { name: "Communiqué « Premières images »", path: "/Communication/Communiqué « Premières images ».pdf", type: "pdf", note: "Arrivée en orbite" },
      { name: "Rapport d'anomalie classifié", path: "/Communication/Rapport_d_anomalie_classifié.pdf", type: "pdf", evt: "EVT-06" },
      { name: "Note de synthèse confidentielle", path: "/Communication/note_de_synthese_confidentielle.pdf", type: "pdf", evt: "EVT-06" },
      { name: "Communiqué de découverte scientifique", path: "/Communication/Communiqué de découverte scientifique .pdf", type: "pdf", evt: "EVT-09" },
      { name: "Communiqué d'accompagnement", path: "/Communication/Communiqué d_accompagnement.pdf", type: "pdf", evt: "EVT-09" },
      { name: "Note de vulgarisation scientifique", path: "/Communication/Note_de_vulgarisation_scientifique.pdf", type: "pdf", evt: "EVT-09" },
      { name: "Note interne · incident technique", path: "/Communication/Note Interne - Incident technique .pdf", type: "pdf", evt: "EVT-02" },
      { name: "Analyse de la manipulation interne", path: "/Communication/Analyse de la manipulation interne.pdf", type: "pdf", evt: "EVT-10" },
      { name: "Démenti officiel du CCA", path: "/Communication/Démenti officiel du CCA.pdf", type: "pdf", evt: "EVT-11" },
      { name: "Communiqué d'alerte publique", path: "/Communication/Communiqué d_alerte Publique.pdf", type: "pdf", evt: "EVT-11" },
      { name: "Kit de réponse · manipulation et désinformation", path: "/Communication/Kit de réponse - manipulation et désinformation.pdf", type: "pdf", evt: "EVT-11" },
      { name: "Éléments de langage anti-sensationnalisme", path: "/Communication/Éléments_de_langage_anti-sensationnalisme.pdf", type: "pdf", evt: "EVT-11" },
      { name: "Communication à destination des familles", path: "/Communication/Communication à destination des familles.pdf", type: "pdf", evt: "EVT-11" },
      { name: "Bilan de communication de la mission", path: "/Communication/Bilan_de_communication_de_la_mission.pdf", type: "pdf", evt: "EVT-15" },
      { name: "Charte éditoriale POLARIS", path: "/Communication/Charte éditoriale - Polaris .pdf", type: "pdf", note: "Cadre SOC-01" },
      { name: "Stratégie de communication", path: "/Communication/Stratégie de Communication.pdf", type: "pdf", note: "Cadre général" },
    ],
  },
  {
    id: "visuel",
    label: "Visuel",
    caption: "Infographies · cartes · visuels iconiques",
    files: [
      { name: "Premier contact · le visuel iconique", path: "/Visuel/Premier contact - le visuel iconique.png", type: "image", evt: "EVT-09" },
      { name: "Le visuel iconique", path: "/Visuel/le_visuel_iconique.pdf", type: "pdf", evt: "EVT-09" },
      { name: "Représentation de la structure", path: "/Visuel/Représentation structure.pdf", type: "pdf", evt: "EVT-09" },
      { name: "Visualisation des données du signal", path: "/Visuel/Visualisation des données du signal.pdf", type: "pdf", evt: "EVT-06" },
      { name: "Cartographie", path: "/Visuel/Cartographie.pdf", type: "pdf", evt: "EVT-08", note: "Secteur 7" },
      { name: "Visuel EVA finalisé", path: "/Visuel/Visuel_EVA_finalisé.pdf", type: "pdf", evt: "EVT-08" },
      { name: "Infographie · anatomie de l'Odyssey IV", path: "/Visuel/Infographie - anatomie de l_Odyssey IV.pdf", type: "pdf", note: "Odyssey IV" },
      { name: "Présentation de l'équipage", path: "/Visuel/Présentation-de-l_equipage.pdf", type: "pdf", note: "Équipage" },
      { name: "Kit réseaux sociaux", path: "/Visuel/Kit réseaux sociaux.pdf", type: "pdf", note: "Réseaux sociaux" },
      { name: "Identité visuelle", path: "/Visuel/Identité visuelle.pdf", type: "pdf", note: "Identité" },
      { name: "Visuel citation spatiale", path: "/Visuel/Visuel citation spatiale.png", type: "image", note: "Citation" },
    ],
  },
  {
    id: "videos",
    label: "Vidéos",
    caption: "Capsules · transmissions · habillages",
    files: [
      { name: "Transmission dégradée", path: "/videos/Transmission_dégradée.MP4", type: "video", evt: "EVT-04" },
      { name: "Vidéo « Signe de vie »", path: "/videos/Vidéo Signe de Vie.mp4", type: "video", evt: "EVT-08" },
      { name: "Signe de vie · habillage de fond", path: "/videos/signe-de-vie-bg.mp4", type: "video", evt: "EVT-08", note: "Boucle décor" },
      { name: "Capsule vidéo · moment de la découverte", path: "/videos/Capsule Vidéo - moment de la découverte .mp4", type: "video", evt: "EVT-09" },
      { name: "Séquence émotion · capsule vidéo", path: "/videos/Séquence_émotion_pour_la_capsule _vidéo.mp4", type: "video", evt: "EVT-15" },
      { name: "Séquence émotion · capsule vidéo (variante)", path: "/videos/Séquence_émotion_pour_la_capsule _vidéo(1).mp4", type: "video", evt: "EVT-15", note: "Variante" },
    ],
  },
  {
    id: "galerie",
    label: "Galerie · premières images",
    caption: "Kepler-452c · clichés de l'équipage",
    files: [
      { name: "Premier hémisphère", path: "/gallery/kepler-01.jpg", type: "image", note: "Cdt. Ripley" },
      { name: "Sonde d'observation en approche", path: "/gallery/kepler-02.jpg", type: "image", note: "Lt. Laurent" },
      { name: "Largage de la sonde atmosphérique", path: "/gallery/kepler-03.jpg", type: "image", note: "Spc. Wong" },
      { name: "Reliefs du grand rift", path: "/gallery/kepler-04.jpg", type: "image", note: "Dr. Patel" },
      { name: "Canyon · ligne du terminateur", path: "/gallery/kepler-05.jpg", type: "image", note: "Spc. Davis" },
      { name: "Calotte glaciaire · cratère polaire", path: "/gallery/kepler-06.jpg", type: "image", evt: "EVT-08", note: "Dr. Silva" },
    ],
  },
  {
    id: "equipage",
    label: "Équipage",
    caption: "Portraits officiels · Odyssey IV",
    files: [
      { name: "Cdt. E. Ripley", path: "/astronautes/Astronaut-Ripley.png", type: "image", note: "CMD-01" },
      { name: "Dr. S. Patel", path: "/astronautes/Astronaut-Patel.png", type: "image", note: "SCI-01" },
      { name: "Lt. A. Laurent", path: "/astronautes/Astronaut-Laurent.png", type: "image", note: "EVA-01" },
      { name: "Spc. T. Wong", path: "/astronautes/Astronaut-Wong.png", type: "image", note: "ENG-01" },
      { name: "Dr. E. Silva", path: "/astronautes/Astronaut-Silva.png", type: "image", note: "MED-01" },
      { name: "Spc. N. Davis", path: "/astronautes/Astronaut-Davis.png", type: "image", note: "COM-01" },
    ],
  },
  {
    id: "identite",
    label: "Identité & ressources",
    caption: "Logos · marque · habillage sonore",
    files: [
      { name: "Logo · clair couleurs", path: "/Logo_Light_Colors.svg", type: "image" },
      { name: "Logo · clair mono", path: "/Logo_Light_Mono.svg", type: "image" },
      { name: "Logo · sombre couleurs", path: "/Logo_Dark_Colors.svg", type: "image" },
      { name: "Logo · sombre mono", path: "/Logo_Dark_Mono.svg", type: "image" },
      { name: "Icône POLARIS", path: "/icone_POLARIS.png", type: "image" },
      { name: "Diapositive d'accueil", path: "/Landing_Diapo.png", type: "image" },
      { name: "Ambiance sonore · everything is dead", path: "/song/everything_is_dead-ambient-ambient-music-511240.mp3", type: "audio", note: "Bande-son du site" },
    ],
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
