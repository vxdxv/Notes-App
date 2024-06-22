import mongoose from "mongoose";
const Schema=mongoose.Schema;
const notesSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    borderColor:{
        type:String
    }
},{collection:"Note_info"});
var notesSchemas=mongoose.model("Note_info",notesSchema);
export default notesSchemas;
