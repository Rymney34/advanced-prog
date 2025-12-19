import "./updateBooking.css";

import axios from 'axios';
import { Component } from 'react';
import close from '../../resources/images/close.png';
import BookingForm from "../bookingForm/bookingForm";
import withRouter from '../navigate/navigate';

class UpdateBooking extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isOpen: "", 
        onClose: "", 
        children: "",
        fromChild: "",
        close: false,
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
    updateBookingDetails = async(data) => {
          const res = await axios.post(`/api/updateBooking`, data,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            this.setState({close: res.data.close})
            // res.data.close
         console.log("Booking Submited:", res.data);
    }
    

    handleChildData = (data) => {
    console.log(data);
      this.setState({fromChild:data});
      this.updateBookingDetails(data)
    };



    render (){

    if (!this.props.isOpen) return null;
    
    return (
        
        <div className='updateBookingModal' 
                >
                   {this.state.close && (
                        <div className="modal-overlay">
                        <div className="modal">
                            <h3>Success!</h3>
                            <p>Your Booking Updated</p>
                            <button onClick={() => {

                              this.props.navigate(-1)
                              this.setState({ close: false })
                              
                              }}>
                            Close
                            </button>
                        </div>
                        </div>
                    )}
            <BookingForm 
              onDataFromChild={this.handleChildData}
              content={<img onClick={this.props.onClose} src={close}
              style={{width:"100%"}}/>}
              close={close} 
              isOpen={this.props.isOpen} 
              onClose={this.props.onClose} 
              title="Update Booking Details" 
              buttonTitle="Update"
              style={{width:1000, margin:"0 0 0px 0"}}
              initialData={{
                  update: true,
                  _id: this.props.initialData?._id,
                  serviceTitle: this.props.initialData?.serviceTitle,
                  firstName: this.props.initialData?.firstName || '',
                  secondName: this.props.initialData?.secondName || '',
                  address: this.props.initialData?.address || '',
                  postCode: this.props.initialData?.postCode || '',
                  date: this.props.initialData?.date || null,
                  time: this.props.initialData?.time || null,
                  phoneNumber: this.props.initialData?.phoneNumber || '',
                  bookingNote: this.props.initialData?.bookingNote || ''
              }}

              />

        </div>
    )
  }
}

export default withRouter(UpdateBooking);