import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search, Home as HomeIcon, Users, Shield } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import SearchFilters, { FilterOptions } from '../components/common/SearchFilters';

const Home: React.FC = () => {
  const { properties } = useProperty();
  const [filteredProperties, setFilteredProperties] = useState(properties.slice(0, 6));

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

    setFilteredProperties(filtered.slice(0, 6));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div className="hero-content fade-in">
                <h1 className="display-4 fw-bold mb-4">
                  Find Your Perfect Rental Home
                </h1>
                <p className="lead mb-4">
                  Discover amazing properties, connect with trusted owners, and find 
                  your next home with HouseHunt's comprehensive rental platform.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/properties" className="btn btn-light btn-lg">
                    <Search className="me-2" size={20} />
                    Browse Properties
                  </Link>
                  <Link to="/register" className="btn btn-accent btn-lg">
                    Get Started
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Section */}
      <Container className="my-5">
        <SearchFilters onFilter={handleFilter} />
      </Container>

      {/* Featured Properties */}
      <Container className="my-5">
        <Row className="mb-4">
          <Col>
            <h2 className="section-title text-center">Featured Properties</h2>
          </Col>
        </Row>
        <Row>
          {filteredProperties.map(property => (
            <Col key={property.id} lg={4} md={6} className="mb-4">
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <Link to="/properties" className="btn btn-primary btn-lg">
              View All Properties
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="mb-5">
            <Col>
              <h2 className="section-title text-center">Why Choose HouseHunt?</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="p-4">
                <HomeIcon size={48} className="text-primary mb-3" />
                <h4>Quality Properties</h4>
                <p className="text-muted">
                  Carefully curated listings from verified property owners with 
                  detailed information and high-quality photos.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="p-4">
                <Users size={48} className="text-primary mb-3" />
                <h4>Trusted Community</h4>
                <p className="text-muted">
                  Connect directly with property owners and fellow renters in a 
                  secure, verified community environment.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="p-4">
                <Shield size={48} className="text-primary mb-3" />
                <h4>Secure Platform</h4>
                <p className="text-muted">
                  Advanced security measures and admin oversight ensure a safe 
                  and reliable rental experience for everyone.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="mb-4">Ready to Find Your Next Home?</h2>
              <p className="lead mb-4">
                Join thousands of happy renters who found their perfect home through HouseHunt.
              </p>
              <Link to="/register" className="btn btn-light btn-lg me-3">
                Start Your Search
              </Link>
              <Link to="/properties" className="btn btn-outline-light btn-lg">
                Browse Properties
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;