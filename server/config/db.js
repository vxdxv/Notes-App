import mongoose from 'mongoose';
mongoose.set('strictQuery',false);
const connDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://vedavijayshankarxia6:jgkk5ZMPAunqB10Z@cluster0.2xyyxmq.mongodb.net/");
        console.log("DB connected on"+conn.connection.host);
    } catch (error){
        console.log(error);
    }
}
export default connDB;