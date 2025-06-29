
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockData';

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    amenities: [] as string[]
  });

  useEffect(() => {
    // Load mock properties
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(p => 
        filters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Properties</h1>
          <p className="text-gray-600">
            Found {filteredProperties.length} properties matching your criteria
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <PropertyFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          
          <div className="lg:w-3/4">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
