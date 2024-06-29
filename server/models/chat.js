import { url } from "inspector";

import mongoose ,{ model,Schema,Types } from "mongoose";

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


export const Chat =mongoose.models.Chat || model("Chat", Schema);