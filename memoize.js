"use strict";

let arrayEquals = (arr1, arr2) => {
    var isEquals = true;
    if (arr1.length != arr2.length) return false;
    
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) isEquals = false;
    }
    
    return isEquals;
};

let memoize = function (fn) {
    let cache = {};
    let functionName = fn.name;
    return (...args) => {
        let result;
        if (functionName in cache) {
            cache[functionName].forEach(cachedResult => {
                if (arrayEquals(args, cachedResult.args)) {
                    result = cachedResult.result;
                }
            });
            if (typeof result !== "undefined")
            {
                console.log("cached data found");
                return result;
            }
        } else {
            cache[functionName] = [];
        }
        result = fn.apply(null, args);
        cache[functionName].push({
            args: args,
            result: result
        });
        return result;
    };
};

let cache = function (fn) {
    let cache = {};
    let functionName = fn.name;
    return (...args) => {
        let result;
        let hitCount = 0;
        if (functionName in cache) {
            cache[functionName].forEach(cachedResult => {
                if (arrayEquals(args, cachedResult.args)) {
                    result = cachedResult.result;
                    cachedResult.hitCount++;
                    hitCount = cachedResult.hitCount;
                }
            });
            if (typeof result !== "undefined")
            {
                console.log("cached data found");
                return {result, hitCount};
            }
        } else {
            cache[functionName] = [];
        }
        result = fn.apply(null, args);
        cache[functionName].push({
            args: args,
            result: result,
            hitCount: 0
        });
        return {result, hitCount};
    };
}

var cachedMultiply = cache(x => x * 2);
var cachedTriple = cache(x => x * 3);

console.log(cachedMultiply(2));
console.log(cachedMultiply(2));
console.log(cachedTriple(2));
console.log(cachedTriple(2));

var memoizedMultiply = memoize(x => x * 2);
var memoizedTriple = memoize(x => x * 3);

console.log(memoizedMultiply(2));
console.log(memoizedMultiply(2));
console.log(memoizedTriple(2));
console.log(memoizedTriple(2));