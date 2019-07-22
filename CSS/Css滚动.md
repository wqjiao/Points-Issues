# Css 滚动

## 1.纯 CSS 滚动条滚动进度效果

```html
<html>
<head></head>
<body>
    <h1>不可思议的纯 CSS 进度条效果</h1>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <ul>
        <li>1.xxxxxxxxxxxxxxxxxxxxx</li>
        <li>2.xxxxxxxxxxxxxxxxxxxxx</li>
        <li>3.xxxxxxxxxxxxxxxxxxxxx</li>
        <li>4.xxxxxxxxxxxxxxxxxxxxx</li>
    </ul>

    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>

    <p>在继续阅读下文之前，你可以先缓一缓。尝试思考一下上面的效果或者动手尝试一下，不借助 JS ，能否巧妙的实现上述效果。</p>
        
    <p>OK，继续。这个效果是我在业务开发的过程中遇到的一个类似的小问题。其实即便让我借助 Javascript ，我的第一反应也是，感觉很麻烦啊。所以我一直在想，有没有可能只使用 CSS 完成这个效果呢？</p>
    </body>
</html>
```

```css
body {
    position: relative;
    padding: 50px;
    font-size: 24px;
    line-height: 30px;
    background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
    background-size: 100% calc(100% - 100vh + 5px);
    background-repeat: no-repeat;
    z-index: 1;
}

body::after {
    content: "";
    position: fixed;
    top: 5px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: -1;
}

/**
 * Unrelated css
 */

h1 {
    font-size: 32px;
    line-height: 60px;
}

ul {
    margin-top: 30px;
}

p {
    font-size: 24px;
    line-height: 30px;
    margin-top: 30px;
}
```

## 2.修改指定元素的滚动条样式

body, div, textarea, iframe 均可修改其滚动条样式

```css
body, div, textarea, iframe {
    /*三角箭头的颜色*/
    scrollbar-arrow-color: #bbb;
    /*滚动条滑块按钮的颜色*/
    scrollbar-face-color: #999;
    /*滚动条整体颜色*/
    scrollbar-highlight-color: #999;
    /*滚动条阴影*/
    scrollbar-shadow-color: #999;
    /*滚动条轨道颜色*/
    scrollbar-track-color: #eee;
}

/* 最大高度，修改滚动条样式 */
.popover-scroll-size {
    max-width: 270px;
    max-height: 250px;
    overflow: hidden auto;
    margin-right: -10px;
    padding-right: 10px;

    /* 滚动条整体样式 滚动条宽度 */
    &::-webkit-scrollbar {
        width: 8px; /* 对垂直流动条有效 */
        height: 1px; /* 对水平流动条有效 */
    }
    /* 定义滑块颜色、内阴影及圆角 */
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #999; /*#EAEAEA*/
    }
    /* 定义滚动条的轨道颜色、内阴影及圆角 */
    &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: #f2f2f2; /*#FFFFFF*/
    }
    /* 定义两端按钮的样式 */
    &::-webkit-scrollbar-button {
        background-color: #999;
    }
    /* 定义右下角汇合处的样式 */
    &::-webkit-scrollbar-corner {
        background: #666;
    }
}
```

## 3.参考链接

[css-tricks](https://css-tricks.com/almanac/properties/w/whitespace/)
[css 小技巧一](https://segmentfault.com/a/1190000003931851)
[css 小技巧二](https://segmentfault.com/a/1190000003932970)
