import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import BarChart from './BarChart';
import LineChart from './LineChart';


const A1 = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/access/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-a1">
        <br/>
        <h1>
          Page A1
        </h1>
        <br/>
        <Container>
          <Row>
            This is an example of a page that uses react-chartjs-2 graphs. Generally, you should make a new component for
            each graph and assemble them in an index page like this. Routes to get the data from the API should be protected
            routes. Loaders should be used while the API data is fetched.
          </Row>
          <br/>
          <Row>
            <a 
              style={{ margin: 'auto' }}
              href='https://github.com/reactchartjs/react-chartjs-2'
            >
              https://github.com/reactchartjs/react-chartjs-2
            </a>
          </Row>
          <br/>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Bar Chart Example
                  </Card.Title>
                  <br/>
                  <BarChart/>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
              <Card.Body>
                  <Card.Title>
                    Line Chart Example
                  </Card.Title>
                  <br/>
                  <LineChart/>
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

export default A1;