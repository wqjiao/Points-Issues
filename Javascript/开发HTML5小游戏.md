# 开发 HTML5 小游戏

[Html5小游戏](https://github.com/channingbreeze/games)
[打字游戏](https://dazi.91uu.net/game/wubi.html#0-sqq-1-75645-9737f6f9e09dfaf5d3fd14d775bfee85)

在介绍小游戏之前，先看一个框架 [Phaser](https://github.com/photonstorm/phaser)。
`Phaser` 框架是一个 快速、免费且开源的 `HTML5` 游戏开发框架，它提供了 [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 和 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 两种渲染方式，兼容 PC 端与移动端浏览器。

## 一、Phaser 版本

在启动 `Phaser` 游戏前，需要定义一个 `Phaser.Game` 对象实例，并同时将配置信息传至该实例：`var game = Phaser.Game(config)`。在 `Phaser2` 版本中，定义的是一个全局变量，并作为几乎全部的系统或者场景的入口。但升级至 `Phaser3` 版本之后，不再使用全局变量来存储游戏实例了。

* `Phaser2` 版本之前
```js
// Phaser.Game(
//     width,
//     height,
//     renderer,
//     parent,
//     state,
//     transparent,
//     antialias,
//     physicsConfig
// );
Phaser.Game(800, 600, 'Phaser.AUTO', 'game');
```
* `Phaser3` 版本之后
```js
const config = {};
Phaser.Game(config);
```

## 二、游戏配置 config

```js
const config = {
    type: 'Phaser.AUTO',
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#18216D",
    scene: [WelcomeScene, PrizeScene, GameScene, ScoreScene],
    transparent: false,
    antialias: true,
    loader: {
        baseURL: 'https://raw.githubusercontent.com/wqjiao/phaser-prize/master/', // 资源基本地址
        crossOrigin: 'anonymous'
    }
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
}
```

* 1.`type` 游戏使用的渲染环境
    可选值： Phaser.AUTO、Phaser.WEBGL、Phaser.CANVAS
    推荐值： Phaser.AUTO 自动尝试使用 `WebGL`，如果浏览器或设备不支持，它将回退为 `Canvas`
    父节点： `Phaser` 生成的画布元素 `canvas` 将径直添加到文档中调用脚本的那个节点上，也可以在游戏配置中指定一个父容器 `parent`。

* 2.`title` 游戏界面标题

* 3.`width`、`height` Phaser 生成的画布尺寸，即游戏界面的分辨率
    默认：width -- 800、height -- 600

* 4.`parent` 自定义 `Phaser` 生成画布(游戏界面)的父容器

* 5.`backgroundColor` 游戏界面的背景颜色，`Phaser3` 版本配置项

* 6.`scene` 游戏场景

    - 单场景
    ```js
    const config = {
        scene: {
            preload: preload, // 预加载
            create: create, // 生成游戏界面
            update: update, // 更新游戏界面
        },
    }
    ```

    - 多场景
    ```js
    // 游戏配置
    const config = {
        scene: [welcomeScene, gameScene],
    }
    // 场景1
    let welcomeScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function welcomeScene() {
            Phaser.Scene.call(this, {key: 'welcomeScene'});
        },
        // 预加载资源
        preload: function () {
            this.load.image('wheel', 'assets/wheel.png');
        },
        // 生成游戏界面
        create: function () {
            // 游戏界面跳转
            this.input.on('pointerdown', function () {
                this.scene.start('gameScene');
            }, this);
        },
        // 更新游戏界面
        update: function () {
            console.log('update')
        },
    });
    // 场景2
    let welcomeScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function gameScene() {
            Phaser.Scene.call(this, {key: 'gameScene'});
        },
        // 预加载资源
        preload: function () {
            this.load.image('pin', 'assets/pin.png');
        },
        // 生成游戏界面
        create: function () {
            // 游戏界面跳转
            this.input.on('pointerdown', function () {
                this.scene.start('welcomeScene');
            }, this);
        },
        // 更新游戏界面
        update: function () {
            console.log('update')
        },
    });
    ```

    以上是 `Phaser3` 版本的配置，但是在 `Phaser2` 版本中的场景设置是放在 `States` 中的：
    ```js
    var game = new Phaser.Game(240, 400, Phaser.CANVAS, 'game');

    game.States = {};

    game.States.preload = function() {
        this.preload = function() {
            game.load.image('wheel', 'assets/wheel.png');
            game.load.image('pin', 'assets/pin.png');
        };
        this.create = function() {
            // 点击画布 -- 场景跳转
            game.input.onDown.add(function () {
                game.state.start('main');
            }, this);
        };
    };
    game.States.main = function() {
        this.create = function() {};
        this.update = function() {};
    };
    ```

* 7.`transparent` 是否设置游戏界面为透明，默认 false，`Phaser2` 版本配置项

* 8.`antialias` 是否显示图片抗锯齿，默认 true

* 9.`loader` 表示加载器
    baseURL -- 资源的基础地址

* 10.`physics` 游戏物理引擎配置

## 三、Phaser API

以下分三个阶段(preload、create、update)做 [Phaser3 API](https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html) 的介绍

### 1、preload

`preload` 表示预加载函数，通过调用 `Phaser` 中的 `Loader` 加载器预先加载所需要的各种资源 图片、视频、雪碧图等。

```js
function preload () {
    this.load.setBaseURL('https://raw.githubusercontent.com/wqjiao/phaser-prize/master/');
    this.load.setCORS('anonymous');
    this.load.setPath('assets/');
    this.load.image('sky', 'sky.png');
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('btnStart', 'assets/btn-start.png');
}
```

* `this.load.setBaseURL(basePath)` 修改服务器基本路径
basePath -- 基本路径地址(资源位置的服务器地址),如果所有场景的图片路径均一致，可以在 `config` 的加载器 `loader` 中预先配置
但是本地运行时，需要注意[环境搭建](https://www.phaser-china.com/tutorial-detail-8.html)，可以在本地搭建一个服务，或者资源放在远程服务。

* `this.load.setCORS([crossOrigin])` 设置加载文件时使用的跨源资源共享值

* `this.load.setPath('assets/')` 设置资源路径，与 `this.load.setBaseURL(basePath)` 类似

* `this.load.image(key, [url])` 预加载图片
key -- 表示资源的key，这个字符串是一个链接，指向已加载的资源，在生成游戏对象中使用。
url -- 表示图片路径

* `this.load.spritesheet(key, [url], [frameConfig], [xhrSetting]);`
```js
this.load.spritesheet({
    key: 'bot',
    url: 'images/robot.png',
    frameConfig: {
        frameWidth: 32,
        frameHeight: 38,
        startFrame: 0,
        endFrame: 8
    }
});
```
key -- 雪碧图的key
url -- 雪碧图路径
frameConfig -- 框架配置对象，至少有一个icon的宽高属性 `frameWidth`、`frameHeight`
xhrSetting -- XHR设置配置对象。用于替换加载器的默认XHR设置，不常用。

* `this.load.audio(key, [urls])` 预加载音频

* `this.load.bitmapFont(key, [url])` 预加载字体图像文件
```js
this.load.bitmapFont({
    key: 'goldenFont',
    textureURL: 'images/GoldFont.png',
    fontDataURL: 'images/GoldFont.xml'
});
```
textureURL -- 加载字体图像文件的绝对或相对 URL
fontDataURL -- 加载字体 xml 数据文件的绝对或相对 URL


### 2、create

`create` 表示生成/创建函数，生成游戏对象，比如在 `preload` 函数中预加载的图片，在该函数中生成显示在画布中
```js
function create () {
    let sky = this.add.image(400, 300, 'sky');
    sky.setOrigin(0, 0);
    let dude = this.add.sprite(32, 48,'dude');
    let imgText = this.add.text(60, 70, '');
    this.add.button(200, 300, 'btnStart', function () {
        this.scene.start('GameScene');
    }, this);
}
```

* `this.add.image(x, y, [key])` 添加图像
x,y -- 图像坐标；key -- 在 `preload` 中预加载图片的key
注意：图片的添加顺序是有层叠性的

* `this.add.sprite(x, y, [key])` 添加雪碧图
x, y -- 图像坐标；key -- 在 `preload` 中预加载图片的key
注意：可以设置动画 `this.anims.create([config])`
```js
// 向左走
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});
// 转身
this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});
// 向右走
this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
```

* `setOrigin(originX, originY)` 设置图像的原点位置
(0, 0) || (0) -- 图像左上角
(0.5, 0.5) || (0.5) -- 图像中心
在 `Phaser2` 版本中使用 `anchor` 锚点做设置 `anchor.set(0.5)`

* `this.add.text(x, y, [text])` 添加文本内容
x,y -- 文本坐标；text -- 文本内容
注意：可以通过 `imgText.text = '测试文本'` 设置文本内容

* `this.add.button(x, y, [key], function () {}, this)` 添加按钮

* `this.input.on('pointerdown', function () {}, this)` 点击画布

* `this.scene.start([scene])` 场景跳转
scene -- 场景名称

### 3、update

`update` 表示更新函数，聚焦画布市，即可执行该函数

## 四、Phaser 相关网站

* [phaser 官网](http://phaser.io)
* [Phaser 环境配置](https://www.phaser-china.com/tutorial-detail-8.html)
* [Phaser -- Github](https://github.com/photonstorm/phaser)
* [phaser3 API 中文](http://phaser.io/tutorials/making-your-first-phaser-3-game-chinese)
* [channingbreeze 博客](http://www.channingbreeze.com)
* [Phaser 小站](https://www.phaser-china.com)
