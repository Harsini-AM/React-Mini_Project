import itemModel from "../models/Items.js";
import fs from 'fs'

// add item

const addItem = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const item = new itemModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })

    try{
        await item.save();
        res.json({success:true, message:'Item addded'})
    }catch(err){
        console.log(err)
        res.json({success:false, message:'Error'})
    }
}

// all items
const itemList = async (req,res)=>{
    try{
        const items = await itemModel.find({});
        res.json({success:true, message:items})
    }catch(err){
        console.log(err);
        res.json({success:false, message:'Error'})
    }
}


//remove food item
const removeItem = async (req,res)=>{
    try{
        const item = await itemModel.findById(req.body.id);
        //removing from uploads folder
        fs.unlink(`uploads/${item.image}`, ()=>{})
        //removing from mongo atlas
        await itemModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:'Item removed'})
    }catch(err){
        console.log(err)
        res.json({success:false, message:'Error'})
    }
}
export {addItem, itemList, removeItem}