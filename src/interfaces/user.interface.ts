export interface IUser {
  id: string;
  name: string;
  email: string;
  image_url: string;
  role: string;
  enabled?: boolean;
  message?: string;
}