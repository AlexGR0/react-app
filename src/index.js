function sum(a, b) {
  return a + b;
};
var result = sum(12, 23);
const aaa = () => {
    console.log('测试箭头函数');
};
aaa();
console.log(result);
let promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
});
promise.then(res => {
    console.log(res);
});