// String对象
let txt: String = new String("hello");
console.log(txt);
// 属性
console.log(txt.constructor);
console.log(txt.length);
// 方法
console.log(txt.charAt(1)); // 返回指定位置的字符
console.log(txt.charCodeAt(1)); // 返回指定位置字符的Unicode编码
let new_txt: String = new String("world");
let result_txt = txt.concat(" ").concat(new_txt.valueOf());
console.log(result_txt); // 连接多个字符串，并返回新的字符串
console.log(txt.indexOf("l")); // 返回某个指定的字符串值在字符串中首次出现的位置。
console.log(txt.lastIndexOf("l")); // 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。
console.log(txt.localeCompare(new_txt.valueOf())); // 用本地特定的顺序来比较两个字符串。
console.log(txt.match(/l/g)); // 查找找到一个或多个正则表达式的匹配。
console.log(txt.replace(/(\w+)\s(\w+)/, "$2,$1")); // 替换与正则表达式匹配的子串
console.log(txt.search(/he/gi)); // 检索与正则表达式相匹配的值
console.log(txt.slice(0, txt.length)); // 提取字符串的片断，并在新的字符串中返回被提取的部分
console.log(result_txt.split(" ")); // 把字符串分割为子字符串数组。
console.log(txt.substr(0, txt.length)); // 从起始索引号提取字符串中指定数目的字符。
console.log(txt.substring(0, txt.length)); // 提取字符串中两个指定的索引号之间的字符。
console.log(txt.toLocaleLowerCase()); // 根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射。
console.log(txt.toLocaleUpperCase()); // 据主机的语言环境把字符串转换为大写.
console.log(txt.toLowerCase()); // 把字符串转换为小写。
console.log(txt.toString()); // 返回字符串。
console.log(txt.toUpperCase()); // 把字符串转换为大写。
console.log(txt.valueOf()); // 返回指定字符串对象的原始值。