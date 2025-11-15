import React from 'react';
import './App.css'
import Products from './components/Products';
import Services from './components/Services';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Products />
      <Services />
    </div>
  )
}

export default App
