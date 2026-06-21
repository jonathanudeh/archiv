export interface School {
  _id: string;
  name: string;
  slug: string;
  acronym?: string;
  description?: string;
  location?: string;
  country?: string;
  website?: string;

  logo: {
    url: string;
    public_id?: string;
  };

  stats: {
    departmentsCount: number;
    materialsCount: number;
    popularityScore: number;
  };
}
