
import { Property, Booking, Message } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views. Features include hardwood floors, stainless steel appliances, and in-unit laundry.',
    price: 2500,
    location: 'Downtown, New York',
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ['WiFi', 'Air Conditioning', 'Gym', 'Security', 'Laundry'],
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    ownerId: 'owner1',
    ownerName: 'John Smith',
    ownerEmail: 'john@example.com',
    ownerPhone: '+1234567890',
    isAvailable: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Cozy Studio Near University',
    description: 'Perfect studio apartment for students or young professionals. Walking distance to university and public transportation.',
    price: 1200,
    location: 'University District, Boston',
    propertyType: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    amenities: ['WiFi', 'Parking', 'Pet Friendly'],
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    ownerId: 'owner2',
    ownerName: 'Sarah Johnson',
    ownerEmail: 'sarah@example.com',
    ownerPhone: '+1234567891',
    isAvailable: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Family House with Garden',
    description: 'Spacious 4-bedroom house perfect for families. Features a large backyard, garage, and quiet neighborhood.',
    price: 3500,
    location: 'Suburbia, California',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    amenities: ['Parking', 'Garden', 'Pet Friendly', 'Security', 'Air Conditioning'],
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    ownerId: 'owner3',
    ownerName: 'Mike Wilson',
    ownerEmail: 'mike@example.com',
    ownerPhone: '+1234567892',
    isAvailable: true,
    createdAt: '2024-02-01'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    propertyId: '1',
    renterId: 'renter1',
    renterName: 'Alice Brown',
    renterEmail: 'alice@example.com',
    renterPhone: '+1234567893',
    message: 'I am interested in renting this apartment. I am a working professional and can provide references.',
    status: 'pending',
    createdAt: '2024-02-15'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'renter1',
    receiverId: 'owner1',
    senderName: 'Alice Brown',
    content: 'Hi, I am interested in your downtown apartment. Is it still available?',
    propertyId: '1',
    createdAt: '2024-02-16'
  }
];
