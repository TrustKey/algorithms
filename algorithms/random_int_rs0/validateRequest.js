const schema = require('./schema');
const errorCodes = require('../../errorCodes');
const Validator = require('jsonschema').Validator;
const v = new Validator();

const maxNumber = Math.pow(2, 32);

module.exports = (request, resolve, reject) => {
    const vRes = v.validate(request, schema);

    let response = { };

    const respondWithError = (ec) => {
        response.success = false;
        response.error_code = ec;
        response.error = errorCodes[ec];

        reject(response);
    };

    if(vRes.errors.length) {
        response.validation_errors = vRes.errors;
        return respondWithError(1);
    }

    if((request.min < 0) || (request.min >= request.max) || (request.max > maxNumber))
        return respondWithError(4);

    resolve();
};