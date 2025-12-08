import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import './bookingForm.css'
import './calendar.css'

import withRouter from '../navigate/navigate';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {WrapperPicker} from '../dateTimePicker/dateTimePicker.js'

import axios from 'axios'
import * as Yup from 'yup';
import Button from '../Tools/button/button';


class BookingForm extends Component {
    
    constructor(props) {
    super(props);
        this.state = {
            
            title: "",
            desc: "",
            buttonTitle:"",
            availableTimes:[],
            success: false,
            date: "",
            content: "",
            selectedTime:' ',
            update: false,
            dateSelectedByUser: false,
        }
    }


    
    componentDidMount() {

            
    
    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let timeNow = `${hours}:${minutes}`

        if (this.props.initialData?.date) {
            const date = this.props.initialData.date;
            const time1 = this.props.initialData.time
            date === currentDate && time1 < timeNow ? this.setState({ 
                // date: date,
                selectedTime: ""
            }) : this.setState({ 
                date: date,
                selectedTime: this.props.initialData.time 
            });
            this.getTime(date)
        }
    }

    getTime = async (date) => {
        console.log(this.state.selectedTime)
            const bookedTime = this.props.initialData?.time
            const isUpdate = this.props.initialData?.update === true;
        try{
           
            const res = await fetch(`/api/available?date=${encodeURIComponent(date)}&update=${isUpdate}&bookedTime=${bookedTime}`, {
                method: "GET",
                headers: {"Content-Type": "applicaiton/json"},
                
            })

            const data = await res.json();
            this.setState({availableTimes:data})
            return data;

        }catch(error){
            console.log(error)
        }
        
    }

    getCalendarData = (selectedDate, setFieldValue) => {
        
            const jsDate = new Date(selectedDate);

            const formattedDate = dayjs(jsDate).format("YYYY-MM-DD");
            // const formattedTime = dayjs(jsDate).format("HH:mm");
            
            this.setState({ 
                date: formattedDate,
                dateSelectedByUser: true // Помечаем, что дата выбрана
            });
            setFieldValue("date", formattedDate)
            
            this.getTime(formattedDate)
    }

    handleUpdateSubmit = (values) => {

        this.props.onDataFromChild(values);
    }

    handleFinalSubmit = async (values, tools) => {
        const isUpdate = this.props.initialData?.update === true;
        if(isUpdate){
            return this.handleUpdateSubmit(values)
           
        }else{
            return this.handleSubmit(values, tools)
        }
    }
    
    handleSubmit = async (values, { setSubmitting, setStatus, resetForm}) => {
        console.log("Booking Submited Try:");
        try {
            const res = await axios.post(`/api/createBooking`, values,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                       
                    },
                }
            );
            console.log("Booking Submited:", res.data);
           
            // navigate("/");
            this.setState({
                    success: true,
                    date:"",
                    selectedTime: ""
                })
           resetForm({values: {
                serviceTitle: this.props.serviceTitle, 
                firstName: "",
                secondName: "",
                address: "",
                postCode: "",
                date: null,
                time: null,
                phoneNumber: "",
                bookingNote: ""
            }
        });


        } catch (error) {
            console.error(error);
            
            } finally {
            
        }
    };

    

    render (){

    // transforming data into date and time 

    const nationalNumberRegex = /^[1-9](?:\s?\d){8,9}$/;
  

        return(
            <div className="bookingFormWrapper" style={this.props.style}>
                
                {this.state.success && (
                        <div className="modal-overlay">
                        <div className="modal">
                            <h3>Success!</h3>
                            <p>Your Booking Submited</p>
                            <button onClick={() => this.setState({ success: false })}>
                            Close
                            </button>
                        </div>
                        </div>
                    )}
                <div className='bookingFormInner'>
                    <Formik
                    
                        initialValues={{ 
                            _id: this.props.initialData?._id,
                            serviceTitle: this.props.serviceTitle || this.props.initialData?.serviceTitle,
                            // dateTime: null,
                            firstName: this.props.initialData?.firstName || '',
                            secondName: this.props.initialData?.secondName || '',
                            address: this.props.initialData?.address || '',
                            postCode: this.props.initialData?.postCode || '',
                            date: this.state.dateSelectedByUser 
                                ? this.state.date 
                                : this.props.initialData?.date || null,
                            time: this.state.selectedTime,
                            phoneNumber: this.props.initialData?.phoneNumber || '',
                            bookingNote: this.props.initialData?.bookingNote || ''
                        }}
                        enableReinitialize={this.props.initialData?.update === true}
                        
                            validationSchema = {Yup.object({
                                firstName: Yup.string()
                                            .required('Required Field'),
                                secondName: Yup.string()
                                            .required('Required Field'),
                                address: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Address is Required'),
                                postCode: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Postcode is Required'),
                                time: Yup.string()
                                            .required('Required Field'),
                                phoneNumber: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .matches(nationalNumberRegex, "input 9 or 10 numbers(DO NOT include 0 or +44)")
                                            .required('Phone Number is Required '),
                                // email: Yup.string()
                                //             .email('Wrong Email address')
                                //             .required('Required Field'),
                                // bookingNote: Yup.string()
                                //             .min(5, "Minium 5 characters")
                                            
                            })}
                            onSubmit={this.handleFinalSubmit }
                            
                    >

                         {({ values, isSubmitting, status, setFieldValue}) => (
                            

                        <Form className='bookingForm'>
                        
                            <div style={{
                                display:"flex", alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            >
                                <div className='BookingDesc'>
                                    <h3>{this.props.title}</h3>
                                    <p>{this.props.desc}</p>
                                    
                                </div>
                                <div className='closeImg'>
                                    {this.props.content}
                                </div>

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
                                   
                                        <div className='dataPickerTime'>
                                            <WrapperPicker>
                                                <DatePicker
                                                    sx={{ width: "100%",}}
                                                    
                                                    id="date" 
                                                    name="date"
                                                    disablePast
                                                    label="Select date"
                                                    value={values.date ? dayjs(values.date) : null}
                                                    onChange={(newValue) => {
                                                        // this.setState({date:values.date})
                                                        this.getCalendarData(newValue, setFieldValue)
                                                        // this.setState({dateSelectedByUser: true})

                                                    }}
                                                    
                                                />
                                            </WrapperPicker>
                                            {this.state.date !== '' ?  <div className='timeWrapper'>
                                                <p >Select a time for the date {this.state.date}</p>
                                                <div className="available-times">
                                                    {this.state.availableTimes.length !== 0 ? this.state.availableTimes.map((time) => (
                                                        <div
                                                            id="time" 
                                                            name="time"
                                                            key={time}
                                                            className={`time-slot ${this.state.selectedTime === time ? "selected" : ""}`}
                                                            onClick={() => {
                                                                console.log(values.date)
                                                                 const currentDate = values.date;
                                                                this.setState({ selectedTime: time });
                                                                setFieldValue("time", time);
                                                                // setFieldValue("date", currentDate);
                                                            }}
                                                        >
                                                            {time}
                                                        </div>
                                                    ))
                                                    : <><p style={{color: "red"}}>Sorry, We are fully booked, PLEASE PICK ANOTHER DATE </p></>
                                                    }
                                                </div>
                                            </div>
                                            : <></>
                                            }
                                        </div>
                                        <ErrorMessage className="error" name="time" component="div" />
                                    <Field as="textarea" name="bookingNote" id="bookingNote" placeHolder="Booking Note" />
                                        <ErrorMessage className="error" name="bookingNote" component="div" />
                                </div>

                                <div className='rightBookingBlock'>
                                    <Field type="text" name="address" id="address" placeHolder="Address" />
                                        <ErrorMessage className="error" name="address" component="div" />
                                    <Field type="text" name="postCode" id="postCode" placeHolder="Post Code" />
                                        <ErrorMessage className="error" name="postCode" component="div" />
                                    <div className='phoneNumBlock'>
                                        <span className="phone-prefix">+44</span>
                                        <Field type="text" name="phoneNumber" id="phoneNumber2" placeHolder="+44 Phone Number" />
                                    </div>
                                        <ErrorMessage className="error" name="phoneNumber" component="div" />
                                    
                            
                                    <Button type="submit" text={this.props.buttonTitle} disabled={isSubmitting} style={{backgroundColor:"#56D55D", color: "white"}}/>
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