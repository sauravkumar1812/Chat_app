import { url } from "inspector";
import { model, models, Schema, Types } from "mongoose";

const Schema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    content: {
      type: String,
    },
    attachments: [
      {public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }},
    ],
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", Schema);