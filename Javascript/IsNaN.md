# NaN && isNaN

## NaN

`NaN` 是一个 `number` 类型,而且 `NaN` 不等于它自己。 实际上 `NaN` 不等于任何东西，验证一个变量是否是 `NaN` 可以使用 `isNaN()` 方法来判断

```js
typeof(NaN) // "number"

NaN === NaN // false
```

## isNaN()

`isNaN()` 函数用来确定一个值是否为 `NaN`。除此之外以下方式的返回值也是一样的

`isNaN(x), isNaN(x - 0),isNaN(Number(x)), Number.isNaN(x - 0),和Number.isNaN(Number(x))`

```js
function typeOfNaN(x) {
    if (Number.isNaN(x)) {
        return 'Number NaN';
    }
    if (isNaN(x)) {
        return 'NaN';
    }
}

console.log(typeOfNaN('100F')); // "NaN"
console.log(typeOfNaN(NaN)); // "Number NaN"
```

实现一个 `isNaN()`

```js
// 除 Symbol 符号类型
let isNaN = function(value) {
    var n = Number(value);
    return n !== n;
};
```
