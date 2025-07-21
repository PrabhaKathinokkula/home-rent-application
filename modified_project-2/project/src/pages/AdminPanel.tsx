import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Nav } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { Users, Home, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { properties, inquiries, updateInquiryStatus } = useProperty();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for pending owners (in real app, this would come from backend)
  const [pendingOwners, setPendingOwners] = useState([
    {
      id: '4',
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2024-01-30T10:00:00Z',
      status: 'pending'
    },
    {
      id: '5',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joinDate: '2024-01-29T15:30:00Z',
      status: 'pending'
    }
  ]);

  if (!user || user.role !== 'admin') {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>Only administrators can access this panel.</p>
        </div>
      </Container>
    );
  }

  const approveOwner = (ownerId: string) => {
    setPendingOwners(prev => prev.filter(owner => owner.id !== ownerId));
    // In real app, this would make an API call to approve the owner
  };

  const rejectOwner = (ownerId: string) => {
    setPendingOwners(prev => prev.filter(owner => owner.id !== ownerId));
    // In real app, this would make an API call to reject the owner
  };

  const renderOverview = () => (
    <>
      <Row className="mb-4">
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{properties.length}</div>
            <div>Total Properties</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{inquiries.length}</div>
            <div>Total Inquiries</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{pendingOwners.length}</div>
            <div>Pending Approvals</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">
              {properties.filter(p => p.status === 'available').length}
            </div>
            <div>Available Properties</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Properties</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Owner</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.slice(0, 5).map(property => (
                    <tr key={property.id}>
                      <td>{property.title}</td>
                      <td>{property.ownerName}</td>
                      <td>${property.price}/mo</td>
                      <td>
                        <Badge 
                          bg={property.status === 'available' ? 'success' : 
                              property.status === 'rented' ? 'danger' : 'warning'}
                        >
                          {property.status}
                        </Badge>
                      </td>
                      <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Inquiries</h5>
            </Card.Header>
            <Card.Body>
              {inquiries.slice(0, 5).map(inquiry => {
                const property = properties.find(p => p.id === inquiry.propertyId);
                return (
                  <div key={inquiry.id} className="border-bottom pb-2 mb-2">
                    <strong>{inquiry.renterName}</strong>
                    <div className="small text-muted">{property?.title}</div>
                    <Badge 
                      bg={inquiry.status === 'pending' ? 'warning' : 
                          inquiry.status === 'approved' ? 'success' : 'danger'}
                      className="mt-1"
                    >
                      {inquiry.status}
                    </Badge>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderOwnerApprovals = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5 className="mb-0">
          <Users size={18} className="me-2" />
          Pending Owner Approvals
        </h5>
      </Card.Header>
      <Card.Body>
        {pendingOwners.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No pending owner approvals</p>
          </div>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingOwners.map(owner => (
                <tr key={owner.id}>
                  <td>{owner.name}</td>
                  <td>{owner.email}</td>
                  <td>{new Date(owner.joinDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => approveOwner(owner.id)}
                    >
                      <CheckCircle size={14} className="me-1" />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => rejectOwner(owner.id)}
                    >
                      <XCircle size={14} className="me-1" />
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );

  const renderAllProperties = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5 className="mb-0">
          <Home size={18} className="me-2" />
          All Properties
        </h5>
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Property</th>
              <th>Owner</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Inquiries</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.ownerName}</td>
                <td>{property.location}</td>
                <td>${property.price}/mo</td>
                <td>
                  <Badge 
                    bg={property.status === 'available' ? 'success' : 
                        property.status === 'rented' ? 'danger' : 'warning'}
                  >
                    {property.status}
                  </Badge>
                </td>
                <td>
                  {inquiries.filter(i => i.propertyId === property.id).length}
                </td>
                <td>{new Date(property.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  const renderAllInquiries = () => (
    <Card className="dashboard-card">
      <Card.Header>
        <h5 className="mb-0">
          <MessageSquare size={18} className="me-2" />
          All Inquiries
        </h5>
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Renter</th>
              <th>Property</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inquiry => {
              const property = properties.find(p => p.id === inquiry.propertyId);
              return (
                <tr key={inquiry.id}>
                  <td>{inquiry.renterName}</td>
                  <td>{property?.title || 'Property not found'}</td>
                  <td>{inquiry.message.substring(0, 50)}...</td>
                  <td>
                    <Badge 
                      bg={inquiry.status === 'pending' ? 'warning' : 
                          inquiry.status === 'approved' ? 'success' : 'danger'}
                    >
                      {inquiry.status}
                    </Badge>
                  </td>
                  <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  <td>
                    {inquiry.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          className="me-1"
                          onClick={() => updateInquiryStatus(inquiry.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => updateInquiryStatus(inquiry.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="section-title">Admin Panel</h1>
          <p className="text-muted">Manage users, properties, and platform operations</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Nav variant="tabs" defaultActiveKey="overview">
            <Nav.Item>
              <Nav.Link 
                eventKey="overview" 
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="approvals"
                active={activeTab === 'approvals'}
                onClick={() => setActiveTab('approvals')}
              >
                Owner Approvals ({pendingOwners.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="properties"
                active={activeTab === 'properties'}
                onClick={() => setActiveTab('properties')}
              >
                All Properties
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="inquiries"
                active={activeTab === 'inquiries'}
                onClick={() => setActiveTab('inquiries')}
              >
                All Inquiries
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'approvals' && renderOwnerApprovals()}
      {activeTab === 'properties' && renderAllProperties()}
      {activeTab === 'inquiries' && renderAllInquiries()}
    </Container>
  );
};

export default AdminPanel;