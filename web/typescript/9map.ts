// new Map() tsc运行命令（用es6编译）：tsc --target es6 9map.ts
let map: Map<string, any> = new Map();
function initMap(): void {
    map.set("number", 1);
    map.set("string", "abcdefg");
    map.set("null", null);
    map.set("boolean", true);
    map.set("undefined", undefined);
}
initMap();
console.log(map);
console.log(map.has("string"));
console.log(map.get("string"));
console.log(map.size);
console.log(map.keys());
console.log(map.values());
for (let mapItem of map) {
    console.log(mapItem);
}
for (let mapKey of map.keys()) {
    console.log(mapKey);
    console.log(map.get(mapKey));
}
for (let mapValue of map.values()) {
    console.log(mapValue);
}
for (let entry of map.entries()) {
    console.log(entry[0], entry[1]);   
}
 
// 使用对象解析
for (let [key, value] of map) {
    console.log(key, value);            
}
map.set("test", "test");
console.log(map);
map.delete("test");
console.log(map);
map.clear();
console.log(map);

