
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Search, Home, Shield, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect <span className="text-yellow-300">Rental Home</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover thousands of rental properties, connect with verified owners, and find your dream home with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Properties
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentEase?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                <p className="text-gray-600">Advanced filters to find properties that match your exact needs and budget.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Verified Owners</h3>
                <p className="text-gray-600">All property owners are verified to ensure safe and secure transactions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
                <p className="text-gray-600">Built-in messaging system to connect directly with property owners.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Home?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of happy renters who found their perfect home through RentEase.</p>
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Your Search Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-6 w-6" />
            <span className="text-lg font-semibold">RentEase</span>
          </div>
          <p className="text-gray-400">© 2024 RentEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
