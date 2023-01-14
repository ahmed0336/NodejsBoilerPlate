import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
const errorHandler = (err, req ,resp ,next) => {

    // by default error show 
    let statusCode =500;
    // 
    let data = {
        message:"Internal Server Error",
        // yeh error humein validator joi se aa rha hai err kr ke nkleyge
        // magr yeh error(server ki internal detail wali) development ke time to sai hai show krna magr production(live) ke time yeh show krna sai nai hai for security  
        // is liye hum ko condition me khileyga development or production ke
        // we use spread syntax
        // agar debuge mode true hai tou aage ke and(&&) ke bad wli condition chaleyge wrna nai
        ...(DEBUG_MODE === 'true' && {originalError:err.message})
    }

    // validation ==>joi yeh class provide kr rha hai
    if(err instanceof ValidationError ){

        // let hamesha ek dafa hi declear hota hai smjha
         statusCode = 422;
        data = {
            message:err.message
        }

    }

    // customError

    if(err instanceof CustomErrorHandler){
     
        statusCode=err.status
        data ={
            message:err.message
        }


    }


    return resp.status(statusCode).json(data)



}


export default errorHandler;