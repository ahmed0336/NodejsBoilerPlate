
// Error is inbuilt class of js
class CustomErrorHandler  extends Error{

    // Super()

    // constructor(status,msg){

    //     super();

    //     this.status=status
    //     this.message=msg

    // }

    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    // creating static methods or function which does not need to create its objects

    static alreadyExist(message) {
        console.log("already==>",message)

        return new CustomErrorHandler(409,message) 
    }


    // yeh alag se is lye bana uski dono ka error(message) and status different hoga
    static wrongCredentials(message= "Username or Password is Wrong" ) {
        // console.log("already==>",message)

        return new CustomErrorHandler(401,message) 
    }


    static UnAuthorized(message= "UnAuthorized" ) {
        // console.log("already==>",message)
        

        return new CustomErrorHandler(401,message) 
    }

    static notFound(message= "notFound" ) {
        // console.log("already==>",message)

        return new CustomErrorHandler(404,message) 
    }



}

export default CustomErrorHandler;