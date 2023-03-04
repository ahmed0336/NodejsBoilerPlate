import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const UserController = {

 //method 

 async me(req,resp,next){

    // get ki api hai tou humein validation ke need nai hai direct 
    // query lagae ge database ka

   try{
//   agar koi database me _id  jo req.user._id yeh use krne ke lye humein ek middleware bana hoga ,yeh sub protected routes jo specific ko access hoge

// yeh function jo hai wo middleware ke bad chaleyga middleware se hum jwt se user ka object bnae ga aur us me id ,role daleyge
    const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');

    if(!user){

        return next(CustomErrorHandler.notFound())
    }

    console.log("myuser==>",user)

    resp.json(
        user
    
    )
   } catch(err){

    console.log("err",err)

    return next(err)

   }

  }

};



export default UserController;