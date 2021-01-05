import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Home = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/access/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-home">
        <br/>
        <h1>
          Home Page
        </h1>
        <h4>
          Easy Example of Navigation Cards
        </h4>
        <br/>
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '75%', margin: 'auto' }}>
                <Card.Body>
                  <Card.Title>
                    Page A1
                  </Card.Title>
                  <Card.Text>
                    Examples of bar and line charts.
                  </Card.Text>
                </Card.Body>
                <br/>
                <LinkContainer 
                  to='/groupa/1'
                  style={{ width: '35%', margin: 'auto' }}
                >
                  <Button variant="success">
                    Open
                  </Button>
                </LinkContainer>
                <br/>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '75%', margin: 'auto' }}>
                <Card.Body>
                  <Card.Title>
                    Page A2
                  </Card.Title>
                  <Card.Text>
                    Example of Google Maps geodata.
                  </Card.Text>
                </Card.Body>
                <br/>
                <LinkContainer 
                  to='/groupa/2'
                  style={{ width: '35%', margin: 'auto' }}
                >
                  <Button variant="success">
                    Open
                  </Button>
                </LinkContainer>
                <br/>
              </Card>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <Card style={{ width: '75%', margin: 'auto' }}>
                <Card.Body>
                  <Card.Title>
                    Page B1
                  </Card.Title>
                  <Card.Text>
                    Example of using tables.
                  </Card.Text>
                </Card.Body>
                <br/>
                <LinkContainer 
                  to='/groupb/1'
                  style={{ width: '35%', margin: 'auto' }}
                >
                  <Button>
                    Open
                  </Button>
                </LinkContainer>
                <br/>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '75%', margin: 'auto' }}>
                <Card.Body>
                  <Card.Title>
                    Page B2
                  </Card.Title>
                  <Card.Text>
                    Random useful examples from past UIs.
                  </Card.Text>
                </Card.Body>
                <br/>
                <LinkContainer 
                  to='/groupb/2'
                  style={{ width: '35%', margin: 'auto' }}
                >
                  <Button>
                    Open
                  </Button>
                </LinkContainer>
                <br/>
              </Card>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )

}

export default Home;