import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type: String, required:true},
    price:{type:Number, required:true},
    image:{type:String, required:true},
    category:{type:String}
})

// if a model is already there use that else create a new model
const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);

export default itemModel;