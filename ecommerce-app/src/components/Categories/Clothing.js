import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Items from '../Items'
import './Category.css'
const Clothing = () => {

  const {itemList, searchText} = useContext(StoreContext)
  let dbClothing = itemList.filter(item=>item.category==='Clothing')
  dbClothing = dbClothing.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className='category-display1'>
        <h2>Fashion Clothing</h2>
        <div className='category-display' id='category-display'>
            <p>Discover your signature style in our curated collection of fashion-forward essentials!</p>
            <div className='category-display-list'>
                {dbClothing.map((item)=><Items key={item._id} item={item}/>)
                }
            </div>
        </div>
    </div>
  )
}

export default Clothing
