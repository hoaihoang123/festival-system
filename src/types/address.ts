
export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
