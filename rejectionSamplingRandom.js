const crypto = require('crypto');

module.exports = (seed, min, max) => {
    let bufferOffset = 0;

    const diff = max - min; //Maximum number in range from min to max

    let nBits = 0; //Number of bits required to store diff
    for (let val = diff; val > 0; val >>= 1)
        nBits++;

    let nBytes = Math.ceil(nBits / 8);
    const bitMask = (1 << nBits) - 1;

    while(true) {
        if((bufferOffset + 4)  > seed.length) //No more bytes available
            return null;

        let res = seed.readUInt32LE(bufferOffset); //Read up to 4 bytes
        res &= bitMask; //Apply bitMask to receive value in range from 0 to 2^nBits

        if(res < diff) //We've found value in appropriate range
            return res + min;

        bufferOffset += nBytes; //Read next bytes
    }
};