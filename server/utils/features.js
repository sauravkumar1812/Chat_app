import mongoose from "mongoose";
const connectDB=(uri)=>{
    mongoose.connect(uri, { dbName: 'chat-app', })
    .then((data) => console.log(`Database connected on :${data.connection.host}`))
    .catch((err) => console.log(err));
}

export default connectDB;