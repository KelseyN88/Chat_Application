import './App.css';
import Footer from './components/footer/Footer';
import './components/nav/Nav'
import Nav from './components/nav/Nav';
import Auth from './/components/auth/Auth';
import { useState } from 'react';


function App() {

  return (
    <div className="App">
    <Nav />
    <Auth />
    <Footer /> 
    </div>
  );
}

export default App;
