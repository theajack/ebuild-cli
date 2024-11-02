
export function withResolve<T=any> () {
    let resolve: (value?: T|PromiseLike<T>)=>any = () => {}, reject: (error?: any)=>any = () => {};
    const ready = new Promise<T>((_resolve, _reject) => {
        // @ts-ignore
        resolve = _resolve;
        reject = _reject;
    });
    return { ready, resolve, reject };
}