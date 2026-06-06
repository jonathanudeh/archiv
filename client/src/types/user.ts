export interface User {
  _id: string;
  name: string;
  email: string;

  role: "user" | "contributor" | "admin";

  isVerified: boolean;

  photo?: {
    url: string;
    public_id?: string;
  };
  createdAt: string;
  updatedAt: string;
}
