# HTML DOM Methods

## 1.node.cloneNode(deep) 方法

`cloneNode()` 方法创建节点的拷贝，并返回该副本。
`cloneNode()` 方法克隆所有属性以及它们的值。

* node 被克隆的节点

* deep 深度拷贝 可选。默认是 false

    - true - 如果您需要克隆节点及其属性，以及后代
    - false - 如果您只需要克隆节点

```js
const nodecopy = document.getElementById('canvas').cloneNode(true);

// 指定节点下的子节点至原节点中
const listcopy = var node = document.getElementById('captcha').lastChild.cloneNode(true);
document.getElementById('captcha').appendChild(node);
```

## 2.input text select() 方法

`select()` 方法用于选取文本域中的内容所有主流浏览器都支持 `select()` 方法 `textObject.select()`

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
