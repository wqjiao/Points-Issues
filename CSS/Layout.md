# css 布局

提到 HTML 页面布局时，通常会优先使用 Float、Position、Flex 等方式实现。如果页面对兼容性要求不是很高，还可以使用 `display: grid`。

`Grid` 属性需要一个 `grid 容器`，其子元素被称之为 `grid 子项`，其布局方式类似于[农田式划分](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)。

`calc` [css 函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

`::nth-child(n)` 伪类选择器：指定第n个元素； `li::nth-of-type(n)` 伪类元素选择器：指定第n个某元素。

```html
<div id="app">
    <header id="header">header</header>
    <aside id="side">side</aside>
    <div id="main">main</div>
    <footer id="footer">footer</footer>
</div>
```

四种方式实现页面布局:

```css
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app {
    margin: 0;
    padding: 0;
    height: 100%;
}

#header,
#footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #555;
    color: #fff;
}

#side {
    width: 200px;
    background: #eee;
}

/* 1、float 浮动处理 */
#side {
    /* 设置 侧边栏 左浮动 */
    float: left;
    height: calc(100% - 100px);
}

#main {
    height: calc(100% - 100px);
    overflow: hidden;
}

/* 2、position 定位处理 */
#app {
    /* 父级元素 设置 相对定位 */
    position: relative;
}
#side {
    /* 左边栏 设置 绝对定位 */
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
}
#main {
    /* 内容区 设置 绝对定位 */
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 50px;
    left: 200px;
}
#footer {
    /* footer 设置 绝对定位 */
    position: absolute;
    bottom: 0;
    width: 100%;
    /* 设置浮动后，补上宽度 */
}

/* 3、flex 弹性处理 */
#app {
    display: flex;
    flex-wrap: wrap;
}
#header {
    flex-basis: 100%;
}
#side {
    height: calc(100% - 100px);
}
#main {
    flex: 1;
    height: calc(100% - 100px);
}
#footer {
    flex-basis: 100%;
}

/* 4、grid 处理 */
#app {
    display: grid;
    /**
    等价于
    grid-template-rows: 50px auto 50px;
    grid-template-columns: 200px auto;
    grid-template-areas: 
        "header header" 
        "side main" 
        "footer footer";
    grid: grid-template-rows / grid-template-columns;
    注意： 每一 row 只是一个字符串
    */
    grid: "header header"50px "side main"auto "footer footer"50px / 200px auto;
}
#header {
    /* 注意： header 没有双引号 */
    grid-area: header;
}
#footer {
    grid-area: footer;
}

/* 伪类选择器 + 伪类元素选择器 */
ul li:nth-child(2n)::after {
    content: '|';
}
ul li:nth-of-type(2n)::after {
    content: '|';
}
```