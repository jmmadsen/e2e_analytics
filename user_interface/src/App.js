import './App.css';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "./Context/Auth";
// import PrivateRoute from './PrivateRoute';

import Login from './Components/Login/login';
import SignUp from './Components/Login/signup';

import Home from './Components/Home/Home';
import NotFound from './Components/Home/NotFound';

import A1 from './Components/Group A/Page1';

import logo from './usaf_logo.png';


const App = () => {

  // set base url for all axios requests to API, using env variable
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : 'http://localhost:8080';

  // send cookie with requests
  axios.interceptors.request.use(
    config => {
      config.withCredentials = true;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // check cookie has not expired
  axios.interceptors.response.use(
    res => {
      if (res) {
        return res;
      }
    },
    err => {
      if (err.response.status === 401 || err.response.status === 403) {
        // when cookie expires, redirect to Login screen
        window.location.href = '/login'
      }
      return Promise.reject(err);
    }
  )

  return (
    
    <AuthContext.Provider value={''}>
      <Router>
        {
          window.location.href.includes('signup') ?
            null
          :
          window.location.href.includes('login') ?
            null
          :
            <Navbar bg="dark">
              <LinkContainer exact to='/'>
                <Navbar.Brand href="#home">
                  <img
                    src={logo}
                    width="32"
                    height="32"
                    className="d-inline-block align-top"
                    alt="CCE logo"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <NavDropdown
                title="Group A"
              >
                <LinkContainer to="/groupa/1">
                  <NavDropdown.Item>
                    Example Page A1
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/groupa/2">
                  <NavDropdown.Item>
                    Example Page A2
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title="Group B"
              >
                <LinkContainer to="/groupb/1">
                  <NavDropdown.Item>
                    Example Page B1
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/groupb/2">
                  <NavDropdown.Item>
                    Example Page B2
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown 
                className="ml-auto pull-right" 
                title="Profile"
                alignRight
              >
                <NavDropdown.Item
                  onClick={async () => {
                    await axios.get('/access/sign_out');
                    window.location.href = '/login';
                  }}
                >
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar>
        }
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <Route path="/groupa/1" component={A1}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
    
  );

}

export default App;