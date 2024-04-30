import React from 'react'
import './Final.css'
import { useNavigate } from 'react-router-dom'
const Final = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className='order-placed'>
        <p>Thank you for your order! Expect delivery within just one day from the date of your purchase. Happy shopping 🛒</p>
    </div>
    <button onClick={()=>navigate('/my-orders')}>Back to orders page</button>
    </>
  )
}

export default Final
