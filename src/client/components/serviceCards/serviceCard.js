import "./serviceCard.css"
import Button from "../Tools/button/button"
import cleningImg from '../../resources/images/cleaning.png'
import {useNavigate} from 'react-router-dom';

export default function ServiceCard(props) {
    const navigate = useNavigate();

        function Page (){
              navigate(`/serviceDetails`, 
                  {
                  state:{
                   }});  
            
        }

        return (
            <div className="serviceCard">
                <div className="imageBlock">
                    <img className="serviceImage" alt='service Image'src={cleningImg} style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="Ss">
                <div className="serviceCardText">
                    <h2>Vip Service</h2>
                    <Button onClick={Page} text='Book Now'/>
                </div>
                </div>
            </div>

        )
    
}

