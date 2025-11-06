import Header from '../header/header';
import React, {Component} from 'react';
import mainPoster from '../../resources/images/mainPoster.png'
import ServiceCard from '../serviceCards/serviceCard';

export default class Main extends Component {
    render (){
        return (
            <div>
                <Header/>
                <div className='mainPoster'>
                    <img src={mainPoster}></img>
                    <p>Trusted Cleaners One tap away</p>
                </div>
                <h2> Available Services</h2>
                <div className='services'>
                    <ServiceCard/>
                </div>
            </div>


        )
    }
}

