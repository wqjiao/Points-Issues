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
