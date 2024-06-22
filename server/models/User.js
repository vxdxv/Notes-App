import mongoose from "mongoose";
const Schema=mongoose.Schema;
const userSchema=new Schema({
    googleId:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },

},{collection:"userInfo"});
var userSchemas = mongoose.model("userInfo", userSchema);
export default userSchemas;