import userModel from '../models/userModel.js'
 
 
//add items to user cart
 
const addToCart = async(req,res) =>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        //when the item is not present in the usercart the count is 1,if the item is already present in the cart just increase the count
        //and update the user cart using cartData
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        //updating the usercart in database
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"})
 
    }
    catch(error){
        console.log('error');
        res.json({success:false,message:'Error'});
 
    }
 
}
 
 
//remove items from user cart
 
const removeFromCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId)
        //getting the cart details from db
        let cartData = await userData.cartData;
        //check if the data is present in cart
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from Cart!"})
    }
    catch(error){  
        console.log(error)
        res.json({success:false,message:"Error"})
 
    }
}
 
//fetch user cart data
 
const getCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
 
}

const deleteCartItem = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId)
        //getting the cart details from db
        let cartData = await userData.cartData;
        //check if the data is present in cart
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]=0;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed from Cart!"})
    }
    catch(error){  
        console.log(error)
        res.json({success:false,message:"Error"})
 
    }
}
 
 
export{addToCart,removeFromCart,getCart, deleteCartItem}