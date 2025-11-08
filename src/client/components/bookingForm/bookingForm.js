import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route, useNavigate,Link } from "react-router-dom";
import './bookingForm.css'
import withRouter from '../navigate/navigate';


import axios from 'axios'
import * as Yup from 'yup';
import Button from '../Tools/button/button';

const API_ENDPOINT = "/api/register"; 

class BookingForm extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      
    }

        
    }

    render (){

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        
        try {
            const res = await axios.post(`${API_ENDPOINT}`, values);
            console.log("Booking Submited:", res.data);
            // navigate("/");
           

        } catch (error) {
            // console.error(error);
            
            } finally {
            
        }
  };
    const nationalNumberRegex = /^[1-9](?:\s?\d){8,9}$/;

        return(
            <div className="bookingFormWrapper">
                <div className='bookingFormInner'>
                    <Formik
                        initialValues={{ 
                            firstName: '',
                            secondName: '',
                            address: '',
                            postcode: '',
                            dateTime: '',
                            phoneNumber:'',
                            bookingNote: ''

                        }}
                        
                            validationSchema = {Yup.object({
                                firstName: Yup.string()
                                            .required('Required Field'),
                                secondName: Yup.string()
                                            .required('Required Field'),
                                address: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Address is Required'),
                                postcode: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Postcode is Required'),
                                dateTime: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Required Field'),
                                phoneNumber: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .matches(nationalNumberRegex, "input 9 or 10 numbers(DO NOT include 0 or +44)")
                                            .required('Phone Number is Required '),
                                email: Yup.string()
                                            .email('Wrong Email address')
                                            .required('Required Field'),
                                bookingNote: Yup.string()
                                            .min(5, "Minium 5 characters")
                                            
                            })}
                            onSubmit={handleSubmit}
                    >

                         {({ isSubmitting, status}) => (
                        <Form className='bookingForm'>
                            <div className='BookingDesc'>
                                <h3>Book Your Basic Cleaning</h3>
                                <p>We will contact you day before booking date to remind you</p>
                            </div>
                            
                            {status && status.error && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    {status.error}
                                </div>
                            )}
                            <div className='bookingFields'>
                                <div className='leftBookingBlock'>
                                    <Field type="text" name="firstName" id="firstName" placeHolder="First Name" />
                                        <ErrorMessage className="error" name="firstName" component="div" />
                                    <Field type="text" name="secondName" id="secondName" placeHolder="Second Name" />
                                        <ErrorMessage className="error" name="secondName" component="div" />
                                    <Field
                                        as="select"
                                        id="dateTime" 
                                        name="dateTime"
                                        className="form-select"
                                        placeholder="Sponsor"
                                        

                                        >
                                        <option value="">
                                            Please select the Date
                                        </option>
                                        <option value="">
                                        12/12/25
                                        </option>
                                        {
                                        
                                        }
                                    </Field> 
                                        <ErrorMessage className="error" name="dateTime" component="div" />
                                    <Field as="textarea" name="bookingNote" id="bookingNote" placeHolder="Booking Note" />
                                        <ErrorMessage className="error" name="bookingNote" component="div" />
                                </div>

                                <div className='rightBookingBlock'>
                                    <Field type="text" name="address" id="address" placeHolder="Address" />
                                        <ErrorMessage className="error" name="address" component="div" />
                                    <Field type="text" name="postcode" id="postcode" placeHolder="Post Code" />
                                        <ErrorMessage className="error" name="postcode" component="div" />
                                    <div className='phoneNumBlock'>
                                        <span className="phone-prefix">+44</span>
                                        <Field type="text" name="phoneNumber" id="phoneNumber" placeHolder="+44 Phone Number" />
                                    </div>
                                        <ErrorMessage className="error" name="phoneNumber" component="div" />
                                    
                            
                                    <Button type="submit" text="BookNow" isabled={isSubmitting} style={{backgroundColor:"#56D55D", color: "white"}}/>
                                </div>
                            </div>
                            
                            
                        </Form>
                         )}
                    </Formik>
                </div>
            </div>
        )
    }
}
export default withRouter(BookingForm);