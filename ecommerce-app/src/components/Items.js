import React, { useContext, useState } from 'react'
import './Item.css'
import { StoreContext } from '../context/StoreContext';

const Items = ({item}) => {
  const [itemCount, setItemCount] = useState(0);
  const {cartItems, addToCart, removeFromCart,token} = useContext(StoreContext);
  const {_id,name, price, image, unit, description} = item;
    //console.log(img_src)

  return (
    <div className='category-item'>
      <div className='category-item-img-container'>
        <img src={'http://localhost:4000/images/'+image} alt={image} className='category-item-image'  />
        {/* {token ? <div>
           {!cartItems[_id] ? <img src='Images/HomePage/add_icon_white.png' alt='Add icon' onClick={()=>{addToCart(_id);setItemCount(prev=>prev+1)}} className='add-icon add'/>:
           <div className='category-item-count'>
            
            <img src='Images/HomePage/remove_icon_red.png' alt='Remove icon' className='add-icon' onClick={()=>{removeFromCart(_id); setItemCount(prev=>prev-1)}}/>
            <p>{cartItems[_id]}</p>
            <img src='Images/HomePage/add_icon_green.png' alt='Add icon green' className='add-icon' onClick={()=>{addToCart(_id); setItemCount(prev=>prev+1)}}></img>
            </div>}</div> : null
        } */}
        {!cartItems[_id] ? <img src='Images/HomePage/add_icon_white.png' alt='Add icon' onClick={()=>{addToCart(_id);setItemCount(prev=>prev+1)}} className='add-icon add'/>:
           <div className='category-item-count'>
            
            <img src='Images/HomePage/remove_icon_red.png' alt='Remove icon' className='add-icon' onClick={()=>{removeFromCart(_id); setItemCount(prev=>prev-1)}}/>
            <p>{cartItems[_id]}</p>
            <img src='Images/HomePage/add_icon_green.png' alt='Add icon green' className='add-icon' onClick={()=>{addToCart(_id); setItemCount(prev=>prev+1)}}></img>
            </div>}
      </div>

      <div className='category-item-info'>
        <div className='category-item-name-rating'>
            <p>{name}</p>
        </div>
        {/* <div className='category-item-description'>
            <p>{description}</p>
        </div> */}
        <p >1 {unit} - <span className='category-item-price'>Rs. {itemCount===0 ? price : itemCount*price}</span></p>
      </div>
    </div>
  )
}

export default Items
