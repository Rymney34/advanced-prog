import Login from "./client/components/Login/Login";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from  "./client/components/main/main"
import './App.css';
import Register from "./client/components/Register/Register";
import BookingForm from "./client/components/bookingForm/bookingForm";
import ServiceDetails from "./client/components/serviceDetails/serviceDetails";
import SingleBooking from "./client/components/singleBooking/singleBooking";
import BookingTable from "./client/components/bookingTable/bookingTable";
import  {SearchProvider} from './client/components/context/context';

function App() {

   const [data, setData] = useState()
  return (
    <Router>
      <div className="App">
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
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
              <Route
                path="/bookingForm"
                element={<BookingForm/>}
              />
              <Route
                path="/serviceDetails"
                 element={<ServiceDetails/>}
              />
               <Route
                path="/singleBooking"
                 element={<SingleBooking/>}
              />
              <Route
                path="/BookingTable"
                 element={<SearchProvider> <BookingTable/></SearchProvider> }
              />
     
     
          </Routes>
      </div>
    </Router>
    
  );
}


export default App;
