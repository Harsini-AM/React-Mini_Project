import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={`Images/HomePage/logo.png`} alt='logo'/>
                <p></p>
            </div>
            <div className='footer-social-icons'>
                <img src='Images/HomePage/facebook.png' alt='facebook'/>
                <img src='Images/HomePage/instagram.png' alt='instagram'/>
                <img src='Images/HomePage/twitter.png' alt='twitter'/>

            </div>
            <div className='footer-content-center'>

            </div>
        </div> 
    </div>
  )
}

export default Footer
