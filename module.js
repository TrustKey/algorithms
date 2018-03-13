module.exports = function setup(options, imports, register) {
    const promise = imports.promise;

    const random_int_rs0 = require('./algorithms/random_int_rs0/random_int_rs0');
    const random_int_rs0_constructor = require('./algorithms/random_int_rs0/random_int_rs0_constructor');

    promise.postAlgorithm(random_int_rs0);
    promise.postAlgorithm(random_int_rs0_constructor);

    console.log("algorithms module setup");

    register(null, {
        random_int_rs0: random_int_rs0,
        random_int_rs0_constructor: random_int_rs0_constructor
    });
};