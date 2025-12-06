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
import { AuthProvider } from './client/components/Tools/authFront/authContext';

import BusinessInterface from "./client/components/businessInterface/businessInterface";
import ProtectedRoute from "./client/components/Tools/protectedRoute/protected.route";

function App() {

   const [data, setData] = useState()
  return (
    <AuthProvider>
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
                    path="/register"
                    element={<Register/>}
                />
             <Route element ={<ProtectedRoute/>}>
                <Route
                  path="/home"
                  element={<Main/>}
                />
                 <Route
                  path="/serviceDetails/:singleService"
                  element={<ServiceDetails/>}
                />
                <Route
                  path="/BookingTable"
                  element={<SearchProvider> <BookingTable/></SearchProvider> }
                />
                
                <Route
                  path="/bookingForm"
                  element={<BookingForm/>}
                />
                {/* <Route
                  path="/bookingForm"
                  element={
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BookingForm/>
                  </LocalizationProvider>}
                /> */}
              
                <Route
                  path="/singleBooking/:bookingDetails"
                  element={<SingleBooking/>}
                />
                <Route
                path="/businessInteface"
                 element={<BusinessInterface/> }
                />
             </Route>
          </Routes>
      </div>
    </Router>
</AuthProvider>    
  );
}


export default App;
