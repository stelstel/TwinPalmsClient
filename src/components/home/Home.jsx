import React from 'react'
import '../../App.css'
import { Button } from './Button'
import './Home.css'
import { Link } from 'react-router-dom'


function Homee() {
    return (
        <div className="hero-container-homee">
                <img className="home-img" src="/images/pic2.jpg" alt="error loading img"/>
                <h1>BUSINESS REPORTS</h1>
                <p>Login to continue</p>
                <div className="hero-btns">
                <Link to="/login" >
                    
                        <Button className="btns" buttonSize="btn--large">LOGIN</Button>
                    
                </Link>
                </div>
        </div>
    )
}

export default Homee
