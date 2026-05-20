export interface Property {
  id: string;
  title: string;
  price: string;
  image: string;
  status?: "occupied" | "vacant" | "maintenance";
  location: string;
  type: "land" | "pond" | "flat";
  latitude: number;
  longitude: number;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  gallery?: string[];
  agent?: string;
  phone?: string;
  dolil?: string;
  taxDocument?: string;
}
