import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = () => {
    const url = "http://localhost:4000"
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price:'',
        cateogry:''
    })

    const dataHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }


    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        const formData= new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.cateogry)
        formData.append('image',image)
        const response = await axios.post(`${url}/api/item/add`,formData);
        if(response.data.success){
            setData(
                {
                    name: '',
                    description: '',
                    price:'',
                    cateogry:''
                }
            )
            setImage(false);
            toast.success(response.data.message)
            
        }else{
            toast.error('Error occured')
        }
            
        
        
    }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='Upload'/>
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
            </div>

            <div className='add-product-name flex-col'>
                <p>Product name</p>
                <input onChange={dataHandler} value={data.name} type='text' name='name' placeholder='Type here'/>
            </div>
            <div className='add-product-description flex-col'>
                <p>Product description</p>
                <textarea onChange={dataHandler} value={data.description} name='description' rows='6' placeholder='Description of product' required></textarea>
            </div>

            <div className='add-category-price'>
                <div className='add-category flex-col'>
                    <p>Product category</p>
                    <select name='category' onChange={(e)=>setData(data=>({...data,cateogry:e.target.value}))} value={data.cateogry}>
                        <option value='Grocery'>Grocery</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Clothing'>Clothing</option>
                        <option value='Footwear'>Footwear</option>
                        <option value='Beauty'>Beauty</option>
                    </select>
                </div>

                <div className='add-price flex-col'>
                    <p>Product price</p>
                    <input type='Number' name='price' onChange={dataHandler} value={data.price}/>
                </div>
            </div>
            <button type='submit' className='add-btn'>Add Item</button>
        </form>
    </div>
  )
}

export default Add
