import "./singleBooking.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";

import UpdateBooking from "../updateBooking/updateBooking";
import withRouter from '../navigate/navigate';

class SingleBooking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open:"",
      hovered: null,
      success: false,
      check: false,
      start: false,
      deleteId: '',
      details: [],
      
    };
    
    }

    componentDidMount() {
        const {location} = this.props;
        
        let {_id,user, serviceTitle, firstName, secondName, address, postCode, date, time, phoneNumber,bookingNote} = location.state || {};
    }
    handleMouseEnter = (btn) => {
        this.setState({ hovered: btn });
    };

    handleMouseLeave = () => {
        this.setState({ hovered: null });
    };

    handleClose = () => {
                    this.setState({ open: false });
                    document.body.style.overflow = 'unset';
                };
        
    handleOpen = () => {
                    this.setState({ open: true });
                    document.body.style.overflow = 'hidden';
                };

    cancelBooking = (id) => {
        this.setState({ check: true, deleteId: id });
    };

    confirmDelete = async () => {
        try {
            const res = await fetch(`/api/deleteBooking/${this.state.deleteId}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            });

            const data = await res.json();

            if (!data.error) {
                this.setState({ success: true });
            }

            console.log(data);

        } catch (error) {
            console.error(error);
        }

        this.setState({ check: false });
    };




    render (){
        

        const {location} = this.props;
          
        const {
            isAdmin,
            _id,
            user, 
            serviceTitle, 
            firstName, 
            secondName,
            address,
            postCode,
            date, 
            time, 
            phoneNumber,
            bookingNote} = location.state || {};
        
        return (

            
            <div className='sinleBookingPageWrapper'>
                <Header/>
                <div className="titleWrapper">
                    <span className="material-symbols--keyboard-return-rounded" onClick={()=>{this.props.navigate(-1)}}></span>
                    <div className='pagetitle'>
                        <h2>BOOKING DETAILS</h2>
                        
                    </div>
                    {this.state.success && (
                        <div className="modal-overlay">
                        <div className="modal">
                            <h3>Success!</h3>
                            <p>Your Booking Details Successfully Deleted/Canceled!</p>
                            <button onClick={() => {  
                                    this.props.navigate(-1);
                                    this.setState({ success: false });
                                }}>
                            Close
                            </button>
                        </div>
                        </div>
                    )}
                   {this.state.check && (
                        <div className="modal-overlay">
                            <div className="modal">
                            <h3>Are You Sure?</h3>
                            <p>Press Delete to remove the booking. It will be removed from your records.</p>

                            <button onClick={this.confirmDelete}>
                                Delete
                            </button>

                            <button onClick={() => this.setState({ check: false })}>
                                Return
                            </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="detWrapperBlock">
                    <div className="detailsBlock">
                        <div className="informationBlock">
                            <UpdateBooking 
                            isOpen={this.state.open}
                            onClose={this.handleClose}
                            initialData={{
                                _id: _id,
                                serviceTitle:serviceTitle,
                                firstName: firstName,
                                secondName: secondName,
                                address: address,
                                postCode: postCode,
                                date: date,
                                time: time,
                                phoneNumber: phoneNumber,
                                bookingNote: bookingNote
                            }}
                            />
                            <div className="fieldsBlock">
                                <dl class="bookingInfo">
                                    <dt>{`Service Type: ${serviceTitle}`} </dt>
                                    <dt>{`First Name: ${firstName}`} </dt>
                                    <dt>{`Second Name: ${secondName}`}</dt>
                                    <dt>{`Address: ${address}`}</dt>
                                    <dt>{`Post Code: ${postCode}`}</dt>
                                    <dt>{`Booking Date: ${date}`}</dt>
                                    <dt>{`Booking Time: ${time}`}</dt>
                                    <dt>{`Phone Number : +44 ${phoneNumber}`}</dt>
                                    <dt className="bookingNote">{`Booking Note: ${bookingNote}`}</dt>
                                </dl>
                                
                            </div>
                        </div>
                        {isAdmin != true ?  <div className="buttonsBlockWrapper">
                            <div className="buttonsBlock" >
                                <div onMouseEnter={()=>this.handleMouseEnter("btn1")}
                                    onMouseLeave={this.handleMouseLeave}
                                    style={{width: "100%"}}>
                                    <Button  text='Update' onClick={this.handleOpen}
                                
                                    style={{
                                        width: "100%",
                                        backgroundColor: this.state.hovered === "btn1" ? "#b0ffb9ff" : "rgb(239, 239, 239)" ,
                                    }}
                                    />
                                </div>
                                
                                <div onMouseEnter={()=>this.handleMouseEnter("btn2")}
                                    onMouseLeave={this.handleMouseLeave}
                                    style={{width: "100%"}}>
                                    <Button  text='Delete / Cancel'  
                                    onClick={() => this.cancelBooking(_id)}
                                    style={{
                                        width: "100%",
                                        backgroundColor: this.state.hovered === "btn2" ? "#ffb0c4" : "rgb(239, 239, 239)" ,
                                    }}/>
                                </div>
                                    
                                    {/* <Button  text='Cancel'/> */}
                            </div>
                        </div> : <></>}
                       
                    </div>
                </div>
                
            
                
            </div>
        )
    }
}

export default withRouter(SingleBooking);