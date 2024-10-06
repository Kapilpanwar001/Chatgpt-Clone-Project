import errorResponse from "../utils/errorResponse.js";

const errorHandler = (err,req,res,next) => {
    const errCopy = {...err}
    errCopy.message = err.message

    //mongoose cast error 
    if(errCopy.name === 'castError'){
        const message = 'Resources Not Found';
        error = new errorResponse(message,404);
    }

     //duplicate key error    
    if(errCopy.code === 11000){
        const message= "Duplicate field value entered";
        error = new errorResponse(message,400);
    }

    //mongoose validation

    if(errCopy.name === "Validation Error"){
        const message = Object.values(errCopy.errors).map((val)=>val.message);
        error = new errorResponse(message,400);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
        });
    }
};

export default errorHandler;