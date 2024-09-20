import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Navbar } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfilePage.css'; // Make sure to create/update this CSS file

function ProfilePage(){

    const location = useLocation();
    console.log(location.state);
    let {username} = location.state || {};
    if(username == null){
      username = "user"
    }
    const [bio, setBio] = useState('This is a short bio about me.');
    const [favoriteRecipes, setFavoriteRecipes] = useState([
        { title: 'Delicious Salad', img: 'https://via.placeholder.com/200?text=Salad' },
        { title: 'Spaghetti Carbonara', img: 'https://via.placeholder.com/200?text=Carbonara' },
        { title: 'Chicken Tikka Masala', img: 'https://via.placeholder.com/200?text=Tikka+Masala' },
        { title: 'Beef Tacos', img: 'https://via.placeholder.com/200?text=Tacos' },
        { title: 'Vegetable Stir Fry', img: 'https://via.placeholder.com/200?text=Stir+Fry' },
    ]);

    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#e9ecef', color: '#333' }}>
            {/* Navbar */}
            <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/Home',{state:{username}})}  style={{ cursor: 'pointer' }}  className="fw-bold" >Recipe4Me</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Text className="ms-auto">Hello, {username}! Ready to create some magic?</Navbar.Text>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/add-recipe')}
                            className="ms-3"
                        >
                            Add New Recipe
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigate('/edit-profile')}
                            className="ms-2"
                        >
                            Edit Profile
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="text-center">
                <Row className="mb-5">
                    <Col md={4} className="mx-auto">
                        <Card className="profile-card shadow-lg rounded-4" style={{ background: '#f8f9fa' }}>
                            <Card.Body>
                                <Card.Title className="fw-bold">Profile Picture</Card.Title>
                                <Card.Img
                                    variant="top"
                                    src="https://via.placeholder.com/200"
                                    className="profile-img rounded-circle mb-3"
                                    style={{ border: '5px solid #007bff' }}
                                />
                                <Card.Text className="text-muted mt-3">{bio}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <h2 className="mb-4">Favorite Recipes</h2>
                <Row className="g-4 mb-5">
                    {favoriteRecipes.map((recipe, index) => (
                        <Col md={4} key={index}>
                            <Card className="recipe-card shadow-lg rounded-4">
                                <Card.Img variant="top" src={recipe.img} className="recipe-img" style={{ borderRadius: '20px 20px 0 0' }} />
                                <Card.Body>
                                    <Card.Title>{recipe.title}</Card.Title>
                                    <Button variant="outline-primary" className="recipe-button rounded-pill">
                                        View Recipe
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ProfilePage;
