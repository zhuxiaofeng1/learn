let n:number = 5;
for (let i:number = 0; i < n; i++) {
    console.log(i);
}
// for...in...
let key:string;
// let str:any = "abcdefg";
let str:any = {a: 1, b:2};
for (key in str) {
    console.log(key);
}
// for...of...
let ofKey: any;
let ofArray: any = [1, "string", true];
for (ofKey of ofArray) {
    console.log(ofKey)
}
// forEach
let loopList:number[] = [4,5,6];
loopList.forEach((item, index, array) => {
    console.log("forEach 元素：", item);
    console.log("forEach 序列：", item);
    console.log("forEach 原数组：", item);
})
// map 返回一个新数组
let mapReultList: number[] = loopList.map((item, index, array) => {
    console.log("map 元素：", item);
    console.log("map 序列：", index);
    console.log("map 原数组：", array);
    return item + 1;
})
// every
let testList: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
let everyListResult: boolean = testList.every((item, index, array) => {
    return item > 0;
})
console.log("every > 0: ", everyListResult);
// some 不会改变原数组
let someListResult: boolean = testList.some((item, index, array) => {
    return item > 0;
})
console.log("some > 0: ", someListResult);
// reduce
let reduceResultList: number = testList.reduce((prev, cur, index, array) => {
    console.log("prev: ", prev);
    console.log("cur: ", cur);
    console.log("index: ", index);
    console.log("array: ", array);
    return prev + cur;
})
let reduceRightResultList: number = testList.reduceRight((prev, cur, index, array) => {
    console.log("prev: ", prev);
    console.log("cur: ", cur);
    console.log("index: ", index);
    console.log("array: ", array);
    return prev + cur;
})
console.log("reduce result: ", reduceResultList);
console.log("reduceRight result: ", reduceRightResultList);
// filter
let filterList: number[] = testList.filter(item => {
    return item > 0;
})
console.log("filter result: ", filterList);

let whileN: number = 0;
while(whileN < 5) {
    console.log("while loop: ", whileN);
    whileN++;
}
