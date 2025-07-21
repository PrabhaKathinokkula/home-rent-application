import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../../context/PropertyContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge bg="success">Available</Badge>;
      case 'rented':
        return <Badge bg="danger">Rented</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="property-card h-100">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={property.images[0]} 
          className="property-image"
          alt={property.title}
        />
        <div className="position-absolute top-0 end-0 m-3">
          {getStatusBadge(property.status)}
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="h5 mb-0">{property.title}</Card.Title>
          <span className="property-price">${property.price}/mo</span>
        </div>
        
        <div className="d-flex align-items-center mb-2 property-location">
          <MapPin size={16} className="me-1" />
          {property.location}
        </div>
        
        <Card.Text className="text-muted mb-3">
          {property.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="property-features mb-3">
          <span className="feature-item">
            <Bed size={16} className="me-1" />
            {property.bedrooms} bed
          </span>
          <span className="feature-item">
            <Bath size={16} className="me-1" />
            {property.bathrooms} bath
          </span>
          <span className="feature-item">
            <Square size={16} className="me-1" />
            {property.area} sq ft
          </span>
        </div>
        
        <div className="mt-auto">
          <Link 
            to={`/property/${property.id}`} 
            className="btn btn-primary w-100"
          >
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;