import React from 'react';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, User, LogOut, Settings, Building } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BSNavbar expand="lg" className="navbar-custom" sticky="top" style={{ backgroundColor: 'white' }}>
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Home className="me-2" size={24} />
          HouseHunt
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/properties">Properties</Nav.Link>
          </Nav>
          
          <Nav>
            {user ? (
              <NavDropdown 
                title={
                  <span className="d-flex align-items-center">
                    <User size={18} className="me-1" />
                    {user.name}
                  </span>
                } 
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/dashboard">
                  <Settings size={16} className="me-2" />
                  Dashboard
                </NavDropdown.Item>
                
                {user.role === 'owner' && user.isApproved && (
                  <NavDropdown.Item as={Link} to="/add-property">
                    <Building size={16} className="me-2" />
                    Add Property
                  </NavDropdown.Item>
                )}
                
                {user.role === 'admin' && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <Settings size={16} className="me-2" />
                    Admin Panel
                  </NavDropdown.Item>
                )}
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <LogOut size={16} className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;