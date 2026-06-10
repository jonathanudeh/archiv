export interface ActivityStats {
  uploadedCount: number;
  savedCount: number;
}

export interface ActivityMaterial {
  _id: string;
  title: string;
  fileType: string;
  createdAt: string;
}

export interface SavedActivityMaterial {
  _id: string;
  material: ActivityMaterial;
  createdAt: string;
}

export interface ActivityResponse {
  stats: ActivityStats;
  recentUploads: ActivityMaterial[];
  recentSaved: SavedActivityMaterial[];
}

export type ActivityCardProps = {
  label: string;
  value: number;
};
