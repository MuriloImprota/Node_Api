class AppError{ // A class for error treatments
    message;
    statusCode;
    
    constructor (message, statusCode = 400){ // create a constructor, and as parameter, we associate message and statuscode
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;