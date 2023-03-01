// Number对象
let num1: Number = new Number(1);
console.log(num1);
let num2: Number = new Number("1");
console.log(num2);
let num3: Number = new Number("a");
console.log(num3);
console.log("最大值：", Number.MAX_VALUE); // 接近于1.79e+308， 大于MAX_VALUE的值未Infinity
console.log("最小值：", Number.MIN_VALUE); // 接近于0的正数，约为5e-324，小于MIN_VALUE的值会转化为0
console.log("负无穷大: ", Number.NEGATIVE_INFINITY); // negative_infinity
console.log("正无穷大：", Number.POSITIVE_INFINITY); // positive_infinity
// prototype
function employee(id: number, name: string) {
    this.id = id;
    this.name = name;
}
let emp = new employee(123, "admin");
employee.prototype.email = "admin@ceshi.com";
console.log(emp);
// 方法
let num4: Number = new Number(1222.256478);
console.log(num4.toExponential()); // 科学计数法
console.log(num4.toFixed()); // 转化为字符串，并对小数点指定位数
console.log(num4.toFixed(2)); // 转化为字符串，并对小数点指定位数
console.log(num4.toLocaleString()); // 转化为字符串，使用本地数字格式顺序？？？？
console.log(num4.toPrecision()); // 转化为指定长度
console.log(num4.toPrecision(4)); // 转化为指定长度
console.log(num4.valueOf()); // 
let num5: Number = new Number(10);
console.log(num5.toString()); // 转化为字符串，输出对应进制值，默认是10进制
console.log(num5.toString(2)); // 转化为字符串，输出2进制值
console.log(num5.toString(8)); // 转化为字符串，输出8进制值
