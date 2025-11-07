import "./header.css"
import logoImg from '../../resources/images/logo1.png'
import profileImg from '../../resources/images/profile.png'

export default function Header(props) {
        return (
            <div>
                <header className="headerStyles">
                    <div className="logoBlock">
                        <img className="logoImg" src={logoImg}/>
                        <h1 className='title'>BookFlow</h1>
                    </div>
                    
                    <div className="profileImgBlock">
                        <img src={profileImg}/>
                    </div>
                    
                </header>
               
            </div>

        )
    
}

