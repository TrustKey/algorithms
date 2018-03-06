const Validator = require('jsonschema').Validator;
const v = new Validator();
const errorCodes = require('../errorCodes');
const rejectionSampling = require('../rejectionSamplingRandom');

const createPromiseRequestSchema = {
    "type": "object",
    "properties": {
        "min": {
            "type": "integer",
            "required": true
        },
        "max": {
            "type": "integer",
            "required": true
        },
        "seed": {
            "required": true
        }
    }
};

const maxNumber = Math.pow(2, 32);

module.exports = class RandomInt {
    constructor(imports) {
        this.imports = imports;
        this.promise = imports.promise;
        this.name = "random_int_rs0";
    }

    validateRequest(request, callback) {
        const vRes = v.validate(request, createPromiseRequestSchema);

        let response = { };

        const respondWithError = (ec) => {
            response.success = false;
            response.error_code = ec;
            response.error = errorCodes[ec];

            callback(response);
        };

        if(vRes.errors.length) {
            response.validation_errors = vRes.errors;
            return respondWithError(1);
        }

        if((request.min < 0) || (request.min >= request.max) || (request.max > maxNumber))
            return respondWithError(4);

        callback({
            success: true,
            result: request
        });
    }

    createPromise (request, callback) {
        //Validate request and create sub promise for seed generator
        this.validateRequest(request, (validationResponse) => {
            if(!validationResponse.success)
                return callback(validationResponse);

            this.promise.tryCreatePromise(validationResponse.result.seed, (seedPromise) => {
                if(!seedPromise.success)
                    return callback({
                        success: false,
                        error_code: 6,
                        error: errorCodes[6],
                        error_data: seedPromise
                    });

                validationResponse.result.seed = seedPromise.result;
                callback(validationResponse);
            });
        });
    };

    resolvePromise (request, callback) {
        this.validateRequest(request, (vRes) => {
            if(!vRes.success)
                return callback(vRes);

            this.promise.tryResolvePromise(request.seed, (seedResolutionRes) => {
                if(!seedResolutionRes || !seedResolutionRes.success)
                    return callback({
                        success: false,
                        error: errorCodes[3],
                        error_code: 3,
                        error_data: seedResolutionRes
                    });

                let seedBytes = seedResolutionRes.result;

                if(typeof (seedBytes) === 'string')
                    seedBytes = Buffer.from(seedBytes, 'base64');

                if(!Buffer.isBuffer(seedBytes) || (seedBytes.length % 4 !== 0))
                    return callback({success: false, error_code: 2, error: errorCodes[2]});

                const result = rejectionSampling(seedBytes, request.min, request.max);
                if(!result)
                    return callback({
                        success: false,
                        error_code: 5,
                        error: errorCodes[5]
                    });

                callback({
                    success: true,
                    result: result
                });
            });
        });
    };
};