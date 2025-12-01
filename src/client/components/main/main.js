import axios from 'axios';
import { Component } from 'react';
import mainPoster from '../../resources/images/mainPoster.png';
import Header from '../header/header';
import ServiceCard from '../serviceCards/serviceCard';
import './main.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
            this.state = {
                serviceCards: [],
                loading: true,
        }
    }

    componentDidMount(){
        this.fetchCards()
    }

    
     fetchCards = async () => {
            try {
                const res = await axios.post("/api/findDoc");

                console.log(res.data)
                this.setState({serviceCards: res.data, loading: false})
                // const data = await res.json();

                // console.log(data)
            } catch (error) {
                console.log("ERROr in fetching cards")
            console.error(error);
            
            } 
        }


    render (){
       
        const { serviceCards, loading } = this.state;
       

        return (
            <div>
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
                            {serviceCards.map((card)=> (
                                <ServiceCard key={card._id} id={card._id} urlImage={card.urlImage} title={card.serviceTitle} serviceDescription={card.serviceDescription} price={card.price}/>
                            ))}
                            
                            {/* <ServiceCard/>
                            <ServiceCard/> */}
                        </div>
                </div>
               
            </div>


        )
    }
}

