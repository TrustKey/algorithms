const errorCodes = require('../../errorCodes');
const validateRequest = require('./validateRequest');

module.exports = {
    name: "random_int_rs0_constructor",
    resolve: (request, resolve, reject) => {
        validateRequest(request, () => { //validation succeeded
            request._f = "random_int_rs0";
            resolve(request);
        }, reject);
    }
};