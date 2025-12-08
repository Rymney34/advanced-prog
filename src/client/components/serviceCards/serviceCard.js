

import "./serviceCard.css"
import Button from "../Tools/button/button"
import cleningImg from '../../resources/images/cleaning.png'
import {useNavigate} from 'react-router-dom';

export default function ServiceCard(props) {
    const navigate = useNavigate();

    const {
        id,
        urlImage,
        title,
        price,
        serviceDescription,

    } = props

        function Page (){
              navigate(`/serviceDetails/${id}`, 
                  {
                  state:{
                    title:title,
                    price:price,
                    serviceDescription:serviceDescription,
                    urlImage:urlImage
                   }});  
            
        }

        return (
            <div key={id} className="serviceCard">
                <div className="imageBlock">
                    <img className="serviceImage" alt='service Image'src={urlImage} style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="Ss">
                <div className="serviceCardText">
                    <h2>{title}</h2>
                    <Button onClick={Page} text='Book Now'/>
                </div>
                </div>
            </div>

        )
    
}

