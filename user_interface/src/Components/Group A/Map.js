import React from "react"
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = compose(
  withProps({
    // include API key below here
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    loaded: false,
    error: false,
    data: null
  }

  componentDidMount = async () => {

    try {

      const { data } = await axios.get('/data/map_data');

      this.setState({ loaded: true, data });
      
    } catch(err) {

      console.error(err);
      this.setState({ loaded: true, error: true });

    }

  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {

    const { loaded, error, data } = this.state;

    console.log(data);

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
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MyFancyComponent;