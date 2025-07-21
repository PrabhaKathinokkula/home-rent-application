import React, { useState } from 'react';
import { Container, Row, Col, Card, Carousel, Badge, Button, Form, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Bed, Bath, Square, Mail, Phone, ArrowLeft } from 'lucide-react';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, addInquiry } = useProperty();
  const { user } = useAuth();
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Property not found</h2>
          <Link to="/properties" className="btn btn-primary">
            Back to Properties
          </Link>
        </div>
      </Container>
    );
  }

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to send an inquiry');
      return;
    }

    if (user.role !== 'renter') {
      alert('Only renters can send inquiries');
      return;
    }

    addInquiry({
      propertyId: property.id,
      renterId: user.id,
      renterName: user.name,
      renterEmail: user.email,
      message: inquiryMessage,
      status: 'pending'
    });

    setInquiryMessage('');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge bg="success" className="badge-status">Available</Badge>;
      case 'rented':
        return <Badge bg="danger" className="badge-status">Rented</Badge>;
      case 'pending':
        return <Badge bg="warning" className="badge-status">Pending</Badge>;
      default:
        return <Badge bg="secondary" className="badge-status">{status}</Badge>;
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Link to="/properties" className="btn btn-outline-primary mb-3">
            <ArrowLeft size={16} className="me-2" />
            Back to Properties
          </Link>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Image Carousel */}
          <Card className="mb-4">
            <Carousel>
              {property.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Card>

          {/* Property Details */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="h2 mb-2">{property.title}</h1>
                  <div className="d-flex align-items-center text-muted mb-2">
                    <MapPin size={18} className="me-2" />
                    {property.location}
                  </div>
                </div>
                <div className="text-end">
                  <div className="property-price h3 mb-2">${property.price}/month</div>
                  {getStatusBadge(property.status)}
                </div>
              </div>

              <div className="property-features mb-4">
                <span className="feature-item">
                  <Bed size={18} className="me-2" />
                  {property.bedrooms} Bedrooms
                </span>
                <span className="feature-item">
                  <Bath size={18} className="me-2" />
                  {property.bathrooms} Bathrooms
                </span>
                <span className="feature-item">
                  <Square size={18} className="me-2" />
                  {property.area} sq ft
                </span>
              </div>

              <h4>Description</h4>
              <p className="text-muted mb-4">{property.description}</p>

              <h4>Amenities</h4>
              <div className="property-features">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="feature-item">
                    {amenity}
                  </span>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Owner Contact */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Property Owner</h5>
              <div className="mb-3">
                <strong>{property.ownerName}</strong>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Mail size={16} className="me-2 text-muted" />
                <span className="small">{property.ownerEmail}</span>
              </div>
            </Card.Body>
          </Card>

          {/* Inquiry Form */}
          {user && user.role === 'renter' && property.status === 'available' && (
            <Card className="inquiry-form">
              <Card.Body>
                <h5>Send Inquiry</h5>
                {showAlert && (
                  <Alert variant="success" className="mb-3">
                    Your inquiry has been sent successfully!
                  </Alert>
                )}
                <Form onSubmit={handleInquiry}>
                  <Form.Group className="mb-3">
                    <Form.Label>Message to Owner</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="I am interested in this property..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="btn-primary w-100">
                    Send Inquiry
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {!user && (
            <Card className="inquiry-form">
              <Card.Body className="text-center">
                <h5>Interested in this property?</h5>
                <p className="text-muted mb-3">Login to contact the owner</p>
                <Link to="/login" className="btn btn-primary">
                  Login to Inquire
                </Link>
              </Card.Body>
            </Card>
          )}

          {user && user.role !== 'renter' && (
            <Card className="inquiry-form">
              <Card.Body className="text-center">
                <p className="text-muted">Only renters can send inquiries for properties.</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;