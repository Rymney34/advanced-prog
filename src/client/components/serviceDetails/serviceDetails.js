
import "./serviceDetails.css";

import { Component } from 'react';
import Header from '../header/header';
import withRouter from '../navigate/navigate';


import cleaner from '../../resources/images/cleaner.png';
import BookingForm from "../bookingForm/bookingForm";


class ServiceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
        
    }

render (){


 

    return (
        // service details with booking form component
        <div className='servicePageWrapper'>
            <Header/>
            <div className='pagetitle'>
                <h2>SERVICE DETAILS AND BOOKING FORM</h2>
            </div>
            <div className='detailsWrapper'>
                <div className='imgWrapper'>
                    <img alt='service img'src={cleaner}/>
                </div>
                <div className='mainDetails'>
                    <h3 className='serviceTitle'>CLEANING BASIC PLAN</h3>
                    <p className='serviceDesc'>Our professional cleaning staff provide thorough and reliable cleaning services for homes and businesses. From regular maintenance to deep cleaning, 
                    our team ensures every space is spotless and hygienic. Booking a service is simple — just choose your preferred date and time for our cleaners to visit,
                    fill out all the required details in the booking form (such as  service type), and submit your request. Once confirmed, our team will arrive on schedule to deliver a clean, fresh environment you can enjoy.
                    
                    </p>
                </div>
            </div>
            <div className="formWrapper">
                 <BookingForm  buttonTitle='Book Now' title="Basic Cleaning Plan Booking" desc="We will contact you before booking date to remind you" />
                  {/* <BookingForm title="Update Booking Details" buttonTitle="Update" style={{width:1100, height: 500, margin:"0 0 200px 0"}}/> */}
                
            </div>
           
            
        </div>
    )
  }
}

export default withRouter(ServiceDetails);