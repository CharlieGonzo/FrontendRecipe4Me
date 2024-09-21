import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./HomePage.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const[searched,setSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber,setPageNumber] = useState(1);
  const [searchedRecipes,setSearchedRecipes] = useState([]);
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const location = useLocation();
  let {username} = location.state || {};
  if(username == null){
    username = "user"
  }
  console.log(username);

  const handleNextPage = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    // Additional logic for fetching new data can go here
  };
  

  const handleSearch = async (e) => {
    let more = false;
    if(e != null){
      console.log("here");
    e.preventDefault();
    }else{
      more = true;
    }
    console.log("Searching for:", pageNumber);
    
    let diet = "none"; // Default diet
    
    if (vegan) {
      diet = "vegan";
    } else if (vegetarian) {
      diet = "vegetarian";
    }

    const response = await fetch(`http://localhost:8080/api/recipes/v1/query?searchTerm=${searchTerm}&diet=${diet}&size=9&pageNumber=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error response status:', response.status);
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const data = await response.json();
      if (data != null) {
        if(!searched){
          setSearched(true);
        }
        if(searchTerm){
          console.log("here");
          setSearchedRecipes((prevRecipes) => [...prevRecipes, ...data]);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }else{
        setSearchedRecipes(data);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      }
    }
  };
  




  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa, #fce4ec)' }}>
     
      <Navbar expand="lg" className="px-4 py-3 shadow-sm" style={{ backgroundColor: 'transparent' }}>
  <Navbar.Brand onClick={()=>{navigate('/Home',{state:{username}})}} className="fw-bold" style={{ fontSize: '1.75rem', color: '#333' }}>
    Recipe4Me
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
      <Button variant="light" className="me-2" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={() => { navigate("/profile", { state: { username } }) }}>
        Profile
      </Button>
      <Button variant="light" className="me-2" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={() => { navigate("/Setting", { state: { username } }) }}>
        Settings
      </Button>
      <Button variant="light" className="me-2" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} href="/explore">
        Explore
      </Button>
      <Button variant="light" style={{ borderRadius: '20px', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onClick={() => { navigate("/") }}>
        Logout
      </Button>
    </Nav>
  </Navbar.Collapse>
</Navbar>

     
      <Container className="text-center mt-5">
        <h1 className="display-4 text-black fw-bold mb-4">Welcome, {username}!</h1>
        <p className="lead mb-5">What delicious recipe will you create today?</p>

    
        <Form onSubmit={handleSearch} className="d-flex flex-column flex-md-row justify-content-center mb-5">
  <input
    type="text"
    placeholder='Start Searching now'
    onChange={(e) => setSearchTerm(e.target.value)}
    className='search-input mb-3 mb-md-0'
  />
  
  <div className="d-flex gap-3 mb-3 mb-md-0">
    <Form.Check
      type="checkbox"
      label="Vegan"
      checked={vegan}
      onChange={() => setVegan(!vegan)}
    />
    <Form.Check
      type="checkbox"
      label="Vegetarian"
      checked={vegetarian}
      onChange={() => setVegetarian(!vegetarian)}
    />
  </div>

  <Button
    type="submit"
    className="ms-md-3 btn btn-light"
    style={{ borderRadius: '50px', padding: '10px 30px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
  >
    <i className="bi bi-search"></i> Search
  </Button>
</Form>


      
        <Row className="g-4">
          {searchedRecipes.map((recipe, idx) => (
           <Col key={recipe.id} md={4}>
           <div
             className="card shadow-lg"
             style={{
               borderRadius: '20px',
               transition: 'transform 0.3s ease-in-out',
               backgroundColor: '#fff',
               color: '#333',
             }}
             onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
             onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
           >
             <img
               src={recipe.image}
               alt={`Recipe Thumbnail: ${recipe.title}`}
               className="card-img-top"
               style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
             />
             <div className="card-body">
               <h5 className="card-title">{recipe.title}</h5>
               <Button variant="outline-primary" style={{ borderRadius: '20px' }}>
                 View Recipe
               </Button>
             </div>
           </div>
         </Col>
          ))}
        </Row>
        {searched && <Button variant="primary"
        className="ms-md-3 btn "
        style={{ borderRadius: '50px', marginTop: "30px",marginBottom:"50px", padding: '10px 30px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
        onClick={(e)=>{
        handleSearch(e);
      }}>load more</Button>}
        
      </Container>
      
    </div>
  );
}

export default HomePage;
