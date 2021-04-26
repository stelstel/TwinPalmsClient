import React from 'react'
import '../../App.css'
import { Button } from './Button'
import './HomeWithVideo.css'
import { Link } from 'react-router-dom'
import Footer from '../navigation/Footer'


function HeroSection() {
    return (
        <>
            <div className="hero-container">
                <video src="https://twinpalmshotelsresorts.com/wp-content/uploads/2019/03/TPHR2019.m4v" autoPlay loop muted/>
                    <h1>BUSINESS REPORTS</h1>
                    <p>Login to continue</p>
                    <div className="hero-btns">
                    <Link to="/login" >
                            <Button className="btns" buttonSize="btn--large">LOGIN</Button>
                    </Link>
                    </div>
            </div>
            <Footer />
        </>
    )
}

export default HeroSection
