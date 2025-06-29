
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Home, MessageSquare, Settings } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [pendingOwners] = useState([
    { id: '1', name: 'John Smith', email: 'john@example.com', createdAt: '2024-01-15' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', createdAt: '2024-01-16' }
  ]);

  const [allUsers] = useState([
    { id: '1', name: 'Alice Cooper', email: 'alice@example.com', role: 'renter', status: 'active' },
    { id: '2', name: 'Bob Wilson', email: 'bob@example.com', role: 'owner', status: 'active' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'renter', status: 'active' }
  ]);

  const handleApproveOwner = (ownerId: string) => {
    toast.success('Owner approved successfully!');
  };

  const handleRejectOwner = (ownerId: string) => {
    toast.success('Owner rejected.');
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, properties, and platform settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">{allUsers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Home className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Properties</h3>
              <p className="text-2xl font-bold text-green-600">25</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Messages</h3>
              <p className="text-2xl font-bold text-purple-600">45</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Settings className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold">Pending Approvals</h3>
              <p className="text-2xl font-bold text-orange-600">{pendingOwners.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="users">All Users</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Owner Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingOwners.length > 0 ? (
                  <div className="space-y-4">
                    {pendingOwners.map((owner) => (
                      <div key={owner.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{owner.name}</h3>
                          <p className="text-gray-600">{owner.email}</p>
                          <p className="text-sm text-gray-500">Applied: {owner.createdAt}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveOwner(owner.id)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectOwner(owner.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">No pending approvals</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'owner' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Property management features coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">Settings panel coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
