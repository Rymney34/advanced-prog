import Header from '../header/header';
import React, {Component} from 'react';
import mainPoster from '../../resources/images/mainPoster.png'
import ServiceCard from '../serviceCards/serviceCard';
import './main.css'

export default class Main extends Component {
    render (){
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
                
                <div className='services'>
                    <ServiceCard/>
                     <ServiceCard/>
                      <ServiceCard/>
                </div>
            </div>


        )
    }
}

