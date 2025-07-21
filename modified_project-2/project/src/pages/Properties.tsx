import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import SearchFilters, { FilterOptions } from '../components/common/SearchFilters';

const Properties: React.FC = () => {
  const { properties } = useProperty();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleFilter = (filters: FilterOptions) => {
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice > 0) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice < 10000) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.bedrooms !== '') {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    setFilteredProperties(filtered);
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="section-title">Available Properties</h1>
          <p className="text-muted">Discover your perfect rental home from our curated collection</p>
        </Col>
      </Row>

      <SearchFilters onFilter={handleFilter} />

      <Row className="mb-4">
        <Col>
          <p className="text-muted">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </Col>
      </Row>

      <Row>
        {filteredProperties.map(property => (
          <Col key={property.id} lg={4} md={6} className="mb-4">
            <PropertyCard property={property} />
          </Col>
        ))}
      </Row>

      {filteredProperties.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <h4>No properties found</h4>
            <p className="text-muted">Try adjusting your search filters to see more results.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Properties;