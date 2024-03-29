import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";
import logo from "../pics/logo.png.png"
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to log in: " + error.message);
    }
    setLoading(false);
  }
  
  return (
<>
    <div className="p-5 bg-image" 
     style={{ 
       backgroundImage: `url(${logo})`, 
       backgroundSize: '100px', // or 'cover' to fill the entire div
       backgroundPosition: 'center center',
       backgroundRepeat: 'no-repeat',
       height: '200px',
       
     }}>
    </div>
    
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh" }}>
<div className="w-100" style={{ maxWidth: '400px',marginTop:"-350px" }}>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading}  type="submit" style={{marginTop:'10px'}}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
  </div>
  </Container>
  </>
  );
}
