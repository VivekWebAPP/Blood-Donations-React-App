import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    blood_group:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
},{timestamps:true});

const User = mongoose.model('User',UserModel);

export default User;