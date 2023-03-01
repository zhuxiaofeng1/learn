// Array
let list: any[] = [1, "string", true, undefined, null];
let list1: number[] = new Array(4);
for (let i: number = 0; i < 4; i++) {
    list1.push(i * 2);
}
console.log(list1);
let list2: string[] = new Array("h", "e", "l", "l", "o");
console.log(list2);
// 数组解析
let [h, e, l1, l2, o] = list2;
console.log(h);
console.log(e);
console.log(l1);
console.log(l2);
console.log(o);
// 数组迭代
let i: any;
let list4: number[] = [1,2,3,4,5];
for(i in list4) {
    console.log(list4[i]);
}
// 多维数组
let multiList: number[][] = [[1,1,1], [2,2,2], [3,3,3]];
console.log(multiList);
// 方法
let concatList: any[] = list.concat(list1); // 连接两个或更多的数组，并返回结果。
console.log(concatList);
let everyBool: boolean = list1.every(item => { // 检测数值元素的每个元素是否都符合条件。
    return item > 0;
})
console.log(everyBool);
let filterList1: number[] = list1.filter(item => { // 检测数值元素，并返回符合条件所有元素的数组。
    return item > 0;
})
console.log(filterList1);
list.forEach(item => { // 数组每个元素都执行一次回调函数。
    console.log(item);
})
let index: number = list1.indexOf(2); //搜索数组中的元素，并返回它所在的位置。如果搜索不到，返回值 -1，代表没有此项。
console.log(index);
let joinStr: string = list.join(" "); // 把数组的所有元素放入一个字符串。
console.log(joinStr);
let lastIndex: number = list1.lastIndexOf(2);// 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
console.log(lastIndex);
let mapList: number[] = list1.map(item => { // 通过指定函数处理数组的每个元素，并返回处理后的数组。
    return item / 2;
})
console.log(mapList);
console.log(list.push("aaa")); // 向数组的末尾添加一个或更多元素，并返回新的长度
console.log(list);
console.log(list.pop()); // 删除数组的最后一个元素并返回删除的元素。
console.log(list);
let total1: number = list1.reduce((a, b) => { // 将数组元素计算为一个值（从左到右）。
    return a + b;
})
console.log(total1);
let total2: number = list1.reduceRight((a, b) => { // 将数组元素计算为一个值（从右到左）。
    return a + b;
})
console.log(total2);
console.log(list1.reverse()); // 反转数组的元素顺序。
console.log(list.unshift("start")); // 向数组的开头添加一个或更多元素，并返回新的长度。
console.log(list);
console.log(list.shift()); // 删除并返回数组的第一个元素。
console.log(list);
let new_array: number[] = list1.slice(1, 3); // 选取数组的的一部分，并返回一个新数组。
console.log(new_array);
let someBool: boolean = list.some(item => { // 检测数组元素中是否有元素符合指定条件。
    return item > 0;
});
console.log(someBool);
console.log(list.sort()); // 对数组的元素进行排序。
// splice（） 从数组中添加或删除元素。
list.splice(2, 0, "A"); // 增加
console.log(list);
list.splice(2, 1); // 删除
console.log(list);
console.log(list1.toString()); // 把数组转换为字符串，并返回结果。


// 元组
let mytuple = [10,"Hello","World","typeScript"]; 
mytuple[2] = "world";
mytuple.push(12); //向元组添加元素，添加在最后面。
mytuple.pop() // pop() 从元组中移除元素（最后一个），并返回移除的元素。
let [num, str1, str2, str3] = mytuple;