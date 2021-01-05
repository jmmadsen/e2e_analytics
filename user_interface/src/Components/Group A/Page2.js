import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import Map from './Map';


const A2 = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/access/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-a2">
        <br/>
        <h1>
          Page A2
        </h1>
        <br/>
        <Container>
          <Row>
            Often analytics dashboards have to plot geolocation data. This is a basic example of how to integrate Google
            Maps API. You will need to to sign up for and include an API key in the Map.js component.
          </Row>
          <br/>
          <Row>
            <a 
              style={{ margin: 'auto' }}
              href='https://www.npmjs.com/package/react-google-maps'
            >
              https://www.npmjs.com/package/react-google-maps
            </a>
          </Row>
          <br/>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Google Maps Example
                  </Card.Title>
                  <br/>
                  <Map/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br/>
        </Container>
      </header>
    </div>
  )


}

export default A2;