import { JWT_SECRET } from "../config";
import  Jwt  from "jsonwebtoken";
class JwtService  {

    // in jwtservice we create or sigin  token
    // jwt server ko bhejey phir wo usko verify krta hai
    // paylaod token me kya save krna hai
    static sign(paylaod ,expiry ="60s" , secret =JWT_SECRET)
    {

        return  Jwt.sign(paylaod ,secret,{ expiresIn:expiry })


    }
// yahan hum check krge verify kareg token  
    static verify(token , secret =JWT_SECRET)
    {
    //    nichy jo verify likha hai jo jwt library ka function hai 
    // yeh humry token ko verify krge jwt library se
        return  Jwt.verify(token ,secret)
    }
}


export default JwtService