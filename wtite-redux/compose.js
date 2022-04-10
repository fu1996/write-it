function compose(...funcs) {
    return function(...args) {
        const lastFn = funcs[funcs.length - 1];
        const fns = funcs.slice(0, funcs.length - 1);
        return fns.reduceRight((result, fn) => 
        fn(result),
        lastFn(...args));
    }
}

// function f(x) { console.log(f); return x*x }
// function g(x) { console.log(g); return x*2 }
// function h(x) { console.log(h); return x+1 }


// const res = compose(f,g,h)(2)

// console.log('res: ', res); // 36

export default compose;
