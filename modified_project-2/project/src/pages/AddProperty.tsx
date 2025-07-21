import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { Plus, ArrowLeft } from 'lucide-react';

const AddProperty: React.FC = () => {
  const { user } = useAuth();
  const { addProperty } = useProperty();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'apartment' as 'apartment' | 'house' | 'studio' | 'room',
    amenities: [] as string[],
    images: [''] // Start with one image URL field
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availableAmenities = [
    'Air Conditioning', 'Heating', 'Parking', 'Gym', 'Pool', 'Balcony',
    'Garden', 'Fireplace', 'Laundry Room', 'Dishwasher', 'Garage',
    'High Ceilings', 'Exposed Brick', 'Modern Kitchen', 'Walk-in Closet'
  ];

  if (!user || user.role !== 'owner' || !user.isApproved) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>Only approved property owners can add properties.</p>
          <Button onClick={() => navigate('/dashboard')} variant="primary">
            Back to Dashboard
          </Button>
        </div>
      </Container>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        amenities: prev.amenities.filter(a => a !== amenity) 
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    if (parseInt(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (parseInt(formData.bedrooms) <= 0 || parseInt(formData.bathrooms) <= 0) {
      setError('Bedrooms and bathrooms must be greater than 0');
      return;
    }

    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      setError('Please provide at least one image URL');
      return;
    }

    try {
      addProperty({
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        type: formData.type,
        amenities: formData.amenities,
        images: validImages,
        ownerId: user.id,
        ownerName: user.name,
        ownerEmail: user.email,
        status: 'available'
      });

      setSuccess('Property added successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('Failed to add property. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/dashboard')}
            className="mb-3"
          >
            <ArrowLeft size={16} className="me-2" />
            Back to Dashboard
          </Button>
          <h1 className="section-title">Add New Property</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <Plus size={20} className="me-2" />
                Property Details
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Property Title *</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="e.g., Modern Downtown Apartment"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Property Type *</Form.Label>
                      <Form.Select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="studio">Studio</option>
                        <option value="room">Room</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe your property in detail..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Monthly Rent ($) *</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="2500"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location *</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="e.g., Downtown District"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bedrooms *</Form.Label>
                      <Form.Control
                        type="number"
                        name="bedrooms"
                        min="1"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bathrooms *</Form.Label>
                      <Form.Control
                        type="number"
                        name="bathrooms"
                        min="1"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Area (sq ft) *</Form.Label>
                      <Form.Control
                        type="number"
                        name="area"
                        min="1"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Property Images *</Form.Label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                      />
                      {formData.images.length > 1 && (
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => removeImageField(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline-primary" onClick={addImageField}>
                    Add Another Image
                  </Button>
                  <Form.Text className="text-muted d-block mt-2">
                    Provide URLs to property images. Use high-quality images from Pexels or similar sources.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Amenities</Form.Label>
                  <Row>
                    {availableAmenities.map(amenity => (
                      <Col md={4} key={amenity} className="mb-2">
                        <Form.Check
                          type="checkbox"
                          label={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                <div className="d-flex gap-3">
                  <Button type="submit" className="btn-primary">
                    Add Property
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProperty;