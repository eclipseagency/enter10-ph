export const PH_BRANCH_ID = 'b1000000-0000-0000-0000-000000000008';

export const SERVICE_CHARGE_PERCENT = 10;

export type ActivityRate = {
  label: string;
  labelFil: string;
  price: number;
};

export const ACTIVITIES = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    name: 'Bowling',
    nameFil: 'Bowling',
    description: '₱350 per head for 1 Game (10 Frames). Max 8 pax per lane across 6 lanes — 2 Medium, 2 Standard, 2 Beginner.',
    descriptionFil: '₱350 bawat tao para sa 1 Game (10 Frames). Max 8 katao bawat lane sa 6 na lanes — 2 Medium, 2 Standard, 2 Beginner.',
    icon: '🎳',
    price: 350,
    priceLabel: 'per head',
    priceLabelFil: 'bawat tao',
    capacity: 8,
    image: '/images/bowling.jpg',
    rates: [
      { label: 'Per Head — 1 Game (10 Frames)', labelFil: 'Bawat Tao — 1 Game (10 Frames)', price: 350 },
    ] as ActivityRate[],
    notes: [
      'Maximum of 8 pax per lane',
      '6 lanes: 2 Medium, 2 Standard, 2 Beginner',
    ],
    notesFil: [
      'Maximum 8 katao bawat lane',
      '6 na lanes: 2 Medium, 2 Standard, 2 Beginner',
    ],
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    name: 'Archery',
    nameFil: 'Archery',
    description: 'Test your aim with 30 minutes of archery. Rates vary by group size — up to 6 pax per cage.',
    descriptionFil: 'Subukan ang iyong tama sa 30 minuto ng archery. Presyo ayon sa laki ng grupo — max 6 katao bawat cage.',
    icon: '🏹',
    price: 350,
    priceLabel: '1-3 Pax',
    priceLabelFil: '1-3 Katao',
    capacity: 6,
    image: '/images/archery.jpg',
    rates: [
      { label: '1-3 Pax (30 mins)', labelFil: '1-3 Katao (30 min)', price: 350 },
      { label: '4-6 Pax (30 mins)', labelFil: '4-6 Katao (30 min)', price: 600 },
    ] as ActivityRate[],
    notes: [
      '30 minutes per session',
      'Maximum of 6 pax per cage',
    ],
    notesFil: [
      '30 minuto bawat session',
      'Maximum 6 katao bawat cage',
    ],
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    name: 'Billiards',
    nameFil: 'Billiards',
    description: 'Professional-grade pool tables with rates based on group size and duration. 1 Standard & 2 Junior tables available.',
    descriptionFil: 'Professional-grade na pool tables na may presyo ayon sa laki ng grupo at tagal. 1 Standard at 2 Junior tables.',
    icon: '🎱',
    price: 350,
    priceLabel: '1 hr / 1-4 Pax',
    priceLabelFil: '1 oras / 1-4 Katao',
    capacity: 8,
    image: '/images/billiards.jpg',
    rates: [
      { label: '1 Hour / 1-4 Pax', labelFil: '1 Oras / 1-4 Katao', price: 350 },
      { label: '2 Hours / 1-4 Pax', labelFil: '2 Oras / 1-4 Katao', price: 600 },
      { label: '1 Hour / 5-8 Pax', labelFil: '1 Oras / 5-8 Katao', price: 550 },
      { label: '2 Hours / 5-8 Pax', labelFil: '2 Oras / 5-8 Katao', price: 900 },
    ] as ActivityRate[],
    notes: [
      '1 Standard pool table & 2 Junior pool tables',
      'Maximum of 8 pax per table',
    ],
    notesFil: [
      '1 Standard pool table at 2 Junior pool tables',
      'Maximum 8 katao bawat table',
    ],
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    name: 'VDarts',
    nameFil: 'VDarts',
    description: '₱350 for 4 tokens — no time or round limits. Game mode determines the length of play.',
    descriptionFil: '₱350 para sa 4 tokens — walang time o round limits. Depende sa game mode ang tagal ng laro.',
    icon: '🎯',
    price: 350,
    priceLabel: '4 tokens',
    priceLabelFil: '4 tokens',
    capacity: 4,
    image: '/images/dining.jpg',
    rates: [
      { label: '4 Tokens', labelFil: '4 Tokens', price: 350 },
    ] as ActivityRate[],
    notes: [
      '2 VDarts machines available',
      'No time or round limits — depends on game mode',
    ],
    notesFil: [
      '2 VDarts machines',
      'Walang time o round limits — depende sa game mode',
    ],
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    name: 'Fast Gun Man',
    nameFil: 'Fast Gun Man',
    description: 'Coin-operated arcade — ₱20 per coin to play. Test your speed and reflexes!',
    descriptionFil: 'Coin-operated arcade — ₱20 bawat barya. Subukan ang bilis at reflexes mo!',
    icon: '🔫',
    price: 20,
    priceLabel: 'per coin',
    priceLabelFil: 'bawat barya',
    capacity: 2,
    image: '/images/branded.jpg',
    rates: [
      { label: 'Per Coin', labelFil: 'Bawat Barya', price: 20 },
    ] as ActivityRate[],
    notes: [
      '₱20 coins only to operate',
    ],
    notesFil: [
      '₱20 barya lang para maglaro',
    ],
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    name: 'KTV Studio',
    nameFil: 'KTV Studio',
    description: 'Private KTV room for up to 10 pax. Book 1 or 2 hours and sing your heart out!',
    descriptionFil: 'Private KTV room para sa max 10 katao. Mag-book ng 1 o 2 oras at kumanta nang todo!',
    icon: '🎤',
    price: 3000,
    priceLabel: '1 hr',
    priceLabelFil: '1 oras',
    capacity: 10,
    image: '/images/vip.jpg',
    rates: [
      { label: '1 Hour / Max 10 Pax', labelFil: '1 Oras / Max 10 Katao', price: 3000 },
      { label: '2 Hours / Max 10 Pax', labelFil: '2 Oras / Max 10 Katao', price: 4000 },
    ] as ActivityRate[],
    notes: [
      'Maximum of 10 pax',
      'Promo (until Apr 15, 2026): 10AM-4PM — same price with foods & 1 tower of iced tea',
    ],
    notesFil: [
      'Maximum 10 katao',
      'Promo (hanggang Apr 15, 2026): 10AM-4PM — parehong presyo kasama ang pagkain at 1 tower ng iced tea',
    ],
  },
  {
    id: 'a1000000-0000-0000-0000-000000000009',
    name: 'KTV The Lounge',
    nameFil: 'KTV The Lounge',
    description: 'Our larger KTV room for up to 18 pax. Perfect for big groups and celebrations!',
    descriptionFil: 'Ang mas malaking KTV room para sa max 18 katao. Perfect para sa malalaking grupo at selebrasyon!',
    icon: '🎶',
    price: 4000,
    priceLabel: '1 hr',
    priceLabelFil: '1 oras',
    capacity: 18,
    image: '/images/lounge.jpg',
    rates: [
      { label: '1 Hour / Max 18 Pax', labelFil: '1 Oras / Max 18 Katao', price: 4000 },
      { label: '2 Hours / Max 18 Pax', labelFil: '2 Oras / Max 18 Katao', price: 6500 },
    ] as ActivityRate[],
    notes: [
      'Maximum of 18 pax',
      'Promo (until Apr 15, 2026): 10AM-4PM — same price with foods & 1 tower of iced tea',
    ],
    notesFil: [
      'Maximum 18 katao',
      'Promo (hanggang Apr 15, 2026): 10AM-4PM — parehong presyo kasama ang pagkain at 1 tower ng iced tea',
    ],
  },
];

export const PACKAGES = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'School Fun Day',
    nameFil: 'School Fun Day',
    type: 'school' as const,
    description: 'The ultimate field trip experience. 3 hours of bowling, arcade tokens, and a meal for every student.',
    descriptionFil: 'Ang pinakamahusay na field trip experience. 3 oras ng bowling, arcade tokens, at pagkain para sa bawat estudyante.',
    minPeople: 20,
    maxPeople: 100,
    price: 50,
    duration: 180,
    includes: ['3 hours bowling', 'Arcade tokens per student', 'Meal per student', 'Dedicated event host'],
    includesFil: ['3 oras ng bowling', 'Arcade tokens bawat estudyante', 'Pagkain bawat estudyante', 'Dedicated event host'],
    icon: '🎓',
    color: 'neon-blue',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Corporate Team Building',
    nameFil: 'Corporate Team Building',
    type: 'corporate' as const,
    description: 'Boost team morale with 4 hours of all activities, private room, and full catering.',
    descriptionFil: 'Palakasin ang team morale sa 4 na oras ng lahat ng activities, private room, at full catering.',
    minPeople: 10,
    maxPeople: 50,
    price: 120,
    duration: 240,
    includes: ['4 hours all activities', 'Private room', 'Full catering', 'Team building facilitator'],
    includesFil: ['4 na oras lahat ng activities', 'Private room', 'Full catering', 'Team building facilitator'],
    icon: '💼',
    color: 'neon-gold',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Birthday Bash',
    nameFil: 'Birthday Bash',
    type: 'birthday' as const,
    description: 'Celebrate in style with 3 hours of bowling, cake, decorations, and a party host.',
    descriptionFil: 'Magdiwang nang may estilo sa 3 oras ng bowling, cake, dekorasyon, at party host.',
    minPeople: 5,
    maxPeople: 30,
    price: 80,
    duration: 180,
    includes: ['3 hours bowling', 'Birthday cake', 'Decorations & setup', 'Dedicated party host'],
    includesFil: ['3 oras ng bowling', 'Birthday cake', 'Dekorasyon at setup', 'Dedicated party host'],
    icon: '🎂',
    color: 'neon-magenta',
  },
];

export const OPERATING_HOURS = {
  weekday: { open: '10:00', close: '00:00', label: 'Mon - Thu' },
  weekend: { open: '10:00', close: '02:00', label: 'Fri - Sun' },
};

export const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
  '22:00', '23:00',
];

export const VENUE_INFO = {
  name: 'Enter 10 Bowling',
  address: 'Venezia Dr, McKinley Hill, Taguig, Metro Manila, Philippines',
  phone: '+63-2-000-0008',
  email: 'book@enter-ten.com',
  lat: 14.5311,
  lng: 121.0504,
  mapsUrl: 'https://www.google.com/maps/search/ENTER+10+BOWLING+McKinley+Hill+Taguig',
  mapsEmbed: 'https://www.google.com/maps?q=ENTER+10+BOWLING+McKinley+Hill+Taguig&output=embed',
  googleRating: '4.6',
  googleReviews: '324',
};

export const NAV_LINKS = [
  { href: '/', label: 'Home', labelFil: 'Home' },
  { href: '/activities', label: 'Activities', labelFil: 'Mga Aktibidad' },
  { href: '/packages', label: 'Packages', labelFil: 'Mga Package' },
  { href: '/booking', label: 'Book Now', labelFil: 'Mag-Book' },
  { href: '/contact', label: 'Contact', labelFil: 'Kontak' },
];
