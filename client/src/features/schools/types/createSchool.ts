export interface CreateSchoolInput {
  name: string;
  acronym?: string;
  aliases?: string;
  description?: string;
  location?: string;
  country?: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  logo?: File;
}
