## parseInt(string, radix) 整数

`parseInt(string, radix)`  `string` 为字符串，`radix` 为介于 `2-36` 之间的数。使用者告诉这个函数 `string`（比如11）是 `radix`（比如2）进制的，函数将固定返回 `string` 以十进制时显示的数（3）

* `string` 

    要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用  ToString 抽象操作)。字符串开头的空白符将会被忽略。

    ```js
    parseInt(1); // 1
    parseInt('          1'); // 1
    parseInt('123aa'); // 123
    parseInt('aa123'); // NaN
    parseInt(true); // NaN
    ```

* `radix`

    一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。始终指定此参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为10。

    ```js
    parseInt('123', 5); // 将 `123` 看作是 5进制数，返回 1*5^2 + 2*5^1 + 3*5^0 = 38
    ```

* `返回值`

    返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。

    ```js
    ['10','10','10','10','10'].map(parseInt); // [10, NaN, 2, 3, 4]
    ['1', '2', '3'].map((item, index) => {
        return parseInt(item, index)
    }); // [1, NaN, NaN]
    ```

* 二进制 -- 由 0 和 1 表示

* 八进制 -- 由 0-7 表示

* 十六进制 -- 由 0-9、A-F(a-f) 表示

## parseFloat(value) 浮点数

* `value`

    需要被转换成浮点数的值，转换

* `返回值`

    返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。

    ```js
    parseFloat(1); // 1
    parseFloat('          1'); // 1
    parseFloat('1a'); // 1
    parseFloat('a1'); // NaN
    parseFloat(true); // NaN
    ```
