import React, { Component } from 'react';
import axios from 'axios';
import { Spinner }  from 'react-bootstrap';
import { Line } from 'react-chartjs-2';


// suggest using React class instead of functional components for graphs and charts
class LineChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false,
      data: null
    }
  }

  componentDidMount = async () => {

    try {

      const { data } = await axios.get('/data/linechart');

      this.setState({ data, loaded: true });

    } catch(err) {

      console.error(err);
      this.setState({ loaded: true, error: true });

    }

  }

  render = () => {

    const { loaded, error, data } = this.state;

    if (!loaded) {
      return (
        <Spinner animation="border" variant="success"/>
      )
    }

    if (error) {
      return (
        <div style={{ color: 'red' }}>
          Data failed to load
        </div>
      )
    }

    return (
      <div>
        <Line
          data={data}
          width={100}
          height={'400%'}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    )

  }

}

export default LineChart;