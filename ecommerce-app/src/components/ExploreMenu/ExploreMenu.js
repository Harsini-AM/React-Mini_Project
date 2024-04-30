import React from 'react'
import './ExploreMenu.css'
import { Link } from 'react-router-dom'

let menu_list = [{
    id:1,
    name:'Groceries',
    img_src:'fruits.jpg'
},
{
    id:2,
    name:'Electronics',
    img_src:'electronics.jpg'
},
{
    id:3,
    name:'Clothing',
    img_src:'clothing.jpg'
},{
    id:4,
    name:'Beauty',
    img_src:'beauty.jpg'
},
{
    id:5,
    name:'Footwear',
    img_src:'footwear.jpg'
},
]

let compare = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

const ExploreMenu = ({category, setCategory}) => {
  menu_list?.sort(compare);
  return (
    <div className='explore-menu' id='explore-menu'>
    <h2>Explore our categories of products</h2>
       <p className='explore-menu-text'>Welcome to our all-in-one ecommerce destination, where convenience meets variety. Dive into our virtual shelves stocked with fresh groceries, cutting-edge electronics, stylish clothing, and trendy footwear. Experience seamless browsing, easy checkout, and endless possibilities for all your shopping needs!</p>
       <div className='explore-menu-list'>
        {menu_list.map((item,index)=>
        <Link to={`/${item.name}`} key={index}><div onClick={()=>setCategory(prev=>prev===item.name?'All':item.name)}  className='explore-menu-list-item'>
            <img src={`Images/HomePage/${item.img_src}`} alt={item.img_src} className={category===item.name? 'active':''}/>
            <p>{item.name}</p>
        </div></Link> )}</div>
        <hr/> 
    </div>
  )
}

export default ExploreMenu
