import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  const {getTotalCartAmount, token, cartItems, url, itemList}  = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName :'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const dataHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(prev=>({...prev, [name]:value}))
  }

  // const placeOrder = async (e)=>{
  //     e.preventDefault();
  //     let orderItems = [];
  //     console.log(itemList)
  //     itemList.map((item)=>{
  //       if(cartItems[item._id]>0){
  //         let itemInfo= item;
  //         itemInfo['quantity'] = cartItems[item._id];
  //         orderItems.push(itemInfo)
  //       }
  //     })
  //     //console.log(orderItems)
  //     let orderData = {
  //       address:data,
  //       items:orderItems,
  //       amount:getTotalCartAmount()+20,
  //     }

  //     let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
  //     if(response.data.success){
  //       const {session_url} = response.data;
  //       window.location.replace(session_url)
  //     }else{
  //       alert('Error')
  //     }
  // }


  const placeOrder =async(e)=>{
    e.preventDefault();
    if(!token || getTotalCartAmount()===0) {toast.error('Purchase to continue...'); return}
    let orderItems =[];
    itemList.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+20,
    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    //console.log(response.data)
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      console.log('error in payment')
    }
  }


  // useEffect(()=>{
  //   if(!token){
  //     navigate('/cart')
  //   }else if(getTotalCartAmount()===0){
  //     navigate('/cart')
  //   }
  // },[token])

  return (
    <form onSubmit={placeOrder} className='place-order' >
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <div><label>First Name</label>
          <input required type='text' placeholder='First Name' name='firstName' value={data.firstName} onChange={dataHandler}/>
          </div>
          <div><label>Last Name</label>
          <input required type='text'placeholder='Last Name' name='lastName' value={data.lastName} onChange={dataHandler}/></div>
        </div>
        <label>E-mail Id</label>
        <input required type='email' placeholder='Email address' name='email' value={data.email} onChange={dataHandler}/>
        <label>Street</label>
        <input required type='text' placeholder='street' name='street' value={data.street} onChange={dataHandler}/>
        <div className='multi-fields'>
        <div><label>City</label>
          <input required type='text' placeholder='City' name='city' value={data.city} onChange={dataHandler}/></div>
          <div><label>State</label>
          <input required type='text'placeholder='State' name='state' value={data.state} onChange={dataHandler}/></div>
        </div>
        <div className='multi-fields'>
        <div><label>Zip Code</label>
          <input required type='text' placeholder='Zip code' name='zipcode' value={data.zipcode} onChange={dataHandler}/></div>
          <div><label>Country</label>
          <input required type='text'placeholder='Country' name='country' value={data.country} onChange={dataHandler}/></div>
        </div>
        <label>Phone No.</label>
        <input required type='text' placeholder='Phone' name='phone' value={data.phone} onChange={dataHandler}/>
      </div>

      <div className='place-order-right'>
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
          <button type='submit'>PROCEED TO PAY</button>
        </div>
      </div>
    </form>
    
  )
}

export default PlaceOrder

// import React, { useContext } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { useState} from 'react'
// import axios from 'axios'

// const PlaceOrder = () => {

//   const {getTotalCartAmount,token,cartItems,productList,url} =useContext(StoreContext)

//     const [data,setData] =useState({
//       firstName:'',
//       lastName:'',
//       email:'',
//       street:'',
//       city:'',
//       state:'',
//       zipcode:'',
//       country:'',
//       phone:''

//     })

//     const onChangeHandler=(e)=>{
//       const name=e.target.name;
//       const value=e.target.value;
//       setData(data =>({...data,[name]:value}))

//     }

//     const placeOrder =async(e)=>{
//       e.preventDefault();
//       let orderItems =[];
//       productList.map((item)=>{
//         if(cartItems[item._id]>0){
//           let itemInfo =item;
//           itemInfo["quantity"] = cartItems[item._id]
//           orderItems.push(itemInfo)
//         }
//       })
//       let orderData = {
//         address:data,
//         items:orderItems,
//         amount:getTotalCartAmount()+20,
//       }
//       let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
//       console.log(response.data)
//       if (response.data.success){
//         const {session_url} = response.data;
//         window.location.replace(session_url);
//       }
//       else{
//         console.log('error in payment')
//       }
//     }
  
//   return (
    // <form onSubmit={placeOrder} className='place-order'>
    //   <div className='place-order-left'>
    //     <p className='place-order-left-title'>Delivery Information</p>
    //     <div className='multi-fields'>
    //         <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required></input>
    //         <input name='lastName' onChange={onChangeHandler}  value={data.lastName} type="text" placeholder='Last Name'required></input>
    //     </div>
    //     <input name='email' onChange={onChangeHandler}  value={data.email}  type="email" placeholder='Email'required></input>
    //     <input name='street' onChange={onChangeHandler}  value={data.street} type="text" placeholder='Street'required></input>
    //     <div className='multi-fields'>
    //         <input name='city' onChange={onChangeHandler}  value={data.city} type="text" placeholder='City'required></input>
    //         <input name='state' onChange={onChangeHandler}  value={data.state} type="text" placeholder='State'required></input>
    //     </div>
    //     <div className='multi-fields'>
    //         <input name='zipcode' onChange={onChangeHandler}  value={data.zipcode} type="text" placeholder='Zipcode'required></input>
    //         <input name='country' onChange={onChangeHandler}  value={data.country} type="text" placeholder='Country'required></input>
    //     </div>
    //     <input name='phone' onChange={onChangeHandler}  value={data.phone} type="number" placeholder='Phone'required></input>
    //   </div>
    //   <div className='place-order-right'>
    //     <div className='cart-total'>
    //         <h2>Cart Total</h2>
    //         <div>
    //             <div className='cart-total-details'>
    //               <p>Subtotal</p>
    //               <p>INR {getTotalCartAmount()}</p>
    //             </div>
    //             <hr/>
    //             <div className='cart-total-details'>
    //               <p>Delivery Fee</p>
    //               <p>INR {getTotalCartAmount()===0?0:20}</p>
    //             </div>
    //             <hr/>
    //             <div className='cart-total-details'>
    //               <p>Total</p>
    //               <p>INR {getTotalCartAmount()===0?0:getTotalCartAmount()+20}</p>
    //             </div>
    //           </div>
    //         <button type='submit'>PROCEED TO PAYMENT</button>
    //       </div> 
    //   </div> 
    // </form>
//   )
// }

// export default PlaceOrder
