import "./singleBooking.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";

class SingleBooking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
        
    }

render (){


    const firstName = 'Alex'
    return (
        
        <div className='sinleBookingPageWrapper'>
            <Header/>
            <div className='pagetitle'>
                <h2>BOOKING DETAILS</h2>
            </div>
            <div className="detWrapperBlock">
                <div className="detailsBlock">
                <div className="informationBlock">
                    <div className="fieldsBlock">
                        <dl class="bookingInfo">
                            <dt>{`First Name: ${firstName}`} </dt>
                            <dt>{`Second Name: ${firstName}`}</dt>
                            <dt>{`Address: ${firstName}`}</dt>
                            <dt>{`Post Code: ${firstName}`}</dt>
                            <dt>{`Date & Time: ${firstName}`}</dt>
                            <dt>{`Phone Number: ${firstName}`}</dt>
                            <dt>{`Booking Note: ${firstName}`}</dt>
                        </dl>
                        
                    </div>
                </div>
                <div className="buttonsBlockWrapper">
                    <div className="buttonsBlock" >
                      <Button  text='Update'/>
                        <Button  text='Cancel'/>
                          <Button  text='Delete'/>
                     </div>
                </div>
                </div>
            </div>
            
           
            
        </div>
    )
  }
}

export default SingleBooking;