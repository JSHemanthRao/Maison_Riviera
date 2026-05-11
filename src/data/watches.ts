export interface Specification {
  label: string;
  value: string;
}

export interface StoryBlock {
  kicker: string;
  title: string;
  body: string;
  image: string;
}

export interface Watch {
  id: string;
  slug: string;
  name: string;
  collection: string;
  price: string;
  description: string;
  movement: string;
  caseMaterial: string;
  diameter: string;
  powerReserve: string;
  waterResistance: string;
  specifications: Specification[];
  heroImage: string;
  heroVideo?: string;
  youtubeBackup?: string;
  youtubeId?: string;
  images: string[];
  story: StoryBlock[];
  relatedWatches: string[];
  sourceUrl: string;
}

export const watches: Watch[] = [
  {
    id: "astronomia",
    slug: "astronomia",
    name: "Astronomia Art Octopus Baguette",
    collection: "Astronomia",
    price: "Price on request",
    description:
      "A vertical, open-worked grand complication built as a miniature orbital theater, with a flying tourbillon, rotating celestial bodies, and gem-set architecture suspended beneath a sapphire dome.",
    movement: "Jacob & Co. manual-winding Astronomia caliber",
    caseMaterial: "18K rose gold and sapphire crystal",
    diameter: "50 mm",
    powerReserve: "60 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Manual-winding Astronomia caliber" },
      { label: "Case Material", value: "18K rose gold with sapphire crystal apertures" },
      { label: "Diameter", value: "50 mm" },
      { label: "Power Reserve", value: "60 hours" },
      { label: "Water Resistance", value: "30 m" },
      { label: "Complication", value: "Flying tourbillon with orbital display" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1697469301-at100-40-ac-sd-a.webp",
    heroVideo: "/videos/astronomia-tourbillon.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=-mjNvk9pQSg",
    images: [
      "https://www.datocms-assets.com/99008/1697469301-at100-40-ac-sd-a.webp",
      "https://www.datocms-assets.com/99008/1698435765-1-astrotourb-inspo.webp",
      "https://www.datocms-assets.com/99008/1701372190-3-astrotourb-inspo.webp",
      "https://www.datocms-assets.com/99008/1703613514-astronomia-tourbillion-internal-front.webp",
      "https://www.datocms-assets.com/99008/1703613534-astronomia-tourbillion-back.webp",
    ],
    story: [
      {
        kicker: "Orbital Architecture",
        title: "A universe set in motion",
        body:
          "The Astronomia language turns the dial into a rotating stage where mechanical balance, gemstone light, and celestial scale are presented as one continuous performance.",
        image: "https://www.datocms-assets.com/99008/1698435765-1-astrotourb-inspo.webp",
      },
      {
        kicker: "Mechanical Theater",
        title: "Everything is visible",
        body:
          "The sapphire construction keeps the mechanism exposed from every angle, making the watch feel less like an object and more like a kinetic sculpture.",
        image: "https://www.datocms-assets.com/99008/1703613514-astronomia-tourbillion-internal-front.webp",
      },
    ],
    relatedWatches: ["bugatti-chiron", "casino-tourbillon", "opera-godfather"],
    sourceUrl: "https://jacobandco.com/timepieces/astronomia-tourbillon",
  },
  {
    id: "bugatti-chiron",
    slug: "bugatti-chiron",
    name: "Bugatti Chiron Tourbillon Sapphire Crystal",
    collection: "Bugatti Chiron",
    price: "Price on request",
    description:
      "A hypercar-inspired sapphire timepiece built around caliber JCAM37, with a W16 engine-block automaton, 30-degree flying tourbillon, fuel-gauge power reserve, and 578 components.",
    movement: "Caliber JCAM37, hand-wound, 578 components",
    caseMaterial: "Sapphire crystal with titanium components",
    diameter: "57.8 x 44.4 mm",
    powerReserve: "60 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Caliber JCAM37, hand-wound" },
      { label: "Components", value: "578 components" },
      { label: "Case Material", value: "Sapphire crystal and titanium" },
      { label: "Diameter", value: "57.8 x 44.4 mm" },
      { label: "Power Reserve", value: "60 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1711638416-bu210-80-aa-aa-bbrua.webp",
    heroVideo: "/videos/bugatti-chiron.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=qzsl5B0gJkQ",
    images: [
      "https://www.datocms-assets.com/99008/1711638416-bu210-80-aa-aa-bbrua.webp",
      "https://www.datocms-assets.com/99008/1702397876-jco-x-bugatti-logo-4x5.webp",
      "https://www.datocms-assets.com/99008/1702316091-1-bugattichiron-inspo.webp",
      "https://www.datocms-assets.com/99008/1703611170-bugatti-chiron-sapphire-crystal-internal-front.webp",
      "https://www.datocms-assets.com/99008/1703611164-bugatti-chiron-sapphire-crystal-back.webp",
      "https://www.datocms-assets.com/99008/1764699597-bugatti-chiron-tourbillon-sapphire-crystal-1.jpg",
    ],
    story: [
      {
        kicker: "The Partnership",
        title: "A watch engineered like a hypercar",
        body:
          "Jacob & Co. translated the Chiron's mechanical intensity into a transparent case, engine animation, and a movement architecture that looks built for speed.",
        image: "https://www.datocms-assets.com/99008/1702397876-jco-x-bugatti-logo-4x5.webp",
      },
      {
        kicker: "Automaton",
        title: "The W16 comes alive",
        body:
          "At the press of a pusher, the miniature engine-block animation turns the watch into a mechanical performance piece rather than a conventional tourbillon.",
        image: "https://www.datocms-assets.com/99008/1703611170-bugatti-chiron-sapphire-crystal-internal-front.webp",
      },
    ],
    relatedWatches: ["twin-turbo", "oil-pump", "astronomia"],
    sourceUrl: "https://jacobandco.com/timepieces/bugatti-chiron-tourbillon-sapphire-crystal-blue-backplate",
  },
  {
    id: "casino-tourbillon",
    slug: "casino-tourbillon",
    name: "Casino Tourbillon",
    collection: "Casino Tourbillon",
    price: "Price on request",
    description:
      "A roulette-inspired grand complication powered by caliber JCAM51, balancing a playable casino dial with high watchmaking, 268 components, and a 72-hour reserve.",
    movement: "Caliber JCAM51, hand-wound, 268 components",
    caseMaterial: "18K rose gold",
    diameter: "44 mm",
    powerReserve: "72 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Caliber JCAM51, hand-wound" },
      { label: "Components", value: "268 components" },
      { label: "Case Material", value: "18K rose gold" },
      { label: "Diameter", value: "44 mm" },
      { label: "Power Reserve", value: "72 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1756392648-ca100-40-aa-ac-a.webp",
    heroVideo: "/videos/casino-tourbillon.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=9M6gM0n7c7Y",
    images: [
      "https://www.datocms-assets.com/99008/1756392648-ca100-40-aa-ac-a.webp",
      "https://www.datocms-assets.com/99008/1756322134-ca100-40-aa-ab-a.webp",
      "https://www.datocms-assets.com/99008/1777046964-casino-ti-2026-vf.webp",
      "https://www.datocms-assets.com/99008/1761868839-casino-front-new.webp",
      "https://www.datocms-assets.com/99008/1715094561-casino-back.webp",
      "https://www.datocms-assets.com/99008/1761870510-casino-roulette-internal-front-1-2.webp",
    ],
    story: [
      {
        kicker: "Playable Luxury",
        title: "A roulette table on the wrist",
        body:
          "The Casino Tourbillon turns spectacle into interaction, using a miniature roulette mechanism as the visual center of the watch.",
        image: "https://www.datocms-assets.com/99008/1761868839-casino-front-new.webp",
      },
      {
        kicker: "Hidden Depth",
        title: "Horology beneath the theater",
        body:
          "The drama of the dial is matched by a serious tourbillon architecture and a long-running hand-wound movement.",
        image: "https://www.datocms-assets.com/99008/1761870510-casino-roulette-internal-front-1-2.webp",
      },
    ],
    relatedWatches: ["astronomia", "opera-godfather", "gotham-city"],
    sourceUrl: "https://jacobandco.com/timepieces/casino-tourbillon",
  },
  {
    id: "epic-x",
    slug: "epic-x",
    name: "Epic X Chrono Tourbillon Baguette",
    collection: "Epic X",
    price: "Price on request",
    description:
      "A modern skeleton watch with the Epic X's vertical case architecture, open-worked movement, bold bridges, and a sport-luxury profile designed for everyday presence.",
    movement: "Skeleton manual-winding Epic X caliber",
    caseMaterial: "Grade 5 titanium and colored accents",
    diameter: "44 mm",
    powerReserve: "48 hours",
    waterResistance: "50 m",
    specifications: [
      { label: "Movement", value: "Skeleton manual-winding caliber" },
      { label: "Case Material", value: "Titanium with sapphire crystal" },
      { label: "Diameter", value: "44 mm" },
      { label: "Power Reserve", value: "48 hours" },
      { label: "Water Resistance", value: "50 m" },
      { label: "Signature", value: "Open-worked vertical architecture" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1697469125-epic_x_black-red.webp",
    heroVideo: "/videos/epic-x-skeleton.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=R6rM8uP2m9s",
    images: [
      "https://www.datocms-assets.com/99008/1697469125-epic_x_black-red.webp",
      "https://www.datocms-assets.com/99008/1697561074-ex110-20-ac-aj-abrua.webp",
      "https://www.datocms-assets.com/99008/1702050037-1-epicxskeleton-inspo.webp",
      "https://www.datocms-assets.com/99008/1703613599-epic-x-skeleton-v1-internal-front.webp",
      "https://www.datocms-assets.com/99008/1703613594-epic-x-skeleton-v1-back.webp",
      "https://www.datocms-assets.com/99008/1761834366-epic-x-skeleton-1.webp",
    ],
    story: [
      {
        kicker: "Skeleton Form",
        title: "Architecture as identity",
        body:
          "The Epic X strips the watch back to its structural lines, letting the bridges, movement, and case geometry carry the design.",
        image: "https://www.datocms-assets.com/99008/1702050037-1-epicxskeleton-inspo.webp",
      },
      {
        kicker: "Modern Utility",
        title: "A sport watch with high-jewelry confidence",
        body:
          "Its lighter proportions and graphic accents make the Epic X the collection's most direct bridge between technical horology and daily wear.",
        image: "https://www.datocms-assets.com/99008/1761834366-epic-x-skeleton-1.webp",
      },
    ],
    relatedWatches: ["bugatti-chiron", "gotham-city", "twin-turbo"],
    sourceUrl: "https://jacobandco.com/timepieces/epic-x-skeleton",
  },
  {
    id: "twin-turbo",
    slug: "twin-turbo",
    name: "Twin Turbo",
    collection: "Twin Turbo",
    price: "Price on request",
    description:
      "A dramatic high-complication watch defined by twin triple-axis tourbillons, sculptural casework, and the kind of technical density that turns a dial into a stage.",
    movement: "Manual-winding Twin Turbo grand complication caliber",
    caseMaterial: "18K rose gold",
    diameter: "57 x 52 mm",
    powerReserve: "50 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Manual-winding grand complication caliber" },
      { label: "Complication", value: "Twin triple-axis tourbillons" },
      { label: "Case Material", value: "18K rose gold" },
      { label: "Diameter", value: "57 x 52 mm" },
      { label: "Power Reserve", value: "50 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1697209424-tt100-40-ns-nk-a.webp",
    heroVideo: "/videos/twin-turbo-furious.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=5iK9zN7sQ7A",
    images: [
      "https://www.datocms-assets.com/99008/1697209424-tt100-40-ns-nk-a.webp",
      "https://www.datocms-assets.com/99008/1697209461-tt100-21-ns-nk-c.webp",
      "https://www.datocms-assets.com/99008/1702393868-1-twinturbo-furious-inspo.webp",
      "https://www.datocms-assets.com/99008/1703613434-twin-turbo-internal-front.webp",
      "https://www.datocms-assets.com/99008/1703613413-twin-turbo-back.webp",
      "https://www.datocms-assets.com/99008/1761753294-twin-turbo-1.webp",
    ],
    story: [
      {
        kicker: "Dual Motion",
        title: "Complication as choreography",
        body:
          "The Twin Turbo is built around paired tourbillon systems that make precision feel theatrical without losing the language of serious watchmaking.",
        image: "https://www.datocms-assets.com/99008/1702393868-1-twinturbo-furious-inspo.webp",
      },
      {
        kicker: "Grand Architecture",
        title: "Every component has presence",
        body:
          "Its case and movement are shaped to intensify depth, revealing layers of bridges, barrels, and kinetic sculpture.",
        image: "https://www.datocms-assets.com/99008/1703613434-twin-turbo-internal-front.webp",
      },
    ],
    relatedWatches: ["bugatti-chiron", "opera-godfather", "oil-pump"],
    sourceUrl: "https://jacobandco.com/timepieces/twin-turbo/rose-gold",
  },
  {
    id: "billionaire",
    slug: "billionaire",
    name: "Billionaire Timeless Treasure",
    collection: "Billionaire",
    price: "JPY 580,800,000*",
    description:
      "A high-jewelry tourbillon with caliber JCAM39, a white-gold bracelet and case set with hundreds of emerald-cut diamonds totaling more than 129 carats.",
    movement: "Caliber JCAM39, hand-wound, 167 components",
    caseMaterial: "18K white gold with emerald-cut white diamonds",
    diameter: "54 x 43 mm",
    powerReserve: "Approx. 72 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Caliber JCAM39, hand-wound" },
      { label: "Components", value: "167 components" },
      { label: "Case Material", value: "18K white gold, diamond set" },
      { label: "Diameter", value: "54 x 43 mm" },
      { label: "Power Reserve", value: "Approx. 72 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://jacobandco.jp/assets/timepieces/billionaire-iii/1718911058-bl115-30-ac-ua-a30ac.webp",
    heroVideo: "/videos/billionaire-iii.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=9L8R7L6x7mA",
    images: [
      "https://jacobandco.jp/assets/timepieces/billionaire-iii/1718911058-bl115-30-ac-ua-a30ac.webp",
      "https://jacobandco.jp/assets/timepieces/billionaire-iii/1711741564-bl115-30-aa-ua-a30aa.webp",
      "https://jacobandco.jp/assets/timepieces/billionaire-iii/1712158847-billionaire-iii.webp",
      "https://jacobandco.jp/assets/timepieces/billionaire-iii/1703613563-billionaire-iii-internal-front.webp",
      "https://jacobandco.jp/assets/timepieces/billionaire-iii/1703273139-1-billionaire-iii-lifestyle.webp",
      "https://jacobandco.jp/assets/timepieces/billionaire-iii/1703787652-2-billionaire-iii-lifestyle.webp",
    ],
    story: [
      {
        kicker: "High Jewelry",
        title: "Light becomes structure",
        body:
          "The Billionaire III treats diamonds as architecture, covering the watch in matched emerald-cut stones while preserving the presence of a mechanical tourbillon.",
        image: "https://jacobandco.jp/assets/timepieces/billionaire-iii/1712158847-billionaire-iii.webp",
      },
      {
        kicker: "Exclusivity",
        title: "Made for rarity",
        body:
          "The official Japanese site lists the Billionaire III as an 18-piece limited series, emphasizing the extreme selection and setting work required.",
        image: "https://jacobandco.jp/assets/timepieces/billionaire-iii/1703273139-1-billionaire-iii-lifestyle.webp",
      },
    ],
    relatedWatches: ["astronomia", "opera-godfather", "casino-tourbillon"],
    sourceUrl: "https://jacobandco.jp/timepieces/billionaire-iii/",
  },
  {
    id: "opera-godfather",
    slug: "opera-godfather",
    name: "Opera Godfather",
    collection: "Opera Godfather",
    price: "Price on request",
    description:
      "A cinematic musical complication combining a triple-axis tourbillon with a twin-cylinder music box, miniature piano detailing, and the theatrical spirit of The Godfather.",
    movement: "Jacob & Co. Opera manual-winding music-box caliber",
    caseMaterial: "18K rose gold and sapphire",
    diameter: "49 mm",
    powerReserve: "50 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Manual-winding music-box caliber" },
      { label: "Complication", value: "Triple-axis tourbillon and musical automaton" },
      { label: "Case Material", value: "18K rose gold and sapphire" },
      { label: "Diameter", value: "49 mm" },
      { label: "Power Reserve", value: "50 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1763054051-godfather-rg-red-rose-piano-1.webp",
    heroVideo: "/videos/opera-godfather.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=7mIY0W3v7kQ",
    images: [
      "https://www.datocms-assets.com/99008/1763054051-godfather-rg-red-rose-piano-1.webp",
      "https://www.datocms-assets.com/99008/1702061062-op110-21-ag-ab-a.webp",
      "https://www.datocms-assets.com/99008/1698168856-1-godfather.webp",
      "https://www.datocms-assets.com/99008/1713813141-opera_godfather-rg_internals_v04-f.webp",
      "https://www.datocms-assets.com/99008/1713813135-opera_godfather-rg_internals_v04-b.webp",
      "https://www.datocms-assets.com/99008/1711131060-1.webp",
    ],
    story: [
      {
        kicker: "Cinematic Sound",
        title: "A score inside the movement",
        body:
          "The Opera Godfather is both timepiece and mechanical music box, designed to make sound, motion, and watchmaking feel inseparable.",
        image: "https://www.datocms-assets.com/99008/1698168856-1-godfather.webp",
      },
      {
        kicker: "Open Performance",
        title: "The dial becomes a scene",
        body:
          "Miniature instruments, rotating mechanisms, and a sapphire-wrapped case turn the watch into a theatrical object.",
        image: "https://www.datocms-assets.com/99008/1713813141-opera_godfather-rg_internals_v04-f.webp",
      },
    ],
    relatedWatches: ["casino-tourbillon", "twin-turbo", "billionaire"],
    sourceUrl: "https://jacobandco.com/timepieces/opera-godfather",
  },
  {
    id: "oil-pump",
    slug: "oil-pump",
    name: "The World Is Yours MAD Paris",
    collection: "Oil Pump",
    price: "Price on request",
    description:
      "A 43 mm automaton tourbillon built around caliber JCAM53, staging a miniature oil rig with double derricks, flying tourbillon, power-reserve gauge, 450 components, and a 72-hour reserve.",
    movement: "Caliber JCAM53, hand-wound, 450 components",
    caseMaterial: "18K rose gold",
    diameter: "43 mm",
    powerReserve: "72 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Caliber JCAM53, hand-wound" },
      { label: "Components", value: "450 components" },
      { label: "Case Material", value: "18K rose gold" },
      { label: "Diameter", value: "43 mm" },
      { label: "Power Reserve", value: "72 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1724338706-oi100-40-aa-aa-a.webp",
    heroVideo: "/videos/oil-pump.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=2x6N9aQwW8g",
    images: [
      "https://www.datocms-assets.com/99008/1724338706-oi100-40-aa-aa-a.webp",
      "https://www.datocms-assets.com/99008/1736778093-oil-pump-43-inspo-front.webp",
      "https://www.datocms-assets.com/99008/1724367453-oil-pump-44-inspo-back.webp",
      "https://www.datocms-assets.com/99008/1724821357-untitled-design-1.png",
      "https://www.datocms-assets.com/99008/1724787478-1.webp",
      "https://www.datocms-assets.com/99008/1724787483-2.webp",
    ],
    story: [
      {
        kicker: "Automaton",
        title: "A miniature rig in motion",
        body:
          "The Oil Pump uses a moving double-derrick automaton to transform a watch dial into a detailed mechanical landscape.",
        image: "https://www.datocms-assets.com/99008/1736778093-oil-pump-43-inspo-front.webp",
      },
      {
        kicker: "Narrative Mechanics",
        title: "A complication with a storyline",
        body:
          "The power-reserve gauge, pipes, barrel, and tourbillon all play a visual role in a watch built to tell a miniature industrial story.",
        image: "https://www.datocms-assets.com/99008/1724787478-1.webp",
      },
    ],
    relatedWatches: ["bugatti-chiron", "twin-turbo", "gotham-city"],
    sourceUrl: "https://jacobandco.com/timepieces/oil-pump-43MM/rose-gold",
  },
  {
    id: "gotham-city",
    slug: "gotham-city",
    name: "Gotham City",
    collection: "Gotham City",
    price: "From $220,000",
    description:
      "A 45.5 mm DC partnership timepiece limited to 72 pieces, with black DLC titanium or rose gold editions, twin flying sequential triple-axis tourbillons, and caliber JCFM10.",
    movement: "Caliber JCFM10, 382 components",
    caseMaterial: "Black DLC titanium or 18K rose gold",
    diameter: "45.5 mm",
    powerReserve: "48 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Caliber JCFM10" },
      { label: "Components", value: "382 components" },
      { label: "Case Material", value: "Black DLC titanium or 18K rose gold" },
      { label: "Diameter", value: "45.5 mm" },
      { label: "Power Reserve", value: "48 hours" },
      { label: "Limited Edition", value: "72 pieces total" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1722537625-gotham-poster.webp",
    heroVideo: "/videos/gotham-city.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=LV5pDyWPaLU",
    images: [
      "https://www.datocms-assets.com/99008/1722537625-gotham-poster.webp",
      "https://www.datocms-assets.com/99008/1698172372-dc100-21-ab-ab-a.webp",
      "https://www.datocms-assets.com/99008/1697469738-dc100-40-aa-aa-a.webp",
      "https://www.datocms-assets.com/99008/1722538017-231005_gotham_black-dlc-6.webp",
      "https://www.datocms-assets.com/99008/1717396497-gotham_city_dc100-21-ab-ab-abrua_back_blk.webp",
      "https://www.datocms-assets.com/99008/1717396527-gotham_city_dc100-40-aa-aa-abrua_back_blk.webp",
    ],
    story: [
      {
        kicker: "Dark as Night",
        title: "The Batman myth in high watchmaking",
        body:
          "The Gotham City watch translates a black, angular, cinematic design language into an advanced tourbillon object.",
        image: "https://www.datocms-assets.com/99008/1698172372-dc100-21-ab-ab-a.webp",
      },
      {
        kicker: "Sequential Tourbillons",
        title: "Motion with pauses and jumps",
        body:
          "Its twin triple-axis tourbillons move with sequential energy, giving the mechanism a visible rhythm beneath the crystal.",
        image: "https://www.datocms-assets.com/99008/1717396497-gotham_city_dc100-21-ab-ab-abrua_back_blk.webp",
      },
    ],
    relatedWatches: ["epic-x", "casino-tourbillon", "oil-pump"],
    sourceUrl: "https://jacobandco.com/news/jacob-co-debuts-gotham-city-timepiece",
  },
  {
    id: "astronomia-solar",
    slug: "astronomia-solar",
    name: "Astronomia Solar",
    collection: "Astronomia",
    price: "Price on request",
    description:
      "The first Astronomia to feature a central Citrine sun, surrounded by a magnesium 3D Earth, hand-painted planets, and a flying tourbillon, all completing a continuous rotation every 10 minutes.",
    movement: "Jacob & Co. manual-winding JCAM19",
    caseMaterial: "18K Rose Gold and Sapphire",
    diameter: "44.5 mm",
    powerReserve: "48 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Manual-winding JCAM19" },
      { label: "Complication", value: "Flying tourbillon with rotating planetary display" },
      { label: "Case Material", value: "18K Rose Gold" },
      { label: "Diameter", value: "44.5 mm" },
      { label: "Power Reserve", value: "48 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1697469301-at100-40-ac-sd-a.webp",
    heroVideo: "/videos/astronomia-solar.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=EA9vY5AVklk",
    images: [
      "https://www.datocms-assets.com/99008/1697469301-at100-40-ac-sd-a.webp",
      "https://www.datocms-assets.com/99008/1698435765-1-astrotourb-inspo.webp",
      "https://www.datocms-assets.com/99008/1703613534-astronomia-tourbillion-back.webp",
    ],
    story: [
      {
        kicker: "Solar System",
        title: "A galaxy on the wrist",
        body:
          "The Astronomia Solar places our sun at the center of the movement, radiating mechanical energy to a rotating cast of hand-finished celestial bodies.",
        image: "https://www.datocms-assets.com/99008/1698435765-1-astrotourb-inspo.webp",
      },
      {
        kicker: "Transparent View",
        title: "Captured in sapphire",
        body:
          "With sapphire apertures on the sides and dome, light floods into the caliber, illuminating the intricate dance of the planets.",
        image: "https://www.datocms-assets.com/99008/1703613534-astronomia-tourbillion-back.webp",
      },
    ],
    relatedWatches: ["astronomia", "fleurs-de-jardin", "opera-godfather"],
    sourceUrl: "https://jacobandco.com/timepieces/astronomia-solar",
  },
  {
    id: "epic-sf24",
    slug: "epic-sf24",
    name: "Epic SF24 Tourbillon",
    collection: "Epic SF24",
    price: "Price on request",
    description:
      "A grand traveler's watch featuring an iconic split-flap time display inspired by vintage airport departure boards, paired with a flying tourbillon.",
    movement: "Jacob & Co. self-winding JCAA03",
    caseMaterial: "Grade 5 Titanium / Rose Gold",
    diameter: "45 mm",
    powerReserve: "48 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Self-winding JCAA03" },
      { label: "Complication", value: "Split-flap world time display and flying tourbillon" },
      { label: "Case Material", value: "Grade 5 Titanium" },
      { label: "Diameter", value: "45 mm" },
      { label: "Power Reserve", value: "48 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1697561074-ex110-20-ac-aj-abrua.webp",
    heroVideo: "/videos/epic-sf24.mp4",
    images: [
      "https://www.datocms-assets.com/99008/1697561074-ex110-20-ac-aj-abrua.webp",
      "https://www.datocms-assets.com/99008/1702050037-1-epicxskeleton-inspo.webp",
      "https://www.datocms-assets.com/99008/1761834366-epic-x-skeleton-1.webp",
    ],
    story: [
      {
        kicker: "World Time",
        title: "The romance of travel",
        body:
          "Integrating a miniaturized split-flap board at the top of the case, the Epic SF24 displays 24 time zones with the satisfying mechanical click of vintage transit boards.",
        image: "https://www.datocms-assets.com/99008/1702050037-1-epicxskeleton-inspo.webp",
      },
      {
        kicker: "Modern Heritage",
        title: "A unique silhouette",
        body:
          "The tubular housing for the split-flap mechanism gives the SF24 a completely distinctive profile that commands attention on the wrist.",
        image: "https://www.datocms-assets.com/99008/1761834366-epic-x-skeleton-1.webp",
      },
    ],
    relatedWatches: ["epic-x", "gotham-city", "twin-turbo"],
    sourceUrl: "https://jacobandco.com/timepieces/epic-sf24",
  },
  {
    id: "fleurs-de-jardin",
    slug: "fleurs-de-jardin",
    name: "Fleurs de Jardin",
    collection: "High Jewelry",
    price: "Price on request",
    description:
      "A blooming mechanical garden on the wrist, combining a flying tourbillon with exquisite gemstone flowers that rotate around a central axis.",
    movement: "Jacob & Co. manual-winding JCAM31",
    caseMaterial: "18K Rose Gold with Sapphire",
    diameter: "42.5 mm",
    powerReserve: "48 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Manual-winding JCAM31" },
      { label: "Components", value: "High-jewelry rotating garden" },
      { label: "Case Material", value: "18K Rose Gold" },
      { label: "Diameter", value: "42.5 mm" },
      { label: "Power Reserve", value: "48 hours" },
      { label: "Water Resistance", value: "30 m" },
    ],
    heroImage: "https://www.datocms-assets.com/99008/1756392648-ca100-40-aa-ac-a.webp",
    heroVideo: "/videos/fleurs-de-jardin.mp4",
    images: [
      "https://www.datocms-assets.com/99008/1756392648-ca100-40-aa-ac-a.webp",
      "https://www.datocms-assets.com/99008/1715094561-casino-back.webp",
      "https://www.datocms-assets.com/99008/1761868839-casino-front-new.webp",
    ],
    story: [
      {
        kicker: "Kinetic Flora",
        title: "A garden in perpetual motion",
        body:
          "Unlike static jewelry, the Fleurs de Jardin brings precious stones to life. The entire gem-set floral arrangement rotates clockwise, while individual flowers spin counter-clockwise.",
        image: "https://www.datocms-assets.com/99008/1761868839-casino-front-new.webp",
      },
      {
        kicker: "Delicate Power",
        title: "Engineering elegance",
        body:
          "The sophisticated mechanics of the tourbillon are hidden beneath a poetic display of tsavorites, amethysts, and sapphires, proving power can be delicate.",
        image: "https://www.datocms-assets.com/99008/1715094561-casino-back.webp",
      },
    ],
    relatedWatches: ["astronomia-solar", "billionaire", "opera-godfather"],
    sourceUrl: "https://jacobandco.com/timepieces/fleurs-de-jardin",
  },
  {
    id: "caviar-tourbillon",
    slug: "caviar-tourbillon",
    name: "Billionaire Double Tourbillon Angel Cut",
    collection: "High Jewelry",
    price: "Price on request",
    description: "A breathtaking high-jewelry masterpiece fully paved with the most precious gems, hiding a sophisticated flying tourbillon within its flawless architecture.",
    movement: "Jacob & Co. hand-wound caliber",
    caseMaterial: "18K Gold, fully set",
    diameter: "47 mm",
    powerReserve: "100 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Hand-wound flying tourbillon" },
      { label: "Case Material", value: "18K Gold, diamond set" },
      { label: "Diameter", value: "47 mm" }
    ],
    heroImage: "https://www.datocms-assets.com/99008/1715094561-casino-back.webp",
    heroVideo: "/videos/caviar-tourbillon.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=Q7kL9pW2a5N",
    images: ["https://www.datocms-assets.com/99008/1715094561-casino-back.webp"],
    story: [],
    relatedWatches: ["billionaire", "fleurs-de-jardin"],
    sourceUrl: "https://jacobandco.com"
  },
  {
    id: "mystery-tourbillon",
    slug: "mystery-tourbillon",
    name: "Astronomia Art India",
    collection: "High Complication",
    price: "Price on request",
    description: "An illusion on the wrist. The Mystery Tourbillon suspends timekeeping components in transparent sapphire, making the mechanical heart appear to float in mid-air.",
    movement: "Jacob & Co. twin flying tourbillon",
    caseMaterial: "Sapphire and 18K Gold",
    diameter: "50 mm",
    powerReserve: "60 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Twin flying tourbillon" },
      { label: "Case Material", value: "Sapphire and Gold" },
      { label: "Diameter", value: "50 mm" }
    ],
    heroImage: "https://www.datocms-assets.com/99008/1703613514-astronomia-tourbillion-internal-front.webp",
    heroVideo: "/videos/mystery-tourbillon.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=8gWQm4rL0kE",
    images: ["https://www.datocms-assets.com/99008/1703613514-astronomia-tourbillion-internal-front.webp"],
    story: [],
    relatedWatches: ["astronomia", "astronomia-solar"],
    sourceUrl: "https://jacobandco.com"
  },
  {
    id: "brilliant-skeleton",
    slug: "brilliant-skeleton",
    name: "Brilliant Skeleton",
    collection: "Brilliant",
    price: "Price on request",
    description: "Feminine elegance meets pure horology. The Brilliant Skeleton exposes its meticulously hand-finished movement through a delicate, gem-set case.",
    movement: "Skeleton manual-winding",
    caseMaterial: "18K Rose Gold",
    diameter: "44 mm",
    powerReserve: "46 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Skeleton manual-winding" },
      { label: "Case Material", value: "18K Rose Gold" },
      { label: "Diameter", value: "44 mm" }
    ],
    heroImage: "https://www.datocms-assets.com/99008/1697469125-epic_x_black-red.webp",
    heroVideo: "/videos/brilliant-skeleton.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=6fL0Qk2Yx1A",
    images: ["https://www.datocms-assets.com/99008/1697469125-epic_x_black-red.webp"],
    story: [],
    relatedWatches: ["epic-x", "fleurs-de-jardin"],
    sourceUrl: "https://jacobandco.com"
  },
  {
    id: "godfather-minute-repeater",
    slug: "godfather-minute-repeater",
    name: "Godfather Minute Repeater",
    collection: "Opera",
    price: "Price on request",
    description: "The ultimate acoustic complication. Striking the time on demand while maintaining the cinematic presence and mechanical density of the Opera series.",
    movement: "Minute repeater and tourbillon",
    caseMaterial: "18K Rose Gold",
    diameter: "49 mm",
    powerReserve: "48 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Minute repeater and tourbillon" },
      { label: "Case Material", value: "18K Rose Gold" },
      { label: "Diameter", value: "49 mm" }
    ],
    heroImage: "https://www.datocms-assets.com/99008/1713813141-opera_godfather-rg_internals_v04-f.webp",
    heroVideo: "/videos/godfather-ii.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=Y8mQ4dK7s2L",
    images: ["https://www.datocms-assets.com/99008/1713813141-opera_godfather-rg_internals_v04-f.webp"],
    story: [],
    relatedWatches: ["opera-godfather", "twin-turbo"],
    sourceUrl: "https://jacobandco.com"
  },
  {
    id: "astronomia-clarity-dragon",
    slug: "astronomia-clarity-dragon",
    name: "Astronomia Solar Icy Blue Baguette Sapphires",
    collection: "Astronomia",
    price: "Price on request",
    description: "A fully transparent sapphire case houses a hand-engraved 18K gold dragon winding through the iconic Astronomia four-arm movement.",
    movement: "Jacob & Co. manual-winding",
    caseMaterial: "Sapphire Crystal",
    diameter: "50 mm",
    powerReserve: "60 hours",
    waterResistance: "30 m",
    specifications: [
      { label: "Movement", value: "Manual-winding Astronomia" },
      { label: "Case Material", value: "Sapphire Crystal" },
      { label: "Diameter", value: "50 mm" }
    ],
    heroImage: "https://www.datocms-assets.com/99008/1703611170-bugatti-chiron-sapphire-crystal-internal-front.webp",
    heroVideo: "/videos/astronomia-clarity-dragon.mp4",
    youtubeBackup: "https://www.youtube.com/watch?v=1vK7QxM9p3A",
    images: ["https://www.datocms-assets.com/99008/1703611170-bugatti-chiron-sapphire-crystal-internal-front.webp"],
    story: [],
    relatedWatches: ["astronomia", "astronomia-solar"],
    sourceUrl: "https://jacobandco.com"
  }
];

export const getWatchBySlug = (slug: string): Watch | undefined => {
  return watches.find((watch) => watch.slug === slug);
};

export const getRelatedWatches = (slugs: string[]): Watch[] => {
  return slugs
    .map((slug) => watches.find((watch) => watch.slug === slug))
    .filter((watch): watch is Watch => Boolean(watch));
};
