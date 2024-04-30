import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import '../Categories/Category.css'
import TopPickItem from '../TopPickItem';

let compare = (a, b) => {
  if (a.name < b.name) {
      return -1;
  }
  if (a.name > b.name) {
      return 1;
  }
  return 0;
};

const TopPick = () => {

    let {itemList, searchText} = useContext(StoreContext);
    itemList = itemList?.sort(compare)
    const filteredItems = itemList.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      
  return (
    <div className='category-display' id='category-display'>
            <p>Unlock a World of Discoveries with Our Product Selection!</p>
            <div className='category-display-list'>
                {filteredItems?.map((item)=><TopPickItem key={item._id} item={item}/>)
                }
                {/* {console.log(itemList)} */}
            </div>
        </div>
  )
}

export default TopPick
