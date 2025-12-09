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

    

    render (){

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        
        try {
            const res = await axios.post(`${API_ENDPOINT}`, values);
            // console.log("Registration successful:", res.data);
            // navigate("/");
            this.props.navigate("/login");

        } catch (error) {
            console.error(error);
            
            } finally {
            
        }
    };

        return(
            <div className="regWarpper">
                <div className='regFormInner'>
                    <Formik
                        initialValues={{ 
                            firstName: '',
                            email: '',
                            password: '',

                        }}
                        
                            validationSchema = {Yup.object({
                                firstName: Yup.string()
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