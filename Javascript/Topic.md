## 前端题目

* 1.找出字符串中连续出现最多的字符和个数

- 方式一
```js
function findLongest(str) {
    // 按照连续出现的字符组成一个字符串生成一组数组
    const arr = str.match(/(\w)\1*/g);
    // 获取最大字符长度
    const maxLen = Math.max(...arr.map(s => s.length));
    // 返回最大字符及长度
    const result = arr.reduce((pre, curr) => {
        if (curr.length === maxLen) {
            pre[curr[0]] = curr.length;
        }
        return pre;
    }, {});

    return result;
}
findLongest('abbkejsbcccwqaa'); // {c: 3}
findLongest('abcaakjbb'); // {a: 2, b: 2}
```

- 方式二
```js
function findLongest(str) {
    if (!str) return {}
    let count = 0,
        maxCount = 0,
        cur = str[0],
        res = {};

    for (let i = 0; i < str.length; i++) {
        const s = str[i];
        // 如果是连续字符则加 1
        if (s === cur) {
            count++;
            // 判断是否大于暂存的最大长度
            if (count > maxCount) {
                res = { [s]: count }
                maxCount = count;
            }
            if (count === maxCount) {
                res[s] = count;
            }
        } else {
            count = 1;
            cur = s;
        }
    }

    return res;
}
```

* 2.数组去重函数(包括基本类型及复杂类型)

```js
// 提取变量类型
function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object (\w+)\]/, "$1");
}

// 对象重整对 key 进行排序
function parseObj(obj) {
	let keys = Object.keys(obj).sort();
	let newObj = {};

	for (let key of keys) {
        if (getType(obj[key]) === 'Object') {
            obj[key] = parseObj(obj[key]);
        } else if (getType(obj[key]) === 'Array') {
            obj[key] = parseArr(obj[key]);
        }

		newObj[key] = obj[key];
    }
    
	return newObj;
}

// 数组排序
function parseArr(arr) {
    let newArr = [];

    arr.forEach((item, index) => {
        newArr[index] = getType(item) === 'Array' ? parseArr(item) : item;

        if (getType(item) === 'Object') {
            newArr[index] = parseObj(item);
        } else if (getType(item) === 'Array') {
            newArr[index] = parseArr(item);
        } else {
            newArr[index] = item;
        }
    });
    
	return newArr.sort();
}

// 数组去重
function filterRepet(arr) {
    if (!arr || arr.length === 0) return [];

    // 过滤基本类型参数
    arr = arr.map(item => {
        // 对象
        if (getType(item) === 'Object') {
            return JSON.stringify(parseObj(item));
        }
        // 数组
        if (getType(item) === 'Array') {
            return JSON.stringify(parseArr(item));
        }

        // 非对象且值存在(undefined、null)
        return !item ? item : JSON.stringify(item);
    });

    // 过滤
    return [...new Set(arr)].map(item => !item ? item : JSON.parse(item));
}
```

* 3.全局/局部变量

- 'Goodbye Jack'
```js
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

- 'Hello Tom'
```js
let name = 'Tom';
(function() {
if (typeof name == 'undefined') {
        let name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

- 'Hello Tom'
```js
var name = 'Tom';
// let name = 'Tom';
(function() {
if (typeof name == 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

* 4.转换对象 `'a.b.c': ''`

```js
var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

// 要求转换成如下对象
var output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}
```

```js
// 提取变量类型
function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object (\w+)\]/, "$1");
}

// 转换对象
function flatObj(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            let keyName = `${parentKey}${key}`;

            if (getType === 'Object') {
                flatObj(obj[key], keyName + '.', result);
            } else {
                result[keyName] = obj[key];
            }
        }
    }
    return result;
}
```

* 5.多维数组降维

- `let newArray = arr.flat(depth)`
`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。`flat()` 会移除数组中的空项。
`depth` 指定要提取嵌套数组的结构深度，默认值为 1。使用 `Infinity` 作为深度，展开任意深度的嵌套数组 `arr.flat(Infinity)`;

- 数组降维一层

```js
let arr = [1,2,[3,4]];
arr.reduce((acc, val) => acc.concat(val), []);

// 或者
const flatSingle = arr => [].concat(...arr);
```

- 数组降维多层

使用 `reduce`、`concat` 和递归无限反嵌套多层嵌套的数组
```js
let arr = [1,2,3,[1,2,3,4, [2,3,4]]];

function flattenDeep(arr) {
   return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
flattenDeep(arr);
```

不使用递归，使用 `stack` 无限反嵌套多层嵌套数组
```js
let arr = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // 使用 pop 从 stack 中取出并移除值
        const next = stack.pop();
        if (Array.isArray(next)) {
            // 使用 push 送回内层数组中的元素，不会改动原始输入 original input
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    // 使用 reverse 恢复原数组的顺序
    return res.reverse();
}
flatten(arr); // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

* 6.什么叫 `JSFuck`
[JSFuck](http://www.jsfuck.com) 是一种基于 `JavaScript` 原子部分的深奥而有教育意义的编程风格。它只使用6个不同的字符来编写和执行代码: `[]` `{}` `+` `!`

* 7.数组乱序

    - `sort`
    ```js
    function mixArray(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
    ```

    - `Gisher-Yates shuffle` 洗牌算法
    ```js
    function mixArray(arr) {
        let m = arr.length;
        while(m > 1) {
            let index = parsetInt(Math.random() * m--);
            [arr[index], arr[m]] = [arr[m], arr[index]];
        }
        return arr;
    }
    ```

* 8.正则匹配替换成小驼峰

```js
let classname = 'abc-acs';
let reg = /(?<=\w)-([a-z])/g;

classname = classname.replace(reg, RegExp.$1.toUpperCase());
```

* 9.闭包题

```js
function fn() {
	var i = 10;
	return function (n) {
		console.log(n+(++i))
	}
}
var f = fn();
f(10); // 21 i=11
f(20); // 32 i=12
fn()(10); // 21 i=11
fn()(20); // 31 i=11
```
