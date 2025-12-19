

import "./serviceCard.css"
import Button from "../Tools/button/button"
import cleningImg from '../../resources/images/cleaning.png'
import {useNavigate} from 'react-router-dom';

export default function ServiceCard(props) {
    //react navigation hook
    const navigate = useNavigate();

    //properties 
    const {
        id,
        urlImage,
        title,
        price,
        serviceDescription,

    } = props
    //naviagte to service detials with passing this states
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
        //react 
        return (
            <div key={id} className="serviceCard">
                <div className="imageBlock">
                    <img className="serviceImage" alt='service Image'src={urlImage} style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="Ss">
                <div className="serviceCardText">
                    <h2>{title}</h2>
                    {/* button component */}
                    <Button onClick={Page} text='Book Now'/>
                </div>
                </div>
            </div>
        )
}

