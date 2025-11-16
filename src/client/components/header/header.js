import "./header.css"
import logoImg from '../../resources/images/logo1.png'
import profileImg from '../../resources/images/profile.png'
import ProfileModal from "../profile/profileMenu"

import { useState } from "react"
import withRouter from "../navigate/navigate"

function Header(props) {

        const [open, setOpen] = useState(false);

        const handleClose = () => {
            setOpen(false);
        };

        const handleOpen = () => {
            setOpen(true);
        };

        return (
            <div>
                <header className="headerStyles">
                    <div 
                        className="logoBlock" 
                        onClick={() => props.navigate("/home")}>
                        <img className="logoImg" src={logoImg}/>
                        <h1 className='title'>BookFlow</h1>
                    </div>
                    
                    <div  className="profileImgBlock">
                         <ProfileModal isOpen ={open} onClose={handleClose}/>
                        <img onClick={handleOpen} src={profileImg}/>
                        
                    </div>
                   
                    
                </header>
               
            </div>

        )
    
}
export default withRouter(Header)

