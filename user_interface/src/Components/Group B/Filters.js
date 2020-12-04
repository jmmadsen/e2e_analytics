import React, { Component } from 'react';
import { Row, ButtonGroup, Dropdown, Button } from 'react-bootstrap';

import { FilterContext } from "../../Context/Filters";


class Filters extends Component {

  static contextType = FilterContext;

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {

    this.setState({ ...this.context.filters })

  }

  onClear = () => {

    this.context.setFilters({
      date: 'Date',
      country: 'Country',
      state: 'State',
      city: 'City',
      dateVariant: "primary",
      countryVariant: "primary",
      stateVariant: "primary",
      cityVariant: "primary"
    });

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
    this.context.setFilters({ ...this.context.filters, date, dateVariant: 'success' });
    this.setState({ date, dateVariant: 'success' });
  }

  setCountry = (country) => {
    this.context.setFilters({ ...this.context.filters, country, countryVariant: 'success' });
    this.setState({ country, countryVariant: 'success' });
  }

  setStates = (state) => {
    this.context.setFilters({ ...this.context.filters, state, stateVariant: 'success' });
    this.setState({ state, stateVariant: 'success' });
  }

  setCity = (city) => {
    this.context.setFilters({ ...this.context.filters, city, cityVariant: 'success' });
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

Filters.contextType = FilterContext;

export default Filters;