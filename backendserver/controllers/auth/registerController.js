import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import bcrypt from 'bcrypt' 

import { User } from '../../models'

const registerController = {




   async  register(req, res, next) {

        // we use built-in validation library like joi for validation
    // validation

        const registerSchema = Joi.object({

            name: Joi.string().min(3).max(30).required(),
            email:Joi.string().email().required(),
            password:Joi.string().pattern( new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password:Joi.ref('password')
        })
    

    //   catching error from joi validate 

    console.log("req.body",req.body);

    const { error } = registerSchema.validate(req.body)


    if(error){
        // yeh joi ke validate error check kregea req.body se aae ga ,yeh error handling middleware ke next ke tareqe se 422 errors ,
        // extra errors ke lye hum apna customer errorhandler ki class banaege 
        // yeh next jab chaleyga jab error hoga validation me phir yeh humere errorhandler me jae ga ,error bhejta like next(next==>for joi etc)
        return next(error)
    }

    // now for customer errorHandler like unauthorize ,email already existed

    // check if user is in the database already
    
    try{

        // exists mongodb query hai
        const exist = await User.exists({email:req.body.email})


        console.log("try",exist)

        

        if(exist){


            console.log("if")

            return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
        }

            //  catch me jo error aae ga wo na tou validation ka na tou customerror ka yeh default me hoga
            // yeh catch jae ga apna middleware me express ka hai wo phir us me se default ko pich krega
            // try and catch ==>is lye use kia hai incase database me se error aae tou try and catch se handle karege
    } catch(err){

        console.log("catch",err)

        return next(err);

    }

    const  { name , email ,password } = req.body;
      
    // hash-password ,means  secure 0r hide password

    const hashedPassword = await bcrypt.hash(password,10)

    // destructure ka object

   


   const user = new User({
    name:name,
    email:email,
    password:hashedPassword
    
    })

   let access_token

   try{
    // save user input data in live database store
    const result = await user.save();

    console.log("result==>",result)
    // now create JWT Token
    access_token = JwtService.sign({
        _id:result.id,
        role:result.role
    })


   } catch(err){

    return next(err)

   }

        res.json({ access_token:access_token});

    }

}


export default registerController;