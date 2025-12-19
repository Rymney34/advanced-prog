import axios from 'axios';
import { Component } from 'react';
import mainPoster from '../../resources/images/mainPoster.png';
import Header from '../header/header';
import ServiceCard from '../serviceCards/serviceCard';
import './main.css';
//home page
export default class Main extends Component {
    constructor(props) {
        super(props);
            this.state = {
                serviceCards: [],
                loading: true,
        }
    }
    componentDidMount(){
        //get card on load
        this.fetchCards()
    }
    //getting cards details(services)
    fetchCards = async () => {
            try {
                const res = await axios.post("/api/findDoc");

                console.log(res.data)
                this.setState({serviceCards: res.data, loading: false})
            } catch (error) {
                console.log("ERROr in fetching cards")
            console.error(error);
            
            } 
    }
    render (){
        const { serviceCards, loading } = this.state;
        //react componenet 
        return (
            <div>
                //header custom component 
                <Header/>
                <div className='mainPoster'>
                    <img className='poster' src={mainPoster}></img>
                    <div className="businessSlogan">
                        <p >Trusted Cleaners <br/>One tap away</p>
                    </div>
                    
                </div>
                <div className="textServiceBlock">
                    <h2> Avaliable Services</h2>
                </div>
                <div className='servicesWrapper'>
                        <div className='services'>
                            {/* map over service card, get data from db and then put it in state and then map over it  */}
                            {serviceCards.map((card)=> (
                                <ServiceCard key={card._id} id={card._id} urlImage={card.urlImage} title={card.serviceTitle} serviceDescription={card.serviceDescription} price={card.price}/>
                            ))}
                        </div>
                </div>
            </div>
        )
    }
}

