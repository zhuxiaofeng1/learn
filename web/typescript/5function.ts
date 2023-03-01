function test() {
    console.log("test");
}
test();
function returnTest(): number {
    return 1;
}
console.log(returnTest());
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,3));
function buildName(first: string, last?: string): string {
    return first + last;
}
console.log(buildName("Zhu"));
console.log(buildName("Zhu", "xf"));
function buildNameAdance(first: string, ...names: string[]): string {
    return first + names.join(" ");
}
console.log(buildNameAdance("Zhu", "xiao", "feng"));

function addNumbers(...nums: number[]): number {
    let total: number = 0;
    nums.forEach(num => {
        total += num;
    })
    return total;
}
console.log(addNumbers(1,2,3));

let func = function(): string {
    return "hello";
}
console.log(func());
let res = function(x: number, y:number) :number {
    return x * y;
}
console.log(res(4,5));
// 构造函数 var res = new Function([arg1[, arg2[, ...argN]],] functionBody)
let myFunction: any = new Function("a", "b", "return a * b");
console.log(myFunction(3, 4));