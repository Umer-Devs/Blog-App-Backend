import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { dbName } from '../constant.js';
dotenv.config({
    path :'./.env'
});


const connectDb =  async ()=>{
    try {
       await mongoose.connect(`${process.env.DB_URL}/${dbName}`);

        console.log("database is connected sucessfully");
        
    } catch (error) {
         console.log("failed to connect with database",error);
         
    }
}
export {connectDb}