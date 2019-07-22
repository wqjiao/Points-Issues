# CSS2 属性 outline(轮廓)

## 属性

在一个声明中设置所有的轮廓属性 `outline: 1px solid pink` 或者 `outline: pink solid 1px`

* outline-color 轮廓颜色
* outline-offset 轮廓偏移量
* outline-syle 轮廓样式
* outline-width 轮廓宽度

## 实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>css2-outline</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .list li {
            border: 10px solid palegoldenrod;
        }

        li + li {
            margin-top: -10px
        }

        li:hover {
            /* 第一种 */
            border-color: pink;

            /* 第二种 */
            /* outline: 10px solid pink;
            outline-offset: -10px; */

            /* 第三种 */
            /* outline: 1000px solid #00000099; */
        }   
    </style>
</head>
<body>
    <ul class="list">
        <li>1</li>
        <li>12</li>
        <li>123</li>
        <li>1234</li>
        <li>12345</li>
        <li>123456</li>
    </ul>
</body>
</html>
```
