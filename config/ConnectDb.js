import mongoose from "mongoose";
 const connectDb=async()=>{
await mongoose.connect(process.env.URI).then(()=>{
console.log("Connected To MongoDb")
})
}
export default connectDb