import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Cart = ({setShowLogin}) => {
  const navigate = useNavigate();
  const {cartItems,removeFromCart, addToCart, items, getTotalCartAmount, itemList, token, deleteFromCart} = useContext(StoreContext);
  //console.log(itemList)
  

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr className='main-hr'/>
        {
          itemList.map(item=>{
            if(cartItems[item._id]>0){
              return (
                <div key={item._id}>
                <div className='cart-items-title cart-items-item' >
                  <img src={'http://localhost:4000/images/'+item.image} alt={item.name}/>
                  <p>{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <div className='cart-actions'>
                  <img src='Images/HomePage/remove_icon_red.png' alt='Remove icon' className='add-icon' onClick={()=>{removeFromCart(item._id)}}/>
                  
                  <p>{cartItems[item._id]}</p>
                  <img src='Images/HomePage/add_icon_green.png' alt='Remove icon' className='add-icon' onClick={()=>{addToCart(item._id)}}/>
                  </div>
                  <p>Rs. {Number(item.price)*Number(cartItems[item._id])}</p>
                  <p onClick={()=>deleteFromCart(item._id)} className='cross'>❌</p>
             
                  
                </div>
                <hr/>
                </div>
              )
            }
          })
        }
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
            <p>Delivery</p>
              <p>Rs. {getTotalCartAmount()===0 ? 0:20}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
            <b>Total</b>
            <b>Rs. {getTotalCartAmount()===0 ? 0:getTotalCartAmount()+20}</b>
            </div>
          </div>
          <button onClick={()=>{
            if(token){
              navigate('/order')}
            else{
              if(getTotalCartAmount()===0)
                toast.error("Purchase to continue...")
              else
              {
                toast.error('Login to continue...')
                setShowLogin(true)}
            }
            }
            }>PROCEED TO PAY</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, Enter here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
