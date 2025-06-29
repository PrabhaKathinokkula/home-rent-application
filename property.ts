
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: 'apartment' | 'house' | 'room' | 'studio';
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  content: string;
  propertyId?: string;
  createdAt: string;
}
