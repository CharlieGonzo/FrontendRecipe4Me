import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import './LoginForm.css';
import HomePage from "./HomePage";
import { useNavigate } from "react-router-dom";


function LoginPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError,setLoginError] = useState(false);
  const [serverError,setServerError] = useState(false);
  const [isLoggedIn,setLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use hook here

  const handleSubmit = async () => {
    console.log("here")
    
      const response = await fetch(`http://localhost:8080/api/users/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // Use email for username
          password: password,
        }), 
      });
      if (!response.ok) {
        console.error('Error response status:', response.status); // Get the status code
        if(response.status == 409){
          setLoginError(true)
        }else{
          setServerError(true)
        }
      
        throw new Error(`HTTP error! Status: ${response.status}`);
      }else{
        navigate('/Home', {state: {username}})
      }

      
    
  };

  return<div className="login-background"> 
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card shadow" style={{ width: '30rem', borderRadius: '10px' }}>
          <div className="card-body">
            <h1 className="text-center mb-4">Recipe4Me</h1>
            <h5 className="text-center mb-4">Login to your account</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ borderRadius: '5px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderRadius: '5px' }}
                />
              </div>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100" style={{ borderRadius: '5px' }}>Login</button>
              <div className="text-center mt-3">
                <a href="#" className="text-muted">Forgot password?</a>
              </div>
              {loginError && <Alert 
              key='danger' 
              variant='danger'
              >username or password incorrect
              </Alert>}
              {serverError && <Alert 
              key='danger' 
              variant='danger'
              >There has been a server error
              </Alert>}
            </form>
          </div>
        </div>
      </div>
    </div>
   
}


export default LoginPage;