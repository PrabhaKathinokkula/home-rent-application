import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  status: 'available' | 'rented' | 'pending';
  type: 'apartment' | 'house' | 'studio' | 'room';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface PropertyContextType {
  properties: Property[];
  inquiries: Inquiry[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: 'approved' | 'rejected') => void;
  getPropertiesByOwner: (ownerId: string) => Property[];
  getInquiriesByProperty: (propertyId: string) => Inquiry[];
  getInquiriesByRenter: (renterId: string) => Inquiry[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.',
      price: 2500,
      location: 'Downtown District',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      images: [
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Gym', 'Pool', 'Parking', 'Balcony', 'Air Conditioning'],
      ownerId: '2',
      ownerName: 'Property Owner',
      ownerEmail: 'owner@example.com',
      status: 'available',
      type: 'apartment',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Cozy Suburban House',
      description: 'Spacious 3-bedroom house with a large garden, perfect for families.',
      price: 3200,
      location: 'Suburban Heights',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['Garden', 'Garage', 'Fireplace', 'Laundry Room'],
      ownerId: '2',
      ownerName: 'Property Owner',
      ownerEmail: 'owner@example.com',
      status: 'available',
      type: 'house',
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      id: '3',
      title: 'Studio Loft in Arts District',
      description: 'Modern studio loft with high ceilings and exposed brick walls.',
      price: 1800,
      location: 'Arts District',
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      images: [
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      amenities: ['High Ceilings', 'Exposed Brick', 'Modern Kitchen'],
      ownerId: '2',
      ownerName: 'Property Owner',
      ownerEmail: 'owner@example.com',
      status: 'available',
      type: 'studio',
      createdAt: '2024-01-25T09:15:00Z'
    }
  ]);

  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: '1',
      propertyId: '1',
      renterId: '3',
      renterName: 'John Renter',
      renterEmail: 'renter@example.com',
      message: 'I am interested in viewing this apartment. When would be a good time?',
      status: 'pending',
      createdAt: '2024-01-28T16:20:00Z'
    }
  ]);

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(property => 
      property.id === id ? { ...property, ...updates } : property
    ));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setInquiries(prev => [...prev, newInquiry]);
  };

  const updateInquiryStatus = (id: string, status: 'approved' | 'rejected') => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status } : inquiry
    ));
  };

  const getPropertiesByOwner = (ownerId: string) => {
    return properties.filter(property => property.ownerId === ownerId);
  };

  const getInquiriesByProperty = (propertyId: string) => {
    return inquiries.filter(inquiry => inquiry.propertyId === propertyId);
  };

  const getInquiriesByRenter = (renterId: string) => {
    return inquiries.filter(inquiry => inquiry.renterId === renterId);
  };

  const value = {
    properties,
    inquiries,
    addProperty,
    updateProperty,
    deleteProperty,
    addInquiry,
    updateInquiryStatus,
    getPropertiesByOwner,
    getInquiriesByProperty,
    getInquiriesByRenter,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};