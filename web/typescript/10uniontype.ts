// 变量
let val: string|number;
val = 12;
console.log(val);
val = "abc";
console.log(val);
// 函数参数
function disp(name: string | string[]): void {
    console.log(name);
}
console.log(disp("zhu"));
console.log(disp(["zhu", "xiao", "feng"]));

let arr: number[] | string[];
arr = [1,2,3,4];
console.log(arr);
arr = ["a", "b", "c", "d"];
console.log(arr);