---
title: BPMN使用小结
date: 2019-09-11
categories: web 前端
tags: Javascript
---

内部管理系统需要多种流程设计，方便在 `Web PC` 手动设计业务流程，保证单个业务可以设计多个流程，并且可以进行流程跟踪的综合要求。
<!-- more -->

## 起初

后端有一套自己的流程引擎，解析相应的 `xml`，然后部署业务流程。
起初后端是想直接用 [activiti-designeer](https://www.activiti.org/before-you-start) 做流程设计，该方法基本满足业务需求，但后期发现这样做太麻烦，于是推荐前端使用 [BPMN插件](https://github.com/bpmn-io/bpmn-js)，放在管理系统中使用，生成 `xml` 及 `svg` 字符串传给接口，保存该业务流程。

## 基本用法

* 安装依赖包

```
yarn add bpmn-js
yarn add bpmn-js-properties-panel
yarn add camunda-bpmn-moddle
```

* 初始化

```js
let xml; // BPMN 2.0 xml 
let viewer = new BpmnJS({
    container: '#canvas',
    height: 400,
});

viewer.importXML(xml, function(err) {

    if (err) {
        console.log('error rendering: ', err)
    } else {
        console.log('rendered:')
    }
});
```

## React 中用法

使用了 [ant-design-pro](https://pro.ant.design/) 最初搭建好的后台项目(非 ts 版本) 搭建的项目：
[BPMN React 例子](https://github.com/wqjiao/bpmn-activiti)

![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/BPMN.png)

流程设计的界面按照图片上的布局可以分成四部分:左(工具面板)、中(画布)、右(表单面板)、悬浮(附加操作)

* 1.工具面板 --> 添加流程网关、工具跟相应的节点，起到流程设计过程中的辅助作用 
* 2.画布 --> 绘制流程图，点击网关/节点，可操作对应网关/节点，调整节点间的关系

    在项目中引入 `bpmn-js/lib/Modeler` 获取 BPMN 建模器，然后创建一个建摸器
    ```js
    import BpmnModeler from 'bpmn-js/lib/Modeler';
    this.bpmnModeler = new BpmnModeler({
        container: '#canvas',
    });
    ```

    可以在当前 `Modeler` 的基础上添加一些额外的功能。比如，工具面板，调色板等等

    ```js
    import Modeler from 'bpmn-js/lib/Modeler';
    import {assign, isArray} from 'min-dash';
    import inherits from 'inherits';
    import CustomTranslate from './customTranslate';
    import CustomPalette from './customPalette';
    import ColorPickerModule from './customColor';

    export default function CustomModeler(options) {
        Modeler.call(this, options);

        this.customElements = [];
    }

    inherits(CustomModeler, Modeler);

    CustomModeler.prototype._modules = [].concat(CustomModeler.prototype._modules, [
        CustomTranslate,
        CustomPalette,
        ColorPickerModule,
    ]);
    ```

* 3.表单面板 --> 可对流程网关/节点添加字段标记及条件

    ```js
    import propertiesPanelModule from 'bpmn-js-properties-panel'; // bpmn中自带的控件
    import propertiesProviderModule from './PanelToolbar'; // 自定义表单
    ```

    ```js
    // PanelToolbar/index.js
    import inherits from 'inherits';
    import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
    import baseInfo from './parts/BaseInfoProps';

    // 创建基础信息看板
    function createBaseInfoTab(element, bpmnFactory, elementRegistry, translate) {
        const generalGroup = {
            id: 'baseInfo',
            label: '',
            entries: [],
        };

        baseInfo(generalGroup, element, bpmnFactory, translate);
        return [generalGroup];
    }

    function MagicPropertiesProvider(eventBus, bpmnFactory, elementRegistry, translate) {
        PropertiesActivator.call(this, eventBus);
        this.getTabs = function(element) {
            const baseInfoTab = {
                id: 'baseInfo',
                label: '基本信息',
                groups: createBaseInfoTab(element, bpmnFactory, elementRegistry, translate),
            };

            return [baseInfoTab];
        };
    }

    inherits(MagicPropertiesProvider, PropertiesActivator);

    MagicPropertiesProvider.$inject = ['eventBus', 'bpmnFactory', 'elementRegistry', 'translate'];

    export default {
        __init__: ['propertiesProvider'],
        propertiesProvider: ['type', MagicPropertiesProvider],
    };
    ```

* 4.附加操作 --> 可以提供 打开bpmn文件、回退、缩放、下载、预览、保存等功能(按照自己需要,调用 BPMN 对象中提供的方法)

    ```js
    import React, {Component} from 'react';
    import {notification} from 'antd';

    class EditTools extends Component {
        state = {
            scale: 1, // 流程图比例
        }
        // 打开文件
        handleOpen = () => {
            this.file.click();
        };

        /**
         * 下载xml/svg
        *  @param  type  类型  svg / xml
        *  @param  data  数据
        *  @param  name  文件名称
        */
        download = (type, data, name) => {
            let dataTrack = '';
            const a = document.createElement('a');

            switch (type) {
                case 'xml':
                    dataTrack = 'bpmn';
                    break;
                case 'svg':
                    dataTrack = 'svg';
                    break;
                default:
                    break;
            }

            name = name || `diagram.${dataTrack}`;

            a.setAttribute(
                'href',
                `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
            );
            a.setAttribute('target', '_blank');
            a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
            a.setAttribute('download', name);

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        // 导入 xml 文件
        handleOpenFile = e => {
            const that = this;
            const file = e.target.files[0];
            const reader = new FileReader();
            let data = '';
            reader.readAsText(file);
            reader.onload = function(event) {
                data = event.target.result;
                that.renderDiagram(data, 'open');
            };
        };

        // 保存
        handleSave = () => {
            this.bpmnModeler.saveXML({format: true}, (err, xml) => {
                console.log(xml);
            });
            this.bpmnModeler.saveSVG({format: true}, (err, data) => {
                console.log(data);
            });
        };

        // 前进
        handleRedo = () => {
            this.bpmnModeler.get('commandStack').redo();
        };

        // 后退
        handleUndo = () => {
            this.bpmnModeler.get('commandStack').undo();
        };

        // 下载 SVG 格式
        handleDownloadSvg = () => {
            this.bpmnModeler.saveSVG({format: true}, (err, data) => {
                this.download('svg', data);
            });
        };

        // 下载 XML 格式
        handleDownloadXml = () => {
            this.bpmnModeler.saveXML({format: true}, (err, data) => {
                this.download('xml', data);
            });
        };

        // 流程图放大缩小
        handleZoom = radio => {
            const newScale = !radio
                ? 1.0 // 不输入radio则还原
                : this.state.scale + radio <= 0.2 // 最小缩小倍数
                ? 0.2
                : this.state.scale + radio;

            this.bpmnModeler.get('canvas').zoom(newScale);
            this.setState({
                scale: newScale,
            });
        };

        // 渲染 xml 格式
        renderDiagram = xml => {
            this.bpmnModeler.importXML(xml, err => {
                if (err) {
                    notification.error({
                        message: '提示',
                        description: '导入失败',
                    });
                }
            });
        };

        render () {
            return (<ul className={styles.controlList}>
                <li className={`${styles.control} ${styles.line}`}>
                    <input
                        ref={file => {
                            this.file = file;
                        }}
                        className={styles.openFile}
                        type="file"
                        onChange={this.onOpenFIle}
                    />
                    <button type="button" title="打开BPMN文件" onClick={this.handleOpen}>
                        <i className={styles.open} />
                    </button>
                </li>

                <li className={styles.control}>
                    <button type="button" title="撤销" onClick={this.handleUndo}>
                        <i className={styles.undo} />
                    </button>
                </li>
                <li className={`${styles.control} ${styles.line}`}>
                    <button type="button" title="恢复" onClick={this.handleRedo}>
                        <i className={styles.redo} />
                    </button>
                </li>

                <li className={styles.control}>
                    <button type="button" title="重置大小" onClick={this.handleZoom}>
                        <i className={styles.zoom} />
                    </button>
                </li>
                <li className={styles.control}>
                    <button type="button" title="放大" onClick={() => this.handleZoom(0.1)}>
                        <i className={styles.zoomIn} />
                    </button>
                </li>
                <li className={`${styles.control} ${styles.line}`}>
                    <button type="button" title="缩小" onClick={() => this.handleZoom(-0.1)}>
                        <i className={styles.zoomOut} />
                    </button>
                </li>
                <li className={styles.control}>
                    <button type="button" title="下载BPMN文件" onClick={this.handleDownloadXml}>
                        <i className={styles.download} />
                    </button>
                </li>
                <li className={styles.control}>
                    <button type="button" title="下载流程图片" onClick={this.handleDownloadSvg}>
                        <i className={styles.image} />
                    </button>
                </li>
            </ul>)
        }
    }

    export default EditTools;
    ```

    - 导入文件 `this.bpmnModeler.importXML(xml, err => {});`
    - 前进 `this.bpmnModeler.get('commandStack').redo();`
    - 后退 `this.bpmnModeler.get('commandStack').undo();`
    - 放大/缩小/重置 `this.bpmnModeler.get('canvas').zoom(newScale);`
    - 下载 svg `this.bpmnModeler.saveSVG({format: true}, (err, data) => {});`
    - 下载 xml `this.bpmnModeler.saveXML({format: true}, (err, data) => {});`
    - 点击 xml，获取节点 id

    源码中
    ```js
    /**
     * Register an event listener
    *
    * Remove a previously added listener via {@link #off(event, callback)}.
    *
    * @param {String} event
    * @param {Number} [priority]
    * @param {Function} callback
    * @param {Object} [that]
    */
    Viewer.prototype.on = function(event, priority, callback, target) {
        return this.get('eventBus').on(event, priority, callback, target);
    };
    ```

    元素添加相应事件。比如，点击、悬浮等等
    ```js
    import React, {Component, Fragment} from 'react';
    import BpmnViewer from 'bpmn-js';
    import {diagramXML} from './xml';
    import './Bpmn.css';

    class Bpmn extends Component {
        componentDidMount() {
            const {callback} = this.props;
            let viewer = new BpmnViewer({
                container: '#canvas',
                // height: 400
            });

            viewer.importXML(diagramXML, function(err) {
                if (err) {
                    console.error('failed to load diagram');
                    console.error(err);
                    return console.log('failed to load diagram', err);
                }
                let eventBus = viewer.get('eventBus');
                let events = [
                    'element.click',
                    // 'element.dblclick',
                    // 'element.hover',
                    // 'element.out',
                    // 'element.mousedown',
                    // 'element.mouseup'
                ];
                events.forEach(function(event) {
                    eventBus.on(event, function(e) {
                        console.log(event, 'on', e.element.id);
                        callback(e.element.id); // 流程图点击回调
                    });
                });
                // 删除 bpmn logo
                const bjsIoLogo = document.querySelector('.bjs-powered-by');
                while (bjsIoLogo.firstChild) {
                    bjsIoLogo.removeChild(bjsIoLogo.firstChild);
                }
            });
        }

        render() {
            const {data} = this.props;
            return (<Fragment>
                <div id="canvas" style={{height: '100%'}} />
                <div>{data.id}</div>
            </Fragment>);
        }
    }

    export default Bpmn;
    ```

## 遇到的问题

* 自定义节点信息表单

官网提供了一些 [BPMN 实例](https://github.com/bpmn-io/bpmn-js-examples)，可以自定义单个表单(inout、select、checkbox...)

```js
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import script from 'bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/Script';
import {query} from 'min-dom';

// 编号
const BaseInfoProps = (group, element, bpmnFactory, translate) => {
    group.entries.push(
        entryFactory.textField({
            id: 'id',
            label: translate('编号'),
            modelProperty: 'id',
        })
    );

    group.entries.push(
        entryFactory.textField({
            id: 'name',
            label: translate('名称'),
            modelProperty: 'name',
            validate: function(element, values) {
                let validationResult = {};

                if (!values.name) {
                    validationResult.name = '请输入节点名称';
                }

                if (values.name && values.name.length > 30) {
                    validationResult.name = '名称最多30个字';
                }

                return validationResult;
            },
        })
    );

    group.entries.push({
        id: 'condition',
        label: translate('Condition'),
        html: `
            <div class="bpp-row">
                <label for="cam-condition">${translate('Expression')}</label>
                <div class="bpp-field-wrapper">
                    <input id="cam-condition" type="text" name="condition" placeholder="请输入" />
                    <button class="clear" data-action="clear" data-show="canClear">
                        <span>X</span>
                    </button>
                </div>
            </div>
        `,
        get: function(element) {
            let values = {};
            // ...
            return values;
        },
        set: function(element, values) {
            let commands = [];
            // ...
            return commands;
        },
        validate: function(element, values) {
            let validationResult = {};

            if (!values.condition) {
                validationResult.condition = '请输入表达式${表达式}';
            }

            return validationResult;
        },
        clear: function(element, inputNode) {
            query('input[name=condition]', inputNode).value = '';
            return true;
        },
        canClear: function(element, inputNode) {
            let input = query('input[name=condition]', inputNode);
            return input.value !== '';
        },
        script: script,
        cssClasses: ['bpp-textfield'],
    });
}

export default BaseInfoProps;
```

* `No provider for "e"!`

在本地联调部署都没有问题，打包到正式环境的时候，进入初始化截断，开始报以下错误:

`Error: No provider for "e"! (Resolving: colorPicker -> e)`

起初以为 `colorPicker` 中的代码不够完善，反正这个也不用，就删了吧，上线要紧，结果错误总是惊人的相似，又出现以下错误：

`Error: No provider for "e"! (Resolving: propertiesPanel -> propertiesProvider -> e)`
`No provider for "e"! (Resolving: colorPicker -> e)`

于是找到了这个网站 [BPMN问题网站](https://forum.bpmn.io/t/how-to-compress-object-when-used-the-bpmn-js-properties-panel/2618)，里面有一些解释，意思就是：定义的函数需要使用 `$inject` 来注释服务 `annotate your service`.

```js
export default function ColorPicker(eventBus, contextPad, commandStack) {
    // ...
}
ColorPicker.$inject = [
    'eventBus',
    'contextPad',
    'commandStack',
];
```

* 生成的 xml 位置不能进行调节，但是 `svg` 可以

![](https://raw.githubusercontent.com/wqjiao/Points-Issues/master/assets/svg.png)

[关于 viewBox preserveAspectRatio](http://tutorials.jenkov.com/svg/svg-viewport-view-box.html)

- `viewBox="x, y, width, height"`

更形象的解释就是：`SVG` 就像是我们的显示器屏幕，`viewBox` 就是截屏工具选中的那个框框，最终的呈现就是把框框中的截屏内容再次在显示器中全屏显示！

- `preserveAspectRatio="xMinYMin meet"`

`preserveAspectRatio` 属性的值为空格分隔的两个值组合而成。例如，上面的 `xMidYMid` 和 `meet`.

第1个值表示, `viewBox` 如何与` SVG viewport `对齐; 
其中，第1个值又是由两部分组成的。前半部分表示x方向对齐，后半部分表示y方向对齐

| -- 值 -- | -- 含义 -- |
| -------- | --------- |
| xMin | viewport 和 viewBox左边对齐 |
| xMid | viewport 和 viewBox x轴中心对齐 |
| xMax | viewport 和 viewBox右边对齐 |
| YMin | viewport 和 viewBox上边缘对齐。注意Y是大写。 |
| YMid | viewport 和 viewBox y轴中心点对齐。注意Y是大写。 |
| YMax | viewport 和 viewBox下边缘对齐。注意Y是大写。 |

第2个值表示，如何维持高宽比（如果有）。

| -- 值 -- | -- 含义 -- |
| -------- | --------- |
| meet | 保持纵横比缩放viewBox适应viewport | 
| slice | 保持纵横比同时比例小的方向放大填满viewport | 
| none | 扭曲纵横比以充分适应viewport，变态 | 

## 网址

* [BPMN官网](https://bpmn.io/toolkit/bpmn-js/)
* [BPMN Github](https://github.com/bpmn-io/bpmn-js)
* [BPMN 实例](https://github.com/bpmn-io/bpmn-js-examples)
* [BPMN React 例子](https://github.com/wqjiao/bpmn-activiti)
* [BPMN 其他例子](https://github.com/imdwpeng/bpmn-editor)
