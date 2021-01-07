const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class BjPromise {

    constructor(fn) {
        this.state = PENDING;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        //成功态回调
        const resolve = value => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED;
                    this.value = value;
                    this.onFulfilledCallbacks.map(cb => {
                        this.value = cb(this.value);
                    })
                }
            })
        };

        //拒绝态回调
        const reject = reason => {
            setTimeout(() => {
                    if (this.state === PENDING) {
                        this.state = REJECTED;
                        this.reason = reason;
                        this.onRejectedCallbacks.map(cb => {
                            this.reason = cb(this.reason);
                        })
                    }
                }
            )
        };

        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        typeof onFulfilled === 'function' && this.onFulfilledCallbacks.push(onFulfilled);
        typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
        // 返回this支持then方法可以被同一个 promise 调用多次
        return this;
    }
}

BjPromise.deferred = function () {
    let defer = {};
    defer.promise = new AjPromise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
};

module.exports = BjPromise;