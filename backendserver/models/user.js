import mongoose from "mongoose";

const Schema = mongoose.Schema;


const UserSchema = new  Schema({
    name: { type:String ,required:true },
    email: { type:String ,required:true ,unique:true },
    password: { type:String ,required:true },
    role: { type:String ,default:'customer' },
}, {timestamps:true})

// first model=User ,second ==>schema ,third ==>collection and table name
export default mongoose.model('User',UserSchema,"users")