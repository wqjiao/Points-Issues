# CSS 相关问题

## 1.文本溢出省略

* 单行文本

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

* 多行文本溢出显示省略号，webkit私有属性，仅支持webkit浏览器

    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: ellipsis-lastline;
    display: -webkit-box;
    -webkit-line-clamp: 2; /*需要显示的行数*/
    -webkit-box-orient: vertical;
    border: 1px solid #ddd;

## 2.自定义滚动条样式

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

## 3.iPhoneX中的安全区域全覆盖

在 meta 标签中添加 viewport-fit=cover

<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

auto：  默认 viewprot-fit:contain; 页面内容显示在 safe area 内
cover： viewport-fit:cover,页面内容充满屏幕

当我们设置 viewport-fit:cover 时：设置如下
```css
body {
    padding-top: constant(safe-area-inset-top);   /* 为导航栏+状态栏的高度 88px */          
    padding-left: constant(safe-area-inset-left);   /* 如果未竖屏时为0 */               
    padding-right: constant(safe-area-inset-right); /* 如果未竖屏时为0 */              
    padding-bottom: constant(safe-area-inset-bottom);/* 为底下圆弧的高度 34px */      
}
```

## 4.修改placeholder 颜色

```css
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #999;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
    color: #999;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
    color: #999;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: #999;
}
```

## 5.使用 translate 字体变模糊情况

* 使用 `translate2d` 出现模糊
    因为元素的高度、宽度中有奇数， 使用 `translate(-50%,-50%)` 之后，相当于宽度、高度除以2的效果，会出现 0.5px。浏览器能分辨的最小像素为1px，因此出现了模糊。
    所以，使用 `translate(-50%,-50%)` 的时候，一定要注意让元素的宽度、高度为偶数。

* 使用 `translate3d` 出现模糊
    里面的值用固定参数而不是百分比，如 `translate3d(50px,10px,10px)`, 则不会模糊。原因尚未明确。

## 6.元素水平垂直居中对齐

* 方式一 absolute && translate

```css
.parent {
    position: relative;
}
.targetElm {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

* 方式二 absolute

```css
.parent {
    position: relative;
}
.targetElm {
    position: absolute;
    margin: auto;
    width: 100px;
    height: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
```

* 方式三 table && table-cell

```css
.parent {
    display: table;
    width: 100%;
    height: 50px;
}
.son {
    display: table-cell;
    vertical-align: middle;
}
```

* 方式四

```css
.parent {
    display: flex;
} 
.son {
    margin: auto;
}
```

* 方式五
```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

* 方式六

```css
.parent {
    display: flex;
    justify-content: center;
}
.son {
    align-self: center;
}
```

## 7.div 包裹 img 不做任务设置的情况下img与div下面有白边

```html
<div>
    <img src="./img.jpg" width="100%" height="100%" />
</div>
```

```css
div, img {
    margin: 0;
    padding: 0;
}
div {
    width: 100%
}
```

* 方法一
```css
div {
    height: 250px;
}
```

* 方法二
```css
div {
    font-size: 0;
}
```

* 方法三
```css
div {
    line-height: 0;
}
```

* 方法四
```css
img {
    display: block;
}
```

## 8.
