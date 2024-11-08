export interface ProviderCardProps {
  name: string;
  description: string;
  image: string; // URL de la imagen
  type: string;
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

export interface Supplier {
  description: string,
  email: string,
  name: string,
  type: string,
  url_image: string
}

export interface SupplierStore {
  suppliers: Supplier[];
  setSuppliers: (supplier: Supplier) => void;
  clearSuppliers: () => void;
  isSupplierInList: (supplier: Supplier) => boolean;
}

