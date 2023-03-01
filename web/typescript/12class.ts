// class
class Person {
    name: string;
    age: null|number;
    constructor(name: string, age: number|null) {
        this.name = name;
        this.age = age;
    }
    introduce(): void {
        console.log("hi, I am " + this.name + ".");
    }
}
let persion:Person = new Person("zxf", null);
console.log(persion);
console.log(persion.introduce());
// 继承
class Work extends Person {
    work: string;
    constructor(name: string, age: number|null, work: string) {
        super(name, age);
        this.work = work;
    }
    introduce(): void {
        console.log("hi, I am " + this.name + ", and my job is: " + this.work);
    }
}
let worker:Work = new Work("zxf", null, "computer");
console.log(worker);
console.log(worker.introduce());
console.log(worker instanceof Work);