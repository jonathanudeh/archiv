export type Material = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  fileType: string;
  fileSize?: number;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  isSaved: boolean;

  school: {
    _id: string;
    name: string;
  };

  department: {
    _id: string;
    name: string;
  };

  level: {
    _id: string;
    name: string;
  };

  semester: {
    _id: string;
    name: string;
  };

  uploadedBy: {
    _id: string;
    name: string;
    photo?: {
      url: string;
    };
  };
};
