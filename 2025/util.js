export function getTiming(func, input, name = 'function') {
    const start = performance.now();
    const result = func(input)
    const end = performance.now();

    console.log(`${name} took ${end - start} ms`)

    return result;
}