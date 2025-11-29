
export type DeviceType = 'phone' | 'tablet' | 'laptop' | 'watch' | 'console';

export interface DeviceCategory {
  id: DeviceType;
  name: string;
  iconName: string; // We'll map string names to Lucide icons
}

export interface Brand {
  id: string;
  name: string;
  deviceTypes: DeviceType[];
  logo?: string;
}

export interface DeviceModel {
  id: string;
  brandId: string;
  name: string;
  type: DeviceType;
  image: string;
}

export interface RepairOption {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
  popular?: boolean;
}

export interface CartItem {
  id: string; // Unique instance ID in cart
  productId: string;
  type: 'refurbished' | 'accessory';
  name: string;
  description?: string;
  price: number;
  image: string;
  quantity: number;
  details?: any; // For storing specific options like selected color
}

export interface BookingDetails {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface RefurbishedDevice {
  id: string;
  name: string;
  brandId: string;
  storage: string;
  condition: 'Like New' | 'Excellent' | 'Good';
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
}

export interface Accessory {
  id: string;
  name: string;
  type: 'case' | 'protection' | 'power' | 'audio';
  price: number;
  image: string;
  description: string;
  badge?: string;
}
