import { 
  Article, 
  Author, 
  BusinessLeader, 
  CurrencyRate, 
  MarketIndicator, 
  NewsletterSubscriber, 
  Comment, 
  CategoryItem, 
  MediaItem, 
  FeaturedConfig 
} from '../types';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', slug: 'business', name: 'Business', description: 'Corporate governance, mergers, trade partnerships, and enterprise growth in the Horn of Africa.', color: 'blue', order: 1 },
  { id: 'cat-2', slug: 'economy', name: 'Economy', description: 'Macroeconomic indicators, central bank policies, fiscal reforms, and inflationary trends.', color: 'amber', order: 2 },
  { id: 'cat-3', slug: 'finance', name: 'Finance', description: 'Commercial banking, fintech balance sheets, monetary regulations, and credit growth.', color: 'emerald', order: 3 },
  { id: 'cat-4', slug: 'technology', name: 'Technology', description: 'Digital public infrastructure, telecommunications, artificial intelligence, and software ecosystems.', color: 'indigo', order: 4 },
  { id: 'cat-5', slug: 'startups', name: 'Startups', description: 'Venture funding, founder stories, seed rounds, and early-stage innovation hubs.', color: 'purple', order: 5 },
  { id: 'cat-6', slug: 'investment', name: 'Investment', description: 'Foreign direct investment, industrial park capital allocations, and sovereign bond issues.', color: 'cyan', order: 6 },
  { id: 'cat-7', slug: 'markets', name: 'Markets', description: 'Ethiopian Securities Exchange (ESX), commodity trading, foreign exchange flows, and treasury yields.', color: 'rose', order: 7 },
  { id: 'cat-8', slug: 'leadership', name: 'Leadership', description: 'Executive profiles, C-suite interviews, board strategies, and industrial pioneers.', color: 'amber', order: 8 },
  { id: 'cat-9', slug: 'opinion', name: 'Opinion', description: 'Thought leadership, academic columns, and economic policy debates.', color: 'slate', order: 9 },
  { id: 'cat-10', slug: 'international-business', name: 'International Business', description: 'Cross-border commerce, AfCFTA integration, BRICS partnerships, and global market linkages.', color: 'teal', order: 10 },
];

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Commercial Bank of Ethiopia (CBE) Headquarters Tower',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    caption: 'Modern commercial banking skyscraper in Addis Ababa financial district.',
    credit: 'Negarit Business Archive / Unsplash',
    category: 'Finance',
    uploadedAt: '2026-08-15',
    fileSize: '1.2 MB',
    dimensions: '1920x1080',
    usageCount: 4
  },
  {
    id: 'media-2',
    title: 'Ethiopian Securities Exchange (ESX) Trading Floor',
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
    caption: 'Digital terminals and financial analytics at the capital markets exchange.',
    credit: 'ESX Press Office / Unsplash',
    category: 'Markets',
    uploadedAt: '2026-08-18',
    fileSize: '950 KB',
    dimensions: '1920x1200',
    usageCount: 3
  },
  {
    id: 'media-3',
    title: 'Digital Mobile Payment & Telebirr Ecosystem',
    url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80',
    caption: 'Contactless POS payment and mobile money interoperability in retail stores.',
    credit: 'Fintech Bureau Addis',
    category: 'Technology',
    uploadedAt: '2026-08-20',
    fileSize: '1.4 MB',
    dimensions: '2000x1333',
    usageCount: 5
  },
  {
    id: 'media-4',
    title: 'Specialty Coffee Export Logistics & Jimma Farm',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    caption: 'Highland Arabica coffee harvest in Oromia region for European and Asian export.',
    credit: 'Agro Export Federation',
    category: 'Economy',
    uploadedAt: '2026-08-22',
    fileSize: '820 KB',
    dimensions: '1800x1200',
    usageCount: 2
  },
  {
    id: 'media-5',
    title: 'Ethiopian Airlines Boeing 787-9 Dreamliner at Bole Airport',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80',
    caption: 'Cargo and passenger flagship aircraft serving global trade corridors.',
    credit: 'Ethiopian Airlines Group',
    category: 'Business',
    uploadedAt: '2026-08-25',
    fileSize: '1.8 MB',
    dimensions: '2400x1600',
    usageCount: 3
  },
  {
    id: 'media-6',
    title: 'Hawassa Industrial Park Garment & Textile Facility',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    caption: 'Automated manufacturing lines producing high-grade apparel exports.',
    credit: 'EIC Investment Board',
    category: 'Investment',
    uploadedAt: '2026-08-27',
    fileSize: '1.1 MB',
    dimensions: '1920x1080',
    usageCount: 2
  },
  {
    id: 'media-7',
    title: 'Addis Ababa Tech Park & AI Startup Hub',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    caption: 'Software developers collaborating on enterprise cloud applications.',
    credit: 'Innovation Ministry Archive',
    category: 'Startups',
    uploadedAt: '2026-08-29',
    fileSize: '1.5 MB',
    dimensions: '2048x1365',
    usageCount: 2
  }
];

export const INITIAL_FEATURED_CONFIG: FeaturedConfig = {
  breakingNewsTicker: [
    'NBE FX Liberalization: Interbank foreign currency market liquidity surges 38% as commercial banks adjust spread margins',
    'Ethiopian Securities Exchange (ESX) secures initial public listings pipeline ahead of landmark debut trading quarter',
    'Ethio Telecom and Safaricom Ethiopia expand interoperable mobile money integrations via Telebirr and M-Pesa gateways',
    'National Bank of Ethiopia raises foreign exchange retention threshold for coffee exporters to 60%',
    'Commercial Bank of Ethiopia reports total asset base surpassing 2.4 Trillion ETB following digitalization'
  ],
  heroArticleId: 'art-1',
  topStoryArticleId: 'art-2',
  trendingArticleIds: ['art-1', 'art-3', 'art-5', 'art-2'],
  editorPickArticleIds: ['art-2', 'art-4', 'art-6']
};

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'auth-1',
    name: 'Henok Tadesse',
    role: 'Senior Macroeconomics Editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Former financial analyst with over 12 years covering Horn of Africa monetary policy, central banking, and foreign exchange reforms.',
    twitter: '@HenokEcon',
    linkedin: 'linkedin.com/in/henoktadesse'
  },
  {
    id: 'auth-2',
    name: 'Bethlehem Girma',
    role: 'Financial Markets & Banking Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Specializes in the Ethiopian Securities Exchange (ESX), private equity capital flows, and commercial banking digitalization.',
    twitter: '@BethGirmaFin',
    linkedin: 'linkedin.com/in/bethlehem-girma'
  },
  {
    id: 'auth-3',
    name: 'Yared Kebede',
    role: 'Technology & Telecom Correspondent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Investigates Ethiopia’s tech startup ecosystem, telecommunications rivalry, AI deployments, and digital public infrastructure.',
    twitter: '@YaredTechHorn',
    linkedin: 'linkedin.com/in/yaredkebede'
  },
  {
    id: 'auth-4',
    name: 'Dr. Selamawit Bekele',
    role: 'Contributing Macro Columnist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Visiting Fellow at Addis Ababa University Department of Economics and policy advisor to regional trade bodies.',
    twitter: '@DrSelamEcon',
    linkedin: 'linkedin.com/in/selamawit-bekele'
  },
  {
    id: 'auth-5',
    name: 'Dawit Mengistu',
    role: 'Agribusiness & Commodities Editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Covering ECX commodity exchanges, specialty coffee logistics, floriculture exports, and green energy investments.',
    twitter: '@DawitAgriTrade',
    linkedin: 'linkedin.com/in/dawitmengistu'
  }
];

export const INITIAL_BREAKING_NEWS = [
  'NBE FX Liberalization: Interbank foreign currency market liquidity surges 38% as commercial banks adjust spread margins',
  'Ethiopian Securities Exchange (ESX) secures initial public listings pipeline ahead of landmark debut trading quarter',
  'Ethio Telecom and Safaricom Ethiopia expand interoperable mobile money integrations via Telebirr and M-Pesa gateways',
  'National Bank of Ethiopia raises foreign exchange retention threshold for coffee and specialty agricultural exporters to 60%',
  'Commercial Bank of Ethiopia reports total asset base surpassing 2.4 Trillion ETB following digital banking transformation',
  'Ethiopian Airlines finalizes $1.2B direct fleet acquisition agreement for next-generation wide-body aircraft to expand Asia-Africa corridors'
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'ethiopia-market-based-fx-regime-capital-transformation',
    title: 'The Great Monetary Shift: How Ethiopia’s Market-Based Foreign Exchange Regime is Reshaping Capital Dynamics',
    subtitle: 'Following the National Bank of Ethiopia’s decisive currency float, commercial banks, multinational investors, and exporters navigate a new era of price discovery and liquidity management.',
    excerpt: 'The liberalization of Ethiopia’s foreign exchange market represents the most consequential economic policy reform in three decades. As the initial currency adjustment settles, corporate balance sheets are adjusting to transparent market-driven valuation.',
    content: [
      'In what historians and economists will record as the watershed moment of modern Ethiopian finance, the National Bank of Ethiopia (NBE) transitioned the nation into a market-determined foreign exchange system. The policy shift, part of the broader Homegrown Economic Reform Agenda (HGER 2.0), dismantled decades of rigid administrative currency pegging.',
      'For decades, foreign currency rationing created bottlenecks for manufacturing, infrastructure imports, and capital repatriation. Under the new framework, commercial banks quote competitive, market-clearing bid-and-ask rates, driving parallel market premiums down from over 100% to single-digit spreads within months.',
      'Commercial lenders have aggressively mobilized export proceeds and non-resident remittances. "We are seeing foreign exchange liquidity return to the formal banking conduits," notes Bethlehem Girma, lead financial markets analyst. "Multinational companies that previously stalled capital expansion projects are now modeling long-term treasury strategies with predictable pricing benchmarks."',
      'However, the transition requires rigorous macro safeguards. To mitigate inflationary pressures on essential goods, the government introduced targeted fuel subsidies and fertilizer support schemes. Simultaneously, the central bank implemented strict capital adequacy buffers and interest rate corridors to preserve banking solvency.',
      'As foreign direct investment (FDI) inflows recover and institutional lenders deploy concessional financing tranches, Ethiopia stands on the precipice of an integrated, transparent, and credit-worthy frontier market economy.'
    ],
    category: 'Economy',
    author: INITIAL_AUTHORS[0],
    publishedAt: '2026-08-30T08:30:00Z',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Addis Ababa financial district skyline, featuring the National Bank of Ethiopia and premier commercial bank headquarters.',
    isBreaking: false,
    isHeroFeatured: true,
    isEditorPick: true,
    isMostRead: true,
    views: 48920,
    shares: 3420,
    tags: ['NBE', 'Macroeconomics', 'Foreign Exchange', 'Banking', 'HGER 2.0', 'Addis Ababa'],
    keyTakeaways: [
      'Market-determined foreign currency rates reduced parallel market margins to under 8%.',
      'Commercial banks report a 45% increase in formal export revenue deposits and remittances.',
      'Targeted fiscal safety nets continue to protect low-income households against transitory price shocks.',
      'International institutional investors are re-engaging in sovereign debt restructuring and infrastructure equity.'
    ],
    pullQuote: {
      quote: "Price discovery is not merely a technical monetary adjustment; it is the prerequisite for allocating capital efficiently across agriculture, manufacturing, and technology.",
      speaker: "Dr. Eyob Tekalign",
      role: "State Minister of Finance"
    },
    audioDuration: '5:42',
    relatedCompany: 'National Bank of Ethiopia',
    status: 'published'
  },
  {
    id: 'art-2',
    slug: 'ethiopian-securities-exchange-esx-capital-markets-revolution',
    title: 'Countdown to the Bell: Inside the Infrastructure Powering the Ethiopian Securities Exchange (ESX)',
    subtitle: 'From sovereign enterprise divestments to private commercial bank listings, East Africa’s newest bourse prepares to unlock institutional domestic wealth.',
    excerpt: 'The Ethiopian Securities Exchange is entering its final operational countdown. With trading terminals deployed across brokerages and investment banks licensed, the bourse promises to democratize corporate ownership.',
    content: [
      'The trading floor at the Ethiopian Securities Exchange (ESX) in Addis Ababa gleams with high-frequency server racks and low-latency market data screens. What was once an ambition discussed in policy whitepapers is now a fully functional equity and fixed-income clearinghouse.',
      'Key state-owned enterprises, including Ethio Telecom and portions of Ethiopian Investment Holdings (EIH) portfolio companies, are structured for public floatation. Simultaneously, private commercial banks and insurers are mobilizing capital to meet enhanced regulatory capital thresholds through rights issues on the secondary market.',
      'Investment banks, licensed under the watchful eye of the Ethiopian Capital Market Authority (ECMA), have established asset management divisions, collective investment schemes (mutual funds), and algorithmic execution desks. This creates unprecedented access for retail and institutional investors.',
      'With over 120 million citizens and one of the continent’s fastest-growing middle classes, the ESX is poised to serve as the benchmark liquidity pool for the Horn of Africa.'
    ],
    category: 'Finance',
    author: INITIAL_AUTHORS[1],
    publishedAt: '2026-08-29T11:15:00Z',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Trading terminals and financial analysts monitoring capital market indicators in Addis Ababa.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: true,
    isMostRead: true,
    views: 38410,
    shares: 2190,
    tags: ['ESX', 'Capital Markets', 'Equities', 'Ethio Telecom', 'ECMA', 'Investment Banking'],
    keyTakeaways: [
      'Over 20 commercial institutions and blue-chip enterprises in the initial listing pipeline.',
      'Automated central securities depository (CSD) guarantees T+2 settlement with real-time risk surveillance.',
      'Institutional pension funds and diaspora investment vehicles allocate early liquidity pools.'
    ],
    pullQuote: {
      quote: "A well-regulated capital market converts idle savings into productive industrial output. ESX is built to the highest global governance standards.",
      speaker: "Dr. Brook Taye",
      role: "CEO, Ethiopian Investment Holdings (EIH)"
    },
    audioDuration: '4:30',
    relatedCompany: 'Ethiopian Securities Exchange',
    status: 'published'
  },
  {
    id: 'art-3',
    slug: 'telecom-fintech-rivalry-telebirr-mpesa-financial-inclusion',
    title: 'The Battle for 100 Million Wallets: How Telebirr and M-Pesa Are Redefining African Fintech Dominance',
    subtitle: 'With super-apps delivering micro-loans, cross-border remittances, and merchant QR payments, mobile money in Ethiopia has leapfrogged traditional branch banking.',
    excerpt: 'The rivalry between Ethio Telecom’s Telebirr and Safaricom Ethiopia’s M-Pesa has ignited an unprecedented wave of digital transformation, accelerating financial inclusion from rural farms to urban mega-malls.',
    content: [
      'Every second across Ethiopia, hundreds of digital transactions ping through secure cloud servers. From a street-side coffee roaster in Piazza to a commercial grain merchant in Hawassa, smartphone QR codes and USSD prompts have made physical cash obsolete for millions.',
      'Ethio Telecom’s Telebirr has surpassed 45 million registered users, having processed trillions of Birr in annual transaction volumes. Meanwhile, Safaricom Ethiopia’s aggressive rollout of M-Pesa and nationwide 5G connectivity has intensified product innovation.',
      'Micro-lending products like Sanduq and overdraft facilities provide instant working capital to small traders without collateral. Partnerships with the Ethiopian Ministry of Innovation and Technology (MInT) and the National ID program (Fayda) ensure seamless KYC authentication.',
      'The next frontier is cross-border trade. With the African Continental Free Trade Area (AfCFTA) taking root, interoperable digital payment switches are connecting Ethiopian merchants directly with suppliers in Kenya, UAE, and Europe.'
    ],
    category: 'Technology',
    author: INITIAL_AUTHORS[2],
    publishedAt: '2026-08-28T14:45:00Z',
    readTime: '4 min read',
    featuredImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Merchant accepting contactless digital mobile wallet payment in central Addis Ababa.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: false,
    isMostRead: true,
    views: 31200,
    shares: 1850,
    tags: ['Telebirr', 'M-Pesa', 'Fintech', 'Ethio Telecom', 'Safaricom', 'Digital Economy'],
    keyTakeaways: [
      'Digital payment volumes grew by 180% year-over-year across mobile platforms.',
      'Integration with Fayda Digital ID cuts merchant onboarding time from 3 days to 45 seconds.',
      'Micro-loans generated over 60 billion ETB in productive SME financing over the past 12 months.'
    ],
    audioDuration: '4:15',
    relatedCompany: 'Ethio Telecom / Safaricom',
    status: 'published'
  },
  {
    id: 'art-4',
    slug: 'ethiopian-specialty-coffee-export-records-arabica-boom',
    title: 'The Black Gold Surge: How Single-Origin Yirgacheffe and Sidama Are Driving Record $2 Billion Export Revenues',
    subtitle: 'Direct trade protocols, digital traceability, and surging European specialty demand catapult Ethiopian Arabica to unprecedented global valuations.',
    excerpt: 'Ethiopian coffee producers are capturing premium global margins through direct cupping auctions and farm-to-cup blockchain verification, defying global commodity price volatility.',
    content: [
      'In the misty highlands of Sidama and Guji, coffee pickers select deep crimson cherries with surgical precision. This harvest season, the rewards for uncompromising quality have never been greater.',
      'The Ethiopian Coffee and Tea Authority (ECTA) reports that specialty coffee exports exceeded $2.1 billion over the fiscal cycle. High-scoring micro-lots commanded prices upwards of $60 per pound at international Cup of Excellence (CoE) auctions.',
      'Under streamlined export regulations, washing station operators and smallholder cooperatives can contract directly with boutique roasters in Tokyo, London, and San Francisco, bypassing intermediaries and retaining higher foreign exchange earnings.',
      'Investments in climate-resilient agroforestry, solar-powered dry mills, and organic certifications are safeguarding Ethiopia’s heritage as the birthplace of Coffea Arabica.'
    ],
    category: 'Business',
    author: INITIAL_AUTHORS[4],
    publishedAt: '2026-08-27T09:00:00Z',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Specialty coffee cherries drying on raised African beds in the Guji Highlands.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: false,
    isMostRead: false,
    views: 24100,
    shares: 1420,
    tags: ['Coffee', 'Agribusiness', 'Commodities', 'Exports', 'ECX', 'Sidama', 'Yirgacheffe'],
    keyTakeaways: [
      'Annual coffee export revenues crossed the historic $2.1 Billion mark.',
      'Direct trade agreements now account for 42% of total specialty shipments.',
      'Traceability mandates ensure full provenance tracking from seedling to export container.'
    ],
    audioDuration: '4:50',
    relatedCompany: 'Ethiopian Coffee & Tea Authority',
    status: 'published'
  },
  {
    id: 'art-5',
    slug: 'ethiopian-airlines-b777x-fleet-vision-2035',
    title: 'Commanding African Skies: Ethiopian Airlines Details $8B Aircraft Influx and Mega-Hub Airport Strategy',
    subtitle: 'Africa’s largest aviation group accelerates its Vision 2035 masterplan with new wide-body freighters, passenger airliners, and the Bishoftu 100M-passenger mega airport.',
    excerpt: 'Defying global supply chain constraints, Ethiopian Airlines Group continues to set the standard for operational profitability and continent-wide logistics hegemony.',
    content: [
      'At Bole International Airport, the tempo never slows. Every four minutes, an Ethiopian Airlines Boeing or Airbus touches down, carrying travelers, pharmaceutical cargo, or perishable floral exports between five continents.',
      'Under Group CEO Mesfin Tasew, the carrier is executing Vision 2035—a multi-billion-dollar expansion blueprint aimed at doubling the fleet to over 270 aircraft and connecting over 200 international destinations.',
      'Central to this ambition is the upcoming Bishoftu Mega-Hub Airport, located 40 kilometers southeast of Addis Ababa. Engineered to handle 100 million passengers annually upon completion, the facility will eclipse all regional aviation gateways.',
      'Beyond passenger travel, Ethiopian Cargo & Logistics Services has emerged as the lifeblood of African e-commerce, operating state-of-the-art cold-chain pharmaceutical distribution centers and express courier hubs.'
    ],
    category: 'Business',
    author: INITIAL_AUTHORS[0],
    publishedAt: '2026-08-26T16:20:00Z',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Ethiopian Airlines modern flagship aircraft taxiing at Addis Ababa Bole International Airport.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: true,
    isMostRead: true,
    views: 42150,
    shares: 2890,
    tags: ['Ethiopian Airlines', 'Aviation', 'Bishoftu Hub', 'Logistics', 'Vision 2035', 'Trade'],
    keyTakeaways: [
      'Vision 2035 targets 270 active aircraft and 200+ global direct routes.',
      'Bishoftu Mega-Hub airport construction advancing toward 100M passenger capacity.',
      'Cargo revenue accounts for 35% of total group turnover, leading intra-African trade logistics.'
    ],
    pullQuote: {
      quote: "We do not simply run an airline; we operate the strategic economic bridge that connects Africa with the global commerce hubs of Asia, the Americas, and Europe.",
      speaker: "Mesfin Tasew",
      role: "Group CEO, Ethiopian Airlines"
    },
    audioDuration: '5:10',
    relatedCompany: 'Ethiopian Airlines Group',
    status: 'published'
  },
  {
    id: 'art-6',
    slug: 'addis-startup-ecosystem-venture-capital-vc-funding',
    title: 'From Garage to Series A: Why Global VCs Are Betting Big on Addis Ababa’s High-Growth Tech Founders',
    subtitle: 'Despite global funding winter, Ethiopian founders in logistics, agri-tech, and health-tech are closing multi-million-dollar rounds with resilient unit economics.',
    excerpt: 'Addis Ababa’s tech ecosystem is reaching a critical inflection point. Driven by favorable regulatory sandboxes, startup proclamation incentives, and local talent, founders are building scalable enterprises.',
    content: [
      'In a collaborative innovation lab in Bole, a team of young engineers fine-tunes an AI-driven agricultural forecasting model that alerts smallholders to soil moisture deficits via SMS and voice notes. Two floors down, an on-demand freight logistics startup orchestrates cross-border trucking routes.',
      'Ethiopia’s Startup Proclamation has provided a legal foundation with tax holidays, intellectual property protections, and simplified offshore investment repatriation pathways.',
      'Early-stage venture capital funds, including international syndicates from Silicon Valley, London, and Nairobi, are deploying early seed and Series A checks into Ethiopian founders demonstrating positive unit economics.',
      '"The scale of the domestic market is unmatched in East Africa," says Samrawit Fikru, founder of Hybrid Designs. "When you build a product that solves an everyday operational friction in Ethiopia, your addressable market is over a hundred million people."'
    ],
    category: 'Entrepreneurship',
    author: INITIAL_AUTHORS[2],
    publishedAt: '2026-08-25T13:10:00Z',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Tech entrepreneurs and software engineers collaborating at an Addis Ababa incubator.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: false,
    isMostRead: false,
    views: 19800,
    shares: 1120,
    tags: ['Startups', 'Venture Capital', 'Entrepreneurship', 'Tech', 'Innovation', 'Founders'],
    keyTakeaways: [
      'Startup Proclamation offers 3-year tax exemptions and streamlined regulatory sandboxes.',
      'Sectors leading VC deal flow include logistics tech, agri-fintech, and B2B SaaS.',
      'Over $65M in venture capital injected into early-stage Ethiopian startups this year.'
    ],
    audioDuration: '4:20',
    relatedCompany: 'Addis Tech Hub',
    status: 'published'
  },
  {
    id: 'art-7',
    slug: 'gerd-green-energy-power-exports-east-africa-grid',
    title: 'The Regional Powerhouse: How GERD Clean Energy Exports Are Generating Foreign Currency for Ethiopia',
    subtitle: 'With multiple turbines operational, cross-border power transmission to Kenya, Djibouti, and Sudan establishes Ethiopia as the green energy battery of Eastern Africa.',
    excerpt: 'The Grand Ethiopian Renaissance Dam (GERD) is transforming regional power dynamics. Cross-border power purchase agreements are generating steady foreign exchange revenues while powering regional industrialization.',
    content: [
      'Along the Blue Nile gorge in Benishangul-Gumuz, massive hydro-turbines rotate with thunderous precision, converting the kinetic energy of Africa’s longest river into gigawatts of zero-carbon electricity.',
      'Ethiopian Electric Power (EEP) confirmed that electricity export revenue reached unprecedented quarterly peaks, driven by long-term bilateral contracts with Kenya Power, Djibouti Electricity, and the Eastern Africa Power Pool (EAPP).',
      'The 500kV Ethiopia-Kenya high-voltage direct current (HVDC) transmission interconnector has delivered stable baseline load to Kenyan industrial zones, cementing an integrated energy market.',
      'As negotiations advance to connect Tanzania and Uganda, clean hydropower will serve as the cornerstone of regional economic integration.'
    ],
    category: 'Economy',
    author: INITIAL_AUTHORS[0],
    publishedAt: '2026-08-24T10:40:00Z',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'High-voltage transmission infrastructure transmitting green energy across the Rift Valley.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: false,
    isMostRead: false,
    views: 22400,
    shares: 1650,
    tags: ['GERD', 'Energy', 'Hydropower', 'EEP', 'Clean Energy', 'Exports', 'East Africa'],
    keyTakeaways: [
      'Cross-border power exports generate over $150M in annual foreign exchange.',
      'Eastern Africa Power Pool interconnection expands to 6 member nations.',
      'Total installed clean energy generation capacity in Ethiopia exceeds 5,200 MW.'
    ],
    audioDuration: '4:45',
    relatedCompany: 'Ethiopian Electric Power (EEP)',
    status: 'published'
  },
  {
    id: 'art-8',
    slug: 'opinion-monetary-policy-credibility-nbe-interest-corridor',
    title: 'Opinion: Sustaining Monetary Credibility in the Era of Interest Rate Corridors and Inflation Anchors',
    subtitle: 'A critical analysis of the central bank’s shift from direct quantitative controls to price-based liquidity management and overnight lending mechanisms.',
    excerpt: 'To cement the success of macroeconomic stabilization, the central bank must maintain unwavering commitment to data-driven interest rate policy and transparent communication.',
    content: [
      'In orthodox central banking, credibility is the most precious currency. When market participants believe a central bank will defend price stability at all costs, inflation expectations become anchored, wage-price spirals diminish, and bond yields stabilize.',
      'The National Bank of Ethiopia’s operationalization of the interest rate corridor (IRC) and the standing lending facility represents an intellectual leap forward from historical reliance on direct credit ceilings and reserve requirement tweaks.',
      'Commercial bank treasurers must now actively manage their liquidity buffers on the interbank market. The central bank conducts open market operations (OMO) with repo and reverse-repo tenders, giving monetary policy its first true transmission mechanism into commercial lending rates.',
      'Looking ahead, the central bank must cultivate institutional independence and resist fiscal dominance. When interest rate decisions are insulated from short-term political pressures, long-term capital investments flourish.'
    ],
    category: 'Opinion',
    author: INITIAL_AUTHORS[3],
    publishedAt: '2026-08-23T07:15:00Z',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Abstract digital data flows illustrating macroeconomic liquidity and monetary policy transmission.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: false,
    isMostRead: false,
    views: 16700,
    shares: 980,
    tags: ['Opinion', 'Monetary Policy', 'Interest Rate Corridor', 'Central Banking', 'Economics'],
    keyTakeaways: [
      'Interest rate corridor establishes transparent benchmarks for interbank overnight liquidity.',
      'Central bank independence is crucial for dampening long-term inflationary expectations.',
      'Data-driven communication improves private sector forecast accuracy and corporate investment.'
    ],
    pullQuote: {
      quote: "Monetary credibility is earned in basis points and sustained through steadfast institutional transparency.",
      speaker: "Dr. Selamawit Bekele",
      role: "Contributing Macro Columnist"
    },
    audioDuration: '5:15',
    status: 'published'
  },
  {
    id: 'art-9',
    slug: 'private-equity-industrial-parks-textile-manufacturing-apparel',
    title: 'Industrial Resurgence: Private Equity Flocks to Hawassa and Bole Lemi Industrial Parks',
    subtitle: 'Duty-free trade pacts and competitive green power tariffs attract European and Asian garment manufacturers seeking resilient supply chains.',
    excerpt: 'Ethiopia’s plug-and-play industrial park model is regaining momentum as global apparel giants and industrial consortiums capitalize on competitive clean energy costs.',
    content: [
      'Inside the vast manufacturing sheds of Hawassa Industrial Park, automated sewing lines hum with coordinated rhythm. Thousands of skilled operators manufacture performance apparel destined for flagship stores in Milan, Berlin, and New York.',
      'With the full availability of foreign currency for raw material inputs and spare parts, tenant occupancy rates across state and private industrial parks have climbed above 85%.',
      'The industrial parks offer zero-carbon hydro-powered operations, water recycling effluent treatment plants, and on-site customs clearance, minimizing logistics friction.',
      'International private equity funds are taking minority and majority stakes in domestic contract manufacturing enterprises, positioning Ethiopia as the premier apparel sourcing hub for the Western Hemisphere.'
    ],
    category: 'Business',
    author: INITIAL_AUTHORS[1],
    publishedAt: '2026-08-22T15:00:00Z',
    readTime: '4 min read',
    featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Modern automated industrial manufacturing facility in Hawassa Industrial Park.',
    isBreaking: false,
    isHeroFeatured: false,
    isEditorPick: false,
    isMostRead: false,
    views: 18300,
    shares: 890,
    tags: ['Industrial Parks', 'Manufacturing', 'Private Equity', 'Hawassa', 'Apparel', 'Trade'],
    keyTakeaways: [
      'Industrial park tenant occupancy exceeds 85% with renewed raw material supply chains.',
      'Zero-carbon hydro power tariffs provide a 40% operating cost advantage over competitors.',
      'Targeted export tax incentives stimulate long-term foreign direct investment.'
    ],
    audioDuration: '4:10',
    relatedCompany: 'Industrial Parks Development Corporation',
    status: 'published'
  }
];

export const INITIAL_MARKET_INDICATORS: MarketIndicator[] = [
  {
    id: 'ind-1',
    name: 'USD / ETB (NBE Mid-Rate)',
    code: 'USD/ETB',
    category: 'Forex',
    value: '138.45',
    numericValue: 138.45,
    change: '+0.32%',
    isPositive: true,
    unit: 'ETB',
    high52w: '142.10',
    low52w: '57.80',
    lastUpdated: '10 Mins ago',
    description: 'National Bank of Ethiopia market-determined indicative interbank foreign exchange rate.',
    history: [
      { date: 'Jan', value: 57.5 },
      { date: 'Mar', value: 57.8 },
      { date: 'May', value: 58.2 },
      { date: 'Jul', value: 118.0 },
      { date: 'Aug', value: 134.5 },
      { date: 'Sep', value: 138.45 }
    ]
  },
  {
    id: 'ind-2',
    name: 'ESX All-Share Index (Benchmark)',
    code: 'ESX-ASI',
    category: 'Equities',
    value: '1,420.80',
    numericValue: 1420.8,
    change: '+2.14%',
    isPositive: true,
    unit: 'Pts',
    high52w: '1,450.00',
    low52w: '1,000.00',
    lastUpdated: 'Live Feed',
    description: 'Composite performance benchmark of initial public enterprise and banking equities on ESX.',
    history: [
      { date: 'May', value: 1000 },
      { date: 'Jun', value: 1120 },
      { date: 'Jul', value: 1280 },
      { date: 'Aug', value: 1390 },
      { date: 'Sep', value: 1420.8 }
    ]
  },
  {
    id: 'ind-3',
    name: 'Headline Inflation Rate (CPI YoY)',
    code: 'ETH-CPI',
    category: 'Macro',
    value: '17.8%',
    numericValue: 17.8,
    change: '-1.40%',
    isPositive: false, // decreasing inflation is good
    unit: '%',
    high52w: '31.2%',
    low52w: '17.8%',
    lastUpdated: 'Monthly Stats',
    description: 'Year-on-year consumer price index released by the Ethiopian Statistical Service (ESS).',
    history: [
      { date: 'Jan', value: 28.7 },
      { date: 'Mar', value: 26.2 },
      { date: 'May', value: 23.3 },
      { date: 'Jul', value: 19.9 },
      { date: 'Aug', value: 18.5 },
      { date: 'Sep', value: 17.8 }
    ]
  },
  {
    id: 'ind-4',
    name: 'Arabica Coffee Benchmark (ECX/NY)',
    code: 'COF-ETH',
    category: 'Commodity',
    value: '$248.50',
    numericValue: 248.5,
    change: '+3.85%',
    isPositive: true,
    unit: 'c/lb',
    high52w: '$260.00',
    low52w: '$180.00',
    lastUpdated: '15 Mins ago',
    description: 'Export price index for Grade-1 Ethiopian Washed Yirgacheffe and Sidama Arabica.',
    history: [
      { date: 'Apr', value: 210 },
      { date: 'May', value: 222 },
      { date: 'Jun', value: 235 },
      { date: 'Jul', value: 240 },
      { date: 'Aug', value: 248.5 }
    ]
  },
  {
    id: 'ind-5',
    name: 'Commercial Bank of Ethiopia Assets',
    code: 'CBE-CAP',
    category: 'Banking',
    value: '2.45T',
    numericValue: 2.45,
    change: '+14.2%',
    isPositive: true,
    unit: 'ETB',
    high52w: '2.45T',
    low52w: '1.95T',
    lastUpdated: 'Q3 FY26',
    description: 'Total balance sheet asset value of the nation’s largest commercial banking institution.',
    history: [
      { date: 'Q1', value: 1.95 },
      { date: 'Q2', value: 2.12 },
      { date: 'Q3', value: 2.30 },
      { date: 'Q4', value: 2.45 }
    ]
  },
  {
    id: 'ind-6',
    name: '364-Day Treasury Bill Yield',
    code: 'T-BILL-364',
    category: 'Macro',
    value: '15.65%',
    numericValue: 15.65,
    change: '+0.45%',
    isPositive: true,
    unit: '%',
    high52w: '16.10%',
    low52w: '9.20%',
    lastUpdated: 'Weekly Auction',
    description: 'Weighted average yield on 364-day sovereign government debt paper issued via NBE.',
    history: [
      { date: 'Jan', value: 11.2 },
      { date: 'Mar', value: 12.8 },
      { date: 'May', value: 14.1 },
      { date: 'Jul', value: 15.2 },
      { date: 'Sep', value: 15.65 }
    ]
  }
];

export const INITIAL_CURRENCIES: CurrencyRate[] = [
  {
    currency: 'US Dollar',
    code: 'USD',
    symbol: '$',
    buying: 137.85,
    selling: 139.15,
    change: 0.32,
    isPositive: true,
    flag: '🇺🇸'
  },
  {
    currency: 'Euro',
    code: 'EUR',
    symbol: '€',
    buying: 148.90,
    selling: 150.40,
    change: 0.18,
    isPositive: true,
    flag: '🇪🇺'
  },
  {
    currency: 'British Pound',
    code: 'GBP',
    symbol: '£',
    buying: 177.20,
    selling: 179.10,
    change: -0.12,
    isPositive: false,
    flag: '🇬🇧'
  },
  {
    currency: 'UAE Dirham',
    code: 'AED',
    symbol: 'د.إ',
    buying: 37.55,
    selling: 37.95,
    change: 0.08,
    isPositive: true,
    flag: '🇦🇪'
  },
  {
    currency: 'Chinese Yuan',
    code: 'CNY',
    symbol: '¥',
    buying: 19.30,
    selling: 19.55,
    change: 0.15,
    isPositive: true,
    flag: '🇨🇳'
  },
  {
    currency: 'Saudi Riyal',
    code: 'SAR',
    symbol: '﷼',
    buying: 36.75,
    selling: 37.10,
    change: 0.05,
    isPositive: true,
    flag: '🇸🇦'
  }
];

export const INITIAL_LEADERS: BusinessLeader[] = [
  {
    id: 'lead-1',
    name: 'Frehiwot Tamru',
    position: 'Chief Executive Officer',
    organization: 'Ethio Telecom',
    sector: 'Telecommunications & Fintech',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80',
    shortDescription: 'Spearheading the commercial modernization of Ethio Telecom and the Telebirr super-app with 45M+ subscribers.',
    fullBio: 'Frehiwot Tamru has led Ethio Telecom through the most competitive era in its 130-year history. Under her stewardship, the enterprise executed nationwide 4G/5G network rollouts, launched Telebirr (processing over 2 Trillion ETB in transactions), and prepared the corporate foundation for public share listing on the Ethiopian Securities Exchange.',
    achievements: [
      'Scaled Telebirr to 45M+ users in under 4 years.',
      'Achieved record company revenue growth exceeding 100 Billion ETB.',
      'Championed digital financial inclusion and micro-credit for unbanked communities.'
    ],
    quote: "Digital transformation is not a technical endeavor; it is a profound social equalizer that enables every citizen to participate in economic life.",
    linkedIn: 'linkedin.com/in/frehiwot-tamru'
  },
  {
    id: 'lead-2',
    name: 'Mesfin Tasew',
    position: 'Group Chief Executive Officer',
    organization: 'Ethiopian Airlines Group',
    sector: 'Aviation & Global Logistics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    shortDescription: 'Executing Vision 2035 to expand Africa’s largest carrier to 270+ aircraft and develop the $5B Bishoftu Mega Airport.',
    fullBio: 'With an engineering background and over 38 years of aviation leadership, Mesfin Tasew steers Ethiopian Airlines Group as the standard-bearer for African commercial aviation. He is overseeing fleet modernization agreements with Boeing and Airbus while spearheading the development of the Bishoftu Mega Airport.',
    achievements: [
      'Maintained consistent corporate profitability across turbulent global jet fuel cycles.',
      'Expanded international flight network to 140+ passenger and 65+ dedicated cargo destinations.',
      'Inaugurated state-of-the-art aviation university and aerospace maintenance MRO facilities.'
    ],
    quote: "Our mission is to bridge Africa to the world and connect African economies with one another with speed, precision, and world-class hospitality.",
    linkedIn: 'linkedin.com/in/mesfin-tasew'
  },
  {
    id: 'lead-3',
    name: 'Dr. Brook Taye',
    position: 'Chief Executive Officer',
    organization: 'Ethiopian Investment Holdings (EIH)',
    sector: 'Sovereign Wealth & Capital Strategy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    shortDescription: 'Managing the nation’s $40B sovereign asset portfolio and architecting strategic capital market liberalizations.',
    fullBio: 'Formerly the Director General of the Ethiopian Capital Market Authority (ECMA), Dr. Brook Taye now leads Ethiopian Investment Holdings (EIH)—the sovereign wealth fund managing the state’s multi-billion-dollar corporate equity portfolio. He holds a doctorate in law and economics and previously advised international financial institutions.',
    achievements: [
      'Drafted the regulatory framework for the Ethiopian Capital Market and ESX bourse.',
      'Restructured sovereign enterprise balance sheets to attract global institutional co-investors.',
      'Pioneered green sovereign bond issuances for renewable energy and industrial parks.'
    ],
    quote: "Institutional governance and transparent capital markets convert dormant national assets into engines of intergenerational wealth.",
    linkedIn: 'linkedin.com/in/brook-taye'
  },
  {
    id: 'lead-4',
    name: 'Samrawit Fikru',
    position: 'Founder & Chief Executive Officer',
    organization: 'Hybrid Designs / RIDE',
    sector: 'Mobility & Technology Ecosystems',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    shortDescription: 'Pioneered on-demand urban ride-hailing in Ethiopia, empowering over 50,000 driver-entrepreneurs.',
    fullBio: 'Samrawit Fikru revolutionized urban transportation in Addis Ababa by launching RIDE. Starting with basic SMS and call dispatching in 2014, she scaled RIDE into the preeminent ride-hailing and logistics platform in the country, inspiring a new generation of female tech founders across East Africa.',
    achievements: [
      'Empowered over 50,000 registered drivers with reliable household income streams.',
      'Recognized on BBC 100 Women and global entrepreneurship honoree lists.',
      'Expanded operations into on-demand corporate deliveries and electric vehicle fleet integration.'
    ],
    quote: "When you build technology tailored to your local environment, you solve problems that foreign solutions cannot even comprehend.",
    linkedIn: 'linkedin.com/in/samrawit-fikru'
  },
  {
    id: 'lead-5',
    name: 'Zemedeneh Negatu',
    position: 'Global Chairman',
    organization: 'Fairfax Africa Fund',
    sector: 'Investment Banking & Private Equity',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    shortDescription: 'Advising sovereign governments, Fortune 500 multinationals, and private equity syndicates on African investments.',
    fullBio: 'Zemedeneh Negatu is one of Africa’s most respected investment bankers and macro strategists. With decades of transactional experience across the continent, the US, and Europe, he regularly comments on Bloomberg, CNBC, and FT regarding sovereign debt, industrialization, and foreign direct investment.',
    achievements: [
      'Structured billions in cross-border M&A and infrastructure project financing.',
      'Key strategic advisor on the inception of the Ethiopian Securities Exchange.',
      'Named among the 100 Most Influential Africans by New African Magazine.'
    ],
    quote: "Ethiopia is undergoing a generational economic pivot. Investors who understand demographic and structural fundamentals will reap lasting rewards.",
    linkedIn: 'linkedin.com/in/zemedeneh-negatu'
  },
  {
    id: 'lead-6',
    name: 'Abie Sano',
    position: 'President',
    organization: 'Commercial Bank of Ethiopia (CBE)',
    sector: 'Commercial Banking & Monetary Assets',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    shortDescription: 'Directing the largest commercial bank in East Africa, managing over 2.4 Trillion ETB in assets and 40M+ account holders.',
    fullBio: 'Abie Sano is an esteemed banking executive who has served as President of CBE and President of the Ethiopian Bankers Association. Under his leadership, CBE completed its historic headquarters skyscraper, deployed modern core banking engines, and scaled digital banking channels across 1,900+ nationwide branches.',
    achievements: [
      'Grew CBE asset base past 2.4 Trillion ETB.',
      'Pioneered extensive digital banking adoption and mobile banking integration.',
      'Reinforced risk management and international trade finance operations.'
    ],
    quote: "A resilient financial sector is the bedrock upon which factories are built, harvests are financed, and entrepreneurial dreams are realized.",
    linkedIn: 'linkedin.com/in/abie-sano'
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'comm-1',
    articleId: 'art-1',
    authorName: 'Dr. Girma Wolde',
    authorRole: 'Macroeconomic Strategist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    content: 'The reduction in the parallel market spread is remarkable. The crucial next step is ensuring sustained export diversification beyond coffee and gold to maintain foreign exchange reserves organically.',
    createdAt: '2 hours ago',
    likes: 24,
    isLiked: false
  },
  {
    id: 'comm-2',
    articleId: 'art-1',
    authorName: 'Rahel Asfaw',
    authorRole: 'Corporate Treasury Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    content: 'As an importer of medical equipment, the ability to obtain letters of credit with transparent pricing has transformed our inventory planning. Excellent analysis by Negarit.',
    createdAt: '4 hours ago',
    likes: 18,
    isLiked: false
  },
  {
    id: 'comm-3',
    articleId: 'art-2',
    authorName: 'Yohannes Tefera',
    authorRole: 'Private Equity Associate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    content: 'The establishment of automated central depository accounts will finally bring retail investor trust. Waiting eagerly for the first bank listings on ESX!',
    createdAt: '1 day ago',
    likes: 31,
    isLiked: true
  }
];

export const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'investor.relations@eastafricafund.com',
    name: 'Marcus Vance',
    subscribedAt: '2026-08-28',
    frequency: 'daily',
    interests: ['Economy', 'Finance', 'Markets'],
    status: 'active'
  },
  {
    id: 'sub-2',
    email: 'tedros.bekele@cbe.com.et',
    name: 'Tedros Bekele',
    subscribedAt: '2026-08-29',
    frequency: 'daily',
    interests: ['Finance', 'Business', 'Markets'],
    status: 'active'
  },
  {
    id: 'sub-3',
    email: 'helen.t@startupaddis.io',
    name: 'Helen Tadesse',
    subscribedAt: '2026-08-30',
    frequency: 'weekly',
    interests: ['Technology', 'Entrepreneurship'],
    status: 'active'
  },
  {
    id: 'sub-4',
    email: 'research@nbe.gov.et',
    name: 'NBE Economic Research Desk',
    subscribedAt: '2026-08-31',
    frequency: 'daily',
    interests: ['All'],
    status: 'active'
  }
];
