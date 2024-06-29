import { url } from "inspector";
import { model,models,Schema } from "mongoose";


const Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unquie:true
    },  
    password:{
        type:String,
        required:true,
        select : false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{   
            type:String,
            required:true
        }
    }
},{timestamps:true});


export const User =models.User || model("User", Schema);