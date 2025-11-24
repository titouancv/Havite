import type { Recap, RecapOverview } from '@/types'

export const MOCK_RECAPS_DATA: Recap[] = [
  {
    id: 'recap-1',
    article: {
      id: 'recap-1',
      title: "L'IA générative continue de transformer le paysage technologique",
      imageUrl:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
      category: 'science',
      readingTime: 4,
      contentRecap:
        "L'intelligence artificielle générative ne montre aucun signe de ralentissement. De nouveaux modèles plus performants et moins énergivores émergent chaque semaine.",
      content:
        "L'intelligence artificielle générative ne montre aucun signe de ralentissement. De nouveaux modèles plus performants et moins énergivores émergent chaque semaine. Les géants de la tech comme les startups rivalisent d'ingéniosité pour intégrer ces technologies dans nos outils quotidiens.",
      createdAt: 1732291200000,
    },
    sources: [
      {
        id: 'source-1',
        url: 'https://lemonde.fr/pixels/article/2025/11/22/ia-generative-nouveaux-modeles',
        media: { id: 'media-1', name: 'Le Monde', url: 'https://lemonde.fr', logoUrl: '' },
      },
      {
        id: 'source-2',
        url: 'https://techcrunch.com/2025/11/22/new-ai-startup-funding',
        media: { id: 'media-2', name: 'TechCrunch', url: 'https://techcrunch.com', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-2',
    article: {
      id: 'recap-2',
      title: 'La transition énergétique en Europe s’accélère',
      imageUrl:
        'https://images.unsplash.com/photo-1581092795362-5b6f1f8b8d38?q=80&w=1000&auto=format&fit=crop',
      category: 'Énergie',
      readingTime: 5,
      contentRecap:
        "L'Europe investit massivement dans les énergies renouvelables pour atteindre ses objectifs climatiques à 2030.",
      content:
        'Les gouvernements européens mettent en place des politiques ambitieuses pour réduire les émissions de CO2 et favoriser l’adoption des énergies propres.',
      createdAt: 1732377600000,
    },
    sources: [
      {
        id: 'source-3',
        url: 'https://lefigaro.fr/economie/article/2025/11/22/transition-energetique',
        media: { id: 'media-3', name: 'Le Figaro', url: 'https://lefigaro.fr', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-3',
    article: {
      id: 'recap-3',
      title: 'L’impression 3D révolutionne l’industrie automobile',
      imageUrl:
        'https://images.unsplash.com/photo-1600071099124-1ef2f6924c63?q=80&w=1000&auto=format&fit=crop',
      category: 'Industrie',
      readingTime: 3,
      contentRecap:
        'Les constructeurs automobiles utilisent l’impression 3D pour produire des pièces plus rapidement et à moindre coût.',
      content:
        'Grâce à l’impression 3D, les entreprises automobiles peuvent fabriquer des prototypes et des pièces sur mesure avec une grande précision.',
      createdAt: 1732464000000,
    },
    sources: [
      {
        id: 'source-4',
        url: 'https://industrie-tech.com/3d-printing-cars',
        media: {
          id: 'media-4',
          name: 'Industrie Tech',
          url: 'https://industrie-tech.com',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-4',
    article: {
      id: 'recap-4',
      title: 'L’économie mondiale face à la montée de l’inflation',
      imageUrl:
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop',
      category: 'economy',
      readingTime: 4,
      contentRecap:
        'Les banques centrales ajustent leurs politiques pour limiter l’inflation et stabiliser les marchés.',
      content:
        'Avec l’inflation persistante, les investisseurs et gouvernements cherchent à adapter leurs stratégies financières afin de protéger l’économie mondiale.',
      createdAt: 1732550400000,
    },
    sources: [
      {
        id: 'source-5',
        url: 'https://economy.yahoo.com/world-economy-inflation',
        media: {
          id: 'media-5',
          name: 'Yahoo economy',
          url: 'https://economy.yahoo.com',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-5',
    article: {
      id: 'recap-5',
      title: 'Nouvelles découvertes dans l’exploration spatiale',
      imageUrl:
        'https://images.unsplash.com/photo-1581093455648-23b05f76a6a2?q=80&w=1000&auto=format&fit=crop',
      category: 'science',
      readingTime: 5,
      contentRecap:
        'Les agences spatiales dévoilent des découvertes majeures sur les exoplanètes et les possibilités de vie extraterrestre.',
      content:
        'Les télescopes et missions spatiales récentes permettent d’explorer des planètes lointaines et de mieux comprendre la formation de notre univers.',
      createdAt: 1732636800000,
    },
    sources: [
      {
        id: 'source-6',
        url: 'https://space.com/exoplanet-discoveries',
        media: { id: 'media-6', name: 'Space.com', url: 'https://space.com', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-6',
    article: {
      id: 'recap-6',
      title: 'La santé mentale au travail devient une priorité',
      imageUrl:
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1000&auto=format&fit=crop',
      category: 'Santé',
      readingTime: 3,
      contentRecap:
        'De plus en plus d’entreprises mettent en place des programmes de soutien à la santé mentale de leurs employés.',
      content:
        'Le bien-être au travail est désormais considéré comme un levier essentiel de productivité et de rétention des talents.',
      createdAt: 1732723200000,
    },
    sources: [
      {
        id: 'source-7',
        url: 'https://santemagazine.fr/mental-workplace',
        media: {
          id: 'media-7',
          name: 'Santé Magazine',
          url: 'https://santemagazine.fr',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-7',
    article: {
      id: 'recap-7',
      title: 'Les villes intelligentes transforment la mobilité urbaine',
      imageUrl:
        'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1000&auto=format&fit=crop',
      category: 'Urbanisme',
      readingTime: 4,
      contentRecap:
        'L’IoT et les données massives permettent d’optimiser le trafic et l’éclairage public dans les villes intelligentes.',
      content:
        'Grâce aux technologies connectées, les villes peuvent améliorer la qualité de vie des citoyens tout en réduisant leur empreinte écologique.',
      createdAt: 1732809600000,
    },
    sources: [
      {
        id: 'source-8',
        url: 'https://smartcitiesworld.net/news',
        media: {
          id: 'media-8',
          name: 'Smart Cities World',
          url: 'https://smartcitiesworld.net',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-8',
    article: {
      id: 'recap-8',
      title: 'L’économie circulaire gagne du terrain',
      imageUrl:
        'https://images.unsplash.com/photo-1596495577886-d920f1f3b6de?q=80&w=1000&auto=format&fit=crop',
      category: 'economy',
      readingTime: 3,
      contentRecap:
        'De plus en plus d’entreprises adoptent le recyclage et la réutilisation pour réduire leur impact environnemental.',
      content:
        'L’économie circulaire devient un modèle incontournable pour répondre aux enjeux environnementaux et économiques actuels.',
      createdAt: 1732896000000,
    },
    sources: [
      {
        id: 'source-9',
        url: 'https://economictimes.indiatimes.com/circular-economy',
        media: {
          id: 'media-9',
          name: 'Economic Times',
          url: 'https://economictimes.indiatimes.com',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-9',
    article: {
      id: 'recap-9',
      title: 'Les tendances du e-economy pour 2025',
      imageUrl:
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop',
      category: 'economy',
      readingTime: 4,
      contentRecap:
        'Le e-economy continue d’évoluer avec des solutions de paiement innovantes et une personnalisation accrue.',
      content:
        'Les marques investissent dans l’expérience client et l’intelligence artificielle pour améliorer leurs ventes en ligne.',
      createdAt: 1732982400000,
    },
    sources: [
      {
        id: 'source-10',
        url: 'https://forbes.com/ecommerce-trends-2025',
        media: { id: 'media-10', name: 'Forbes', url: 'https://forbes.com', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-10',
    article: {
      id: 'recap-10',
      title: 'La mode durable séduit de plus en plus de consommateurs',
      imageUrl:
        'https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1000&auto=format&fit=crop',
      category: 'culture',
      readingTime: 3,
      contentRecap:
        'Les marques adoptent des pratiques écoresponsables pour répondre à la demande croissante de mode durable.',
      content:
        'Recyclage des matériaux, production locale et transparence deviennent les maîtres-mots de l’industrie de la mode en 2025.',
      createdAt: 1733068800000,
    },
    sources: [
      {
        id: 'source-11',
        url: 'https://vogue.fr/sustainable-fashion',
        media: { id: 'media-11', name: 'Vogue', url: 'https://vogue.fr', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-11',
    article: {
      id: 'recap-11',
      title: 'Le football féminin continue de se professionnaliser',
      imageUrl:
        'https://images.unsplash.com/photo-1604335399106-76a7f2e1c6a0?q=80&w=1000&auto=format&fit=crop',
      category: 'sports',
      readingTime: 4,
      contentRecap:
        'Les championnats féminins attirent de plus en plus de spectateurs et d’investissements.',
      content:
        'Les clubs mettent en place des infrastructures et des programmes pour soutenir le développement du football féminin.',
      createdAt: 1733155200000,
    },
    sources: [
      {
        id: 'source-12',
        url: 'https://fifa.com/womens-football',
        media: { id: 'media-12', name: 'FIFA', url: 'https://fifa.com', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-12',
    article: {
      id: 'recap-12',
      title: 'Les crypto-monnaies face à la régulation',
      imageUrl:
        'https://images.unsplash.com/photo-1614680376988-7d05d5d44d18?q=80&w=1000&auto=format&fit=crop',
      category: 'economy',
      readingTime: 5,
      contentRecap:
        'Les gouvernements mettent en place des régulations pour sécuriser les transactions en crypto-monnaies.',
      content:
        'Face à la volatilité des cryptos, la régulation vise à protéger les investisseurs tout en favorisant l’innovation financière.',
      createdAt: 1733241600000,
    },
    sources: [
      {
        id: 'source-13',
        url: 'https://coindesk.com/regulation-crypto',
        media: { id: 'media-13', name: 'CoinDesk', url: 'https://coindesk.com', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-13',
    article: {
      id: 'recap-13',
      title: 'Les océans menacés par la pollution plastique',
      imageUrl:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      category: 'politics',
      readingTime: 4,
      contentRecap:
        'Chaque année, des millions de tonnes de plastique polluent les océans, menaçant la faune marine.',
      content:
        'Des initiatives de nettoyage et des politiques de réduction des plastiques à usage unique se multiplient pour protéger les océans.',
      createdAt: 1733328000000,
    },
    sources: [
      {
        id: 'source-14',
        url: 'https://wwf.fr/oceans-pollution-plastique',
        media: { id: 'media-14', name: 'WWF', url: 'https://wwf.fr', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-14',
    article: {
      id: 'recap-14',
      title: 'Les robots chirurgiens révolutionnent la médecine',
      imageUrl:
        'https://images.unsplash.com/photo-1580281657523-cd92c0b6f064?q=80&w=1000&auto=format&fit=crop',
      category: 'Santé',
      readingTime: 3,
      contentRecap:
        'La chirurgie assistée par robot permet des opérations plus précises et moins invasives.',
      content:
        'Les robots chirurgiens améliorent les résultats pour les patients et réduisent les risques opératoires.',
      createdAt: 1733414400000,
    },
    sources: [
      {
        id: 'source-15',
        url: 'https://medicalxpress.com/robotic-surgery',
        media: {
          id: 'media-15',
          name: 'Medical Xpress',
          url: 'https://medicalxpress.com',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-15',
    article: {
      id: 'recap-15',
      title: 'Les podcasts éducatifs connaissent un essor inédit',
      imageUrl:
        'https://images.unsplash.com/photo-1581276879432-15a2f5c3c9ab?q=80&w=1000&auto=format&fit=crop',
      category: 'culture',
      readingTime: 2,
      contentRecap:
        'Les podcasts éducatifs attirent de plus en plus d’auditeurs grâce à des contenus spécialisés et accessibles.',
      content:
        'Universités, journalistes et experts partagent leurs connaissances via des podcasts, renforçant l’apprentissage informel.',
      createdAt: 1733500800000,
    },
    sources: [
      {
        id: 'source-16',
        url: 'https://podnews.net/educational-podcasts',
        media: { id: 'media-16', name: 'Podnews', url: 'https://podnews.net', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-16',
    article: {
      id: 'recap-16',
      title: 'L’intelligence artificielle dans le cinéma',
      imageUrl:
        'https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=1000&auto=format&fit=crop',
      category: 'culture',
      readingTime: 3,
      contentRecap:
        'Des studios explorent l’IA pour générer des effets visuels et scénarios dans le cinéma moderne.',
      content:
        'L’IA permet de créer des animations et des environnements virtuels plus immersifs et moins coûteux.',
      createdAt: 1733587200000,
    },
    sources: [
      {
        id: 'source-17',
        url: 'https://variety.com/ai-cinema-trends',
        media: { id: 'media-17', name: 'Variety', url: 'https://variety.com', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-17',
    article: {
      id: 'recap-17',
      title: 'Le télétravail redéfinit le monde professionnel',
      imageUrl:
        'https://images.unsplash.com/photo-1587613865769-0cc91c1a9b5c?q=80&w=1000&auto=format&fit=crop',
      category: 'international',
      readingTime: 4,
      contentRecap:
        'Le télétravail se pérennise, obligeant les entreprises à repenser leurs méthodes de management et d’organisation.',
      content:
        'De nouvelles technologies et outils collaboratifs facilitent le travail à distance et l’équilibre vie pro-vie perso.',
      createdAt: 1733673600000,
    },
    sources: [
      {
        id: 'source-18',
        url: 'https://hbr.org/telework-future',
        media: {
          id: 'media-18',
          name: 'Harvard Business Review',
          url: 'https://hbr.org',
          logoUrl: '',
        },
      },
    ],
  },
  {
    id: 'recap-18',
    article: {
      id: 'recap-18',
      title: 'Les jeux vidéo comme outil pédagogique',
      imageUrl:
        'https://images.unsplash.com/photo-1606813906726-d6aa026d404d?q=80&w=1000&auto=format&fit=crop',
      category: 'Éducation',
      readingTime: 3,
      contentRecap:
        'Les jeux vidéo éducatifs sont de plus en plus utilisés pour favoriser l’apprentissage interactif et ludique.',
      content:
        'Des écoles et universités intègrent des serious games pour stimuler la créativité et la réflexion des étudiants.',
      createdAt: 1733760000000,
    },
    sources: [
      {
        id: 'source-19',
        url: 'https://edutopia.org/video-games-learning',
        media: { id: 'media-19', name: 'Edutopia', url: 'https://edutopia.org', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-19',
    article: {
      id: 'recap-19',
      title: 'Les véhicules électriques gagnent du terrain',
      imageUrl:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop',
      category: 'economy',
      readingTime: 4,
      contentRecap:
        'Les ventes de véhicules électriques augmentent grâce à des incitations gouvernementales et une infrastructure de recharge en expansion.',
      content:
        'Les constructeurs automobiles investissent massivement dans les véhicules propres pour répondre à la demande croissante des consommateurs.',
      createdAt: 1733846400000,
    },
    sources: [
      {
        id: 'source-20',
        url: 'https://electrek.co/electric-vehicles-market-growth',
        media: { id: 'media-20', name: 'Electrek', url: 'https://electrek.co', logoUrl: '' },
      },
    ],
  },
  {
    id: 'recap-20',
    article: {
      id: 'recap-20',
      title: 'La blockchain au service de la traçabilité alimentaire',
      imageUrl:
        'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1000&auto=format&fit=crop',
      category: 'science',
      readingTime: 3,
      contentRecap:
        'La blockchain est utilisée pour assurer la transparence et la traçabilité dans l’industrie alimentaire.',
      content:
        'Les consommateurs peuvent désormais vérifier l’origine et la qualité des produits grâce aux registres numériques sécurisés.',
      createdAt: 1733932800000,
    },
    sources: [
      {
        id: 'source-21',
        url: 'https://foodtechconnect.com/blockchain-food-traceability',
        media: {
          id: 'media-21',
          name: 'FoodTech Connect',
          url: 'https://foodtechconnect.com',
          logoUrl: '',
        },
      },
    ],
  },
].map((recap) => ({
  ...recap,
  upVotes: Math.floor(Math.random() * 100),
  downVotes: Math.floor(Math.random() * 50),
}))

export const MOCK_RECAPS_OVERVIEW: RecapOverview[] = MOCK_RECAPS_DATA.map((r) => ({
  id: r.id,
  articleId: r.article.id,
  title: r.article.title,
  content: r.article.contentRecap,
  imageUrl: r.article.imageUrl,
  category: r.article.category,
  createdAt: r.article.createdAt,
  upVotes: r.upVotes,
  downVotes: r.downVotes,
}))

export const MOCK_RECAP_DETAILS: Record<string, Recap> = MOCK_RECAPS_DATA.reduce(
  (acc, recap) => {
    acc[recap.id] = recap
    return acc
  },
  {} as Record<string, Recap>
)
