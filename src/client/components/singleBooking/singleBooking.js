import "./singleBooking.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";

import UpdateBooking from "../updateBooking/updateBooking";

class SingleBooking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open:"",
      hovered: null
      
    }
        
    }
    handleMouseEnter = (btn) => {
        this.setState({ hovered: btn });
    };

    handleMouseLeave = () => {
        this.setState({ hovered: null });
    };


    render (){
        const handleClose = () => {
                    this.setState({ open: false });
                };
        
                const handleOpen = () => {
                    this.setState({ open: true });
                };

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
                        <UpdateBooking isOpen={this.state.open} onClose={handleClose}/>
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
                        <div onMouseEnter={()=>this.handleMouseEnter("btn1")}
                            onMouseLeave={this.handleMouseLeave}
                            style={{width: "100%"}}>
                            <Button  text='Update' onClick={handleOpen}
                           
                            style={{
                                width: "100%",
                                backgroundColor: this.state.hovered === "btn1" ? "#b0ffb9ff" : "rgb(239, 239, 239)" ,
                            }}
                            />
                        </div>
                        
                        <div onMouseEnter={()=>this.handleMouseEnter("btn2")}
                            onMouseLeave={this.handleMouseLeave}
                            style={{width: "100%"}}>
                            <Button  text='Delete'  
                           
                            style={{
                                width: "100%",
                                backgroundColor: this.state.hovered === "btn2" ? "#ffb0c4" : "rgb(239, 239, 239)" ,
                            }}/>
                        </div>
                            
                            <Button  text='Cancel'/>
                        </div>
                    </div>
                    </div>
                </div>
                
            
                
            </div>
        )
    }
}

export default SingleBooking;