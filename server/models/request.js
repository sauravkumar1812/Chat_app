import { url } from "inspector";

import mongoose ,{ model,Schema } from "mongoose";

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


export const Request =mongoose.models.Request || model("Request", Schema);