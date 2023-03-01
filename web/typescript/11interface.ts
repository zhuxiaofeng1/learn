// interface
interface IPerson {
    name: string,
    age: number,
    sex: string,
    love: ()=>string
}

let zhuxf:IPerson = {
    name: "zhuxf",
    age: 29,
    sex: "man",
    love: () => {
        return "say hello";
    }
}
console.log(zhuxf);
// 继承
interface Person {
    name: string,
    age: number,
    love: () => {}
}
interface Worker extends Person {
    work: string
}
let zxf = <Worker>{};
zxf.name="zxf";
zxf.age=29;
zxf.love = ()=> {
    return "say hi";
}
zxf.work = "computer";
console.log(zxf);
// let cl: Worker = {
//     name: "cl",
//     age: null,
//     love: () => {
//         return ""
//     },
//     work: "gwy"
// }
// console.log(cl);
// 多继承
interface IParent1 {
    v1: number
}
interface IParent2 {
    v2: number
}
interface Child extends IParent1, IParent2 {}
let child:Child = {
    v1: 1,
    v2: 2
}
console.log(child);