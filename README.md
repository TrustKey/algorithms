### Algorithms

Algorithms for TrustKey [supervisor][0]. 

## random_int_rs0
Generates random integer in range from min to max(noninclusive) based on seed represented by base64 string, node.js Buffer or promise, returning string of buffer.
Uses rejection sampling approach which is perfectly described by Dimitri DeFigueiredo [here][1].

`May not generate result with ~1/(2^(seed_length / 4)) chance according to the rejection sampling approach. Use long enough seeds!`


##### Examples using [supervisor][0] repl interface:

Construct promise with trustkey_argon2d constructor:
```javascript
services.promise.resolve({
    "_f": "random_int_rs0_constructor",
    "min": 0,  //must be >= 0
    "max": 10, //must be < 2^32
    "b64_buffers": true, //Base64 encode node js buffers 
    "seed": { "_f": "trustkey_argon2d_constructor",
        "server_id": "D000000000000000",
        "trustkey_ts": 1520364270, "n_bytes": 64}}, (res) => { console.log(res)})
```

Result:
```javascript
{ success: true,
   result: 
    { _f: 'random_int_rs0',
      min: 0,
      max: 10,
      b64_buffers: true,
      seed: 
       { _f: 'trustkey_argon2d',
         server_id: 'D000000000000000',
         trustkey_ts: 1520364270,
         seed: 'ZT2HgcJXFtCRhk8BgpIN8iXUk6XiZsKzHRt+IXW3N+5gmWynbUvNr6paA85I2sZoZXgfe54fQneqznlxcXdAMQ==' } } }
```

Resolving promise: 
```json
{ "success": true, "result": 7 }
```

[0]: https://github.com/TrustKey/supervisor
[1]: http://dimitri.xyz/random-ints-from-random-bits/