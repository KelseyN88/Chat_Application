import './App.css';
import Footer from './components/footer/Footer';
import './components/nav/Nav'
import Nav from './components/nav/Nav';
import Auth from './/components/auth/Auth';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Logout from './components/auth/logout/Logout';


function App() {

  const [sessionToken, setSessionToken] = useState('');

  console.log('Token: ', sessionToken);
  

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
    setSessionToken(localStorage.getItem('token'))
  }
  },[])

  return (
    <div className="App">
    <Nav />
    {
      sessionToken !== '' ?
      <Logout setSessionToken={setSessionToken}/> : null
    }
<Routes>
  <Route
    path='/'
    element={<Auth updateToken={updateToken} />}
  />
  <Route
    path='/room/'
    element={<h2>ALL ROOMS PLACEHOLDER</h2>}
  />
</Routes>

   

    <Footer /> 
    </div>
  );
}

export default App;
