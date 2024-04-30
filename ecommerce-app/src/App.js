import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Grocery from './components/Categories/Grocery'
import Electronics from './components/Categories/Electronics'
import Clothing from './components/Categories/Clothing'
import Footer from './components/Footer/Footer'
import Login from './components/Login.js/Login'
import Beauty from './components/Categories/Beauty'
import Footwear from './components/Categories/Footwear'
import MyOrders from './pages/MyOrder.js/MyOrders'
import Verify from './pages/Verify/Verify'
import Final from './pages/Final/Final';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <>
    {
      showLogin ? <Login setShowLogin={setShowLogin}/> : <></>
    }
      <div className='app'>
      <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Groceries' element={<Grocery/>}/>
          <Route path='/Clothing' element={<Clothing/>}/>
          <Route path='/Electronics' element={<Electronics/>}/>
          <Route path='/Beauty' element={<Beauty/>}/>
          <Route path='Footwear' element={<Footwear/>}/>
          <Route path='/cart' element={<Cart setShowLogin={setShowLogin}/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/order-tracking' element={<Final/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
