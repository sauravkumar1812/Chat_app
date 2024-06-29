import { url } from "inspector";
import { model,models,Schema, Types } from "mongoose";


const Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    groupChat:{
        type:Boolean,
        default:false
    },  
    creator:{
        type:Types.ObjectId,ref:"User"
        
    },
 members:[
     {
         type:Types.ObjectId,
         ref:"User"
     }
 ],
    // avatar:{
    //     public_id:{
    //         type:String,
    //         required:true
    //     },
    //     url:{   
    //         type:String,
    //         required:true
    //     }
    // }
},{timestamps:true});


export const Chat =models.Chat || model("Chat", Schema);