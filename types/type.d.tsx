export interface ProviderCardProps {
  name: string;
  description: string;
  image: string; // URL de la imagen
}

export interface User {
  email: string;
  name: string;
  password: string;
  setUser: (user: { email: string; name: string; password: string }) => void;
}

export interface UserData {
  email: string;
  name: string;
  password: string;
}