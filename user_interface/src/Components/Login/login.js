import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './usaf_logo.png';


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const attemptLogin = async () => {

    try {

      const { status } = await axios.get(`/access/verify_user?username=${username}&password=${password}`);

      if (status === 200) {
        setIncorrect(false);
        window.location.href = '/';
      } else {
        setIncorrect(true);
      }

    } catch(err) {

      setIncorrect(true);
      console.error(err);

    }

  }

  return (
    <header className="App-header">
      <h1>
        VAULT Code Challenge - UI Dashboard
        </h1>
      <img 
        src={logo} 
        className="App-logo" 
        alt="logo" 
      />
      <br/>
      <Container>
        {
          incorrect ?
          <h6 style={{ color: 'red' }}>Username or password is incorrect</h6> :
          null
        }
        <Row>
          <Form 
            id="username" 
            style={{ margin: 'auto' }}
            onChange={(e) => setUsername(e.target.value)}
            onSubmit={(event) => event.preventDefault()}
            onKeyPress={(target) => (target.charCode === 13 && username.length > 0 && password.length > 0) ? attemptLogin() : null}
            >
            <Form.Group controlId="formUsername">
              <Form.Control placeholder="Username"/>
            </Form.Group>
          </Form>
        </Row>
        <Row>
        <Form 
          id="password" 
          style={{ margin: 'auto' }}
          onChange={(e) => setPassword(e.target.value)}
          onSubmit={(event) => event.preventDefault()}
          onKeyPress={(target) => (target.charCode === 13 && username.length > 0 && password.length > 0) ? attemptLogin() : null}
          >
            <Form.Group controlId="formUsername">
              <Form.Control placeholder="Password"/>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <Button 
            disabled={username.length < 1 || password.length < 1}
            variant="outline-success" 
            size="lg" 
            block 
            style={{ width: "50%", margin: 'auto' }}
            onClick={() => attemptLogin()}
          >
            Sign in
          </Button>
        </Row>
        <br/>
        <Row>
          <Link
            to="signup"
            style={{ fontSize: '65%', margin: 'auto' }}
          >
            Create account
          </Link>
        </Row>
      </Container>
    </header>
  )

}

export default Login;