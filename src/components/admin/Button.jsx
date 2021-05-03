import React from 'react';
import './Button.css'
import { Link } from 'react-router-dom'

const STYLES = ['dashboard-btn--primary', 'dashboard-btn--outline'];

const SIZES = ['dashboard-btn--medium', 'dashboard-btn--large'];

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) 
    ? buttonStyle
    : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) 
    ? buttonSize 
    : SIZES[0]

    return (
        <Link to="/login" className='dashboard-btn-mobile'>
            <button 
            className={`dashboard-btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
            {children}
            </button>
        </Link>
    )
}
