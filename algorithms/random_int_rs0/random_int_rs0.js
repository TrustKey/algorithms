const errorCodes = require('../../errorCodes');
const rejectionSampling = require('../../rejectionSamplingRandom');
const validateRequest = require('./validateRequest');

module.exports = {
    name: "random_int_rs0",
    resolve: (request, resolve, reject) => {
        validateRequest(request, () => { //validation succeeded
            let seedBytes = request.seed;

            if(typeof (seedBytes) === 'string')
                seedBytes = Buffer.from(seedBytes, 'base64');

            if(!Buffer.isBuffer(seedBytes) || (seedBytes.length % 4 !== 0))
                return reject({error_code: 2, error: errorCodes[2]});

            const result = rejectionSampling(seedBytes, request.min, request.max);
            if(!result)
                return reject({
                    error_code: 5,
                    error: errorCodes[5]
                });

            resolve(result);
        }, reject);
    }
};