import React, { useEffect } from 'react';
import axios from 'axios';


const Home = () => {

  // sends user to Login screen if jwt expired
  useEffect(() => {
    axios.get('/access/verify_jwt');
  }, [])

  return (
    <div>
      <header className="App-home">
        <br/>
        <h1>
          Home Page
        </h1>
      </header>
    </div>
  )

}

export default Home;