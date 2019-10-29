# 二、css 之文本两端对齐

## 简单实例

文本两端对齐，首先想到的就是 `text-align: justify`，在实际的应用中，一段文本内容：
```html
<div style="text-align: justify;text-indent: 2em; /* 首行缩进 */width: 300px;">
    两端对齐相对于左对齐，视觉上显得整齐有序。但justify对最后一行无效，通常这样的排版对整段文字是极好的，我们并不希望当最后一行只有两个字时也两端对齐，毕竟这是不便于阅读的，那么当我们只有一行文本，但要实现单行文本两端对齐怎么解决
</div>
```

* 但是这个属性对文本的最后一行无效，需要强制最后一行做对齐处理，例如:

```html
<ul style="list-style: none">
    <li class="item">
        <span class="label" >姓名</span>：
        <span class="value">wqjiao</span>
    </li>
    <li class="item">
        <span class="label" >出生年月日</span>：
        <span class="value">1992.05.25</span>
    </li>
    <li class="item">
        <span class="label" >户籍所在地</span>：
        <span class="value">安徽 怀远</span>
    </li>
</ul>
```
```scss
.item {
    height: 32px;
    line-height: 32px;
    margin-bottom: 8px;
    .label {
        display: inline-block;
        height: 100%;
        width: 100px;
        text-align: justify;
        vertical-align: top;
        &::after {
            display: inline-block;
            width: 100%;
            content: ''; // 多出一倍的高度，多出21
            height: 0;
        }
    }
    .value {
        padding-right: 10px;
    }
}
```

* 但是，以上实现方法比较麻烦，css 新属性 [text-align-last](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align-last)，该属性定义的是一段文本中最后一行在被强制换行之前的对齐规则。以上 scss 可以更换成：

```scss
.item {
    margin-bottom: 8px;
    .label {
        display: inline-block;
        height: 100%;
        min-width: 100px;
        text-align: justify;
        -ms-text-align-last: justify;
        -moz-text-align-last: justify;
        text-align-last: justify;
    }
    .value {
        padding-right: 10px;
    }
}
```

## `text-align-last` 属性介绍

CSS 属性 text-align-last  描述的是一段文本中最后一行在被强制换行之前的对齐规则。

* 特性

默认值 auto；
适用于 block 容器元素；
属性可继承

* 语法

auto | start | end | left | right | center | justify

* 属性值

    - auto

    每一行的对齐规则由 text-align 的值来确定，当 text-align 的值是 justify，text-align-last 的表现和设置了 start 的表现是一样的，即如果文本的展示方向是从左到右，则最后一行左侧对齐与内容盒子。
    译者注：
    经测试，当 text-align 的值为 right，并且 text-align-last 设置为 auto 时，文本最后一行的对齐方式相当于 text-align-last 被设置为 right 时的效果。即 text-align-last 设置为 auto 后的表现跟 text-align 的设置有关。

    - start
    
    与 direction 的设置有关。
    如果文本展示方向是从左到右，起点在左侧，则是左对齐；
    如果文本展示方向是从右到左，起点在右侧，则是右对齐。
    如果没有设置 direction ，则按照浏览器文本的默认显示方向来确定。

    direction 默认值 从左到右 ltr
        ltr -- 从左到右
        rtl -- 从右到左
    
    - end
    
    与 direction 的设置有关。
    如果文本展示方向是从左到右，末尾在右侧，则是右对齐；
    如果文本展示方向是从右到左，末尾在左侧，则是左对齐。
    如果没有设置 direction ，则按照浏览器文本的默认显示方向来确定。
    
    - left
    
    最后一行文字与内容盒子的左侧对齐
    
    - right
    
    最后一行文字与内容盒子的右侧对齐
    
    - center
    
    最后一行文字与内容盒子居中对齐
    
    - justify

    最后一行文字的开头语内容盒子的左侧对齐，末尾与右侧对齐。

* [浏览器兼容性](https://caniuse.com/#search=text-align-last)

![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/text-align-last-can-i-use.png)
