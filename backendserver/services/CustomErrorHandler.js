
// Error is inbuilt class of js
class CustomErrorHandler  extends Error{

    constructor(status,msg){
        this.status=status
        this.msg=status

    }

    // creating static methods or function which does not need to create its objects

    static alreadyExist(message) {

        return new CustomErrorHandler(409,message) 
    }

}

export default CustomErrorHandler;