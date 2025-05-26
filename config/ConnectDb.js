import mongoose from "mongoose";
 const connectDb=async()=>{
await mongoose.connect("mongodb://localhost:27017/").then(()=>{
console.log("Connected To MongoDb")
})
}
export default connectDb