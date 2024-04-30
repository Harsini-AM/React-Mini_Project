import { createContext, useEffect, useState } from "react";
import { beauty, clothing, electronics, footwear, groceries } from "../assets";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{

        const [cartItems, setCartItems] = useState({});
        const [itemList, setItemList] = useState([]);
        const [searchText, setSearchText] = useState('');
        //const [dbelectronics, setDbelectronics] = useState([]);
        const items = [...groceries,...electronics,...beauty,...clothing,...footwear];
        const url = "http://localhost:4000";
        const [token, setToken] = useState('');

          //fetching food Items from db
          const fetchItemList = async ()=>{
            const response = await axios.get('http://localhost:4000/api/item/list');
            setItemList(response.data.message)
            //console.log(response.data.message)
            
        }

        const addToCart = async (itemId)=>{
            if(!cartItems[itemId]){
                setCartItems((prev)=>({...prev, [itemId]:1}))
            }
            else{
                setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            }

            if(token){
                await axios.post(url+"/api/cart/add", {itemId:itemId},{headers:{token}});
            }
        }

        const removeFromCart = async (itemId)=>{
                setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
                //cartItems.delete(itemId);
                //console.log(cartItems)
                if(token){
                    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
                }
        }

        const deleteFromCart = async (itemId)=>{
            console.log(itemId)
            // let updatedCartItems = { ...cartItems };
            // // Delete the item using the key
            // delete updatedCartItems[itemId];
            // console.log('delete from cart')
            // setCartItems(updatedCartItems);
            setCartItems((prev)=>({...prev,[itemId]:0}));
            console.log('after deletion', cartItems);
            if(token){
                await axios.post(url+"/api/cart/delete",{itemId},{headers:{token}})
            }
        }

        const getTotalCartAmount = ()=>{
            let totalAmount = 0;
            for(const item in cartItems){
                //console.log(item)
                if(cartItems[item]>0){
                    let itemDetails = itemList.find((product)=>product._id==item);
                    //console.log(itemDetails);
                    totalAmount+= itemDetails.price * cartItems[item];
                }
            }
            return totalAmount;
            
        }


      

        //even after loading, cart items should be available
        const loadCartData = async (token)=>{
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
            setCartItems(response.data.cartData)
        }


        useEffect(()=>{
                
                async function loadData(){
                    await fetchItemList();
                    if(localStorage.getItem('token')){
                        setToken(localStorage.getItem('token'));
                        await loadCartData(localStorage.getItem("token"))
                    }
                }
                console.log('load data')

                loadData();
        },[])


        const contextValue={
            itemList,
            url,
            groceries,
            electronics,
            clothing,
            items,
            beauty,
            footwear,
            cartItems,
            token,
            searchText,
            deleteFromCart,
            setSearchText,
            setToken,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount
        }

        return (<StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>)
}

export default StoreContextProvider;