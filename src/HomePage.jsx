import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  let {username} = location.state || {};
  if(username == null){
    username = "user"
  }
  console.log(username);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa, #fce4ec)', color: '#333' }}>
      {/* Navbar */}
      <Navbar expand="lg" className="px-4 py-3 shadow-sm" style={{ backgroundColor: 'transparent' }}>
        <Navbar.Brand href="#" className="fw-bold" style={{ fontSize: '1.75rem', color: '#333' }}>
          Recipe4Me
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="light" className="me-2" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={() => {navigate("/profile",{state:{username}})}}>
            Profile
          </Button>
          <Button variant="light" className="me-2" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} href="/settings">
            Settings
          </Button>
          <Button variant="light" className="me-2" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} href="/explore">
            Explore
          </Button>
          <Button variant="light" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={() => {navigate("/")}}>
            Logout
          </Button>
        </Nav>
      </Navbar>

      {/* Main Content */}
      <Container className="text-center mt-5">
        <h1 className="display-4 fw-bold mb-4">Welcome, {username}!</h1>
        <p className="lead mb-5">What delicious recipe will you create today?</p>

        {/* Animated Search Bar */}
        <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-5">
          <Form.Control
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '60%',
              padding: '15px 30px',
              borderRadius: '50px',
              border: 'none',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onFocus={(e) => e.target.style.transform = 'scale(1.05)'}
            onBlur={(e) => e.target.style.transform = 'scale(1)'}
          />
          <Button type="submit" className="ms-3 btn btn-light" style={{ borderRadius: '50px', padding: '10px 30px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
            <i className="bi bi-search"></i> Search
          </Button>
        </Form>

        {/* Recipe Cards */}
        <Row className="g-4">
          {[...Array(3)].map((_, idx) => (
            <Col key={idx} md={4}>
              <div
                className="card shadow-lg"
                style={{
                  borderRadius: '20px',
                  transition: 'transform 0.3s ease-in-out',
                  backgroundColor: '#fff',
                  color: '#333',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src="https://via.placeholder.com/350x200"
                  alt="Recipe Thumbnail"
                  className="card-img-top"
                  style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Recipe Title {idx + 1}</h5>
                  <p className="card-text text-muted">A delightful recipe that’s sure to impress.</p>
                  <Button variant="outline-primary" style={{ borderRadius: '20px' }}>
                    View Recipe
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
