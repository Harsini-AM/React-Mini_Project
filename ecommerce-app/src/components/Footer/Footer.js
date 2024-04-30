import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={`Images/HomePage/logo.png`} alt='logo' className='logo'/>
                <p>From fresh groceries to cutting-edge electronics, captivating beauty essentials to trend-setting fashion, find everything you need under one digital roof. Explore, shop, and redefine convenience with us!</p>
                <div className='footer-social-icons'>
                <img src='Images/HomePage/facebook.png' alt='facebook'/>
                <img src='Images/HomePage/instagram.png' alt='instagram'/>
                <img src='Images/HomePage/twitter.png' alt='twitter'/>

            </div>
            </div>
            
            <div className='footer-content-center'>
                <h2>EZY-MART</h2>
                <ul>
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Category</li>
                  <li>Privary Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
                <ul>
                  <li>+91 1234567890</li>
                  <li>ezymart@gmail.com</li>
                </ul>
            </div>
        </div> 
        <hr/>
        <p className='footer-copyright'>Copyright @{new Date().getFullYear()} All rights reserved.</p>
    </div>
  )
}

export default Footer
