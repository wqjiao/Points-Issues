## React setState -- '异步'

`setState` 的执行是一个 `'异步'` 的过程，为什么会将这两个字用引号代替，肯定其中有一定的道理，下面对 `setState` 进行分析

### setState 源码分析(v16.10.0)

[React 源码](https://github.com/facebook/react/blob/18d2e0c03e4496a824fdb7f89ea2a3d60c30d49a/packages/react/src/ReactBaseClasses.js)，`setState` 中传入两个参数 `partialState, callback`：

![setState 部分源码](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/setState.png)

* `partialState` 在字面意思理解应该是部分状态，注释说明是这样的 ` Next partial state or function to produce next partial state to be merged with current state.`,大概翻译是 `下一个部分状态或函数，以产生下一个要与当前状态合并的部分状态。`。实际上，在项目中 `this.setState({})` 更新指定 `state` 时，其他的 `state` 与当前更新的 `state` 做了合并。

* `callback` 回调函数，意指状态更新后的回调，在该函数中获取最新的 `state`。

* `setState` 处理过程

首先调用了 `invariant()`, 其次调用了 `this.updater.enqueueSetState()`

`/packages/shared/invariant.js`, 这个方法就是判断 `partialState` 的类型是否正确，抛出错误，附上源码：
![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/invariant.png)

但是在 V16.7.0版本之前 `invariant` 抛出的是不同类型的错误:
![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/invariantV16.7.0.png)

`/packages/react-dom/src/server/ReactPartialRenderer.js`,把即将更新的 `state` push 到了 `queue` 中，在 `new Component` 时，将 `updater` 传进去，附上源码：
![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/enqueueSetState.png)

`queue` 应该是 `React` 提升性能的关键。因为并不是每次调用 `setState`, `React` 都会立马更新，而是每次调用 `setState`, `React` 只是将其 push 到了待更新的 `queue` 中，附上源码：
![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/queue.png)

`/packages/react-reconciler/src/ReactFiberClassComponent.js` 中的 `enqueueSetState`;

`/packages/react-reconciler/src/ReactUpdateQueue.js` 中的 `enqueueUpdate`;

### 过程分析

1. 钩子函数及合成方法 -- setState

```javascript
import React from 'react';
import {Button} from 'antd';

class SetState extends React.Component {

    state = { val: 0 }

    componentDidMount() {
        this.setState({ val: this.state.val + 1 })
       console.log('钩子函数:', this.state.val) // 输出的还是更新前的值 --> 0
    }
    
    increment = () => {
        this.setState({ val: this.state.val + 1 })
        console.log('合成方法:', this.state.val) // 输出的是更新前的val --> 0
    }

    render() {
        return (
            <Button type="primary" onClick={this.increment}>
                钩子函数及合成方法 --> {`Counter is: ${this.state.val}`}
            </Button>
        )
    }
}

export default SetState;
```

2. 原生js事件 -- setState

```javascript
import React from 'react';
import {Button} from 'antd';

class SetState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
    }

    componentDidMount() {
       document.body.addEventListener('click', this.changeValue, false)
    }

    changeValue = () => {
        this.setState({ val: this.state.val + 1 })
        console.log('原生js事件:', this.state.val) // 输出的是更新后的值 --> 1
    }

    render() {
        return (
            <Button type="peimary">
                原生js事件 --> {`Counter is: ${this.state.val}`}
            </Button>
        )
    }
}

export default SetState;
```

3. setTimeout 定时器 -- setState

```javascript
import React from 'react';
import {Button} from 'antd';

class SetState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
    }

    componentDidMount() {
        setTimeout(_ => {
            console.log('定时器->1:', this.state.val) // 输出更新前的值 --> 0
            this.setState({ val: this.state.val + 1 })
            console.log('定时器->2:', this.state.val) // 输出更新后的值 --> 1
        }, 0);
        console.log('钩子函数:', this.state.val) // 输出更新前的值 --> 0
    }

    render() {
        return (
            <Button type="primary">
                setTimeout 定时器 --> {`Counter is: ${this.state.val}`}
            </Button>
        )
    }
}

export default SetState;
```

4. 批量更新 -- setState 

```javascript
import React from 'react';
import {Button} from 'antd';

class SetState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
    }

    batchUpdates = () => {
        this.setState({ val: this.state.val + 1 })
        this.setState({ val: this.state.val + 1 })
        this.setState({ val: this.state.val + 1 })
    }

    render() {
        return (
            <Button type="primary" onClick={this.batchUpdates}>
                批量更新 --> {`Counter is: ${this.state.val}`}
            </Button>
        )
    }
}

export default SetState;
```

5. 钩子函数及 setTimmout 定时器 -- setState 的执行结果

```javascript
import React from 'react';
import {Button} from 'antd';

class SetState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
    }

    // 钩子函数中的 setState 无法立马拿到更新后的值;
    // setState 批量更新的策略;
    // setTimmout 中 setState 是可以同步拿到更新结果
    componentDidMount() {
        this.setState({ val: this.state.val + 1 })
        console.log('第一步->钩子函数：', this.state.val); // 0
    
        this.setState({ val: this.state.val + 1 })
        console.log('第二步->钩子函数：', this.state.val); // 0
    
        setTimeout(_ => {
            this.setState({ val: this.state.val + 1 })
            console.log('第三步->定时器：', this.state.val); // 2
        
            this.setState({ val: this.state.val + 1 })
            console.log('第四步->定时器：', this.state.val); //  3
        }, 0)
    }

    render() {
        return (
            <Button type="primary">
                钩子函数及 setTimmout 定时器 --> {`Counter is: ${this.state.val}`}
            </Button>
        )
    }
}

export default SetState;
```

### setState 第二个参数是一个回调函数

如果希望在 `setState` 时就能获取到最新值，可以在 `setState`  的回调函数中获取最新结果

```javascript
this.setState(
    {
        data: newData
    },
    () => {
        console.log('回调函数中获取:', me.state.data)
    }
);
```

### 总结

`setState` 所谓的 '异步'，实际上只在合成事件一生命周期函数中存在，在原生js时间与定时器中任然是同步变化的， `setState` 中还做了批量更新的优化。如果希望在 `this.setState({})` 后及时获取到最新 `state`，可以在其回调函数中获取。

### 更多阅读

* [facebook/react issues](https://github.com/facebook/react/issues/11527#issuecomment-360199710)
* [掘金 setState](https://juejin.im/post/5b45c57c51882519790c7441)
