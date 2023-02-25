import { JWT_SECRET } from "../config";
import  Jwt  from "jsonwebtoken";
class JwtService  {

    // in jwtservice we create or sigin  token
    // jwt server ko bhejey phir wo usko verify krta hai
    // paylaod token me kya save krna hai
    static sign(paylaod ,expiry ="60" , secret =JWT_SECRET)
    {

        return  Jwt.sign(paylaod ,secret,{ expiresIn:expiry })


    }
}


export default JwtService