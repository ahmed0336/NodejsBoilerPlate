import CustomErrorHandler from "../services/CustomErrorHandler"
import JwtService from "../services/JwtService"

 const auth  = async  (req,resp,next) =>{

   const authHeaders = req.headers.authorization
   
//  next steps agar authheader nai hai mltb token nai bheja hai  ,token nai hai tou error show   
// agar banana hoga wo bhi customer ,isko us me bhejna hoga

if(!authHeaders){
    return next(CustomErrorHandler.UnAuthorized())

}

const token = authHeaders.split(' ')[1]

console.log("token==>",token)

// we get toke now we verify token

try {

    // yahan hum jwt k services ley jis me hum verify ka function bnae ge
    // -id and role hum jwt se leyge ,jo ek library jo jwt token banat hai phir us me id and role hota hai

    // verify function me hum apna token bhej wo khud verify krega
   const { _id, role } = await JwtService.verify(token);

//    ab hum apne req jo rha hai wo ek object hai tou us me . kr ke new propert add kr ge 

// create new object of user put values in it from jwt 


// yeh three tarha likh skhte hai

//1) req.user ={}
//  req.user._id =_id
//  req.user.role =_role

//2)  const user = {
//     _id:_id,
//     role:role,
//  }
// 3) _id and role jwt se aa rha hai
 const user = {
    _id,
    role
 }
// req.user me upper wala object dal dia hai
 req.user = user;
// yeh normal middleware hai 
//agar isk andr next(abc) pass krge tou yeh smjhe yeh ek error hai jo baki middleware nai chaleyga
 next()

 

} catch(err) {
    console.log("auth==>err==>",err)
    return next(CustomErrorHandler.UnAuthorized())
}


// next()


}

export default auth