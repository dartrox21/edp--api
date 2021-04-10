const bcrypt = require('bcrypt');
const CustomValidateException = require('../exceptionHandler/CustomValidateException');
const CustomErrorMessages = require('../exceptionHandler/CustomErrorMessages');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');

/** 
 * Wrapper used for the routes to manage all the errors in the Service layer.
 * Thanks to this wrapper promisses can be handled easier.
 * 
 * BEFORE 
 * Imagine a simple method that calls another to save a user in the DB.
 * In thtat case we would've to set a then and a catch to handle the error.
 * This is justo with one request, but in some cases we need multiple requests from the DB
 * a try catch block would help us to handle the error and minimize the catch for each request.
 * 
 *  await UserRepository.save(user)
 *   .then(userCreated => res.status(HttpStatus.CREATED).json(userCreated))
 *   .catch(err => next(handleMongooseError(err)));
 * 
 * 
 * 
 * NOW - SOLUTION IMPLEMENTING THIS WRAPPER
 * The wrapper handdles automatically all the mongoose Errors & other Errors such 
 * as Custom Errors that could be thrown
 * 1.- In the route router.post('/user', clean, asyncWrapper(UserService.create));
 * 2.- In the service:
 * 
 * const userCreated = await UserRepository.save(user);
 * res.status(HttpStatus.CREATED).json(userCreated);
 * 
 * 
 * 
 * CUSTOM EXCEPTION
 * Send a custom exception and let the wrapper handdle it, it is as simple as:
 * throw CustomValidateException.conflict().errorMessage(CustomErrorMessages.EMAIL_ALREADY_USE).build();
 * 
 * 
 * When we used to call next('error') the code flow would keep running.
 * But throwing errors stops the flow and calls directly to the wrapper to handdle it.
 */
function asyncWrapper(callback) {
    return function(req, res, next) {
        callback(req, res, next)
            .catch(err => {
                if(err instanceof mongoose.Error) {
                    err = handleMongooseError(err);
                }
                next(err);
            });
    }
}

/**
 * Function used to verify if a user has one or more roles
 * @param User user object
 * @param Array string of  roles 
 */
function userHasAuthority(user, roles) {
    return roles.includes(user.role);
}

/**
 * Async function used to encrypt a password
 * @param string password to be encrypted
 */
async function encrypt(password) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
/**
 * Function used to retun a CustomValidateException with the mongoose error handled.
 * Just the first error found will be returned.
 * @param error Mongoose Error
 */
function handleMongooseError(error) {
    console.log('Handle Mongoose Error')
    console.log(error)
    const field = error.stringValue ;
    const props = error.path;
    return CustomValidateException.status(HttpStatus.BAD_REQUEST)
      .setField(props)
      .setValue(field)
      .errorMessage(CustomErrorMessages.MONGOOSE_ERROR).build();
};

/**
 * Function used to build a pageable object that can be send in a Response object
 * @param list List with the elements
 * @param page number of page
 * @param limit limit. Must be numeric
 * @param count count. Must be numeric
 * @returns Pageable object
 */
async function buildPageableResponse(list, page, limit, count) {
    page = page === 0 ? 1 : page + 1;
    pages = parseInt(count / limit);
    const pageable = {
        content: list,
        page,
        limit,
        totalElements: count,
        nextPage: page * limit < count ? true : false,
        pages: pages === 0 ? 1 : pages,
        contentCount: list.length
    };
    return pageable;
}

module.exports = {
    userHasAuthority,
    encrypt,
    handleMongooseError,
    asyncWrapper,
    buildPageableResponse
}
