const RandomInt = require('./algorithms/Random_int_rs0');

module.exports = function setup(options, imports, register) {
    const promise = imports.promise;

    promise.postAlgorithm(new RandomInt(imports));

    console.log("algorithms module setup");

    register(null, {
    });
};