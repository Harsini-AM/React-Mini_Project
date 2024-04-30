import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Items from '../Items'
import './Category.css'

const Grocery = () => {

  const {itemList, searchText} = useContext(StoreContext)
  let dbGroceries = itemList.filter(item=>item.category==='Grocery')
  //console.log(dbGroceries)
  dbGroceries = dbGroceries.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
  //console.log(dbGroceries)
  return (
    <div className='category-display1'>
        <h2>Grocery</h2>
        <div className='category-display' id='category-display'>
            <p>Unlock a World of Delicious Discoveries with Our Grocery Selection!</p>
            <div className='category-display-list'>
                {dbGroceries.map((item)=><Items key={item._id} item={item}/>)
                }
            </div>
        </div>
    </div>
  )
}

export default Grocery
