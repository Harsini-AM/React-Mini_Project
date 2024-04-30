import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import  './Navbar.css'
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {

const [menu, setMenu] = useState('home');

const {getTotalCartAmount, token,setToken, searchText, setSearchText} = useContext(StoreContext);
const navigate = useNavigate()

const logout = ()=>{
    localStorage.removeItem('token');
    setToken('');
    navigate('/');

}


// useEffect(()=>{
//     console.log(searchText)
// },[searchText])

  return (
    <div className='navbar'>
       <Link to='/'><img src='Images/HomePage/logo.png' alt='Logo' className='logo'/></Link>
       <ul className='navbar-menu'>
        <Link to='/' className={menu==='home' ? 'active':''} onClick={()=>setMenu('home')}>Home</Link>
        <a href='#explore-menu'><li className={menu==='menu' ? 'active':''} onClick={()=>setMenu('menu')}>Menu</li></a>
        <a href='#footer'><li className={menu==='contact' ? 'active':''} onClick={()=>setMenu('contact')}>Contact</li></a>

        <div className='navbar-profile'>
          <li className='category'>Category</li>
          <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/Groceries')}><p>Grocery</p></li>
             
              <li onClick={()=>navigate('/Electronics')}><p>Electronics</p></li>
              
              <li onClick={()=>navigate('/Clothing')}><p>Clothing</p></li>
              
              <li onClick={()=>navigate('/Beauty')}><p>Beauty & Care</p></li>
              
              <li onClick={()=>navigate('/Footwear')}><p>Footwears</p></li>
              
          </ul>
          </div>
       </ul>

       <div className='navbar-right'>
        <div className='search-input'>
          <input type='text' placeholder='Search' value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}/>
          <img src='Images/HomePage/search_icon.png' alt='search icon'></img>
        </div>
        
        <div className='navbar-search-icon'>
           <Link to='/cart'> <img src='Images/HomePage/basket_icon.png' alt='cart'></img></Link>
            <div className={getTotalCartAmount()!==0 ? 'dot' : ''}></div>
        </div>
        {!token ? <button onClick={()=>setShowLogin(true)}>Sign In</button>:<div className='logo navbar-profile'>
          <img src='Images/HomePage/profile1.jpg' className='navbar-profile'/>
          <div className='user-profile'></div>
          <ul className='nav-profile-dropdown'>
              <li className='user-email'><p>{localStorage.getItem('email')}</p></li>
              <li onClick={()=>navigate('/my-orders')}><p><img src='Images/HomePage/orders.png'/>Orders</p></li>
              <hr/>
              <li onClick={logout}><p><img src='Images/HomePage/logout.png'/> Logout</p></li>
          </ul>
          </div> }
        
       </div>
    </div>
  )
}

export default Navbar
