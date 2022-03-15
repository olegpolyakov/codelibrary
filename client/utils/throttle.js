export default function throttle(fn, ms) {
    const cache = {};
    let timeout;

    return (...args) => {
        cache.lastArgs = args;

        if (!timeout) {
            timeout = setTimeout(() => {
                fn(...cache.lastArgs);
                clearTimeout(timeout);
                timeout = null;
            }, ms);
        }
    };
}