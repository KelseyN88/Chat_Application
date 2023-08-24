import './App.css';
import Footer from './components/footer/Footer';
import './components/nav/Nav'
import Nav from './components/nav/Nav';
import Auth from './/components/auth/Auth';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';


function App() {

  const [sessionToken, setSessionToken] = useState('');

  console.log('Token: ', sessionToken);

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }



  return (
    <div className="App">
    <Nav />

   <Auth />

    <Footer /> 
    </div>
  );
}

export default App;
