import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route, useNavigate,Link } from "react-router-dom";
import './businessInterface.css'
import withRouter from '../navigate/navigate';


import axios from 'axios'
import * as Yup from 'yup';
import Button from '../Tools/button/button';
import Header from '../header/header';



class BusinessInterface extends Component {
    
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
  

        return(
            <div className="interfaceWrapper">
                <Header/>
                <div className='interfaceBlock'>
                    <Formik
                        initialValues={{ 
                            serviceTitle: '',
                            serviceDescription: '',
                            availableDateTime: '',
                            image:''

                        }}
                        
                            validationSchema = {Yup.object({
                                serviceTitle: Yup.string()
                                            .min(3, "Min 3 characters")
                                            .required('Required Field'),
                                serviceDescription: Yup.string()
                                            .min(10, "Min 3 characters")
                                            .required('Required Field'),
                                availableDateTime: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Address is Required'),
                                image: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Postcode is Required'),
                                
                                
                                            
                            })}
                            onSubmit={handleSubmit}
                    >

                            {({ isSubmitting, status}) => (
                        <Form className='serviceForm'>
                            <div style={{
                                display:"flex", alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            >
                                <div className='ServiceDesc'>
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
                            <div className='ServiceFields'>
                                <div className='leftFormBlock'>
                                    <Field type="text" name="serviceTitle" id="serviceTitle" placeHolder="service Title" />
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
                                   
                                </div>

                                <div className='rightFormBlock'>
                                    <Field type="text" name="address" id="address" placeHolder="Address" />
                                        <ErrorMessage className="error" name="address" component="div" />
                                    <Field type="text" name="postcode" id="postcode" placeHolder="Post Code" />
                                        <ErrorMessage className="error" name="postcode" component="div" />
                                     <Field as="textarea" name="serviceDescription" id="serviceDescription" placeHolder="Service Description" />
                                        <ErrorMessage className="error" name="serviceDescription" component="div" />
                                    
                            
                                    <Button type="submit" text="Submit" isabled={isSubmitting} style={{backgroundColor:"#56D55D", color: "white"}}/>
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
export default BusinessInterface;