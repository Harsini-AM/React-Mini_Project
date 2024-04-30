import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MyOrders = () => {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);
    const {url, token} = useContext(StoreContext);

    const fetchOrders = async ()=>{
      const response = await axios.post(url+'/api/order/user-orders',{},{headers:{token}});
      setOrderData(response.data.data);
      console.log(response.data.data)
    }

    useEffect(()=>{
      if(token){
        fetchOrders()
      }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
          {
            orderData.map((order,index)=>{
              return(
                <div className='my-orders-list' key={index}>
                  <img src='Images/HomePage/parcel_icon.png' alt='Image'/>
                  <p>{order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name+" x "+item.quantity
                    }
                    else{
                      return item.name+" x "+item.quantity+", "
                    }
                  })}</p>
                  <p>Rs. {order.amount}</p>
                  <p>Items: {order.items.length}</p>
                  <p><span className='status'>{order.status}</span></p>
                  <button onClick={()=>navigate('/order-tracking')}>Track Order</button>
                </div>
              )
            })
          }
        </div>
      
    </div>
  )
}

export default MyOrders
