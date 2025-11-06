import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route, useNavigate,Link } from "react-router-dom";
import './Register.css'
import withRouter from '../navigate/navigate';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import togglePasswordVisibility from '../Tools/toggleButton/tooglePassword';
import axios from 'axios'
import * as Yup from 'yup';

const API_ENDPOINT = "/api/register"; 

class Register extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }

        
    }

    // togglePasswordVisibility = () => {
    //     this.setState((prevState) => ({
    //     showPassword: !prevState.showPassword,
    //     }));
    // };

    

    render (){

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        
        try {
            const res = await axios.post(`${API_ENDPOINT}`, values);
            console.log("Registration successful:", res.data);
            // navigate("/");
            this.props.navigate("/login");

        } catch (error) {
            // console.error(error);
            
            } finally {
            
        }
  };
    //  const handleSubmit = async (values, { setSubmitting, setStatus }) => { 
        
    // };


        return(
            <div className="regWarpper">
                <div className='regFormInner'>
                    <Formik
                        initialValues={{ 
                            firstName: '',
                            secondName: '',
                            address: '',
                            // zipCode: '',
                            phoneNumber:'',
                            email: '',
                            password: '',

                        }}
                        
                            validationSchema = {Yup.object({
                                firstName: Yup.string()
                                            .required('Required Field'),
                                secondName: Yup.string()
                                            .required('Required Field'),
                                address: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Required Field'),
                                // zipCode: Yup.string()
                                //             .min(2, "Min 2 characters")
                                //             .required('Required Field'),
                                phoneNumber: Yup.string()
                                            .min(2, "Min 2 characters")
                                            .required('Required Field'),
                                email: Yup.string()
                                            .email('Wrong Email address')
                                            .required('Required Field'),
                                password: Yup.string()
                                            .min(7, "Minium 7 characters")
                                            .test("contains-number", "Password must include a number", (value) => {
                                                return /\d/.test(value); // Ensures at least one number exists
                                            })
                                            .required('Required Field'),
                            })}
                            onSubmit={handleSubmit}
                    >

                         {({ isSubmitting, status}) => (
                        <Form className='regForm'>
                            
                            
                            {status && status.error && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    {status.error}
                                </div>
                            )}
                                <h3>Account SignUp</h3>
                            <Field type="text" name="firstName" id="firstName" placeHolder="First Name" />
                                <ErrorMessage name="firstName" component="div" />
                            <Field type="text" name="secondName" id="secondName" placeHolder="Second Name" />
                                <ErrorMessage name="secondName" component="div" />
                            <Field type="text" name="address" id="address" placeHolder="address" />
                                <ErrorMessage name="address" component="div" />
                            {/* <Field type="text" name="zipCode" id="zipCode" placeHolder="zip Code" />
                                <ErrorMessage name="zipCode" component="div" /> */}
                            <Field type="text" name="phoneNumber" id="phoneNumber" placeHolder="phone Number" />
                                <ErrorMessage name="phoneNumber" component="div" />
                            <Field type="email" name="email" id="email" placeHolder="Email" />
                                <ErrorMessage name="email" component="div" />
                                
                            <div className="password-container">
                                <Field
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                                <span className="eye-icon" onClick={() => togglePasswordVisibility(this.setState.bind(this))}>
                                    {this.state.showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </span>
                            </div>
                                <ErrorMessage name="password" component="div" />
                            
                            {/* {console.log("Gazoz")} */}
                            <button type="submit" disabled={isSubmitting}>
                                Register
                            </button>
                        </Form>
                         )}
                    </Formik>
                </div>
            </div>
        )
    }
}
export default withRouter(Register);