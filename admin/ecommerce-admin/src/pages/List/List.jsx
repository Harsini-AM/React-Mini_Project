import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'


const List = () => {
  const url = "http://localhost:4000"
  const [list, setList] = useState([]);

  useEffect(()=>{
    fetchList();

  },[])

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/item/list`);
    console.log(response.data)
    
    if(response.data.success){
      setList(response.data.message)
      console.log(list)
    }
    else{
      toast.error('Error')
    }
  }

  const removeItem = async(itemid)=>{
    console.log(itemid)
    const response = await axios.post(`${url}/api/item/remove`,{
      "id":itemid
    })
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error('Error')
    }
  }
  return (
    <div className='list add flex-col'>
      <p>Available Items list</p>
      <div className='list-table-format title'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list?.map((item)=>
    {
      return (
        <div key={item._id} className='list-table-format'>
          <img src={`${url}/images/`+item.image} alt='Image'/>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>Rs. {item.price}</p>
          <p className='cursor' onClick={()=>removeItem(item._id)}>x</p>
        </div>
      )
    })}
    </div>
  )
}

export default List
