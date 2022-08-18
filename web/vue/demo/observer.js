export class Observer {
    constructor(value) {
        this.value = value;
        // 给value增加一个__ob__属性，值为该value的Observer实例
        def(value, "__ob__", this);
        if (Array.isArray(value)) {
            // 当value为数组时
        } else {
            this.walk(value);
        }
    }
    walk(obj) {
        // const keys = Object.keys(obj);
        // for (let i = 0; i < keys.length; i++) {
        //     defineReactive(obj, keys[i])
        // }
        for (let key in obj) {
            defineReactive(obj, key);
        }
    }
}

function defineReactive(obj, key, value) {
    // 如果只传了obj与key，那么value = obj[key]
    if (arguments.length === 2) {
        value = obj[key];
    }
    if(typeof value === "object") {
        new Observer(val);
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`${key}属性被读取了`);
            return val;
        },
        set(val) {
            if (value === val) {
                return;
            }
            console.log(`${key}属性被修改了`);
            value = val;
        }
    })
}