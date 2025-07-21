import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | '';
  type: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: '',
    type: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'bedrooms' ? (value === '' ? '' : parseInt(value)) : 
               name === 'minPrice' || name === 'maxPrice' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filter-section">
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={filters.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                name="minPrice"
                placeholder="$0"
                value={filters.minPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                placeholder="$10000"
                value={filters.maxPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Bedrooms</Form.Label>
              <Form.Select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleInputChange}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Property Type</Form.Label>
              <Form.Select
                name="type"
                value={filters.type}
                onChange={handleInputChange}
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="room">Room</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col lg={1} className="d-flex align-items-end">
            <Button type="submit" className="btn-primary w-100">
              <Search size={18} />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchFilters;