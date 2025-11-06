import Login from "./client/components/Login/Login";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from  "./client/components/main/main"
import './App.css';
import Register from "./client/components/Register/Register";

function App() {

   const [data, setData] = useState()
  return (
    <Router>
      <div className="App">
          <Routes>
             <Route
              
                  path="/"
                  element={<Navigate to="/login" />}
              />
              <Route
              
                  path="/login"
                  element={<Login/>}
              />
             
              <Route
                  path="/home"
                  element={<Main/>}
              />
              <Route
                  path="/register"
                  element={<Register/>}
              />
     
     
          </Routes>
      </div>
    </Router>
    
  );
}


export default App;
