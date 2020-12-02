import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState("");
  const [profileCreated, updateProfileCreated] = useState(false);

  const attemptSignUp = async () => {

    try {

      if (username.length === 0) {
        setUserExists("");
      }
  
      const { data } = await axios.get(`/check_user?username=${username}`);
  
      if (data) {
        setUserExists(username);
        return;
      }
      setUserExists("");
  
      await axios.post(`/add_user`, {
        username,
        password
      });
  
      updateProfileCreated(true);
  
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000)

    } catch(err) {

      console.error(err);

    }

  }

  return (
    <header className="App-header">
      <Container>
        {
          userExists ? 
          <h6 style={{ color: 'red' }}>Username "{userExists}" already exists, please choose another</h6> :
          null
        }
        {
          profileCreated ?
          <h6 style={{ color: '#28a745' }}>Profile created successfully!</h6> :
          null
        }
        <Row>
          <Form 
            id="username" 
            style={{ margin: 'auto' }}
            onChange={(e) => setUsername(e.target.value)}
            onSubmit={(event) => event.preventDefault()}
            onKeyPress={(target) => (target.charCode === 13 && username.length > 0 && password.length > 0) ? attemptSignUp() : null}
            >
            <Form.Group controlId="formUsername">
              <Form.Control placeholder="Username" disabled={profileCreated}/>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <Form 
            id="password" 
            style={{ margin: 'auto' }}
            onChange={(e) => setPassword(e.target.value)}
            onSubmit={(event) => event.preventDefault()}
            onKeyPress={(target) => (target.charCode === 13 && username.length > 0 && password.length > 0) ? attemptSignUp() : null}
          >
            <Form.Group controlId="formUsername">
              <Form.Control placeholder="Password" disabled={profileCreated}/>
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
            onClick={() => attemptSignUp()}
          >
            Create Profile
          </Button>
        </Row>
        <br/>
        <Row>
          <Link
            to="/login"
            style={{ fontSize: '65%', margin: 'auto' }}
          >
            Back
          </Link>
        </Row>
      </Container>
    </header>
  )

}

export default SignUp;