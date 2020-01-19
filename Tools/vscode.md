# VSCode 常用快捷键

## 一、基础编辑

    Ctrl+X	剪切
    Ctrl+C	复制
    Ctrl+Shift+K	删除当前行
    Ctrl+Enter	在当前行之后插入一行
    Ctrl+Shift+Enter	在当前行之前插入一行
    Alt+Up/Down	移动当前行上下
    Shift+Alt+Up/Down	在当前行上下复制当前行
    Ctrl+Up/Down	行视图上下偏移
    Alt+PageUp/PageDown	屏视图上下偏移
    Ctrl+Shift+[	折叠区域代码
    Ctrl+Shift+]	展开区域代码
    Ctrl+K Ctrl+[	折叠区域内所有代码（包括子域和父域）
    Ctrl+K Ctrl+]	展开区域内所有代码（包括子域和父域）
    Ctrl+K Ctrl+0	折叠所有区域内的代码
    Ctrl+K Ctrl+J	展开所有区域内的代码
    Ctrl+K Ctrl+C	添加行注释
    Ctrl+K Ctrl+U	删除行注释
    Ctrl+/	添加关闭行注释
    Shift+Alt+A	添加关闭区域注释
    Alt+Z	添加关闭自动换行

## 二、导航

    快捷键	作用
    Ctrl+T	启动符号搜索框
    Ctrl+G	跳转行
    Ctrl+P	启动文件搜索框，方便快速打开文件
    Ctrl+Shift+O	跳转至符号处
    Ctrl+Shift+M	显示问题面板
    F8	跳转到下一个错误或者警告
    Shift+F8	跳转到上一个错误或者警告
    Ctrl+Shift+Tab	切换到最近打开的文件
    Alt+Left/Right	向前/向后

## 三、查询

    快捷键	作用
    Ctrl+F	查询
    Ctrl+H	替换
    F3	查找下一个
    Shift+F3	查找上一个
    Alt+Enter	选中所有匹配的查询字符
    Alt+C	切换是否区分大小写查找
    Alt+R	切换是否使用正则查找
    Alt+W	切换是否使用全词查找
    编辑/窗口管理
    快捷键	作用
    Ctrl+Shift+N	打开新窗口
    Ctrl+W	关闭窗口
    Ctrl+F4	关闭当前编辑窗口
    Ctrl+K F	关闭当前打开的文件夹
    Ctrl+\	拆分编辑器（最多拆分为三块）
    Ctrl+1/2/3	切换焦点在不同的拆分窗口
    文件管理
    快捷键	作用
    Ctrl+N	新建文件
    Ctrl+O	打开文件
    Ctrl+S	保存文件
    Ctrl+K S	保存所有文件
    Ctrl+Shift+S	另存为
    Ctrl+K W	关闭一组拆分的窗口
    Ctrl+K Ctrl+W	关闭所有编辑窗口
    Ctrl+Shift+T	撤销最近关闭的一个文件编辑窗口
    Ctrl+Tab	调出最近打开的文件列表，重复按会切换到下一个
    Ctrl+Shift+Tab	调出最近打开的文件列表，重复按会切换到上一个
    Ctrl+K P	复制当前打开文件的存放路径
    Ctrl+K R	打开当前编辑文件存放位置【文件管理器】
    Ctrl+K O	在新的编辑器中打开当前编辑的文件

## 四、显示

    快捷键	作用
    F11	切换全屏显示
    Ctrl+B	切换侧边栏显示隐藏
    Ctrl+Shift+V	Markdown预览切换
    光标操作
    快捷键	作用
    Home/End	光标跳转到行首/尾
    Ctrl+Home/End	光标跳转到页首/尾
    Alt+Click	插入光标（支持多个）
    Ctrl+Alt+Up/Down	上下插入光标（支持多个）
    Ctrl+U	撤销最后一次光标操作
    Shift+Alt+I	插入光标到选中范围内所有行行尾
    Ctrl+I	选中当前行
    Shift+Alt+(drag mouse)	在鼠标拖动区域的每行行尾插入光标
    Ctrl+F2	选择当前字符的所有出现，然后进行操作
    Ctrl+Shift+\	跳转到与当前括号匹配的括号
    代码格式化
    windows：Shift + Alt + F
    Mac：Shift + Option + F
    Ubuntu： Ctrl + Shift + I

## 五、vscode插件

* 1、React项目的元素标签自动闭合

    在 首选项 -> 设置 中添加以下设置：
        "emmet.includeLanguages": {
            "javascript": "javascriptreact"
        },
* 2、js文件头部添加注释

    vscode-fileheader  快捷键 - ctrl+alt+i

* 3、添加组件注释

    Document This 快捷键 - ctrl+alt+D

* 4、显示当前代码行修改人信息

    GitLens — Git supercharged

* 5、Search node_modules

    此扩展允许您搜索 node_modules 文件夹，该文件夹不在默认的搜索范围内。源码：vscode-search-node-modules。

* 6、Debugger for Chrome

    在 Chrome 中轻松调试 JavaScript（通过在编辑器中设置断点）。源码：vscode-chrome-debug。

* 7、Simple React Snippets

    React代码段和命令的基本集合。
    
    - imr - Import React
    `import React from 'react';`
    - imrc - Import React, Component
    `import React, { Component } from 'react';`
    - impt - Import PropTypes
    `import PropTypes from 'prop-types';`
    - impc - Import PureComponent
    `import React, { PureComponent } from 'react';`
    - cc - Class Component
    ```js
    class | extends Component {
      state = { | },
      render() {
        return ( | );
      }
    }

    export default |;
    ```
    - ccc - Class Component With Constructor
    ```js
    class | extends Component {
      constructor(props) {
        super(props);
        this.state = { | };
      }
      render() {
        return ( | );
      }
    }

    export default |;
    ```
    - sfc - Stateless Function Component
    ```js
    const | = props => {
      return ( | );
    };

    export default |;
    ```
    - cdm - componentDidMount
    ```js
    componentDidMount() {
      |
    }
    ```
    - cwm - componentWillMount
    ```js
    // WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
      
    }
    ```
    - cwrp - componentWillReceiveProps
    ```js
    // WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
      |
    }
    ```
    - gds - getDerivedStateFromProps
    ```js
    static getDerivedStateFromProps(nextProps, prevStat) {
      |
    }
    ```
    - scu - shouldComponentUpdate
    ```js
    shouldComponentUpdate(nextProps, nextState) {
      |
    }
    ```
    - cwu - componentWillUpdate
    ```js
    // WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
    componentWillUpdate(nextProps, nextState) {
      |
    }
    ```
    - cdu - componentDidUpdate
    ```js
    componentDidUpdate(prevProps, prevState) {
      |
    }
    ```
    - cwun - componentWillUnmount
    ```js
    componentWillUnmount() {
      |
    }
    ```
    - cdc - componentDidCatch
    ```js
    componentDidCatch(error, info) {
      |
    }
    ```
    - gsbu - getSnapshotBeforeUpdate
    ```js
    getSnapshotBeforeUpdate(prevProps, prevState) {
      |
    }
    ```
    - ss - setState
    ```js
    this.setState({ | : | });
    - ssf - Functional setState
    this.setState(prevState => {
      return { | : prevState.| }
    });
    ```
    - ren - render
    ```js
    render() {
      return (
        |
      );
    }
    ```
    - rprop - Render Prop
    ```js
    class | extends Component {
      state = { | },
      render() {
        return this.props.render({
          |: this.state.|
        });
      }
    }

    export default |;
    ```
    - hoc - Higher Order Component
    ```js
    function | (|) {
      return class extends Component {
        constructor(props) {
          super(props);
        }

        render() {
          return < | {...this.props} />;
        }
      };
    }
    ```

* 8、Easy Sass

  "easysass.formats": [
      {
          "format": "compressed",  // 压缩
          "extension": ".css"
      }
  ],
  "easysass.targetDir": "./"  // 自定义css输出文件路径

more and more： https://code.visualstudio.com/docs/getstarted/keybindings

* 9、`REST Client` (API 调用调试，类似于 Postman)

- 步骤：安装 `REST Client` 插件 --> 创建一个 `.http` 或 `.rest` 文件 --> 写入测试接口

```js
POST http://192.168.1.154:5069/system/user/getMenuInfo?needUser=true HTTP/1.1
content-Type: application/x-www-form-urlencoded; charset=utf-8
Accept-Language: zh-CN,zh;q=0.9
Authorization: 7b2653e1f162326b63b28bf01daa40ae

{
    "name":"Hendry",
    "salary":"61888",
    "age":"26"
}

###

POST http://192.168.1.154:5069/system/config/params HTTP/1.1
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Authorization: 7b2653e1f162326b63b28bf01daa40ae
```

- 注意：
  写入多个测试接口时，需要使用 `###` 进行分割；
  运行：在文件区域右击选择 `Send Request` 或者 快捷键 `Ctrl + Alt + R` 或者 `Cmd + Alt + R`


## 六、折叠区域代码

* 1、折叠所有区域代码的快捷： ctrl + k ctrl + 0 ;

    先按下  ctrl 和 K，再按下 ctrl 和 0 ; ( 注意这个是零，不是欧 )

* 2、展开所有折叠区域代码的快捷：ctrl +k ctrl + J ;

    先按下  ctrl 和 K，再按下 ctrl 和 J ;
