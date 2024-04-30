// import orderModel from "../models/OrderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
// import 'dotenv/config.js'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// //placing user order from the front-end
// const placeOrder = async (req, res)=>{

//     const frontend_url = "http://localhost:3000";
    
//     try{
//         const newOrder = new orderModel({
//             userId :  req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address

//         })
//         //once placing order, emptying cart
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

//         const line_items = request.body.items.map((item)=>({
//                 price_data: {
//                     currency:"inr",
//                     product_data:{
//                         name:item.name,

//                     },
//                     unit_amount:item.price*100
//                 },
//                 quantity:item.quantity
//         }))

//         line_items.push({
//             price_data:{
//                 currency : 'inr',
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:20*100
//             },
//             quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         })

//         res.json({success:true, session_url:session.url})


//     }catch(err){
//         console.log(err);
//         res.json({success:false,message:"Error"})
//     }


// }




import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//Receive the order which is received from the user

const placeOrder = async (req,res) =>{

    const frontend_url= "http://localhost:3000"

    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        //cleaning the users cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        //to connect stripe 
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity

        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges",
                },
                unit_amount:20*100
            },
            quantity:1
        })
        console.log("Stripe object before creation:", stripe); 
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`

        }
    )
        console.log("Stripe object after creation:", stripe);
        res.json({success:true,session_url:session.url})
            
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error in confirming order"})

    }
}

//getting user orders for frontend
const userOrders = async (req, res)=>{
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data: orders})

    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId, success} = req.body;
    try{
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true, message:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not paid"})
        }
    }catch(err){
        console.log(err)
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder, userOrders, verifyOrder}