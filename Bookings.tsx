
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings] = useState([
    {
      id: '1',
      propertyTitle: 'Modern Downtown Apartment',
      propertyLocation: 'New York, NY',
      renterName: 'Alice Cooper',
      renterEmail: 'alice@example.com',
      renterPhone: '(555) 123-4567',
      message: 'I am interested in renting this property for a year lease.',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      propertyTitle: 'Cozy Studio Apartment',
      propertyLocation: 'Brooklyn, NY',
      renterName: 'Bob Wilson',
      renterEmail: 'bob@example.com',
      renterPhone: '(555) 987-6543',
      message: 'Looking for a 6-month rental. Available to move in next month.',
      status: 'approved',
      createdAt: '2024-01-10'
    }
  ]);

  const handleApprove = (bookingId: string) => {
    toast.success('Booking approved successfully!');
  };

  const handleReject = (bookingId: string) => {
    toast.success('Booking rejected.');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Please log in to view your bookings.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.role === 'owner' ? 'Property Inquiries' : 'My Bookings'}
          </h1>
          <p className="text-gray-600">
            {user.role === 'owner' 
              ? 'Manage inquiries for your properties' 
              : 'Track your rental applications and bookings'
            }
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{booking.propertyTitle}</CardTitle>
                      <Badge variant={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{booking.propertyLocation}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Applied on {booking.createdAt}</span>
                        </div>
                        {user.role === 'owner' && (
                          <div className="flex items-center text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            <span>{booking.renterName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {user.role === 'owner' && (
                          <>
                            <p className="text-sm text-gray-600">Contact: {booking.renterEmail}</p>
                            <p className="text-sm text-gray-600">Phone: {booking.renterPhone}</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Message:</p>
                      <p className="text-sm bg-gray-50 p-3 rounded">{booking.message}</p>
                    </div>

                    {user.role === 'owner' && booking.status === 'pending' && (
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(booking.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReject(booking.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-4">
              {bookings.filter(b => b.status === 'pending').map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">
                      {bookings.filter(b => b.status === 'pending').length === 0 
                        ? 'No pending bookings' 
                        : 'Pending booking details would be shown here'
                      }
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <div className="space-y-4">
              {bookings.filter(b => b.status === 'approved').map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Approved booking details</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">No rejected bookings</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookings;
