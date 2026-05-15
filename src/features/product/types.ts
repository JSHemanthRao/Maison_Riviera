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

