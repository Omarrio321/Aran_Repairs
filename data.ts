import { Brand, DeviceCategory, DeviceModel, RepairOption, RefurbishedDevice, Accessory } from './types';

export const CATEGORIES: DeviceCategory[] = [
  { id: 'phone', name: 'Smartphone', iconName: 'Smartphone' },
  { id: 'tablet', name: 'Tablet', iconName: 'Tablet' },
  { id: 'laptop', name: 'Laptop', iconName: 'Laptop' },
  { id: 'watch', name: 'Smartwatch', iconName: 'Watch' },
  { id: 'console', name: 'Console', iconName: 'Gamepad2' },
];

export const BRANDS: Brand[] = [
  { id: 'apple', name: 'Apple', deviceTypes: ['phone', 'tablet', 'laptop', 'watch'] },
  { id: 'samsung', name: 'Samsung', deviceTypes: ['phone', 'tablet', 'watch'] },
  { id: 'google', name: 'Google', deviceTypes: ['phone', 'tablet'] },
  { id: 'microsoft', name: 'Microsoft', deviceTypes: ['laptop', 'console'] },
  { id: 'sony', name: 'Sony', deviceTypes: ['phone', 'console'] },
  { id: 'nintendo', name: 'Nintendo', deviceTypes: ['console'] },
];

export const MODELS: DeviceModel[] = [
  // Apple Phones
  { id: 'iphone-15-pro-max', brandId: 'apple', name: 'iPhone 15 Pro Max', type: 'phone', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop' },
  { id: 'iphone-15-pro', brandId: 'apple', name: 'iPhone 15 Pro', type: 'phone', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop' },
  { id: 'iphone-14', brandId: 'apple', name: 'iPhone 14', type: 'phone', image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcd9?q=80&w=400&auto=format&fit=crop' },
  { id: 'iphone-13', brandId: 'apple', name: 'iPhone 13', type: 'phone', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400&auto=format&fit=crop' },
  
  // Samsung Phones
  { id: 's24-ultra', brandId: 'samsung', name: 'Galaxy S24 Ultra', type: 'phone', image: 'https://images.unsplash.com/photo-1706606991536-e32260710167?q=80&w=400&auto=format&fit=crop' },
  { id: 's23', brandId: 'samsung', name: 'Galaxy S23', type: 'phone', image: 'https://images.unsplash.com/photo-1675845196385-d698e6ae120a?q=80&w=400&auto=format&fit=crop' },

  // Apple Tablets
  { id: 'ipad-pro-12-9', brandId: 'apple', name: 'iPad Pro 12.9"', type: 'tablet', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop' },
  { id: 'ipad-air', brandId: 'apple', name: 'iPad Air (5th Gen)', type: 'tablet', image: 'https://images.unsplash.com/photo-1655554628678-b118742b85e0?q=80&w=400&auto=format&fit=crop' },

  // Consoles
  { id: 'switch-oled', brandId: 'nintendo', name: 'Switch OLED', type: 'console', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=400&auto=format&fit=crop' },
  { id: 'ps5', brandId: 'sony', name: 'PlayStation 5', type: 'console', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&auto=format&fit=crop' },
];

export const REPAIRS: Record<string, RepairOption[]> = {
  'phone': [
    { id: 'screen-org', name: 'Screen Replacement (Original)', price: 249, durationMinutes: 30, popular: true, description: 'Genuine manufacturer display panel.' },
    { id: 'screen-hq', name: 'Screen Replacement (High Quality)', price: 149, durationMinutes: 30, description: 'High quality third-party OLED panel.' },
    { id: 'battery', name: 'Battery Replacement', price: 89, durationMinutes: 45, popular: true, description: 'New battery to restore 100% health.' },
    { id: 'charging-port', name: 'Charging Port Repair', price: 79, durationMinutes: 60, description: 'Fix charging issues or loose cables.' },
    { id: 'camera-back', name: 'Rear Camera Module', price: 129, durationMinutes: 45, description: 'Fix focus issues or cracked lens.' },
    { id: 'water-damage', name: 'Water Damage Cleaning', price: 49, durationMinutes: 120, description: 'Ultrasonic cleaning and diagnostic.' },
  ],
  'tablet': [
    { id: 'screen', name: 'Screen Replacement', price: 299, durationMinutes: 60, popular: true },
    { id: 'battery', name: 'Battery Replacement', price: 119, durationMinutes: 90 },
    { id: 'housing', name: 'Housing Repair', price: 159, durationMinutes: 120 },
  ],
  'console': [
    { id: 'hdmi', name: 'HDMI Port Repair', price: 99, durationMinutes: 120, popular: true },
    { id: 'cleaning', name: 'Overheating / Cleaning', price: 59, durationMinutes: 60 },
    { id: 'drive', name: 'Disc Drive Repair', price: 129, durationMinutes: 60 },
  ],
  'laptop': [
    { id: 'screen', name: 'LCD Screen Replacement', price: 199, durationMinutes: 60 },
    { id: 'keyboard', name: 'Keyboard Replacement', price: 149, durationMinutes: 90 },
  ],
  'watch': [
    { id: 'screen', name: 'Glass Replacement', price: 129, durationMinutes: 60 },
    { id: 'battery', name: 'Battery Replacement', price: 69, durationMinutes: 45 },
  ]
};

export const REFURBISHED_DEVICES: RefurbishedDevice[] = [
  { id: 'ref-ip13-128', name: 'iPhone 13', brandId: 'apple', storage: '128GB', condition: 'Like New', price: 499, originalPrice: 799, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop', colors: ['#2c3e50', '#ecf0f1'] },
  { id: 'ref-ip12p-256', name: 'iPhone 12 Pro', brandId: 'apple', storage: '256GB', condition: 'Excellent', price: 449, originalPrice: 999, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop', colors: ['#34495e', '#f1c40f'] },
  { id: 'ref-s22-128', name: 'Samsung S22', brandId: 'samsung', storage: '128GB', condition: 'Good', price: 349, originalPrice: 849, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop', colors: ['#000000', '#ffffff'] },
  { id: 'ref-ip11-64', name: 'iPhone 11', brandId: 'apple', storage: '64GB', condition: 'Good', price: 299, originalPrice: 599, image: 'https://images.unsplash.com/photo-1574315042633-89a16f6b2512?q=80&w=400&auto=format&fit=crop', colors: ['#e74c3c', '#000000'] },
  { id: 'ref-s23-256', name: 'Samsung S23 Ultra', brandId: 'samsung', storage: '256GB', condition: 'Like New', price: 899, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1675845196385-d698e6ae120a?q=80&w=400&auto=format&fit=crop', colors: ['#2c3e50'] },
  { id: 'ref-ip14-128', name: 'iPhone 14', brandId: 'apple', storage: '128GB', condition: 'Excellent', price: 649, originalPrice: 899, image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcd9?q=80&w=400&auto=format&fit=crop', colors: ['#3498db', '#ecf0f1'] },
];

export const ACCESSORIES: Accessory[] = [
  { id: 'acc-case-clr', name: 'Crystal Clear Case', type: 'case', price: 19.99, image: 'https://images.unsplash.com/photo-1603539281986-a4c4a45ce379?q=80&w=400&auto=format&fit=crop', description: 'Military grade drop protection.', badge: 'Best Seller' },
  { id: 'acc-screen-prot', name: 'Tempered Glass (2-Pack)', type: 'protection', price: 14.99, image: 'https://images.unsplash.com/photo-1628116904663-71887e50529d?q=80&w=400&auto=format&fit=crop', description: '9H Hardness, Oleophobic coating.' },
  { id: 'acc-chg-20w', name: '20W Fast Charger', type: 'power', price: 24.99, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=400&auto=format&fit=crop', description: 'USB-C Power Delivery.' },
  { id: 'acc-cable-light', name: 'Lightning Cable (2m)', type: 'power', price: 12.99, image: 'https://images.unsplash.com/photo-1565518210382-7e0504d49a43?q=80&w=400&auto=format&fit=crop', description: 'MFi Certified braided cable.' },
  { id: 'acc-magsafe', name: 'MagSafe Wireless Charger', type: 'power', price: 39.99, image: 'https://images.unsplash.com/photo-1617478385494-b295d97f256a?q=80&w=400&auto=format&fit=crop', description: 'Fast wireless charging for iPhone.', badge: 'New' },
  { id: 'acc-pods', name: 'Wireless Earbuds Pro', type: 'audio', price: 129.99, image: 'https://images.unsplash.com/photo-1629367494173-c78a56567877?q=80&w=400&auto=format&fit=crop', description: 'Active Noise Cancellation.' },
];

export const getRepairsForType = (type: string): RepairOption[] => {
  return REPAIRS[type as keyof typeof REPAIRS] || REPAIRS['phone'];
};