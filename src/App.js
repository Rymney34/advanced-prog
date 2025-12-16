
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from  "./client/components/main/main"
import './App.css';
import BookingForm from "./client/components/bookingForm/bookingForm";
import ServiceDetails from "./client/components/serviceDetails/serviceDetails";
import SingleBooking from "./client/components/singleBooking/singleBooking";
import BookingTable from "./client/components/bookingTable/bookingTable";
import  {SearchProvider} from './client/components/context/context';
import { AuthProvider } from './client/components/Tools/authFront/authContext';

import BusinessInterface from "./client/components/businessInterface/businessInterface";
import ProtectedRoute from "./client/components/Tools/protectedRoute/protected.route";
import ServiceTable from "./client/components/serviceTable/serviceTable";
import ServiceBookings from "./client/components/serviceBookings/serviceBookings";
import ErrorBoundary from './client/components/errorBoundary/ErrorBoundary.js';
import Page404 from "./client/components/errorBoundary/Page404.js";
import Spinner from "./client/components/spinner/Spinner.js";

const Login = React.lazy(() =>
  import("./client/components/Login/Login.js")
);
const Register = React.lazy(() =>
  import("./client/components/Register/Register.js")
);
function App() {

   const [data, setData] = useState()
  return (
    <AuthProvider>
    <Router>
      <div className="App">
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
          <Suspense fallback={<Spinner/>}>
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
                    element={ <Main/>  }
                  />
                  <Route
                    path="/serviceDetails/:singleService"
                    element={<ServiceDetails/>}
                  />
                  <Route
                    path="/BookingTable"
                    element={<ErrorBoundary><SearchProvider> <BookingTable/></SearchProvider></ErrorBoundary> }
                  />
                  
                  <Route
                    path="/bookingForm"
                    element={<ErrorBoundary><BookingForm/></ErrorBoundary>}
                  />
                  <Route
                    path="/serviceTable"
                    element={<ErrorBoundary><ServiceTable/></ErrorBoundary>}
                  />
                  <Route
                    path="/bookingsService"
                    element={<ErrorBoundary><ServiceBookings/></ErrorBoundary>}
                  />
                  <Route
                    path="/singleBooking/:bookingDetails"
                    element={<ErrorBoundary><SingleBooking/></ErrorBoundary>}
                  />
                  <Route
                    path="/businessInteface"
                    element={<ErrorBoundary><BusinessInterface/></ErrorBoundary>}
                  />
                  <Route
                  path='*'
                  element={<Page404/>}
                  />
              </Route>
                
            </Routes>
          </Suspense>
      </div>
    </Router>
</AuthProvider>    
  );
}


export default App;
