
import React from 'react';
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./Login.css"

import * as Yup from 'yup';
const API_ENDPOINT = "/login"; 

//to clear error from the validation feedback from db
const ClearErrorOnChange = () => {
  const { status, setStatus, values } = useFormikContext();
  React.useEffect(() => {
    if (status && status.error) {
      setStatus(null);
    }
  }, [values, setStatus]);
  return null;
};

const Login = () => {
const navigate = useNavigate();

 const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        
      });
      

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setStatus({ success: "Login successful!" });
        console.log("Logged in user:", data.user);
        navigate('/home')
      } else {
        setStatus({ error: data.message || "Invalid credentials" });
        
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({ error: "Server error" });
    } finally {
      setSubmitting(false);
    }
  };


    return (
      <div id="formLogin"> 
            <div style={{ }}>
            
                <Formik
               
                    initialValues={{ email: '', password: '' }}
                    validationSchema = {Yup.object({
                        email: Yup.string()
                                    .email('Wrong Email address')
                                    .required('Required Field'),
                        password: Yup.string()
                                    .min(5, "Minium 5 chars")
                                    .required('Required Field'),
                    })}
                    onSubmit={handleSubmit}
                    >
                    
                            {({ isSubmitting, status}) => (
                                // style={{border: "1px solid black", marginTop: '0px', }}
                               
                                
                        <Form id="loginForm" >
                          <ClearErrorOnChange/>
                            <div id="loginf" className="loginForm" >

                            {status && status.error && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    {status.error}
                                </div>
                            )}
                                <h3>Login Page</h3>
                            <Field type="email" name="email" id="email" placeHolder="Email" />
                            <ErrorMessage name="email" component="div" />
                            <Field type="password" name="password" id="password" placeHolder="Password" />
                            <ErrorMessage name="password" component="div" />
                            {/* {console.log("Gazoz")} */}
                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                            <span style={{marginTop: "20px"}}><a>Register</a> if you dont have an acoount</span>
                            </div>  
                            
                        </Form>
                        
                    )}
                    
                    
                </Formik>
                </div>
            </div>
  
    )
    
}

export default Login;