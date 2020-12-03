import React, { Component } from 'react';
import { Row, ButtonGroup, Dropdown, Button } from 'react-bootstrap';

import { useFilter } from "../../Context/Filters";


class Filters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: 'Date',
      country: 'Country',
      state: 'State',
      city: 'City',
      dateVariant: "primary",
      countryVariant: "primary",
      stateVariant: "primary",
      cityVariant: "primary"
    }
  }

  onClear = () => {

    this.setState({
      date: 'Date',
      country: 'Country',
      state: 'State',
      city: 'City',
      dateVariant: "primary",
      countryVariant: "primary",
      stateVariant: "primary",
      cityVariant: "primary"
    })

  }

  setDate = (date) => {
    this.setState({ date, dateVariant: 'success' });
  }

  setCountry = (country) => {
    this.setState({ country, countryVariant: 'success' });
  }

  setStates = (state) => {
    this.setState({ state, stateVariant: 'success' });
  }

  setCity = (city) => {
    this.setState({ city, cityVariant: 'success' });
  }

  render = () => {

    const { date, country, state, city, dateVariant, countryVariant, stateVariant, cityVariant } = this.state;

    return (
      <Row>
        <ButtonGroup style={{ margin: 'auto' }}>
          <Dropdown style={{ marginRight: '1%' }}>
            <Dropdown.Toggle variant={dateVariant}>
              {date}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.setDate('Date 1')}
              >
                Date 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setDate('Date 2')}
              >
                Date 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setDate('Date 3')}
              >
                Date 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ marginLeft: '1%', marginRight: '1%' }}>
            <Dropdown.Toggle variant={countryVariant}>
              {country}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.setCountry('Country 1')}
              >
                Country 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setCountry('Country 2')}
              >
                Country 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setCountry('Country 3')}
              >
                Country 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ marginLeft: '1%', marginRight: '1%' }}>
            <Dropdown.Toggle variant={stateVariant}>
              {state}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.setStates('State 1')}
              >
                State 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setStates('State 2')}
              >
                State 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setStates('State 3')}
              >
                State 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ marginLeft: '1%', marginRight: '1%' }}>
            <Dropdown.Toggle variant={cityVariant}>
              {city}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.setCity('City 1')}
              >
                City 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setCity('City 2')}
              >
                City 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.setCity('City 3')}
              >
                City 3
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            style={{ marginLeft: '1%' }}
            variant="danger"
            onClick={() => this.onClear()}
          >
            Clear
          </Button>
        </ButtonGroup>
      </Row>
    )

  }

}

export default Filters;