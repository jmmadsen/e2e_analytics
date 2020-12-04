import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

import DownloadCSV from './DownloadCSV';
import DownloadXLSX from './DownloadXLSX';
import Filters from './Filters';


const B2 = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/access/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-b2">
        <br/>
        <h1>
          Page B2
        </h1>
        <br/>
        <Container>
          <Row>
            These are some random components I've used frequently in other UIs. Downloading datasets as a CSV or XLSX is common,
            whether from a table or graph. 
          </Row>
          <br/>
          <Row>
            Filters can be used to control the data across the entire application. I would recommend
            setting filter data in a React Context, so its available across the entire app without passing down throughout props.
          </Row>
          <br/>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    CSV Download Example
                  </Card.Title>
                  <br/>
                  <DownloadCSV/>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    XLSX Download Example
                  </Card.Title>
                  <br/>
                  <DownloadXLSX/>
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
                    Filters Example
                  </Card.Title>
                  <br/>
                  <Filters/>
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

export default B2;