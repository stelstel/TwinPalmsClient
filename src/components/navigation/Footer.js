import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <div className="footer-container">
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            TwinPalms
                        </Link>
                    </div>
                <small className="website-rights">Copyright&copy; 2021 TwinPalms</small>
                    <div className="social-icons">
                        <Link to="/" target="_blank" aria-label="facebook" className="social-icon-link facebook">
                            <i className="fab fa-facebook"></i>
                        </Link>
                        <Link to="/" target="_blank" aria-label="instagram" className="social-icon-link facebook">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="/" target="_blank" aria-label="youtube" className="social-icon-link facebook">
                            <i className="fab fa-youtube"></i>
                        </Link>
                        <Link to="/" target="_blank" aria-label="linkedin" className="social-icon-link facebook">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                        <Link to="/" target="_blank" aria-label="twitter" className="social-icon-link facebook">
                            <i className="fab fa-twitter"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer
