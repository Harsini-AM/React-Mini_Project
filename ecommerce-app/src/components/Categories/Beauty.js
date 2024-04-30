import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Items from '../Items'
import './Category.css'
const Beauty = () => {

  const {itemList, searchText} = useContext(StoreContext);
  let dbbeauty = itemList.filter(product=>product.category==='Beauty')
  dbbeauty = dbbeauty.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className='category-display1'>
        <h2>Beauty and Care</h2>
        <div className='category-display' id='category-display'>
            <p>Discover your signature style in our curated collection of fashion-forward essentials!</p>
            <div className='category-display-list'>
                {dbbeauty.map((item)=><Items key={item.id} item={item}/>)
                }
            </div>
        </div>
    </div>
  )
}

export default Beauty
