
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
    const {location} = this.props;
    const { title, price, serviceDescription, urlImage } = location.state || {};

 

    return (
        // service details with booking form component
        <div className='servicePageWrapper'>
            <Header/>
            <div className='pagetitle'>
                <h2>SERVICE DETAILS AND BOOKING FORM</h2>
            </div>
            <div className='detailsWrapper'>
                <div className='imgWrapper'>
                    <img style={{ width: "100%", height: "100%",objectFit: "cover",}}alt='service img'src={urlImage}/>
                </div>
                <div className='mainDetails'>
                    <h3 className='serviceTitle'>{` ${title} £${price}`}</h3>

                    <p className='serviceDesc'>
                        {serviceDescription}
                    </p>
                </div>
            </div>
            <div className="formWrapper">
                 <BookingForm  buttonTitle='Book Now' serviceTitle = {title} title={`Book a ${title} Plan`} desc="We will contact you before booking date to remind you" />
                  {/* <BookingForm title="Update Booking Details" buttonTitle="Update" style={{width:1100, height: 500, margin:"0 0 200px 0"}}/> */}
                
            </div>
           
            
        </div>
    )
  }
}

export default withRouter(ServiceDetails);