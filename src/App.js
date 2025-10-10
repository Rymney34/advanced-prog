import Login from "./client/components/Login/Login";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from  "./client/components/main/main"
import './App.css';

function App() {

   const [data, setData] = useState()
  return (
    <Router>
      <div className="App">
          <Routes>
              <Route
                  path="/"
                  element={<Login/>}
              />
              <Route
                  path="/home"
                  element={<Main/>}
              />
     
          </Routes>
      </div>
    </Router>
    
  );
}


export default App;
