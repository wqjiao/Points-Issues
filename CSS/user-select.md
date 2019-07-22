# CSS3 属性 user-select

设置或检索是否允许用户选中文本

## 取值

* none 禁止选中
* all 选中所有
* text 选中文本
* auto 计算值确定如下：

    - 在 ::before 和 ::after 伪元素上，计算属性是 none
    - 如果元素是可编辑元素，则计算值是 contain
    - 否则，如果此元素的父元素的 user-select 的计算值为 all, 计算值则为 all
    - 否则，如果此元素的父级上的 user-select 的计算值为 none, 计算值则为 none
    - 否则，计算值则为 text

## IE6-9 只支持标签属性

```html
<p onselectstart="return false;"> IE6-9 user-select:none</p>
```

## Opera12.5 只支持标签属性

```html
<p unselectable="on" >Opera12.5 user-select:none</p>
```
