import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import ReactTable from './Table';


const B1 = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/access/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-b1">
        <br/>
        <h1>
          Page B1
        </h1>
        <br/>
        <Container>
          <Row>
            This is an example of a page that uses react-table. Most every use case will require tables of some sort. An important 
            consideration beforehand is whether you want client-side pagination (for small datasets), or server-side
            pagination (for larger datasets). You can also include sorting & search bars (built into react-table), 
            or download to CSV capabilities (build yourself).
          </Row>
          <br/>
          <Row>
            <a
              style={{ margin: 'auto' }}
              href="https://react-table.tanstack.com/"
            >
              https://react-table.tanstack.com/
            </a>
          </Row>
          <br/>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Table Example 1
                  </Card.Title>
                  <br/>
                  <ReactTable/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Table Example 2
                  </Card.Title>
                  <br/>
                  <ReactTable/>
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

export default B1;