import "./updateBooking.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import BookingForm from "../bookingForm/bookingForm";
import close from '../../resources/images/close.png'

class UpdateBooking extends Component {

   

  constructor(props) {
    super(props);
    this.state = {
        search: "", 
        isOpen: "", 
        onClose: "", 
        children: "",
        // open:""
    }
        
    }
    componentDidMount() {    
      if(this.state.isOpen){
        document.body.style.overflow = 'hidden';
      }    
    }

    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    

    render (){

    if (!this.props.isOpen) return null;
    
    

   
    return (
        
        <div className='updateBookingModal' 

                // style={{
                    
                //     position: "fixed",
                //     zIndex: 2,
                //     width: "100vw",
                //     height: "100vh",
                //     background: "black",
                //     // right: "110px",
                //     // top: "140px",
                //     display: "flex",
                    
                //     // width: "100vw",
                   
                // }}
                >
                     
            <BookingForm 
              content={<img onClick={this.props.onClose} src={close}
              style={{width:"100%"}}/>}
              close={close} 
              isOpen={this.props.isOpen} 
              onClose={this.props.onClose} 
              title="Update Booking Details" 
              buttonTitle="Update"
              style={{width:1000, margin:"0 0 0px 0"}}
              />
           

        </div>
    )
  }
}

export default UpdateBooking;