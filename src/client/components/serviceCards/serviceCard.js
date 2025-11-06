import "./serviceCard.css"
import Button from "../Tools/button/button"

export default function ServiceCard(props) {
        return (
            <div className="serviceCard">
                <img alt='service image'src={props.img}></img>
                <div className="serviceCardText">
                    <h2>Vip Service</h2>
                    <Button></Button>
                </div>
            </div>

        )
    
}

