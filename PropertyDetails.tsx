
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockData';
import { MapPin, Bed, Bath, Square, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import { toast } from 'sonner';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const foundProperty = mockProperties.find(p => p.id === id);
    setProperty(foundProperty || null);
  }, [id]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request sent successfully!');
    setShowBookingForm(false);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Property not found.</p>
        </div>
      </div>
    );
  }

  const amenityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Kitchen': Coffee,
    'Gym': Dumbbell
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={property.images[0] || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={image || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ${property.price}/month
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2 text-gray-600" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-gray-600" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2 text-gray-600" />
                <span>{property.area} sqft</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee;
                  return (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <IconComponent className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Property Owner</h3>
                  <p className="text-gray-600">{property.ownerName}</p>
                  <p className="text-gray-600">{property.ownerEmail}</p>
                  <p className="text-gray-600">{property.ownerPhone}</p>
                </div>

                {user && user.role === 'renter' ? (
                  !showBookingForm ? (
                    <Button 
                      onClick={() => setShowBookingForm(true)}
                      className="w-full"
                    >
                      Send Inquiry
                    </Button>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={bookingData.name}
                          onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={bookingData.message}
                          onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                          placeholder="Tell the owner about yourself and your rental needs..."
                          required
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit" className="flex-1">Send Inquiry</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowBookingForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      {!user ? 'Please log in to send an inquiry.' : 'Only renters can send inquiries.'}
                    </p>
                    {!user && (
                      <Link to="/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
