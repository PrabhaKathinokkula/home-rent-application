
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: [] as string[],
    images: [] as string[]
  });

  const amenitiesList = ['WiFi', 'Parking', 'Kitchen', 'Gym', 'Pool', 'Laundry', 'Balcony', 'Garden'];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setPropertyData({
        ...propertyData,
        amenities: [...propertyData.amenities, amenity]
      });
    } else {
      setPropertyData({
        ...propertyData,
        amenities: propertyData.amenities.filter(a => a !== amenity)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'owner') {
      toast.error('Only property owners can add properties');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Property added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to add property. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Only property owners can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Property</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={propertyData.title}
                    onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
                    placeholder="Beautiful 2BR Apartment"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Monthly Rent ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={propertyData.price}
                    onChange={(e) => setPropertyData({...propertyData, price: e.target.value})}
                    placeholder="1500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={propertyData.location}
                  onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
                  placeholder="New York, NY"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={propertyData.description}
                  onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
                  placeholder="Describe your property..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={propertyData.propertyType} onValueChange={(value) => setPropertyData({...propertyData, propertyType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="room">Room</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={propertyData.bedrooms}
                    onChange={(e) => setPropertyData({...propertyData, bedrooms: e.target.value})}
                    placeholder="2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={propertyData.bathrooms}
                    onChange={(e) => setPropertyData({...propertyData, bathrooms: e.target.value})}
                    placeholder="1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="area">Area (sqft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={propertyData.area}
                    onChange={(e) => setPropertyData({...propertyData, area: e.target.value})}
                    placeholder="800"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={propertyData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Adding Property...' : 'Add Property'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProperty;
