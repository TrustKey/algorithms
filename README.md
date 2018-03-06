### Algorithms

Algorithms for TrustKey [supervisor][0]. 

##random_int_rs0
Generates random integer in range from min to max(noninclusive) based on seed represented by base64 string, node.js Buffer or promise, returning string of buffer.
Uses rejection sampling approach perfectly described by Dimitri DeFigueiredo [here][1].

`May not generate result with ~1/(2^(seed_length / 4)) chance according to the rejection sampling approach. Use long enough seeds!`

#####Examples using [supervisor][0] repl interface:

Create promise with argon2 seed generator:
```javascript
‌‌services.promise.createPromise({
    "promise_alg": "random_int_rs0", 
    "min": 0,  //must be >= 0
    "max": 10, //must be < 2^32
    "b64_buffers": true, //Base64 encode node js buffers 
    seed: {"promise_alg": "trustkey_argon2d", "server_id": "D000000000000000", "trustkey_ts": 1520364270, "n_bytes": 64}}, (res) => { console.log(res)})

```

Result:
```javascript
{ success: true,
  result: 
   { promise_alg: 'random_int_rs0',
     min: 0,
     max: 10,
     seed: 
      { promise_alg: 'trustkey_argon2d',
        server_id: 'D000000000000000',
        trustkey_ts: 1520364270,
        b64_buffers: true,
        seed: '9thvN3DP9hn0MKwh9GCPe8D0RRfwwx4B1ORJaYDhc4TTMbWb1G6BPxP7+Yi0vLeOg5/MWkpT8DsYItn4SWKjFw==' } } }
```

Resolving promise: 
```javascript
{ success: true, result: 4 }
```

[0]: https://github.com/TrustKey/supervisor
[1]: http://dimitri.xyz/random-ints-from-random-bits/