class apiError extends Error{
    constructor(
        statusCode, //constructor arguments
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        //constructor body
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {apiError};