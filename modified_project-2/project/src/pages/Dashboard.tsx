import React from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { Home, Users, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    properties, 
    inquiries, 
    getPropertiesByOwner, 
    getInquiriesByProperty, 
    getInquiriesByRenter,
    updateInquiryStatus,
    deleteProperty 
  } = useProperty();

  if (!user) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Please login to access your dashboard</h2>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </Container>
    );
  }

  const renderRenterDashboard = () => {
    const userInquiries = getInquiriesByRenter(user.id);

    return (
      <>
        <Row className="mb-4">
          <Col>
            <h1 className="section-title">Renter Dashboard</h1>
            <p className="text-muted">Welcome back, {user.name}!</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">{userInquiries.length}</div>
              <div>Total Inquiries</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">
                {userInquiries.filter(i => i.status === 'pending').length}
              </div>
              <div>Pending Responses</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">
                {userInquiries.filter(i => i.status === 'approved').length}
              </div>
              <div>Approved Inquiries</div>
            </div>
          </Col>
        </Row>

        <Card className="dashboard-card">
          <Card.Header>
            <h5 className="mb-0">
              <MessageSquare size={18} className="me-2" />
              My Inquiries
            </h5>
          </Card.Header>
          <Card.Body>
            {userInquiries.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">No inquiries yet</p>
                <Link to="/properties" className="btn btn-primary">
                  Browse Properties
                </Link>
              </div>
            ) : (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userInquiries.map(inquiry => {
                    const property = properties.find(p => p.id === inquiry.propertyId);
                    return (
                      <tr key={inquiry.id}>
                        <td>
                          <Link to={`/property/${inquiry.propertyId}`} className="text-decoration-none">
                            {property?.title || 'Property not found'}
                          </Link>
                        </td>
                        <td>{inquiry.message.substring(0, 50)}...</td>
                        <td>
                          <Badge 
                            bg={inquiry.status === 'approved' ? 'success' : 
                                inquiry.status === 'rejected' ? 'danger' : 'warning'}
                            className="badge-status"
                          >
                            {inquiry.status}
                          </Badge>
                        </td>
                        <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </>
    );
  };

  const renderOwnerDashboard = () => {
    const ownerProperties = getPropertiesByOwner(user.id);
    const allOwnerInquiries = ownerProperties.flatMap(property => 
      getInquiriesByProperty(property.id)
    );

    if (!user.isApproved) {
      return (
        <>
          <Row className="mb-4">
            <Col>
              <h1 className="section-title">Owner Dashboard</h1>
              <p className="text-muted">Welcome, {user.name}!</p>
            </Col>
          </Row>
          
          <Card className="dashboard-card text-center py-5">
            <Card.Body>
              <h4>Account Pending Approval</h4>
              <p className="text-muted mb-0">
                Your property owner account is currently under review. 
                You'll be able to add properties once approved by our admin team.
              </p>
            </Card.Body>
          </Card>
        </>
      );
    }

    return (
      <>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="section-title">Owner Dashboard</h1>
                <p className="text-muted">Manage your properties and inquiries</p>
              </div>
              <Link to="/add-property" className="btn btn-primary">
                <Plus size={18} className="me-2" />
                Add Property
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">{ownerProperties.length}</div>
              <div>Total Properties</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">
                {ownerProperties.filter(p => p.status === 'available').length}
              </div>
              <div>Available Properties</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">{allOwnerInquiries.length}</div>
              <div>Total Inquiries</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="dashboard-card mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <Home size={18} className="me-2" />
                  My Properties
                </h5>
              </Card.Header>
              <Card.Body>
                {ownerProperties.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No properties added yet</p>
                    <Link to="/add-property" className="btn btn-primary">
                      Add Your First Property
                    </Link>
                  </div>
                ) : (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Inquiries</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ownerProperties.map(property => (
                        <tr key={property.id}>
                          <td>
                            <Link to={`/property/${property.id}`} className="text-decoration-none">
                              {property.title}
                            </Link>
                          </td>
                          <td>${property.price}/mo</td>
                          <td>
                            <Badge 
                              bg={property.status === 'available' ? 'success' : 
                                  property.status === 'rented' ? 'danger' : 'warning'}
                              className="badge-status"
                            >
                              {property.status}
                            </Badge>
                          </td>
                          <td>{getInquiriesByProperty(property.id).length}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <Edit size={14} />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => deleteProperty(property.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="dashboard-card">
              <Card.Header>
                <h5 className="mb-0">
                  <MessageSquare size={18} className="me-2" />
                  Recent Inquiries
                </h5>
              </Card.Header>
              <Card.Body>
                {allOwnerInquiries.length === 0 ? (
                  <p className="text-muted text-center">No inquiries yet</p>
                ) : (
                  allOwnerInquiries.slice(0, 5).map(inquiry => {
                    const property = properties.find(p => p.id === inquiry.propertyId);
                    return (
                      <div key={inquiry.id} className="border-bottom pb-3 mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>{inquiry.renterName}</strong>
                            <div className="small text-muted">{property?.title}</div>
                            <div className="small">{inquiry.message.substring(0, 50)}...</div>
                          </div>
                          <div className="text-end">
                            <Badge 
                              bg={inquiry.status === 'pending' ? 'warning' : 
                                  inquiry.status === 'approved' ? 'success' : 'danger'}
                              className="badge-status mb-2"
                            >
                              {inquiry.status}
                            </Badge>
                            {inquiry.status === 'pending' && (
                              <div>
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
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Container className="py-5">
      {user.role === 'renter' && renderRenterDashboard()}
      {user.role === 'owner' && renderOwnerDashboard()}
      {user.role === 'admin' && (
        <div className="text-center">
          <h2>Admin Dashboard</h2>
          <p>Use the Admin Panel for full administrative controls</p>
          <Link to="/admin" className="btn btn-primary">
            Go to Admin Panel
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;