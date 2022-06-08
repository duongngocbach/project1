import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Content from './components/Home/Content';
import Register from './components/Login/Register';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/content' element={<Content />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
