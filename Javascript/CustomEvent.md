## addEventListener(type, listener, options)

* `type` 监听的事件类型，继承与 Event() 对象
* `listener` 监听事件时，需要执行的操作
* `options` 可选参数对象

    - `capture`:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
    - `once`:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
    - `passive`: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
    - `mozSystemGroup`: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group

## Event(typeArg, eventInit)

* `typeArg` 表示自定义事件名
* `eventInit` 可选，表示自定义事件初始化 

    - `bubbles`: 可选，Boolean类型，默认值为 false，表示该事件是否冒泡。
    - `cancelable`: 可选，Boolean类型，默认值为 false， 表示该事件能否被取消。
    - `composed`: 可选，Boolean类型，默认值为 false，指示事件是否会在影子DOM根节点之外触发侦听器

```js
let event = new Event('build', {'bubbles': true, 'cancelable': false});

// Listen for the event.
elem.addEventListener('build', function (e) {
    // ...
}, false);

// Dispatch the event.
elem.dispatchEvent(event);
```

要向事件对象添加更多数据，可以使用 `CustomEvent`，`detail` 属性可用于传递自定义数据。`CustomEvent` 接口可以为 `event` 对象添加更多的数据。例如，`event` 可以创建如下：
```js
let event = new CustomEvent('build', { 'detail': elem.dataset.time });
```

## CustomEvent(typeArg, customEventInit)

关于 `CustomEvent()` 构建一个新的 `CustomEvent` 对象。`event = new CustomEvent(typeArg, customEventInit);`

* `typeArg` 表示自定义事件名

* `customEventInit` 可选，表示自定义事件初始化 

    - `detail` 可选的默认值是 `null` 的任意类型数据，是一个与 `event` 相关的值。
    - `bubbles` 一个布尔值，表示该事件能否冒泡。
    - `cancelable` 一个布尔值，表示该事件是否可以取消。

* 实例

    ```js
    // 添加自定义事件 cat
    obj.addEventListener('cat', function(e) { process(e.detail) });

    // 创建并调用该事件 cat
    let event = new CustomEvent('cat', {
        detail: {
            hazcheeseburger: true
        }
    });
    obj.dispatchEvent(event);
    ```

## CustomEvent() vs Event()

[这些事件被称之为合成事件，而非浏览器本身触发的事件](https://stackoverflow.com/questions/40794580/event-vs-customevent)

`You can use Event() for anything. If you want to attach custom data, you use CustomEvent('eventName', {data}).` 大概意思是指: 可以对任何事情使用Event()。如果希望附加自定义数据，可以使用 `CustomEvent('eventName', {data})` 。
