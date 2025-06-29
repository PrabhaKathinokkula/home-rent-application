
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Plus, Home, MessageSquare, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  // Filter properties based on user role
  const userProperties = user.role === 'owner' 
    ? mockProperties.filter(p => p.ownerId === user.id)
    : mockProperties.slice(0, 6); // Show featured properties for renters

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            {user.role === 'owner' ? 'Manage your properties' : 'Find your perfect rental'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Home className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Properties</h3>
              <p className="text-2xl font-bold text-blue-600">{userProperties.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Messages</h3>
              <p className="text-2xl font-bold text-green-600">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Bookings</h3>
              <p className="text-2xl font-bold text-purple-600">3</p>
            </CardContent>
          </Card>
          {user.role === 'owner' && (
            <Card>
              <CardContent className="p-6 text-center">
                <Link to="/add-property">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Properties Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              {user.role === 'owner' ? 'Your Properties' : 'Featured Properties'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No properties found.</p>
                {user.role === 'owner' && (
                  <Link to="/add-property">
                    <Button>Add Your First Property</Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
