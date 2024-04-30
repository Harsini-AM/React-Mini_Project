import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Items from '../Items'
import './Category.css'
const Electronics = () => {

  const {itemList, searchText} = useContext(StoreContext)
  let dbElectronics = itemList.filter(item=>item.category==='Electronics')
  dbElectronics = dbElectronics.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className='category-display1'>
        <h2>Electronics</h2>
        <div className='category-display' id='category-display'>
            <p>Discover the latest smartphones with cutting-edge features and sleek designs, available at ezy-mart for unbeatable prices.</p>
            <div className='category-display-list'>
                {dbElectronics?.map((item)=><Items key={item._id} item={item}/>)
                }
            </div>
        </div>
    </div>
  )
}

export default Electronics
