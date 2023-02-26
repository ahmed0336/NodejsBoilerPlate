import mongoose from "mongoose";

const Schema = mongoose.Schema;


const UserSchema = new  Schema({
    name: { type:String ,required:true },
    email: { type:String ,required:true ,unique:true },
    password: { type:String ,required:true },
    role: { type:String ,default:'customer' },
}, {timestamps:true})

// first model=User ,second ==>schema ,third ==>collection and table name
// third wala humera collection(table) ka name hai agr third wala hum na likhe ge tou wo by default model ke nam se table (collection ) banae ga 
// export default mongoose.model('User',UserSchema,"baloch",)
export default mongoose.model('User',UserSchema,"users",)