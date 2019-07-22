# 关于 Javascript 相关问题

## 1.宽松相等与严格相等的区别

* 宽松相等

    ```
    const a = { value : 0 };
    a.valueOf = function() {
        return this.value += 1;
    };

    console.log(a == 1 && a == 2 && a == 3); // true
    ```
    
注意：
    宽松相等 == 会先将左右两两边的值转化成相同的原始类型，然后再去比较他们是否相等。
    在转化之后( == 一边或两边都需要转化)，最后的相等匹配会像 === 符号一样去执行判断。
    宽松相等是可逆的，对于任何值 A 与 B，通常 A == B 与 B == A 具有相同的表现(除了转换的顺序不同)。

    ToPrimitive(input, PreferredType?)
        
可选参数 PreferredType 可以指定最终转化的类型，它可以是 Number 类型或 String 类型，
这依赖于 ToPrimitive() 方法执行的结果返回的是 Number 类型或 String 类型

* 严格相等

    ```
    var value = 0; //window.value
    Object.defineProperty(window, 'a', {
        get: function() {
            return this.value += 1;
        }
    });

    console.log(a===1 && a===2 && a===3) // true
    ```
    
* 类型固定时，宽松相等 与 严格相等

    ```
    var value = 0;
    const a = {
        get: function() {
            return this.value += 1;
        }
    }

    console.log((0, a.get)() == 1 && (0, a.get)() == 2 && (0, a.get)() == 3); // true
    console.log((0, a.get)() === 1 && (0, a.get)() === 2 && (0, a.get)() === 3); // true
    ```

* Object.defineProperty

    - 语法
    
        Object.defineProperty(obj, prop, descriptor)
    
    - 参数
    
        obj 用于定义属性的对象。
    
        prop Symbol 要定义或修改的名称或属性。
    
        descriptor 正在定义或修改属性的描述符。
    
    - 返回值
    
        传递给函数的对象

* 参考链接
    - [gist.github](https://gist.github.com/anubhavsrivastava)
    - [掘金](https://juejin.im/post/5bfcc632f265da61493353cc)
    - [web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## 2.React click 事件对比

类的方法默认不会自动绑定 this，在调用时如果忘记绑定 this，那么 this 的值将会是 undefined。
通常如果不是直接调用，应该为方法绑定 this。绑定方式有以下几种：

* 1、在 onClick 时使用匿名(箭头)函数绑定
    ```
    <button onClick={() => this.handleClick()}>按钮</button>

    <!-- 传参 -- 该方法 点击 时才会执行 -->
    <button onClick={() => this.handleClick(data)}>按钮</button>
    ```

* 2、在 onClick 时使用 bind 绑定 this

Function.prototype.bind 来为事件处理函数传递参数
    ```
    handleClick() {
        alert('我点击了按钮');
    }
    ...
    <button onClick={this.handleClick.bind(this)}>按钮</button>

    <!-- 传参 -- 该方法 点击 时才会执行 -->
    <button onClick={this.handleClick.bind(this)}>按钮</button>
    ```

* 3、在构造函数中使用 bind 绑定上下文

    ```
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    ...
    handleClick() {
        alert('我点击了按钮');
    }
    ...
    <button onClick={this.handleClick}>按钮</button>

    <!-- 传参 -- 该方法在 render 时会直接被执行 -->
    <button onClick={this.handleClick(data)}>按钮</button>
    ```

* 4、使用属性初始化器语法(箭头函数)绑定 onClick

    ```
    handleClick = () => {
        alert('我点击了按钮');
    }
    ...
    <button onClick={this.handleClick}>按钮</button>

    <!-- 传参 -- 该方法在 render 时会直接被执行 -->
    <button onClick={this.handleClick(data)}>按钮</button>
    ```

* 总结

    - 方式1 和 方式2：
        
        在 onClick 时绑定this，影响性能，且当方法作为属性传递给子组件的时候会引起重渲问题

        优点：写法比较简单，当组件中没有 state 的时候就不需要添加类构造函数来绑定 this，`传参 -- 该方法 点击 时才会执行`

        缺点：每一次调用的时候都会生成一个新的方法实例，因此对性能有影响，且当这个函数作为属性值传入低阶组件的时候，这些组件可能会进行额外的重新渲染，因为每一次都是新的方法实例作为的新的属性传递。

    - 方式3：
        
        在类构造函数中绑定 this，调用的时候不需要再绑定，官方推荐的绑定方式，性能最好的方式

        优点：只会生成一个方法实例，并且绑定一次之后如果多次用到这个方法也不需要再绑定。

        缺点：即使不用到 state，也需要添加类构造函数来绑定 this，代码量多。

    - 方式4：
        
        利用属性初始化语法，将方法初始化为箭头函数，因此在创建函数的时候就绑定了 this，最好的方式

        优点：创建方法就绑定 this，不需要在类构造函数中绑定，调用的时候不需要再作绑定，结合了前三种方式的优点。
        
        缺点：需要用 babel 转译

    - 方式3 和 方式4：
        
        `共同缺点：传参 -- 该方法在 render 时会直接被执行`

    - 传参
    
        向方法中传参时，使用 方法1 箭头函数(arrow functions) 和 方法2 bind(Function.prototype.bind)

        事件对象 e 要放在最后 handleClick(data, e)，作为第二个参数传递

        通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递

## 3.Number 与 String 转换

* Number 转换成 String

    '' + 1 => '1'
    1.toString()

    性能上来说：('' +) > String() > .toString() > new String()

* String 转换成 Number

    + '1'; // + 连接操作符
    ~~'15'; // 15 ~~ 双非运算符，返回一个整数(~按位非运算)
    Number('1');
    parseFloat('1');
    parseInt('1');

    另外，可以使用 `+` 运算实现 `boolean` 类型转换成 `number`:
    
    +true; // 1
    +false; // 0

* 浮点数 Float 转换成整型 Int

    最常用的是 parseInt()，其实 parseInt() 是用于将字符串转换成数字，而不是浮点数和整型之间的转换，可以使用 Math.ceil()、 Math.floor() 或者 Math.round()。

    Math.ceil(num)  数值上取整
    Math.floor(num) 数值下取整
    Math.round(num) 数值四舍五入

## 4.target 与 currentTarget 区别

    currentTarget 始终是指向时间绑定的元素(监听事件者);
    target 指向用户触发的元素(真正发出者)。

## 5.运算符 - + ~~

* 一元负号 `-`

    一元负号运算符位于操作数前面，并转换操作数的符号
    ```js
    -'55' -> -55
    -(-'55') -> 55
    ```
    注意：一元负号会将数值变成负数，如果不想变成负数，需要在前面再添加一个 `-`(注意运算符优先级)。

* 一元正号 `+`

    一元正号运算符位于其操作数前面，计算其操作数的数值，如果操作数不是一个数值，会尝试将其转换成一个数值。 尽管一元负号也能转换非数值类型，但是一元正号是转换其他对象到数值的最快方法，也是最推荐的做法，因为它不会对数值执行任何多余操作。它可以将字符串转换成整数和浮点数形式，也可以转换非字符串值 true，false 和 null。小数和十六进制格式字符串也可以转换成数值。负数形式字符串也可以转换成数值（对于十六进制不适用）。如果它不能解析一个值，则计算结果为 NaN。
    ```js
    +'55' -> 55
    ```

* 双非运算符 `~~`

    `~~` 返回一个整数(~按位非运算)
    ```js
    ~~'15' -> 15
    ```

## 6.js 判断对象是否为空

* 1、将 json 对象转化为 json 字符串，再判断该字符串是否为 "{}"

    var data = {};
    var b = (JSON.stringify(data) == "{}");
    alert(b); // true

    注意： 忽略转换 undefined、function、Symbol 属性

    JSON.stringify({[Symbol("key")]: "foo"}); // {}

* 2、for in 循环判断

    var obj = {};
    var b = function() {
        for(var key in obj) {
            return false;
        }
        return true;
    }
    alert(b()); // true

* 3、jquery 的 isEmptyObject()

    此方法是 jquery 将 2 方法 (for in) 进行封装，使用时需要依赖 jquery

    var data = {};
    var b = $.isEmptyObject(data);
    alert(b); // true

* 4、Object.getOwnPropertyNames()

    获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的 length 来判断此对象是否为空

    var data = {};
    var arr = Object.getOwnPropertyNames(data);
    alert(arr.length === 0); // true

    注意：此方法不兼容 IE8

* 5、使用 ES6 的 Object.keys()

    与 4 方法类似，是 ES6 的新方法, 返回值也是对象中属性名组成的数组

    var data = {};
    var arr = Object.keys(data);
    alert(arr.length === 0); // true

## 7.js 遍历对象
* 1、for in

    循环遍历对象自身的和继承的可枚举属性(不含 Symbol 属性)

    var obj = {'0': 'a', '1': 'b', '2': 'c'};

    for (var i in obj) {
        console.log(i, obj[i]);
    }

* 2、Object.getOwnPropertyNames()

    返回一个数组,包含对象自身的所有属性(不含 Symbol 属性,但是包括不可枚举属性).

    var obj = {'0': 'a', '1': 'b', '2': 'c'};

    Object.getOwnPropertyNames(obj).forEach((key) => {
        console.log(key, obj[key]);
    });

* 3、Object.keys()

    返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含 Symbol 属性)

    var obj = {'0': 'a', '1': 'b', '2': 'c'};

    Object.keys(obj).forEach((key) => {
        console.log(key, obj[key]);
    });

* 4、Reflect.ownKeys()

    返回一个数组,包含对象自身的所有属性,不管属性名是 Symbol 或字符串,也不管是否可枚举

    var obj = {'0': 'a', '1': 'b', '2': 'c'};

    Reflect.ownKeys(obj).forEach(function(key) {
        console.log(key, obj[key]);
    });

## 8.js 遍历数组

* 1、for

    var arr = [1, 2, 3];

    for (var i = 0; i < arr.length; i ++) {
        console.log(i, arr[i]);
    }

* 2、forEach

    var arr = [1, 2, 3];

    arr.forEach(function(val, index) {
        console.log(val, index);
    });

* 3、for in

    var arr = [1, 2, 3];

    for (var i in arr) {
        console.log(i, arr[i]);
    }

* 4、for of

    不仅支持数组，还支持大多数类数组对象

    也支持字符串遍历，它将字符串视为一系列的 Unicode 字符来进行遍历

    var arr = [1, 2, 3];

    for (var value of arr) {
        console.log(value);
    }

* 5、数组/对象数组中获取 id

    let arr = [{
        id: 0,
        text: 'a'
    }, {
        id: 1,
        text: 'b'
    }];

    // map()/filer()
    let str = arr.map( (item) => {
        return [item.id]; // 字符串、数组、对象
    });

## 9.js 删除数组中某一项或几项

### splice
替换/删除/添加数，该方法会改变原始数组

splice(index, len, [item]);

index: 数组开始下标
len: 替换/删除的长度
item: 替换的值，删除操作的话 item 为空

* 删除 -- item 不设置

```javascript
let arr = ['a','b','c','d'];
// 删除起始下标为1，长度为1的一个值，len设置的1，如果为0，则数组不变
arr.splice(1, 1); // ['a','c','d'] 
// 删除起始下标为 1，长度为 2 的一个值，len 设置的 2
arr.splice(1, 2); // ['a','d']
```

* 替换 -- item 为替换的值

```javascript
let arr = ['a','b','c','d'];
// 替换起始下标为 1，长度为 1 的一个值为 ‘ttt’，len 设置的 1
arr.splice(1, 1, 'ttt'); // ['a','ttt','c','d']
// 替换起始下标为1，长度为2的两个值为‘ttt’，len设置的1
arr.splice(1, 2, 'ttt'); // ['a','ttt','d']         
```

* 添加 -- len 设置为 0，item 为添加的值

```javascript
let arr = ['a','b','c','d'];
// 表示在下标为 1 处添加一项 ‘ttt’
arr.splice(1, 0, 'ttt'); // ['a','ttt','b','c','d']
```

### slice

* 数组截断

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array = array.slice(0, 4); // [0, 1, 2, 3]
```

* 获取数组中的最后一项

`slice()` 可以接受负数,表示它将接受数组末尾的值
```js
let arr = [1, 5, 8, 9,56];
console.log(arr.slice(-1)); // [56]
console.log(arr.slice(-2)); // [9, 56]
```
    
### delete
delete 删除掉数组中的元素后，会把该下标出的值置为undefined,数组的长度不会变，优势：原数组的索引也保持不变，此时再遍历数组元素，会跳过其中 undefined 的元素

```javascript
let arr = ['a','b','c','d'];

for (index in arr) {
    document.write('arr[' + index + ']='+arr[index]);
}

// 中间出现两个逗号，数组长度不变，有一项为 undefined
delete arr[1]  //['a', ,'c','d']
```

## 10.js 字符串截取


string str = "123abc456";
int i = 3;

* 1、取字符串的前 i 个字符

str=str.Substring(0,i); // or  str=str.Remove(i,str.Length-i); 

* 2、去掉字符串的前i个字符：
   
str=str.Remove(0,i);  // or str=str.Substring(i); 

* 3、从右边开始取i个字符：
  
str=str.Substring(str.Length-i); // or str=str.Remove(0,str.Length-i);

* 4、从右边开始去掉i个字符：
   
str=str.Substring(0,str.Length-i); // or str=str.Remove(str.Length-i,i);

* 5、判断字符串中是否有"abc" 有则去掉之

```javascript
string str = "123abc456";
string a="abc";
Regex r = new  Regex(a); 
Match m = r.Match(str);

if (m.Success) {
    //绿色部分与紫色部分取一种即可。
    str=str.Replace(a,"");
    Response.Write(str);   
    string str1, str2;
    str1=str.Substring(0, m.Index);
    str2=str.Substring(m.Index + a.Length, str.Length - a.Length - m.Index);
    Response.Write(str1 + str2); 
}
```

* 6、如果字符串中有"abc"则替换成"ABC"

   ·str=str.Replace("abc","ABC");

* 7、截取指定字符区间

string str="adcdef";

int indexStart = str.IndexOf("d");

int endIndex =str.IndexOf("e");

string toStr = str.SubString(indexStart, endIndex - indexStart);

* 8、c# 截取字符串最后一个字符的问题!

str1.Substring(str1.LastIndexOf(",")+1)

## 11.bind、apply、call

* call()

Obj.function.call(thisArg, ...argArray);

    thisArg -- Context
    ...argArray -- 函数参数

```javascript
let mathObj = {
    pi: 3.14,
    area: function(r) {
        console.log(this); // this 指向上下文{pi: 3.14, area: ƒ, circumference: ƒ}
        return this.pi * r * r;
    },
    circumference: function(r) {
        return 2 * this.pi * r;
    },
    volume: function(r, h) {
        return this.pi * r * r * h;
    }
};

mathObj.area(2); // 12.56
// 但此时要求 pi 精确到小数点后 5 位，并立即执行该方法得出结果
mathObj.area.call({pi: 3.14159}, 2); // 12.56636
```

* apply()

Obj.function.apply(thisArg, argArray)

    thisArg -- Context
    argArray -- 参数数组

上述代码也可以使用 `apply()`，与 `call()` 类似，结果一致，只是参数的类型不一样

```javascript
let mathObj = {
    pi: 3.14,
    area: function(r) {
        console.log(this); // this 指向上下文{pi: 3.14, area: ƒ, circumference: ƒ}
        return this.pi * r * r;
    },
    circumference: function(r) {
        return 2 * this.pi * r;
    },
    volume: function(r, h) {
        return this.pi * r * r * h;
    }
};

mathObj.volume.call({pi: 3.14159}, 2, 6); // 参数作为函数参数被传递 75.39815999999999
mathObj.volume.apply({pi: 3.14159}, [2, 6]); // 函数参数作为数组传递 75.39815999999999
```

* bind()

bind 将一个全新的 this 注入到指定的函数上，改变 this 的指向， 使用 bind 时，函数不会像 call 或 apply 立即执行

```javascript
let mathObj = {
    pi: 3.14,
    area: function(r) {
        console.log(this); // this 指向上下文{pi: 3.14, area: ƒ, circumference: ƒ}
        return this.pi * r * r;
    },
    circumference: function(r) {
        return 2 * this.pi * r;
    },
    volume: function(r, h) {
        return this.pi * r * r * h;
    }
};

let newVolume = mathObj.volume.bind({pi: 3.14159});
newVolume(2, 6);
```

它允许我们将上下文注入一个函数，该函数返回一个具有更新上下文的新函数。这意味着这个变量将是用户提供的变量，这在处理 JavaScript 事件时非常有用。

```javascript
var button = document.getElementById("button"),
    text = document.getElementById("text");
button.onclick = function() {
    alert(this.id); // 弹出text
}.bind(text);

// 由于 IE6 - IE8 浏览器不支持，需要进行代码模拟
// 判断是否存在 bind 方法
if (!function() {}.bind) {
    Function.prototype.bind = function(context) {
        var self = this,
            args = Array.prototype.slice.call(arguments);
            
        return function() {
            return self.apply(context, args.slice(1));    
        }
    };
}
```

* 三者的区别

三种方式都是改变函数的 this 对象的指向；其中第一个参数都是 this 要指向的对象；都可以利用后续参数进行传参。但是 bind 返回对应函数，便于后续调用，而 apply、call 都是立即调用。

## 12.select() 方法用于选取文本域中的内容

所有主流浏览器都支持 select() 方法

选取文本域的内容：

```html
<input type="text" id="copyText" value="需要复制的内容">
<button type="button" onClick="handleClick()">复制</button>
<script>
    function handleClick() {
        document.getElementById("copyText").select();
        document.execCommand('copy');
    }
</script>
```

## 13.Object.keys/Object.values/Object.entries

* [Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

`Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

```js
let obj = {name: 'aaa', age: '20'}
Object.keys(obj); // ['name', 'age']
```

* [Object.values](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

`Object.values()`方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用 `for...in` 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

```js
let obj = {name: 'aaa', age: '20'}
Object.keys(obj); // ['aaa', '20']
```

* [Object.entries](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用`for...in` 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）

```js
let obj = {name: 'aaa', age: '20'}
Object.keys(obj); // [['name', 'aaa'], ['age', 20']]
```

## 14.requestAnimationFrame

`window.requestAnimationFrame()` 告诉浏览器 -- 执行一个动画，并且要求浏览器在下一次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

*  cancelAnimationFrame(requestID)

`window.cancelAnimationFrame()` 取消一个先前通过调用 `window.requestAnimationFrame()` 方法添加到计划中的动画帧请求。
`requestID` 指之前调用 `window.requestAnimationFrame()` 返回的ID

## 15.JS实现输入一个字符串，返回字符串翻转输出

```js
str.split('').reverse().join('');
```

或者 使用遍历：索引从最大值开始，依次递减，字符串拼接

## 16.
