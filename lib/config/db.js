import { mongoose } from "mongoose"






export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://abdinurkune:abdinoor1234@cluster0.thvfo.mongodb.net/todo-app")
console.log("Db connected");


}
