export interface RecapOverview {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
}

export interface Recap {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
  relatedQuestions: string[]
  sources: {
    id: string
    url: string
    mediaName: string
  }[]
}

export const MOCK_RECAPS_DATA: Recap[] = [
  {
    id: 'recap-1',
    title: "L'IA générative continue de transformer le paysage technologique",
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 4,
    relatedQuestions: [
      "Quels sont les impacts de l'IA sur l'emploi ?",
      "Comment réguler l'IA générative ?",
      'Quelles sont les alternatives open-source ?',
    ],
    content:
      "L'intelligence artificielle générative ne montre aucun signe de ralentissement. De nouveaux modèles plus performants et moins énergivores émergent chaque semaine. Les géants de la tech comme les startups rivalisent d'ingéniosité pour intégrer ces technologies dans nos outils quotidiens, de la rédaction assistée à la génération de code complexe. Cependant, des questions éthiques et juridiques subsistent, notamment concernant les droits d'auteur et la désinformation.",
    sources: [
      {
        id: 'source-1',
        url: 'https://lemonde.fr/pixels/article/2025/11/22/ia-generative-nouveaux-modeles',
        mediaName: 'Le Monde',
      },
      {
        id: 'source-2',
        url: 'https://techcrunch.com/2025/11/22/new-ai-startup-funding',
        mediaName: 'TechCrunch',
      },
    ],
  },
  {
    id: 'recap-2',
    title: 'Les investissements dans la Tech repartent à la hausse',
    imageUrl:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop',
    category: 'Finance',
    readingTime: 3,
    relatedQuestions: [
      "Quels secteurs attirent le plus d'investissements ?",
      "Quel est l'impact des taux d'intérêt sur la tech ?",
    ],
    content:
      "Après une période de ralentissement, le capital-risque semble retrouver de l'appétit pour le secteur technologique. Les levées de fonds se multiplient, en particulier dans les domaines de l'IA, de la cybersécurité et des technologies climatiques (Climate Tech). Les analystes prévoient une année 2026 record si la tendance se maintient, portée par des taux d'intérêt qui se stabilisent.",
    sources: [
      {
        id: 'source-2',
        url: 'https://techcrunch.com/2025/11/22/new-ai-startup-funding',
        mediaName: 'TechCrunch',
      },
      {
        id: 'source-3',
        url: 'https://news.ycombinator.com/item?id=123456',
        mediaName: 'Hacker News',
      },
    ],
  },
  {
    id: 'recap-3',
    title: 'Réalité Mixte : Le nouveau standard ?',
    imageUrl:
      'https://images.unsplash.com/photo-1622979135228-d0a136c145ec?q=80&w=1000&auto=format&fit=crop',
    category: 'Hardware',
    readingTime: 5,
    relatedQuestions: [
      'La réalité mixte va-t-elle remplacer les smartphones ?',
      'Quels sont les risques pour la santé ?',
    ],
    content:
      "Les derniers casques de réalité mixte arrivent sur le marché avec la promesse de remplacer nos écrans traditionnels. Plus légers, plus autonomes et dotés d'une résolution impressionnante, ils séduisent autant les professionnels que le grand public. Les applications de productivité spatiale se développent, laissant entrevoir un futur où le bureau physique pourrait devenir obsolète.",
    sources: [
      {
        id: 'source-4',
        url: 'https://theverge.com/2025/11/22/apple-vr-headset-review',
        mediaName: 'The Verge',
      },
    ],
  },
  {
    id: 'recap-4',
    title: 'Cybersécurité : Les nouvelles menaces de 2025',
    imageUrl:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    category: 'Sécurité',
    readingTime: 6,
    relatedQuestions: [
      'Comment se protéger du phishing par IA ?',
      "Qu'est-ce que l'architecture Zero Trust ?",
    ],
    content:
      "Avec la sophistication croissante des attaques, la cybersécurité devient un enjeu majeur pour toutes les entreprises. Le phishing assisté par IA et les attaques sur la chaîne d'approvisionnement logicielle sont en hausse. Les experts recommandent l'adoption généralisée de l'architecture Zero Trust et l'authentification sans mot de passe pour contrer ces risques.",
    sources: [
      {
        id: 'source-3',
        url: 'https://news.ycombinator.com/item?id=123456',
        mediaName: 'Hacker News',
      },
    ],
  },
  {
    id: 'recap-5',
    title: "L'essor des véhicules autonomes en milieu urbain",
    imageUrl:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 4,
    relatedQuestions: ['Les véhicules autonomes sont-ils sûrs ?', "Quel impact sur l'urbanisme ?"],
    content:
      "Plusieurs villes pilotes testent désormais des flottes de taxis entièrement autonomes. Les résultats préliminaires montrent une réduction des accidents et une fluidification du trafic. Toutefois, l'acceptation sociale et l'adaptation des infrastructures restent des défis majeurs à relever avant un déploiement à grande échelle.",
    sources: [
      {
        id: 'source-1',
        url: 'https://lemonde.fr/pixels/article/2025/11/22/ia-generative-nouveaux-modeles',
        mediaName: 'Le Monde',
      },
      {
        id: 'source-4',
        url: 'https://theverge.com/2025/11/22/apple-vr-headset-review',
        mediaName: 'The Verge',
      },
    ],
  },
  {
    id: 'recap-6',
    title: "L'informatique quantique : une révolution imminente ?",
    imageUrl:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 5,
    relatedQuestions: [
      'Quand aurons-nous des ordinateurs quantiques personnels ?',
      'Quel impact sur la cryptographie ?',
    ],
    content:
      'Les progrès récents dans la stabilisation des qubits laissent présager une arrivée plus rapide que prévu des ordinateurs quantiques commerciaux. Google et IBM annoncent des feuilles de route ambitieuses.',
    sources: [{ id: 'source-6', url: 'https://nature.com', mediaName: 'Nature' }],
  },
  {
    id: 'recap-7',
    title: "L'hydrogène vert : le futur de la mobilité lourde",
    imageUrl:
      'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 4,
    relatedQuestions: [
      "L'hydrogène est-il vraiment écologique ?",
      "Quel coût face à l'électrique ?",
    ],
    content:
      "Alors que les batteries dominent pour les voitures, l'hydrogène s'impose pour les camions, trains et navires, offrant une autonomie et une rapidité de recharge supérieures.",
    sources: [{ id: 'source-7', url: 'https://iea.org', mediaName: 'IEA' }],
  },
  {
    id: 'recap-8',
    title: 'Tourisme spatial : bientôt accessible ?',
    imageUrl:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 6,
    relatedQuestions: ["Quel est le prix d'un billet ?", 'Quel impact environnemental ?'],
    content:
      "SpaceX et Blue Origin multiplient les vols d'essai. Si le ticket reste cher, les coûts baissent rapidement, ouvrant la voie à un tourisme orbital pour les plus fortunés d'ici 2030.",
    sources: [{ id: 'source-8', url: 'https://space.com', mediaName: 'Space.com' }],
  },
  {
    id: 'recap-9',
    title: 'La fin du cash : vers une société sans argent liquide',
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop',
    category: 'Finance',
    readingTime: 3,
    relatedQuestions: [
      'Quels risques pour la vie privée ?',
      'Quid des personnes non bancarisées ?',
    ],
    content:
      'Les paiements numériques dépassent désormais les espèces dans la majorité des transactions. Les gouvernements encouragent cette transition pour lutter contre la fraude fiscale.',
    sources: [{ id: 'source-9', url: 'https://ft.com', mediaName: 'Financial Times' }],
  },
  {
    id: 'recap-10',
    title: 'Sécurité des objets connectés : un défi majeur',
    imageUrl:
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000&auto=format&fit=crop',
    category: 'Sécurité',
    readingTime: 4,
    relatedQuestions: [
      'Comment sécuriser sa maison connectée ?',
      'Les fabricants sont-ils responsables ?',
    ],
    content:
      "Avec des milliards d'objets connectés, la surface d'attaque explose. De nouvelles normes européennes imposent désormais des standards de sécurité plus stricts aux fabricants.",
    sources: [{ id: 'source-10', url: 'https://wired.com', mediaName: 'Wired' }],
  },
  {
    id: 'recap-11',
    title: "L'aviation électrique décolle enfin",
    imageUrl:
      'https://images.unsplash.com/photo-1559087867-ce4c91325525?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 5,
    relatedQuestions: [
      'Quelle autonomie pour les avions électriques ?',
      'Quand pourrons-nous voler vert ?',
    ],
    content:
      "Les premiers vols commerciaux court-courriers en électrique sont prévus pour 2026. Les batteries solides promettent de doubler l'autonomie actuelle.",
    sources: [{ id: 'source-11', url: 'https://aviationweek.com', mediaName: 'Aviation Week' }],
  },
  {
    id: 'recap-12',
    title: "La 6G : à quoi s'attendre ?",
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 4,
    relatedQuestions: ['Quelle différence avec la 5G ?', 'Quels usages révolutionnaires ?'],
    content:
      "Alors que la 5G se déploie, les chercheurs travaillent déjà sur la 6G, promettant des débits 100 fois supérieurs et une latence quasi nulle, permettant l'internet des sens.",
    sources: [{ id: 'source-12', url: 'https://ieee.org', mediaName: 'IEEE Spectrum' }],
  },
  {
    id: 'recap-13',
    title: 'Blockchain et traçabilité alimentaire',
    imageUrl:
      'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 3,
    relatedQuestions: [
      "Comment vérifier l'origine de ses produits ?",
      'La blockchain est-elle infalsifiable ?',
    ],
    content:
      "De la ferme à l'assiette, la blockchain permet de suivre chaque étape de la production alimentaire, garantissant la qualité et l'éthique des produits consommés.",
    sources: [{ id: 'source-13', url: 'https://forbes.com', mediaName: 'Forbes' }],
  },
  {
    id: 'recap-14',
    title: "Smart Cities : l'urbanisme connecté",
    imageUrl:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 5,
    relatedQuestions: ['Quels bénéfices pour les citoyens ?', 'Quid de la surveillance ?'],
    content:
      "Les villes intelligentes utilisent l'IoT pour optimiser le trafic, la gestion des déchets et l'énergie. Singapour et Copenhague montrent la voie.",
    sources: [
      { id: 'source-14', url: 'https://smartcitiesworld.net', mediaName: 'SmartCitiesWorld' },
    ],
  },
  {
    id: 'recap-15',
    title: "L'authentification biométrique se généralise",
    imageUrl:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
    category: 'Sécurité',
    readingTime: 3,
    relatedQuestions: ['Est-ce vraiment sûr ?', 'Peut-on voler nos données biométriques ?'],
    content:
      'Fini les mots de passe ? La reconnaissance faciale et les empreintes digitales deviennent la norme pour sécuriser nos accès, mais soulèvent des questions de vie privée.',
    sources: [{ id: 'source-15', url: 'https://cnet.com', mediaName: 'CNET' }],
  },
  {
    id: 'recap-16',
    title: 'Santé connectée : les montres qui sauvent des vies',
    imageUrl:
      'https://images.unsplash.com/photo-1576243345690-8e4b728a3fa3?q=80&w=1000&auto=format&fit=crop',
    category: 'Hardware',
    readingTime: 4,
    relatedQuestions: ['Quelle fiabilité médicale ?', 'Les données sont-elles partagées ?'],
    content:
      "Les dernières montres connectées détectent l'apnée du sommeil, l'arythmie et même le diabète. Elles deviennent de véritables assistants médicaux personnels.",
    sources: [{ id: 'source-16', url: 'https://healthline.com', mediaName: 'Healthline' }],
  },
  {
    id: 'recap-17',
    title: 'Smartphones pliables : gadget ou futur ?',
    imageUrl:
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop',
    category: 'Hardware',
    readingTime: 3,
    relatedQuestions: ['Sont-ils fragiles ?', 'Le prix va-t-il baisser ?'],
    content:
      'Les ventes de smartphones pliables doublent chaque année. La technologie mûrit, les prix baissent, et les usages se diversifient pour le multitâche.',
    sources: [{ id: 'source-17', url: 'https://engadget.com', mediaName: 'Engadget' }],
  },
  {
    id: 'recap-18',
    title: 'Régulation des crypto-monnaies en Europe',
    imageUrl:
      'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop',
    category: 'Finance',
    readingTime: 5,
    relatedQuestions: ["Qu'est-ce que MiCA ?", "La fin de l'anonymat ?"],
    content:
      "Le règlement MiCA entre en vigueur, apportant un cadre clair pour les acteurs crypto. L'objectif : protéger les investisseurs sans étouffer l'innovation.",
    sources: [{ id: 'source-18', url: 'https://coindesk.com', mediaName: 'CoinDesk' }],
  },
  {
    id: 'recap-19',
    title: 'Le transport maritime autonome',
    imageUrl:
      'https://images.unsplash.com/photo-1554254617-995461d98754?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 4,
    relatedQuestions: ['Quels risques de piratage ?', "Quel impact sur l'emploi des marins ?"],
    content:
      "Des cargos sans équipage traversent déjà les océans. L'IA optimise les routes et réduit la consommation de carburant, transformant la logistique mondiale.",
    sources: [
      { id: 'source-19', url: 'https://maritime-executive.com', mediaName: 'Maritime Executive' },
    ],
  },
  {
    id: 'recap-20',
    title: "L'IA au service de la médecine de précision",
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 6,
    relatedQuestions: [
      "L'IA va-t-elle remplacer les médecins ?",
      'Comment sont entraînées ces IA ?',
    ],
    content:
      "L'IA analyse des millions de données patients pour proposer des traitements sur mesure. Les taux de réussite en oncologie s'améliorent grâce à ces diagnostics assistés.",
    sources: [{ id: 'source-20', url: 'https://thelancet.com', mediaName: 'The Lancet' }],
  },
  {
    id: 'recap-21',
    title: 'Cloud Gaming : la fin des consoles ?',
    imageUrl:
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 4,
    relatedQuestions: ['Faut-il une connexion fibre ?', 'Quel abonnement choisir ?'],
    content:
      'Avec le Xbox Cloud Gaming et GeForce Now, jouer en 4K sans console devient réalité. Le marché du hardware gaming pourrait se transformer radicalement.',
    sources: [{ id: 'source-21', url: 'https://polygon.com', mediaName: 'Polygon' }],
  },
  {
    id: 'recap-22',
    title: 'Pénurie de semi-conducteurs : la crise persiste',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    category: 'Hardware',
    readingTime: 5,
    relatedQuestions: [
      'Quand la situation reviendra-t-elle à la normale ?',
      'Pourquoi cette pénurie ?',
    ],
    content:
      "La demande explose avec l'IA et les VE, mais l'offre peine à suivre. L'Europe et les USA investissent massivement pour relocaliser la production de puces.",
    sources: [{ id: 'source-22', url: 'https://bloomberg.com', mediaName: 'Bloomberg' }],
  },
  {
    id: 'recap-23',
    title: 'Ransomwares : des attaques de plus en plus ciblées',
    imageUrl:
      'https://images.unsplash.com/photo-1563206767-5b1d972d9fb7?q=80&w=1000&auto=format&fit=crop',
    category: 'Sécurité',
    readingTime: 4,
    relatedQuestions: ['Faut-il payer la rançon ?', 'Comment se protéger ?'],
    content:
      "Les groupes de hackers visent désormais les hôpitaux et les infrastructures critiques. La coopération internationale s'intensifie pour démanteler ces réseaux.",
    sources: [
      { id: 'source-23', url: 'https://krebsonsecurity.com', mediaName: 'Krebs on Security' },
    ],
  },
  {
    id: 'recap-24',
    title: 'Les monnaies numériques de banque centrale (MNBC)',
    imageUrl:
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop',
    category: 'Finance',
    readingTime: 5,
    relatedQuestions: ['Quelle différence avec le Bitcoin ?', "L'Euro numérique arrive quand ?"],
    content:
      "L'Euro numérique est en phase de test. Il promet des paiements instantanés et sécurisés, mais suscite des inquiétudes sur la traçabilité des transactions.",
    sources: [{ id: 'source-24', url: 'https://ecb.europa.eu', mediaName: 'ECB' }],
  },
  {
    id: 'recap-25',
    title: 'Hyperloop : où en est le projet ?',
    imageUrl:
      'https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 4,
    relatedQuestions: ['Est-ce réalisable techniquement ?', 'Quel prix pour un billet ?'],
    content:
      'Malgré des défis techniques, plusieurs lignes de test sont opérationnelles en Asie. Le rêve de voyager à 1000 km/h au sol se rapproche.',
    sources: [{ id: 'source-25', url: 'https://wired.com', mediaName: 'Wired' }],
  },
  {
    id: 'recap-26',
    title: "La réalité virtuelle dans l'éducation",
    imageUrl:
      'https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=1000&auto=format&fit=crop',
    category: 'Hardware',
    readingTime: 5,
    relatedQuestions: ['Est-ce efficace pour apprendre ?', 'Quel équipement pour les écoles ?'],
    content:
      "Visiter la Rome antique ou opérer un patient virtuel : la VR transforme l'apprentissage. Les études montrent une meilleure rétention de l'information.",
    sources: [{ id: 'source-26', url: 'https://edtechmagazine.com', mediaName: 'EdTech Magazine' }],
  },
  {
    id: 'recap-27',
    title: 'Les failles Zero-Day explosent en 2025',
    imageUrl:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop',
    category: 'Sécurité',
    readingTime: 4,
    relatedQuestions: ["Qu'est-ce qu'une faille Zero-Day ?", 'Comment les détecter ?'],
    content:
      "Le marché noir des vulnérabilités est en plein essor. Les entreprises doivent adopter une posture de sécurité proactive et le 'bug bounty'.",
    sources: [{ id: 'source-27', url: 'https://zdnet.com', mediaName: 'ZDNet' }],
  },
  {
    id: 'recap-28',
    title: "L'ascension fulgurante des néobanques",
    imageUrl:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop',
    category: 'Finance',
    readingTime: 3,
    relatedQuestions: ['Sont-elles rentables ?', 'Peut-on leur faire confiance ?'],
    content:
      'Revolut, N26 et consorts captent la jeunesse avec des frais réduits et une UX impeccable. Les banques traditionnelles sont forcées de se réinventer.',
    sources: [{ id: 'source-28', url: 'https://techcrunch.com', mediaName: 'TechCrunch' }],
  },
  {
    id: 'recap-29',
    title: 'Livraison par drone : la réglementation évolue',
    imageUrl:
      'https://images.unsplash.com/photo-1508614589041-895b8c9e609a?q=80&w=1000&auto=format&fit=crop',
    category: 'Transport',
    readingTime: 3,
    relatedQuestions: ['Est-ce bruyant ?', 'Quid de la sécurité aérienne ?'],
    content:
      'Amazon et Google obtiennent de nouvelles autorisations. La livraison de médicaments en zone rurale par drone devient une réalité quotidienne.',
    sources: [{ id: 'source-29', url: 'https://theverge.com', mediaName: 'The Verge' }],
  },
  {
    id: 'recap-30',
    title: 'Tech for Good : la technologie au service du climat',
    imageUrl:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?q=80&w=1000&auto=format&fit=crop',
    category: 'Technologie',
    readingTime: 5,
    relatedQuestions: ['Le numérique est-il polluant ?', 'Quelles innovations pour le climat ?'],
    content:
      "De la capture de carbone à l'optimisation énergétique par IA, la tech joue un rôle clé dans la transition écologique. Les investissements 'impact' se multiplient.",
    sources: [{ id: 'source-30', url: 'https://weforum.org', mediaName: 'WEF' }],
  },
]

export const MOCK_RECAPS_OVERVIEW: RecapOverview[] = MOCK_RECAPS_DATA.map((r) => ({
  id: r.id,
  title: r.title,
  content: r.content,
  imageUrl: r.imageUrl,
  category: r.category,
  readingTime: r.readingTime,
}))

export const MOCK_RECAP_DETAILS: Record<string, Recap> = MOCK_RECAPS_DATA.reduce(
  (acc, recap) => {
    acc[recap.id] = recap
    return acc
  },
  {} as Record<string, Recap>
)
