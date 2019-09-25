## 查看网页元素位置及大小

1. Chrome 中直接添加 style

```css
html * {
    outline: 1px solid #1890ff;
}
```

2. Chrome 中添加标签，点击切换显示或隐藏

打开书签管理页，添加新标签，填写名称，粘贴以下代码至网址中

```js
javascript: (function() {
	var elements = document.body.getElementsByTagName('*');
	var items = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML.indexOf('html * { outline: 1px solid red }') != -1) {
			items.push(elements[i]);
		}
	}
	if (items.length > 0) {
		for (var i = 0; i < items.length; i++) {
			items[i].innerHTML = '';
		}
	} else {
		document.body.innerHTML +=
			'<style>html * { outline: 1px solid red }</style>';
	}
})();
```

[出处](https://gist.github.com/vcastroi/e0d296171842e74ad7d4eef7daf15df6)

3. 在控制台中粘贴以下代码

```js
var css = document.createElement('style');
css.innerHTML = `* { background-color: rgba(255,0,0,.2); }
* * { background-color: rgba(0,255,0,.2); }
* * * { background-color: rgba(0,0,255,.2); }
* * * * { background-color: rgba(255,0,255,.2); }
* * * * * { background-color: rgba(0,255,255,.2); }
* * * * * * { background-color: rgba(255,255,0,.2); }
* * * * * * * { background-color: rgba(255,0,0,.2); }
* * * * * * * * { background-color: rgba(0,255,0,.2); }
* * * * * * * * * { background-color: rgba(0,0,255,.2); }
* * * * * * * * * * { background-color: rgba(0,0,255,.2); }
`
document.querySelector('head').appendChild(css)
```

4. Chrome 插件

[Pesticide for Chrome](https://chrome.google.com/webstore/detail/pesticide-for-chrome/bblbgcheenepgnnajgfpiicnbbdmmooh)
