export interface Department {
  _id: string;
  name: string;
  acronym?: string;
  slug?: string;
  numberOfLevels?: number;
  stats?: {
    materialsCount: number;
    popularityScore?: number;
  };
}
