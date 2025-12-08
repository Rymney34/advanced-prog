
import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage,  useFormikContext} from 'formik';
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import "./Login.css"
import withRouter from '../navigate/navigate';
import { Component } from 'react';
import togglePasswordVisibility from '../Tools/toggleButton/tooglePassword';


import * as Yup from 'yup';
const API_ENDPOINT = "/api/login"; 



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
        
    }

  render (){
  // const navigate = useNavigate();


  //to clear error from the validation from db
    const ClearErrorOnChange = () => {
      const { status, setStatus, values } = useFormikContext();
      React.useEffect(() => {
        if (status && status.error) {
          setStatus(null);
        }
      }, [values, setStatus]);
      return null;
    };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await fetch(`${API_ENDPOINT}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          
        });
        

        const data = await response.json();

        // console.log(data.accessToken)
        if (response.ok && data.accessToken && data.message === "Login successful") {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.accessToken);
          // localStorage.setItem("refreshToken", data.refreshToken);
          setStatus({ success: "Login successful!" });
          // console.log("Logged in user:", data.user);
            this.props.navigate("/home");
        } else {
          setStatus({ error: data.message || "Invalid credentials" });
          
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus({ error: "Error" });
      } finally {
        setSubmitting(false);
      }
    };


    return (
      <div id="formLogin"> 
            <div>
            
                <Formik
               
                    initialValues={{ email: '', password: '' }}
                    validationSchema = {Yup.object({
                        email: Yup.string()
                                    .email('Wrong Email address')
                                    .required('Required Field'),
                        password: Yup.string()
                                    .min(7, "Minium 7 chars")
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
                            <ErrorMessage className="errors" name="email" component="div" />
                            <div id="passwordInput">
                               
                            </div>
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
                              <ErrorMessage className="errors" name="password" component="div" />
                            {/* {console.log("Gazoz")} */}
                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                            <span style={{marginTop: "20px"}}><Link to="/register">Register</Link> if you dont have an acoount</span>
                            </div>  
                            
                        </Form>
                        
                    )}
                    
                    
                </Formik>
              </div>
          </div>
    )
  }
}

export default withRouter(Login);