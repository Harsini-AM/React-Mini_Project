import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:{errormsg:'Please check your email-id and try again'}})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false, message:{errormsg:'Invalid credentials'}})
        }else{
            const token = createToken(user._id);
            return res.json({success:true, token})
        }
    }catch(err){
        console.log(err)
        return res.json({success:false, message:{errormsg:'Error in login'}})
    }

}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:{errormsg:'User already exists'}})
        }

        //validation of email
        if(!validator.isEmail(email)){
            return res.json({success:false, message:{label:"email",errormsg:'Please provide valid email'}})
        }

        if(password.length<8){
            return res.json({success:false, message:{label:"password",errormsg:'Password length should be atleast 8 characters'}})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token:token})

    }
    catch(err){
        console.error(err)
        res.json({success:false, message:{errormsg:'Error in registration'}})
    }
}
export {loginUser, registerUser}