import Joi from "joi"
import { User } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"
import bcrypt from 'bcrypt' 
import JwtService from "../../services/JwtService"
const loginController = {

    // create router with call back in call function we create this controller function 
    // first steps create function which take req.body data from user in post or website
    //second create schema with joi validation
    // then check if req,body containing error aur not


   async  login(req,resp,next) {
      
        // create schema for login

       const loginschema =Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
       }) 


    // now check user ne kya bheja hai post se ya website se
    console.log("req.body",req.body)   

    // object destructuring kr rhy hai  { error  } ko nikal rhy hai validate ke object se 
    // validate object check kr hi hai req,body me se koi error aa rha hai 
     
   const { error } = loginschema.validate(req.body)

 // now check whether error is exist or not in req.body with joi      

 if(error) {

 // yeh joi ke validate error check kregea req.body se aae ga ,yeh error handling middleware ke next ke tareqe se 422 errors ,
//  next(errorhandle) ,next middleware hai jo humera errorhandler me jae is error
    return next(error)

 }

//  validator apna error check ke find kr leyga validation ke time
// ab bari hai ke server ya database me koi error to nai hai usko humein try and catch ke zarie pakarna hai

  try{

    // ab query lagae ge mongodb ka hai data get aur check krne ke lye
    // {email:req.body.email} 
    // mgodb(email):(email) yeh humra hai jo post man se bhej rhy hai
    const user = await User.findOne({email:req.body.email}).select('-createdAt -updatedAt -__v ')

    // first check kia email mojood hai ya nai database me  
    if(!user){

        // wrongCredentials() ko error pass nai krge wo wrongcrdential ka bydefault error uthae ga
        return next (CustomErrorHandler.wrongCredentials())

    }

    console.log("user==>",user)

    // second password ke lye check krge ge ,user ke pass ko compare krge database ke password se
    // now bcrypt ke throw humein apne decrypt password ko compare krge 

    const match = await bcrypt.compare(req.body.password ,user.password)
    
    if(!match){
        return next (CustomErrorHandler.wrongCredentials())

    }  

    // if agara match hota hai tou token generate kreg

    // now create JWT Token
    // ab yahan hum apna jwtService apna hai sign ka usko yeh dono cheezy database se hum mangwa tha ab usko is function me pass kr rhy hai 
    let  access_token = JwtService.sign({
        _id:user.id,
        role:user.role,
    })

    // again run this query because to remove password from client
    const UserDetail= await User.findOne({email:req.body.email}).select('-password -createdAt -updatedAt -__v ')

    resp.json({
        access_token,
        UserDetail

    })




  } catch(err){

    return next(err)

  }
 


    }



}


export default loginController