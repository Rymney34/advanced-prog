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
            // const res = await axios.post(`${API_ENDPOINT}`, values);
            // console.log("Booking Submited:", res.data);
            // navigate("/");
           

        } catch (error) {
            // console.error(error);
            
            } finally {
            
        }
  };
  

        return(
            <div className="interfaceWrapper">
                <Header/>
                 <div className='pagetitle' id='pagetitle' >
                    <h2 style={{margin: "0"}}>Service Form</h2>
                </div>
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
                                            .required('Service Description Field is required'),
                                availableDateTime: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Date is Required'),
                                price: Yup.string()
                                            .required('Price is Required'),
                                image: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Image is Required'),
                                
                                
                                            
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
                                    <Field type="text" name="serviceTitle" id="serviceTitle" placeHolder="Service Title" />
                                        <ErrorMessage className="error" name="serviceTitle" component="div" />
                                    
                                    <Field type="text" name="price" id="price" placeHolder="Price"/>
                                        <ErrorMessage className="error" name="price" component="div"/>
                                    <Field
                                        style={{border:"1px solid rgb(118, 118, 118)"}}
                                        name="image"
                                        id="image"
                                        // component={FileDragAndDropField}
                                        accept="image"
                                        type = "file"
                                        placeholder="Choose Your Imafe"
                                        />
                                   {/* <ErrorMessage className="error" name="image" component="div"/> */}
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
                                   
                                  <Field style={{width:"90%", height: "40%", borderRadius: 15, padding: 10}} as="textarea" name="serviceDescription" id="serviceDescription" placeHolder="Service Description" />
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