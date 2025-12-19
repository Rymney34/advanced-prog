import "./profileMenu.css";

import { Component } from 'react';
import Button from "../Tools/button/button";
import Header from "../header/header";
import SearchBar from "../search/searchBar";
import { SearchContext } from "../context/context";
import withRouter from '../navigate/navigate';
import close from '../../resources/images/close.png'
import { logout } from "../Tools/authFront/auth";

class ProfileModal extends Component {

    static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
        search: "", 
        isOpen: "", 
        onClose: "", 
        children: "",
        adminView: false,
    }
        
    }
    componentDidMount() {
    this.getAdmin();
    }  

    getAdmin = async() => {
        try{
            const res = await fetch("/api/isAdmin",{
                method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),

                    },
                
            })

            const data = await res.json();
            this.setState({adminView: data.isAdmin})
            // console.log(data.isAdmin)
            // return data;

        }catch(error){
            console.log(error)
        }
    }

render (){
    if (!this.props.isOpen) return null;

    return (
        
        <div className='profileModalWrapper'  onClick={this.props.onClose}  style={{
                    background: "white",
                    height: 330,
                    width: 200,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    position: "fixed",
                    zIndex: 2,
                    right: "50px",
                    top: "10px"
                }}>
            <div className="modalContent">
                
                     <h4 style={{margin: "0 0 2px 0"}}>Profile</h4>

                <div className="profileSections">
                    
                    <ul className="list">
                        <li style={{marginBottom: 15}}onClick={() => this.props.onClose}>
                            Close
                            
                        </li>
                        <li onClick={() => this.props.navigate("/home")}>Home</li>
                        <li onClick={() => this.props.navigate("/bookingTable")}>Your Bookings</li>
                        {this.state.adminView === true ?
                            <>
                                    <li onClick={() => this.props.navigate("/serviceTable")}>Your Services</li>
                                    <li onClick={() => this.props.navigate("/bookingsService")}>You Are Booked</li>
                            </> : <></>}
                        
                        <li onClick={() => this.props.navigate("/home")}>Customise</li>
                        <li onClick={() => logout() && this.props.navigate("/login") }>Logout</li>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

export default withRouter(ProfileModal);