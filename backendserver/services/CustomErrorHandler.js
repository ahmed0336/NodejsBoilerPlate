
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


}

export default CustomErrorHandler;