import React, { useEffect } from 'react';
import axios from 'axios';


const Home = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-header">
        <h1>
          Home Page
        </h1>
      </header>
    </div>
  )

}

export default Home;