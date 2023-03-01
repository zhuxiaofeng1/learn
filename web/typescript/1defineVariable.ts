var message: string = "hello world";
console.log(message);

class Site {
    name():void {
        console.log("test");
    }
}
var obj = new Site();
obj.name();

let x: any = 1;
x = "string"
x = true

let arrayList: any = [1, false, "string"]
arrayList[1] = undefined;

function error(message: string): never {
    throw new Error(message);
}

let isDone: boolean = false;
let name1: string = "ss";
let list: number[] = [1,3,4,5];
let list1: Array<number> = [1,3,4,5];
let list2: [string, number] = ["a", 1];