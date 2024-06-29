import { url } from "inspector";
import { model,models,Schema } from "mongoose";


const Schema = new Schema({
    status: {
        type: String,
        default: "pending",
        enum : ["pending","sent","delivered","read"]
      },
    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiver: {
        type: Types.ObjectId,
        ref: "Chat",
        required: true,
      },
    
},{timestamps:true});


export const Request =models.Request || model("Request", Schema);